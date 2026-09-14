# AnyGridMaker AdSense 复核

日期：2026-09-10。结论：Not ready（尚不足以建议重新提交）。
这是站点准备度判断，不是 Google 的审核结果，也不保证整改后获批。
范围：本地代码、线上 GET 抽查、用户提供的第三方报告；未访问 AdSense 后台。
本轮只审计，没有修改广告设置或部署。上轮 SEO 修改仍在本地。

## 证据与边界

- E1：实时 GET 首页、privacy、contact、robots.txt、sitemap.xml、pt/grade-pixel、es/cuadricula-para-dibujar、ja/add-grid-to-photo 均为 200。sitemap 有 40 个 loc。robots 明确允许 Mediapartners-Google 和 Googlebot。
- E2：实时 /ads.txt 为 200，仅有 publisher ID 未配置注释。抽查 HTML 未发现 AdSense 脚本。HTML 未发现 GA/CMP 不代表客户端执行后绝对不存在；未进行浏览器网络和移动端交互验证。browser-act 在环境中不可用。
- E3：src/routes/ads[.]txt.ts 读取 serverEnv；src/env/server.ts 使用 process.env。__root.tsx 广告脚本读取 clientEnv；src/env/client.ts 使用 import.meta.env。两者可能配置不同，尚未核对部署变量；仅校验 ca-pub- 前缀，不校验完整 ID。
- E4：seo-content.ts 钩针实例段连续三段重复核心词和相近观点。tool-page.tsx 每页共用工作流程和技术栈段落；工具实际主要差异是模式与预设。grid-maker-tool.tsx 控件和错误提示为英文，未接收语言文案。
- E5：工具具有浏览器图片处理、预览与导出代码；并非只有文本的空壳。没有公开作品投稿或评论流程。没有证据证明文字或资产侵权，也没有完成外部原创来源比对。
- E6：privacy/cookie/terms 含广告及第三方 Cookie 披露；GoogleAnalytics 配置后直接初始化，未发现同意控制。About 描述产品，Contact 仅指向公开 GitHub Issues，尚未确认仓库可访问性和私密联系渠道。
- E7：当前可达工具主题为图片网格，抽查未发现禁止内容。此结论仅限所检代码和页面，不代表对所有外部依赖、资产权利和未来内容作保证。

## 按优先级整改

### Blocker / 证据待补

没有核实到第三方报告宣称的两项硬性政策违规。ADS-ELIG-03 和 ADS-PUB-09 应改为 Unknown，不能从未配置 ads.txt 推断发布商造假或全部内容违规。
账号是否已验证、拒审原文、发布商 ID 与域名归属仍须后台确认。不要填示例或他人 ID。

### High

1. ADS-TXT-01：补齐真实账户授权。统一广告脚本与 ads.txt 的配置来源，严格校验 ca-pub- 后 16 位数字；发布前确认脚本 client 与 ads.txt pub 对应同一账号。广告启用、所有权验证应可分别控制，避免为了验证立即全站开自动广告。文件：__root.tsx、ads[.]txt.ts、src/env/client.ts、src/env/server.ts。验收：线上授权行与后台复制值完全一致，后台 ads.txt 为 Authorized。
2. ADS-CONTENT-01/03、ADS-CONTENT-08：先删除重复段落，再增强页面独有价值。钩针页加入实际针密度到成品尺寸的演算及明确的参考图边界；十字绣页加入布目数到尺寸的演算和未提供线号/符号表的说明；像素页加入同一授权图片不同格数的实际导出对比；绘画页加入纸张比例和转描实例。示例必须实际用工具生成、人工复核。不要为满足词数新建同功能门页。上轮像素说明已写入本地但未发布。
3. ADS-PRIV-04：确认 EEA、英国、瑞士流量及广告模式。启用个性化广告前配置 Google 认证 CMP，可使用 AdSense Privacy & messaging；拒绝、接受、撤回均须可操作，GA/广告行为与选择一致。Consent Mode 不能代替 CMP。普通非个性化广告也不能一概视为不需要同意。文件：google-analytics.tsx、__root.tsx、隐私与 Cookie 页。验收：浏览器实测请求与存储行为，而非只检测横幅文字。
4. ADS-UX-01：完整本地化画布控件、上传失败、下载提示和分享标签；在手机上实测上传、调整、下载及路由切换。不能仅凭正文翻译宣称整个工具完成国际化。

### Medium

- ADS-UX-05：由站长提供真实维护者介绍和可用私密联系邮箱/表单；避免让用户公开提交隐私请求。邮箱不能虚构。法律页以准确和可操作为标准，不必扩至 800 词。
- ADS-PUB-10/11/12：广告上线先限定在有完整内容的工具页，排除 404、空状态、法律页及下载按钮旁易误触位置；若开自动广告，后台设置页面与区域排除并实测。
- 部署上轮已验证的异常 URL 修复，发布后抽查 301、canonical、hreflang，检查 sitemap URL 的实际响应。

