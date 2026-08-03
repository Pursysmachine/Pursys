/**
 * PURSYS 联系表单接单脚本 (Google Apps Script)
 * ---------------------------------------------------------------
 * 用途：网站静态部署到 Firebase / 任意静态空间后，原平台询盘表单失效，
 *       此脚本接收 POST 询盘 → 写入 Google 表格 + 邮件通知你。
 *
 * 部署步骤（一次性，约 5 分钟）：
 *   1. 新建一个 Google 表格（用来存询盘），记下表格 URL 里的 ID：
 *        https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
 *   2. 打开 https://script.google.com → 新建项目 → 清空 → 粘贴本文件全部内容
 *   3. 把下面 SHEET_ID 和 NOTIFY_EMAIL 改成你自己的
 *   4. 菜单「部署」→「新建部署」→ 类型选「Web 应用」
 *        - 执行身份：我（Me）
 *        - 谁可以访问：任何人（包括匿名）   ← 必须，否则访客无法提交
 *   5. 部署后会得到一个 Web 应用 URL，形如：
 *        https://script.google.com/macros/s/XXXXXXXX/exec
 *      把这个 URL 替换进 contact-us.html 表单的 action 里的
 *      REPLACE_WITH_YOUR_APPS_SCRIPT_URL 占位符。
 *   6. 首次访问会要求「授权」，按提示允许一次即可。
 *
 * 表格首行列名（脚本会自动建表头）：
 *   时间 | 姓名 | 邮箱 | 国家 | 公司 | WhatsApp | 物料 | 需求产能 | 留言
 *   对应表单字段：name / email / country / company / whats_app / mobile(物料) / phone(产能) / content
 * ---------------------------------------------------------------
 */

var SHEET_ID     = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';   // ← 改成你的表格 ID
var NOTIFY_EMAIL = 'info@pursysmachine.com';            // ← 收询盘通知的邮箱
var SHEET_NAME   = 'Inquiries';

function getSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['时间','姓名','邮箱','国家','公司','WhatsApp','物料','需求产能','留言']);
  }
  return sheet;
}

function doPost(e) {
  var p = e.parameter || {};
  var sheet;
  try {
    sheet = getSheet();
  } catch (err) {
    return HtmlService.createHtmlOutput(
      '<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:80px auto;text-align:center">' +
      '<h2 style="color:#c0392b">配置错误</h2>' +
      '<p>请检查 SHEET_ID 是否正确，且已为脚本授权访问该表格。</p>' +
      '</div>'
    );
  }

  sheet.appendRow([
    new Date(),
    p.name      || '',   // 姓名
    p.email     || '',   // 邮箱
    p.country   || '',   // 国家
    p.company   || '',   // 公司
    p.whats_app || '',   // WhatsApp
    p.mobile    || '',   // 物料 (Material To Process)
    p.phone     || '',   // 需求产能 (Required Capacity)
    p.content   || ''    // 留言
  ]);

  // 邮件通知（失败不影响写入）
  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New PURSYS Inquiry from ' + (p.name || 'unknown'),
      body:
        'Name            : ' + (p.name || '') + '\n' +
        'Email           : ' + (p.email || '') + '\n' +
        'Country         : ' + (p.country || '') + '\n' +
        'Company         : ' + (p.company || '') + '\n' +
        'WhatsApp        : ' + (p.whats_app || '') + '\n' +
        'Material        : ' + (p.mobile || '') + '\n' +
        'Required Capacity: ' + (p.phone || '') + '\n' +
        'Message         : ' + (p.content || '')
    });
  } catch (err) {}

  return HtmlService.createHtmlOutput(
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:80px auto;text-align:center">' +
    '<h2 style="color:#0f0f0f">Thank you!</h2>' +
    '<p>Your inquiry has been received. Our team will contact you within 24 hours.</p>' +
    '<p><a href="/contact-us.html" style="color:#0f0f0f">&#8592; Back to website</a></p>' +
    '</div>'
  );
}

// 防止直接 GET 访问报错
function doGet(e) {
  return HtmlService.createHtmlOutput('<h2>PURSYS Inquiry Endpoint</h2><p>POST only.</p>');
}
