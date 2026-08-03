# PURSYS 网站部署指南（Firebase Hosting）

> 目标：把静态站一键部署到 Google（Firebase Hosting），访客就近 CDN 秒开。
> 你只需照着下面的命令和步骤复制粘贴即可。所有代码层面的优化（图片 WebP、懒加载、SEO、GEO、社交链接、logo）都已经做完，部署源 `site_dist_clean/` 也已清理干净。

---

## 一、已经为你准备好的文件（无需改动）

| 文件 | 作用 |
|------|------|
| `firebase.json` | 部署核心配置：`public` 指向 `site_dist_clean`；自动忽略备份垃圾；图片/CSS/JS/HTML 缓存头 |
| `.firebaserc` | 项目占位文件，把 `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` 换成你的项目 ID 即可 |
| `site_dist_clean/` | **部署源目录**（干净副本，43 页 + 资源，已无平台残留、无备份垃圾） |
| `deploy/contact-form-apps-script.gs` | 联系表单接单脚本（部署后让询盘能发到你邮箱/表格） |

> ⚠️ 永远只部署 `site_dist_clean/`，不要传根目录的 `site/`（里面混了大量历史备份子目录，体积大且会暴露旧页面）。

---

## 二、部署前检查清单（已自动满足，仅供确认）

- [x] 错误信息域名 `chukouplus.com / themelist` 残留 = **0**（已修复为本地 logo）
- [x] `sitemap.xml` 42 条 URL 全部在 `https://www.pursysmachine.com` 下（已覆盖全部真实页面，含首页；404.html 已排除）
- [x] 图片全部 WebP，非首屏图片已加懒加载
- [x] SEO：Title ≤60 字符、Description ≤160 字符、Open Graph 完整、JSON-LD 字段完整
- [x] 社交图标：Facebook/TikTok/YouTube/WhatsApp 为真实链接；LinkedIn 占位保留；IG/Pinterest/Twitter/VK 已移除
- [x] 部署时自动排除 `__pycache__`、`*.bak*`、`*_img_bak_*`、`_bak_*`、`_site_backup_*` 等垃圾

---

## 三、五步上线（约 10 分钟）

> 在**项目根目录**（即包含 `firebase.json` 的这个文件夹）打开终端执行。

### 1. 安装 Firebase CLI（只需一次）
```bash
npm install -g firebase-tools
```

### 2. 登录 Google 账号
```bash
firebase login
```

### 3. 创建并绑定 Firebase 项目
1. 打开 https://console.firebase.google.com → 「添加项目」→ 取个名字（如 `pursys-web`）。
2. 在项目里开启 **Hosting**（左侧 Build → Hosting → 开始使用）。
3. 在本机把项目 ID 写进 `.firebaserc`：
   ```bash
   firebase use --add
   ```
   按提示选择刚建的项目即可（它会自动把项目 ID 填进 `.firebaserc`）。
   > 也可以直接手动编辑 `.firebaserc`，把 `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` 换成你在控制台看到的项目 ID。

### 4. 一键部署
```bash
firebase deploy
```
部署成功后会返回一个形如 `https://<项目ID>.web.app` 的临时域名，先打开它验证速度。

### 5. 绑定正式域名 + 自动 HTTPS（推荐）
1. Firebase 控制台 → Hosting → 「添加自定义网域」→ 输入 `www.pursysmachine.com`。
2. 按提示到你的域名 DNS 添加一条 **TXT** 验证记录 + 一条 **A/CNAME** 记录。
3. SSL 证书由 Firebase **自动签发**，几分钟生效后即 `https://www.pursysmachine.com` 可访问。

---

## 四、启用联系表单收询盘（表单代码已接好，只差贴 URL，约 5 分钟）

静态部署后，原平台询盘表单会失效。我已把 `contact-us.html`（双副本）的表单改写为**原生 POST 提交**，目标指向 Google Apps Script 端点（占位符 `REPLACE_WITH_YOUR_APPS_SCRIPT_URL`），并加了必填校验。你只需：

1. 新建一个 Google 表格用来存询盘，复制其 URL 中的 **表格 ID**（`.../spreadsheets/d/<SHEET_ID>/edit`）。
2. 打开 `deploy/contact-form-apps-script.gs`，把里面的两处占位改掉：
   - `SHEET_ID` → 你的表格 ID
   - `NOTIFY_EMAIL` → 收通知的邮箱（默认已是 `info@pursysmachine.com`）
