/**
 * PURSYS Inquiry Endpoint — Google Apps Script (Web App)
 * Receives form submissions from pursysmachine.com (contact page + inquiry popup)
 * and appends them to a Google Sheet named "PURSYS Inquiries".
 * ALSO emails a notification to EMAIL_TO so inquiries are not missed.
 *
 * Deploy: script.google.com -> New project -> paste this -> Deploy -> New deployment
 *   - Type: Web app
 *   - Execute as: Me
 *   - Who has access: Anyone   (so anonymous site visitors can submit)
 *
 * Field names sent by the site (match exactly, do not rename):
 *   name, company, country, email, whats_app,
 *   mobile  -> front-end label "Material To Process"
 *   phone   -> front-end label "Required Capacity"
 *   content -> message
 */

var SS_NAME = 'PURSYS Inquiries';
var SHEET_NAME = 'Inquiries';
// Where inquiry notifications are emailed. Change to your real inbox if different.
var EMAIL_TO = 'info@pursysmachine.com';
var HEADERS = [
  'Timestamp',
  'Name',
  'Company',
  'Country',
  'Email',
  'WhatsApp',
  'Material To Process',
  'Required Capacity',
  'Message',
  'Source Page',
  'User-Agent',
  'Email Status'   // added so you can see if MailApp failed directly in the sheet
];

function getSheet() {
  var files = DriveApp.getFilesByName(SS_NAME);
  var ss = files.hasNext() ? SpreadsheetApp.open(files.next()) : SpreadsheetApp.create(SS_NAME);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ensureEmailStatusHeader(sheet) {
  // If the sheet predates this version and lacks the "Email Status" column, add it.
  var lastCol = sheet.getLastColumn();
  if (lastCol < HEADERS.length) {
    sheet.getRange(1, HEADERS.length).setValue(HEADERS[HEADERS.length - 1]);
  } else {
    var existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    if (existing[HEADERS.length - 1] !== HEADERS[HEADERS.length - 1]) {
      sheet.getRange(1, HEADERS.length).setValue(HEADERS[HEADERS.length - 1]);
    }
  }
}

function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var referer = (e && e.headers && e.headers['Referer']) || p.source || '';
    var ua = (e && e.headers && e.headers['User-Agent']) || '';

    var sheet = getSheet();
    ensureEmailStatusHeader(sheet);

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.company || '',
      p.country || '',
      p.email || '',
      p.whats_app || '',
      p.mobile || '',   // front-end sends "Material To Process" in `mobile`
      p.phone || '',    // front-end sends "Required Capacity" in `phone`
      p.content || '',
      referer,
      ua,
      ''                // Email Status placeholder, filled below
    ]);

    var row = sheet.getLastRow();
    var emailStatus = sendNotification(p, referer);
    sheet.getRange(row, HEADERS.length).setValue(emailStatus);

    return jsonOut({ result: 'success', email: emailStatus });
  } catch (err) {
    return jsonOut({ result: 'error', message: err.message });
  }
}

function sendNotification(p, source) {
  try {
    var body = ''
      + 'New inquiry from pursysmachine.com\n'
      + '-----------------------------------\n'
      + 'Name      : ' + (p.name || '-') + '\n'
      + 'Company   : ' + (p.company || '-') + '\n'
      + 'Country   : ' + (p.country || '-') + '\n'
      + 'Email     : ' + (p.email || '-') + '\n'
      + 'WhatsApp  : ' + (p.whats_app || '-') + '\n'
      + 'Material  : ' + (p.mobile || '-') + '\n'
      + 'Capacity  : ' + (p.phone || '-') + '\n'
      + 'Message   : ' + (p.content || '-') + '\n'
      + 'Source    : ' + (source || '-') + '\n';

    MailApp.sendEmail({
      to: EMAIL_TO,
      name: 'PURSYS Website Inquiry',  // nicer sender name
      subject: 'New PURSYS Inquiry — ' + (p.name || 'Unknown') + (p.company ? ' (' + p.company + ')' : ''),
      body: body
    });
    return 'sent';
  } catch (err) {
    // Email failure must not break the Sheet write above. Log and surface in sheet.
    Logger.log('Email send failed: ' + err.message);
    return 'failed: ' + err.message;
  }
}

function doGet(e) {
  return ContentService.createTextOutput('PURSYS Inquiry Endpoint is live.');
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Debug helper: send a test email to EMAIL_TO without a real form submission.
// Run this from the editor (function dropdown -> testEmail -> Run) to verify
// that MailApp permission is granted and email delivery works.
function testEmail() {
  sendNotification({
    name: 'Test User',
    company: 'Test Company',
    country: 'China',
    email: 'test@example.com',
    whats_app: '+8612345678900',
    mobile: 'chili powder',
    phone: '100 kg/h',
    content: 'This is a test inquiry from Apps Script editor.'
  }, 'https://www.pursysmachine.com/contact-us.html');
}
