// Builds profile/README.md: a Japanese part, then an English part, each opening with its drawing-sheet banner.
// Run: node tools/build-readme.mjs
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

${hero("ja", "株式会社Noovado — デジタル変革を通じて社会の進歩を創造する")}

<p align="right"><b>日本語</b>　|　<a href="#english">English</a></p>

## 会社概要

株式会社Noovado は、ベトナムのソフトウェア開発会社です。Web・アプリ・AI・ブロックチェーン分野の開発を、企画から運用までワンストップで提供しています。NOOVADO HOLDINGS グループの一員として、建設・ものづくり分野のグループ会社と共に、日本とベトナムのお客様を支えています。

## 事業内容

${grid([
  ["Web開発", "パフォーマンスとスケーラビリティに優れたWebアプリケーション"],
  ["モバイル開発", "iOS・Androidアプリの開発"],
  ["ITコンサルティング", "企画フェーズからシステムの全体像の可視化まで"],
  ["AI・データサイエンス", "業務に活かすデータ分析とAI機能"],
  ["ブロックチェーン", "スマートコントラクトとWeb3アプリケーション"],
  ["ゲーム開発", "ゲーム・インタラクティブアプリケーション"],
])}

**対応技術**　${tech}

## グループ会社

NOOVADO HOLDINGS は、日本とベトナムを拠点とするグループです。各社がそれぞれの専門分野を担っています。

${companies([
  { logo: logo("noovado", "NOOVADO"), name: "株式会社Noovado（ベトナム）", scope: "Web・アプリ・AI・ブロックチェーン分野における開発をワンストップで提供（ITエンジニア40名）", url: "https://www.noovado.com" },
  { logo: logo("noovacons", "NOOVACONS"), name: "株式会社Noovacons（ベトナム）", tagline: "人と技術の力で、建設業界に新たな未来を。", scope: "建築・土木・設備分野の設計から施工までを支えるオフショアパートナー（エンジニア30名）", services: ["CAD図面作成", "BIM/CIM/MEP", "シミュレーションと可視化", "ソフトウェア開発"], url: "https://www.noovacons.com" },
  { logo: logo("noovamech", "NOOVAMECH"), name: "株式会社Noovamech（ベトナム）", tagline: "人と技術の力で、ものづくりに新たな未来を", scope: "機械・治具・電気制御設計・製作をワンストップで提供（機械エンジニア25名）", services: ["機械設計", "電気設計", "製作", "ソフトウェア開発"], url: "https://www.noovamech.com" },
  { logo: logo("noovasteel", "NOOVASTEEL"), name: "株式会社Noovasteel（ベトナム）", tagline: "人と技術の力で、鉄骨づくりに新たな価値を", scope: "鉄骨構造の図面作成から製作管理まで、日本の鉄骨工事を支えるパートナー", services: ["鉄骨図面作成", "鉄骨製作・管理", "システム開発", "人材育成"], url: "https://www.noovasteel.com" },
  { name: "合同会社Noovado Japan（日本）", scope: "日本のお客様との契約および窓口機能を担っています", url: "https://www.noovado.co.jp" },
])}

## お問い合わせ

ご相談・お見積りは [contact@noovado.com](mailto:contact@noovado.com) までご連絡ください。グループの概要は [noovado.co.jp/holdings](https://noovado.co.jp/holdings/) をご覧ください。`;

const en = `<a id="english"></a>

${hero("en", "NOOVADO JSC — Creating societal progress through digital transformation")}

<p align="right"><a href="#日本語">日本語</a>　|　<b>English</b></p>

## About us

NOOVADO JSC is a software development company in Vietnam. We deliver web, mobile, AI and blockchain development as a one-stop service, from planning to operation. As part of the NOOVADO HOLDINGS group, we work alongside our sister companies in construction and manufacturing to support customers in Japan, Vietnam and abroad.

## What we do

${grid([
  ["Web development", "Responsive web applications built for performance and scalability"],
  ["Mobile development", "Apps for iOS and Android"],
  ["IT consulting", "From the planning phase to a clear picture of the whole system"],
  ["AI & data science", "Data analysis and AI features for business"],
  ["Blockchain", "Smart contracts and Web3 applications"],
  ["Game development", "Games and interactive applications"],
])}

**Technologies**　${tech}

## Group companies

NOOVADO HOLDINGS is a group based in Japan and Vietnam. Each company covers its own field.

${companies([
  { logo: logo("noovado", "NOOVADO"), name: "NOOVADO JSC (Vietnam)", scope: "One-stop development of web, mobile apps, AI and blockchain (40 IT engineers)", url: "https://www.noovado.com" },
  { logo: logo("noovacons", "NOOVACONS"), name: "NOOVACONS JSC (Vietnam)", tagline: "People and technology building a new future for the construction industry", scope: "Offshore partner for architecture, civil engineering and building services, from design to construction (30 engineers)", services: ["CAD drafting", "BIM/CIM/MEP", "Simulation and visualisation", "Software development"], url: "https://www.noovacons.com" },
  { logo: logo("noovamech", "NOOVAMECH"), name: "NOOVAMECH JSC (Vietnam)", tagline: "People and technology building a new future for manufacturing", scope: "One-stop design and manufacturing of machines, jigs and electrical control (25 mechanical engineers)", services: ["Mechanical design", "Electrical design", "Manufacturing", "Software development"], url: "https://www.noovamech.com" },
  { logo: logo("noovasteel", "NOOVASTEEL"), name: "NOOVASTEEL JSC (Vietnam)", tagline: "People and technology creating new value in steel construction", scope: "Partner for Japanese steel construction, from steel structure drawings to fabrication management", services: ["Steel structure drawings", "Fabrication management", "System development", "Engineer training"], url: "https://www.noovasteel.com" },
  { name: "NOOVADO JAPAN LLC (Japan)", scope: "Contracts and the point of contact for customers in Japan", url: "https://www.noovado.co.jp" },
])}

## Contact

For projects and estimates, write to [contact@noovado.com](mailto:contact@noovado.com). Group overview: [noovado.co.jp/holdings](https://noovado.co.jp/holdings/).`;

writeFileSync(new URL("../profile/README.md", import.meta.url), `${ja}\n\n<br>\n\n${en}\n`);
console.log("ok");