3. 打开 https://script.google.com → 新建项目 → 粘贴整段代码 → 「部署」→「新建部署」→ 类型 **Web 应用**：
   - 执行身份：**我（Me）**
   - 谁可以访问：**任何人（包括匿名）** ← 必须，否则访客无法提交
   - 复制生成的 **Web 应用 URL**（形如 `https://script.google.com/macros/s/XXXXXXXX/exec`）。
4. 把该 URL 里的 ID 贴进表单 action 的占位符（**双副本都要改，保持一致**）：
   - 文件：`site/contact-us.html` 与 `site_dist_clean/contact-us.html`
   - 找到这一行（已是我接好的样子）：
     ```html
     <form id="form" class="inquiry_form formBox" method="POST" action="https://script.google.com/macros/s/REPLACE_WITH_YOUR_APPS_SCRIPT_URL/exec" target="_blank" rel="noopener">
     ```
   - 把 `REPLACE_WITH_YOUR_APPS_SCRIPT_URL` 换成你的 Web 应用 ID（即 `macros/s/` 与 `/exec` 之间的那段），例如：
     ```html
     <form id="form" class="inquiry_form formBox" method="POST" action="https://script.google.com/macros/s/AbC123xyz/exec" target="_blank" rel="noopener">
     ```
5. 改完重新 `firebase deploy` 一次即可。提交后会在**新标签页**打开「Thank you」页面（原网站页面保留）。

> 不想用 Apps Script？也可改用 SaaS（Formspree / Getform）：注册后拿到 endpoint，同样把上面表单 action 里的占位符换成该 endpoint 即可，无需写代码。
> 注意：在贴入真实 URL 之前，点提交会弹出提示「Contact form is not configured yet」，这是正常保护（防止误提交到无效地址），不是 bug。

---

## 五、回滚与验证

- **回滚**：Firebase Hosting 保留历史版本，控制台里点「回滚」即可回到上一版；或用 `firebase deploy` 重新发布 `site_dist_clean/`。
- **测速**：部署后用 https://pagespeed.web.dev 输入你的域名，预期移动端得分明显优于同类机械站（已做 WebP + 懒加载 + CDN + brotli）。
- **收录**：见下方「六、让谷歌收录」完整步骤。

---

## 六、让谷歌快速收录（Google Search Console 分步）

> 前提：已完成「三、五步上线」并**绑定自定义域名** `www.pursysmachine.com`（拿到 HTTPS）。因为全站 canonical/sitemap 都写死 `pursysmachine.com`，必须用这个域名对外访问，否则 SEO 规范会冲突。

部署、域名生效并拿到 HTTPS 后，主动提交给谷歌，通常几天到两周内开始收录。

### 1. 打开 Google Search Console
访问 https://search.google.com/search-console ，用和 Firebase 相同的 Google 账号登录。

### 2. 添加资源（两种方式任选其一）
- **推荐：网域（Domain）类型** → 输入 `pursysmachine.com`（不带 www）。验证用 DNS TXT 记录，覆盖 www / 非 www 全部子页，最彻底。
- 或选 **网址前缀（URL prefix）** → 输入 `https://www.pursysmachine.com/`。

### 3. 验证所有权
- Domain 类型：到你的域名 DNS 后台添加一条 **TXT** 记录（Search Console 会给出具体「主机记录」和「记录值」），添加后回控制台点「验证」。
- 若你已在 Firebase 用同一 Google 账号绑定了自定义域名，Search Console 有时会自动识别，可直接尝试验证。
- 验证成功后**保留**那条 TXT 记录（删了后续验证会失效）。

### 4. 提交 sitemap（最关键）
1. 左侧菜单 → **Sitemaps**。
2. 输入框填 `sitemap.xml`（或完整地址 `https://www.pursysmachine.com/sitemap.xml`），点「提交」。
3. 状态显示「成功」，已发现网址数应为 **42**（与 sitemap.xml 一致）。

### 5. 主动请求收录核心页（加速）
1. 左侧 → **URL 检查**，输入 `https://www.pursysmachine.com/` ，回车。
2. 若显示「网址不在 Google 中」，点 **「请求编入索引」**。
3. 对 5~10 个最重要页面各做一次（如 `hammer-mill.html`、`chili-powder-mill.html`、`how-to-make-chili-powder.html` 等）。新站每日请求额度有限，其余交给 sitemap 自然抓取即可。

