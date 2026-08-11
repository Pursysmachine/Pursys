# PURSYS 询盘表单 — Google Apps Script 部署说明

## 它能做什么
把网站联系表单 / 悬浮询盘弹窗的提交：
1. 写入你的 Google Sheet（自动建表 `PURSYS Inquiries`）作备份；
2. 实时发一封通知邮件到 `info@pursysmachine.com`。

无需自建服务器、无需后端。

## 前置条件
- 一个 Google 账号（Gmail 或 Google Workspace）
- **能连 Google 的网络一次**（部署 + 授权时需要；可与 Search Console 验证放在同一次合规网络会话里处理）。日常收询盘不需要你在线——访客提交由 Google 服务器处理。

## 部署 / 更新步骤
> 如果你已经部署过旧版（只写表格不发邮件），请按下面步骤**重新部署**。

1. 打开 https://script.google.com
2. 找到现有项目 `PURSYS Inquiry`（或左上角「新建项目」）
3. 删掉编辑器里的默认代码，把 `apps_script_inquiry.gs` 里的**全部内容**粘贴进去，`Ctrl+S` 保存
4. 点右上角 **部署 → 管理部署**
5. 点击当前部署右侧的铅笔图标（编辑）
6. 版本选择 **新版本**，描述可写 `add email notification`
7. 设置保持：
   - 执行身份：**我 (Me)**
   - 谁可以访问：**任何人 (Anyone)**  ← 必须选这个，否则匿名网站访客无法提交
8. 点「部署」，Google 会要求**授权**（关键）：
   - 选择你的账号
   - 点「高级」→「转到 PURSYS Inquiry（不安全）」→「允许」
   - 需要的权限：查看/创建 Google Drive 文件、查看/修改电子表格，以及 **发送邮件（MailApp）**
   - ⚠️ 如果没有看到「发送邮件」相关权限，说明脚本里的 `MailApp.sendEmail` 没被执行到，请检查代码是否完整粘贴
9. 授权完成后，复制生成的 **Web 应用 URL**，形如：
   `https://script.google.com/macros/s/AKfyc...XXXX.../exec`
   ⚠️ 一定要带结尾的 `/exec`

## 如何确认邮件能收到
1. 在网站上任意页面提交一条测试询盘。
2. 打开 Google Drive 里的 `PURSYS Inquiries` 表格，确认新增一行。
3. 看新增的 **Email Status** 列：
   - `sent` → 邮件已发出。去 `info@pursysmachine.com` 收件箱 **和 垃圾箱/Spam** 里查找，发件人显示为 `PURSYS Website Inquiry`。
   - `failed: Authorization required` 或类似 → 授权时没允许 MailApp，请重新按步骤 8 授权。
   - `failed: ...quota...` → 当日邮件配额用完（新账号默认 100 封/天，极少触发）。
4. 如果状态是 `sent` 但收件箱/垃圾箱都没有，说明邮局把 Google 脚本邮件拦截了，请换用另一个收件邮箱或联系邮局放行 `pursysmachine.com` 的邮件。

## 之后交给我
如果重新部署后 URL 变了，把新的 `/exec` URL 发给我，我会更新全站 45 个表单指向。若 URL 没变则无需改动。

## 查看询盘
- 第一次收到询盘后，去 Google Drive 找 `PURSYS Inquiries` 这个表格（脚本自动创建）。
- 如果想提前自定义样式/加说明，可先手动建一个同名的 Google Sheet，脚本会复用它而不是新建。
- 表头：Timestamp / Name / Company / Country / Email / WhatsApp / Material To Process / Required Capacity / Message / Source Page / User-Agent / **Email Status**

## 字段映射说明（重要）
前端字段名与 Apps Script 接收名完全一致，不要改名：

| 表单字段 | 含义 |
|---|---|
| `name` | 姓名 |
| `company` | 公司 |
| `country` | 国家 |
| `email` | 邮箱 |
| `whats_app` | WhatsApp |
| `mobile` | 物料（前端 label 为 Material To Process）|
| `phone` | 产能（前端 label 为 Required Capacity）|
| `content` | 留言 |

## 安全提示
- `/exec` URL 本质是一个公开写入接口，靠「不公开泄露」来保证只收你网站的询盘。不要把它发到公开场合。
- 若怀疑被滥用，去 script.google.com 删除该部署即可停止接收。
