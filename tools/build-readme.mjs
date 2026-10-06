// Builds profile/README.md: a Japanese part, then an English part, each opening with its drawing-sheet banner.
// Run: node tools/build-readme.mjs
// Company names are always written in capitals (株式会社NOOVADO, NOOVADO JSC). Official taglines are quoted verbatim.
import { writeFileSync } from "node:fs";

const RAW = "https://github.com/noovado/.github/raw/main/profile";
const logo = (f, alt) => `<img src="${RAW}/logos/${f}.svg" alt="${alt}" width="128">`;

const hero = (lang, alt) => `<picture>
  <source media="(prefers-color-scheme: dark)" srcset="${RAW}/assets/hero-${lang}-dark.svg">
  <img src="${RAW}/assets/hero-${lang}-light.svg" alt="${alt}" width="100%">
</picture>`;

// 3 x 2 grid of services: title on top, one line of description below.
const grid = (items) => {
  const cell = ([t, d]) => `<td width="33%" valign="top"><b>${t}</b><br><sub>${d}</sub></td>`;
  return `<table>\n<tr>${items.slice(0, 3).map(cell).join("")}</tr>\n<tr>${items.slice(3).map(cell).join("")}</tr>\n</table>`;
};

// Group companies as a parts list: logo | name, tagline, scope, services, website.
const companies = (rows) => `<table>\n${rows.map((r) => `<tr>
<td width="150" align="center" valign="middle">${r.logo ?? ""}</td>
<td valign="top">
<b>${r.name}</b>${r.tagline ? `<br><i>${r.tagline}</i>` : ""}<br>
${r.scope}${r.services ? `<br><sub>${r.services.join("　｜　")}</sub>` : ""}<br>
<a href="${r.url}">${r.url.replace(/^https?:\/\//, "")}</a>
</td>
</tr>`).join("\n")}\n</table>`;

const tech = "`React` `Vue.js` `JavaScript` `Node.js` `PHP` `Ruby on Rails` `Python` `Go` `Java` `C#` `.NET` `Swift` `iOS` `Android`";

const ja = `<a id="日本語"></a>

${hero("ja", "株式会社NOOVADO — デジタル変革を通じて社会の進歩を創造する")}

<p align="right"><b>日本語</b>　|　<a href="#english">English</a></p>

## 会社概要

株式会社NOOVADO（NOOVADO JSC）は、ベトナムを拠点とするソフトウェア開発会社です。Web・モバイルアプリ・AI・ブロックチェーンの各分野で、企画・要件定義から設計、開発、運用保守までを一貫して担います。ITエンジニア40名が在籍しています。NOOVADO HOLDINGS グループの一員として、建設・製造分野のグループ各社と連携し、ITと現場の両面からお客様の事業を支えます。

## 事業内容

${grid([
  ["Web開発", "業務システムからサービスサイトまで、性能と拡張性を重視したWebアプリケーションを設計・開発します。"],
  ["モバイルアプリ開発", "iOS・Android向けアプリの設計・開発・運用を行います。"],
  ["ITコンサルティング", "企画段階からシステムの全体像を可視化し、最適な技術選定と開発計画をご提案します。"],
  ["AI・データ活用", "データ分析基盤の構築と、業務システムへのAI機能の組み込みを行います。"],
  ["ブロックチェーン", "スマートコントラクトとWeb3アプリケーションの設計・開発に対応します。"],
  ["ゲーム開発", "ゲームおよびインタラクティブコンテンツの企画・開発を行います。"],
])}

**主な対応技術**　${tech}

## グループ会社

NOOVADO HOLDINGS は、ベトナムと日本を拠点に、IT・建設・製造の各分野で事業を展開する企業グループです。各社が専門領域を担い、グループ全体で一貫したサービスをご提供します。

${companies([
  { logo: logo("noovado", "NOOVADO"), name: "株式会社NOOVADO（ベトナム）", scope: "Web・モバイル・AI・ブロックチェーン分野の受託開発。ITエンジニア40名。", url: "https://www.noovado.com" },
  { logo: logo("noovacons", "NOOVACONS"), name: "株式会社NOOVACONS（ベトナム）", tagline: "人と技術の力で、建設業界に新たな未来を。", scope: "建築・土木・設備分野の設計から施工までを支えるオフショアパートナー。エンジニア30名。", services: ["CAD図面作成", "BIM/CIM/MEP", "CGパース・VR", "BIM/CADソフト開発"], url: "https://www.noovacons.com" },
  { logo: logo("noovamech", "NOOVAMECH"), name: "株式会社NOOVAMECH（ベトナム）", tagline: "人と技術の力で、ものづくりに新たな未来を", scope: "機械設計・電気制御設計から製作までをワンストップで提供。機械エンジニア25名。", services: ["機械設計", "電気制御設計", "製作・組立", "CADカスタマイズ"], url: "https://www.noovamech.com" },
  { logo: logo("noovasteel", "NOOVASTEEL"), name: "株式会社NOOVASTEEL（ベトナム）", tagline: "人と技術の力で、鉄骨づくりに新たな価値を", scope: "鉄骨図面の作成から製作管理まで、日本の鉄骨工事を支えるパートナー。", services: ["鉄骨図面作成", "製作管理・品質管理", "BIM・AIシステム開発", "技術者育成"], url: "https://www.noovasteel.com" },
  { logo: logo("noovado", "NOOVADO JAPAN"), name: "合同会社NOOVADO JAPAN（日本）", scope: "グループの日本法人として、日本のお客様とのご契約およびお問い合わせ窓口を担います。", url: "https://www.noovado.co.jp" },
])}

## お問い合わせ

お見積り・ご相談は [contact@noovado.com](mailto:contact@noovado.com) までお気軽にお問い合わせください。グループ全体の概要は [noovado.co.jp/holdings](https://noovado.co.jp/holdings/) をご覧ください。`;

const en = `<a id="english"></a>

${hero("en", "NOOVADO JSC — Creating societal progress through digital transformation")}

<p align="right"><a href="#日本語">日本語</a>　|　<b>English</b></p>

## About us

NOOVADO JSC is a software development company based in Vietnam. We take web, mobile, AI, and blockchain projects from planning and requirements through design, development, and ongoing operation, with a team of 40 IT engineers. For clients in Japan, contracts and support are handled by our Japanese entity, NOOVADO JAPAN. As part of NOOVADO HOLDINGS, we work alongside sister companies in construction and manufacturing, so clients can combine software with hands-on engineering expertise.

## What we do

${grid([
  ["Web development", "Web applications for business operations and online services, designed for performance and scale."],
  ["Mobile apps", "Design, development, and maintenance of iOS and Android apps."],
  ["IT consulting", "We map the full system from the planning stage and recommend the technology and delivery plan that fit."],
  ["AI & data", "Data pipelines, analytics, and AI features built into business systems."],
  ["Blockchain", "Smart contracts and Web3 applications, from design to deployment."],
  ["Game development", "Games and interactive content."],
])}

**Technologies**　${tech}

## Group companies

NOOVADO HOLDINGS operates in Vietnam and Japan across IT, construction, and manufacturing. Each company focuses on its own field; together they deliver projects end to end.

${companies([
  { logo: logo("noovado", "NOOVADO"), name: "NOOVADO JSC (Vietnam)", scope: "Contract software development in web, mobile, AI, and blockchain. 40 IT engineers.", url: "https://www.noovado.com" },
  { logo: logo("noovacons", "NOOVACONS"), name: "NOOVACONS JSC (Vietnam)", tagline: "People and technology, shaping the future of construction.", scope: "Offshore engineering partner for architecture, civil, and MEP work, from design to construction. 30 engineers.", services: ["CAD drafting", "BIM/CIM/MEP", "Renderings & VR", "BIM/CAD software"], url: "https://www.noovacons.com" },
  { logo: logo("noovamech", "NOOVAMECH"), name: "NOOVAMECH JSC (Vietnam)", tagline: "People and technology, shaping the future of manufacturing.", scope: "Mechanical and electrical control design through to manufacturing, under one roof. 25 mechanical engineers.", services: ["Mechanical design", "Electrical & control design", "Manufacturing & assembly", "CAD customization"], url: "https://www.noovamech.com" },
  { logo: logo("noovasteel", "NOOVASTEEL"), name: "NOOVASTEEL JSC (Vietnam)", tagline: "Creating New Value in Steel Construction Through People and Technology", scope: "Steel structure drawings and fabrication management for construction projects in Japan.", services: ["Steel Drawings", "Steel Fabrication & Management", "System Development", "Engineer Training"], url: "https://www.noovasteel.com" },
  { logo: logo("noovado", "NOOVADO JAPAN"), name: "NOOVADO JAPAN LLC (Japan)", scope: "The group's Japanese entity: contracts and the first point of contact for clients in Japan.", url: "https://www.noovado.co.jp" },
])}

## Contact

For estimates and inquiries, email [contact@noovado.com](mailto:contact@noovado.com). Group overview: [noovado.co.jp/holdings](https://noovado.co.jp/holdings/).`;

writeFileSync(new URL("../profile/README.md", import.meta.url), `${ja}\n\n<br>\n\n${en}\n`);
console.log("ok");