## 官方依据

- [ads.txt 指南](https://support.google.com/adsense/answer/12171612)：非强制，强烈建议；已有账户应填真实授权信息。
- [站点准备要求](https://support.google.com/adsense/answer/7299563)：关注原创、价值和导航，没有统一 800–1500 词的过审门槛。
- [认证 CMP 要求](https://support.google.com/adsense/answer/13554116)：EEA、英国、瑞士个性化广告要求。
- [发布商政策](https://support.google.com/adsense/answer/10502938)：发布商信息、内容与广告展示政策。
- [以用户为先的内容](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)：词数不构成质量保证。

## 完整逐项检查

Pass 限于列明的样本和证据；Unknown 表示未核实，不等于违规。ADS-* 是审计工具编号，不是 Google 官方错误码。

| ID | 状态 | 证据 / 下一步 |
| --- | --- | --- |
| ADS-ELIG-01 | Unknown | 站长确认申请主体成年或符合监护安排。 |
| ADS-ELIG-02 | Unknown | 后台确认同主体仅一个账号；现有账号添加网站。 |
| ADS-ELIG-03 | Unknown | 内容和账号仍有待核实项，不能由空 ads.txt 推断违规。 |
| ADS-ELIG-04 | N/A | 自有域名，非 Blogger/YouTube 托管流程。 |
| ADS-OWN-01 | Pass | E3：有源码及 head 注入路径。 |
| ADS-OWN-02 | Unknown | 用户称持有域名；需 CF 控制权与账号验证记录。 |
| ADS-OWN-03 | Unknown | SSR 有正文；还需浏览器验证水合和脚本。 |
| ADS-SITE-01 | Unknown | 后台 Websites 查看本站 Ready/拒审详情。 |
| ADS-SITE-02 | Pass | E3：可部署脚本或 ads.txt；不代表已经验证。 |
| ADS-TXT-01 | Fail | E2：Google 授权行缺失；填真实 ID 后复查。 |
| ADS-TXT-02 | Fail | E2：只有注释，不是有效授权名单；非独立硬性过审门槛。 |
| ADS-CONTENT-01 | Unknown | E4/E5：有工具价值，但实例及差异不足；补实操案例。 |
| ADS-CONTENT-02 | Pass | E5：核心为自有工具实现，未见依赖聚合/feed。 |
| ADS-CONTENT-03 | Unknown | 字数不是充足性证据；需完成各意图的结果验收。 |
| ADS-CONTENT-04 | Pass | E1/E5：存在完整正文和实现，不是空站。 |
| ADS-CONTENT-05 | Pass | E2：抽查无广告脚本或占主导推广。 |
| ADS-CONTENT-06 | Pass | en/es/pt/ja/zh 属支持语言；混用问题另列 UX。 |
| ADS-CONTENT-07 | N/A | E5：无公开评论或 UGC 发布。 |
| ADS-CONTENT-08 | Fail | E4：连续重复关键词及相近观点；删重复、补独有实用信息。 |
| ADS-UX-01 | Fail | E4：多语言工具仍有英文控件；补齐并做移动端验收。 |
| ADS-UX-02 | Pass | E1/E4：工具标题、用途及相关工具链接明确。 |
| ADS-UX-03 | Unknown | 下载代码存在；需实测下载及所有外部联系链接。 |
| ADS-UX-04 | Unknown | 未见恶意实现；需浏览器验证外部脚本运行行为。 |
| ADS-UX-05 | Pass | E6：信任页齐全；私密联系渠道仍建议补充。 |
| ADS-UX-06 | Unknown | HTML 未见广告优先设计；需桌面与手机视觉验收。 |
| ADS-CRAWL-01 | Pass | E1：抽查地址均 200。 |
| ADS-CRAWL-02 | Unknown | robots 放行、普通请求可达；需 CF 日志确认真实广告爬虫无拦截。 |
| ADS-CRAWL-03 | Pass | E1：正文通过 GET 可读取。 |
| ADS-CRAWL-04 | Pass | E1：抽查标准 URL 直达；异常 URL 修复待部署。 |
| ADS-CRAWL-05 | Pass | E1：标准路径不含会话标识。 |
| ADS-CRAWL-06 | Unknown | 本次 DNS/TLS 可用；长期稳定性需 CF 监控和日志。 |
| ADS-CRAWL-07 | Pass | E1：sitemap 有 40 个地址及页面内链。 |
| ADS-PROG-01 | Unknown | 站长确认无自点、刷量和互点行为。 |
| ADS-PROG-02 | Pass | E4/E7：未见诱导点击广告文案。 |
| ADS-PROG-03 | N/A | E2：当前抽查没有展示广告；上线重新审。 |
| ADS-PROG-04 | Unknown | 查看 GA 来源、购买流量及推广记录。 |
| ADS-PROG-05 | N/A | E2：当前未发现活动广告请求代码。 |
| ADS-PROG-06 | N/A | 当前无已确认展示广告；启用后检查页面排除。 |
| ADS-PROG-07 | N/A | 普通网站，无 App WebView。 |
| ADS-PUB-01 | Pass | E7：所检网格内容未见违法引导。 |
| ADS-PUB-02 | Unknown | 未发现侵权证据；需资产授权、原创来源确认。 |
| ADS-PUB-03 | Pass | E7：抽查未见仇恨或危险内容。 |
| ADS-PUB-04 | Pass | E7：无相关商品或虐待内容。 |
| ADS-PUB-05 | Unknown | E6：用途明确；维护主体和全部功能表述需核实。 |
| ADS-PUB-06 | Pass | E5/E7：未见钓鱼或虚假收益流程。 |
| ADS-PUB-07 | Pass | E7：工具为普通图像处理，无不诚信服务。 |
| ADS-PUB-08 | Pass | E7：所检内容无成人或性交易主题。 |
| ADS-PUB-09 | Unknown | E2/E3：没有真实 ID/广告请求证据，不能判定造假；后台核对。 |
| ADS-PUB-10 | N/A | 无已确认广告展示；上线实测遮挡与误触。 |
| ADS-PUB-11 | N/A | 当前未展示广告；页面价值问题仍见 CONTENT 项。 |
| ADS-PUB-12 | N/A | 无广告位实例；上线检查上下文和视口。 |
| ADS-PUB-13 | Pass | E7：不涉及健康、选举或气候虚假声明。 |
| ADS-PUB-14 | Pass | E7：无公共议题欺骗性媒体。 |
| ADS-PUB-15 | Pass | E7：抽查无儿童危害内容，用户图片不公开发布。 |
| ADS-PUB-16 | Pass | E7：不涉及危机事件变现内容。 |
| ADS-REST-01 | Pass | E7：未见成人产品或内容。 |
| ADS-REST-02 | Pass | E7：未见血腥或显著粗俗内容。 |
| ADS-REST-03 | Pass | E7：未见武器商品或教程。 |
| ADS-REST-04 | Pass | E7：未见烟草或药物内容。 |
| ADS-REST-05 | Pass | E7：未见酒类销售或酗酒引导。 |
| ADS-REST-06 | Pass | E7：无赌博业务。 |
| ADS-REST-07 | Pass | E7：无药品销售或相关推广。 |
| ADS-REST-08 | N/A | E2：无视频广告或广告遮挡实例。 |
| ADS-PRIV-01 | Unknown | E6：有披露；与实际请求和同意行为是否一致待测。 |
| ADS-PRIV-02 | Pass | E6：披露第三方广告 Cookie 和标识符。 |
| ADS-PRIV-03 | Unknown | 需浏览器请求检查 URL/事件无邮箱等 PII。 |
| ADS-PRIV-04 | Unknown | E6：代码未见同意集成；需地区测试与 CMP 后台证据。 |
| ADS-PRIV-05 | N/A | 所检网格工具不请求精确定位。 |
| ADS-PRIV-06 | Unknown | 站长确认是否面向儿童及相应账号标签，课堂用途不自动等同儿童定向。 |
| ADS-PRIV-07 | N/A | 未见 Google 域名 Cookie 代理/修改实现。 |
| ADS-PRIV-08 | Unknown | 需 GA/广告受众配置证明确无敏感定向。 |
| ADS-PRIV-09 | N/A | 非住房、招聘、信贷广告业务。 |
| ADS-PRIV-10 | Unknown | 个性化广告模式与数据使用权需后台确认。 |

## 站长证据和复检清单

- AdSense：提供本站状态、最近拒审原文、真实发布商 ID 和 ads.txt 状态；不提供密码。
- 账号：确认年龄、单一账号、域名控制权；用现有账户添加本站。
- 流量：核对 GA 来源/媒介和推广记录，确认无购买互点流量。
- 内容：提供示例资产来源、真实维护者介绍、可用的私密联系渠道。
- CMP：核对后台消息是否发布到本站，实测接受、拒绝、撤回与请求行为。
- 发布：确认真实 ID 授权行、上轮 SEO 修改、语言控件和独有案例都已线上可见。
- 浏览器：桌面/手机完成上传到下载，确认无误导按钮和广告误触位置。
- 复审：所有 High 修复且账号证据齐全后，再根据后台允许的时间提交；不靠反复加字数保证通过。

Completeness Check：参考要求 73 项；报告表格 73 项；无缺失、无重复。
