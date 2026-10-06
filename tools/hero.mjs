// Generates the profile banners: an engineering-drawing sheet (frame, grid, dimension line, title block),
// in Japanese and English, light and dark. Run: node tools/hero.mjs  (writes profile/assets/*.svg)
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const logoSvg = readFileSync(new URL("./logo-noovado-orig.svg", import.meta.url), "utf8");
const logoPng = logoSvg.match(/xlink:href="(data:image\/png;base64,[^"]+)"/)[1];

const W = 1280, H = 420;
const FONT = "'Segoe UI','Hiragino Sans','Hiragino Kaku Gothic ProN','Noto Sans JP','Yu Gothic',Meiryo,sans-serif";

const theme = {
  light: { paper: "#FFFFFF", grid: "#EDF1F6", frame: "#0F2747", ink: "#0F2747", sub: "#4A5B72", line: "#9AA8BA", accent: "#F26B3A", plate: "none" },
  dark: { paper: "#0F2747", grid: "#173459", frame: "#C9D6E6", ink: "#FFFFFF", sub: "#B7C6D9", line: "#5F7899", accent: "#FF8A5B", plate: "#FFFFFF" },
};

const copy = {
  ja: {
    name: "株式会社Noovado",
    tagline: "デジタル変革を通じて社会の進歩を創造する",
    dim: "Web・アプリ・AI・ブロックチェーン開発",
    block: "NOOVADO HOLDINGS グループ",
    rows: [["株式会社Noovado", "ソフトウェア開発"], ["株式会社Noovacons", "建築・土木・設備"], ["株式会社Noovamech", "機械・電気制御"], ["株式会社Noovasteel", "鉄骨構造"], ["合同会社Noovado Japan", "日本窓口"]],
    foot: "ベトナム・日本",
  },
  en: {
    name: "NOOVADO JSC",
    tagline: "Creating societal progress through digital transformation",
    dim: "Web, mobile, AI and blockchain development",
    block: "NOOVADO HOLDINGS group",
    rows: [["NOOVADO JSC", "Software"], ["NOOVACONS JSC", "Construction & BIM"], ["NOOVAMECH JSC", "Machinery"], ["NOOVASTEEL JSC", "Steel structures"], ["NOOVADO JAPAN LLC", "Japan office"]],
    foot: "Vietnam & Japan",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function hero(lang, mode) {
  const t = theme[mode], c = copy[lang];
  const grid = [];
  for (let x = 40; x < W; x += 40) grid.push(`<line x1="${x}" y1="24" x2="${x}" y2="${H - 24}"/>`);
  for (let y = 40; y < H; y += 40) grid.push(`<line x1="24" y1="${y}" x2="${W - 24}" y2="${y}"/>`);

  // Title block (表題欄) on the right: header row + one row per company.
  const bx = 812, by = 132, bw = 420, rh = 36;
  const rowLines = c.rows.map((_, i) => `<line x1="${bx}" y1="${by + rh * (i + 1)}" x2="${bx + bw}" y2="${by + rh * (i + 1)}"/>`).join("");
  const rows = c.rows.map(([n, f], i) => {
    const y = by + rh * (i + 1);
    return `<text x="${bx + 16}" y="${y + 24}" fill="${t.ink}" font-size="15" font-weight="600">${esc(n)}</text>` +
      `<text x="${bx + bw - 16}" y="${y + 24}" fill="${t.sub}" font-size="14" text-anchor="end">${esc(f)}</text>`;
  }).join("");

  // Dimension line under the name: arrows at both ends, label in the middle.
  const dx1 = 72, dx2 = 720, dy = 300;
  const arrow = (x, dir) => `<path d="M${x} ${dy} l${8 * dir} -5 v10 z" fill="${t.accent}"/>`;

  const plate = t.plate === "none" ? "" : `<rect x="64" y="64" width="292" height="104" rx="10" fill="${t.plate}"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="${FONT}" role="img" aria-label="${esc(c.name)}: ${esc(c.tagline)}">
<rect width="${W}" height="${H}" fill="${t.paper}"/>
<g stroke="${t.grid}" stroke-width="1">${grid.join("")}</g>
<rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="${t.frame}" stroke-width="2"/>
<rect x="32" y="32" width="${W - 64}" height="${H - 64}" fill="none" stroke="${t.frame}" stroke-width="0.75" opacity="0.6"/>
<g stroke="${t.frame}" stroke-width="2">
  <path d="M${W / 2} 24 v10 M${W / 2} ${H - 24} v-10 M24 ${H / 2} h10 M${W - 24} ${H / 2} h-10"/>
</g>
${plate}
<image x="72" y="72" width="276" height="88" href="${logoPng}" xlink:href="${logoPng}" preserveAspectRatio="xMinYMid meet"/>
<text x="72" y="236" fill="${t.ink}" font-size="${lang === "ja" ? 50 : 54}" font-weight="700" letter-spacing="${lang === "ja" ? 1 : 0.5}">${esc(c.name)}</text>
<text x="72" y="272" fill="${t.sub}" font-size="21">${esc(c.tagline)}</text>
<g stroke="${t.line}" stroke-width="1">
  <line x1="${dx1}" y1="${dy - 14}" x2="${dx1}" y2="${dy + 14}"/><line x1="${dx2}" y1="${dy - 14}" x2="${dx2}" y2="${dy + 14}"/>
  <line x1="${dx1}" y1="${dy}" x2="${dx2}" y2="${dy}"/>
</g>
${arrow(dx1, 1)}${arrow(dx2, -1)}
<rect x="${(dx1 + dx2) / 2 - 200}" y="${dy + 10}" width="400" height="30" fill="${t.paper}"/>
<text x="${(dx1 + dx2) / 2}" y="${dy + 31}" fill="${t.ink}" font-size="16" text-anchor="middle">${esc(c.dim)}</text>
<g stroke="${t.frame}" stroke-width="1.25" fill="none">
  <rect x="${bx}" y="${by}" width="${bw}" height="${rh * 6}"/>
  <line x1="${bx + 246}" y1="${by + rh}" x2="${bx + 246}" y2="${by + rh * 6}"/>
  ${rowLines}
</g>
${rows}
<rect x="${bx}" y="${by}" width="${bw}" height="${rh}" fill="${t.frame}"/>
<text x="${bx + 16}" y="${by + 24}" fill="${t.paper}" font-size="15" font-weight="700">${esc(c.block)}</text>
<text x="${bx + bw - 16}" y="${by + 24}" fill="${t.paper}" font-size="14" text-anchor="end">${esc(c.foot)}</text>
</svg>
`;
}

mkdirSync(new URL("../profile/assets/", import.meta.url), { recursive: true });
for (const lang of ["ja", "en"]) for (const mode of ["light", "dark"])
  writeFileSync(new URL(`../profile/assets/hero-${lang}-${mode}.svg`, import.meta.url), hero(lang, mode));
console.log("ok");