### 6. 后续监控
- 几天后看 **索引 → 网页** 的已收录数量是否增长。
- **覆盖范围**报告会列出抓取错误（404、被 noindex 屏蔽等），按提示修复。
- 保持内容更新（新闻/指南）可让 Google 更频繁回访。

> robots.txt 已指向 sitemap、全站 canonical/meta 就位、无平台域名残留，Google 抓取无障碍。

---

## 八、GitHub Actions 自动部署（国内网络也适用，推荐）

> **为什么用这个**：你的电脑只上国内网络，直连 Google（`firebase deploy` / Search Console）会被限制。用 GitHub Actions 可绕开——把代码推到 GitHub 后，由 **GitHub 的境外服务器** 执行 `firebase deploy`，全程你只需连 GitHub（国内基本可访问）。

### 已为你准备好的
- `.github/workflows/firebase-hosting-deploy.yml`：push 到 `main` 分支即自动部署到 Firebase Hosting（也支持在 Actions 页面手动点 Run）。
- `.gitignore`：只跟踪部署所需的 `site_dist_clean/`、`firebase.json`、`.firebaserc`、`deploy/`、`.github/`、本文件；自动排除 `site/` 工作副本和所有 `_bak_*` 备份目录。

### 使用步骤
1. **建 GitHub 仓库**：到 https://github.com → New repository（公开/私有均可），不要勾自动生成 README。
2. **本地初始化 Git 并推送**（在你本机命令行，项目根目录执行）：
   ```bash
   git init
   git add .
   git commit -m "PURSYS website initial"
   git branch -M main
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git push -u origin main
   ```
   > `.gitignore` 已就绪，只会把部署源推上去，备份目录不会进仓库。
3. **先在 Firebase 控制台建好项目并开启 Hosting**（同「三、第 2~3 步」）：建项目 `pursys-web`、开启 Hosting。这一步只需在网页上点，不必在本机连 Google。
4. **生成 Firebase 部署令牌**（仅需一次，需在**能连 Google 的环境**执行：合规网络 / 境外云主机 / 或请伙伴代跑）：
   ```bash
   firebase login:ci
   ```
   返回一个形如 `1//04xxxx...` 的长字符串，复制保存好。
5. **在 GitHub 仓库配置 Secrets**：仓库 → Settings → Secrets and variables → Actions → New repository secret，添加两条：
   - `FIREBASE_TOKEN` = 上一步的令牌
   - `FIREBASE_PROJECT_ID` = 你的 Firebase 项目 ID（如 `pursys-web`）
   > 工作流用 `--project ${{ secrets.FIREBASE_PROJECT_ID }}` 覆盖 `.firebaserc` 占位，所以本地 `.firebaserc` 不填也不影响自动部署。
6. **首次触发部署**：
   - 方式 A：再 `git push` 一次（任意改动即可触发）；
   - 方式 B：GitHub 仓库 → Actions → 选 “Deploy to Firebase Hosting” → Run workflow。
   - Actions 日志出现 `✔ Deploy complete!` 即成功。随后按「三、第 5 步」绑定 `www.pursysmachine.com` 自定义域名。
7. **日常更新**：以后改好网站（双副本 `site/` + `site_dist_clean/` 保持一致），`git push` 到 `main` 就自动上线，**无需本机直连 Google**。

> 补充：表单接单 URL（`contact-us.html` 里的 `REPLACE_WITH_YOUR_APPS_SCRIPT_URL`）仍需你按「四」手动填好后再 push；Search Console 的收录验证（「六」）仍需登录 Google 一次（可用合规网络或请伙伴协助）。

---

## 七、常见问题

- **Q：部署时把根目录整个传上去行不行？** 不行。`site/` 含大量备份子目录，会让部署包虚高且暴露旧页面。始终部署 `site_dist_clean/`（`firebase.json` 已锁定）。
- **Q：改了内容怎么更新？** 直接改 `site/` 和 `site_dist_clean/` 对应页面（保持双副本一致）；用 GitHub Actions 则 `git push` 到 `main` 自动上线，用本地 CLI 则再跑 `firebase deploy`。
- **Q：要 HTTPS 吗？** Firebase 自动提供，无需额外配置。
- **Q：我在国内，本机能直连 Google 部署吗？** 直连受限。推荐用「八、GitHub Actions 自动部署」绕开；或仅在能连 Google 的合规环境执行 `firebase deploy`。
