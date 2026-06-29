import type { LegalBlock } from "../components/legal/LegalBlocks";

export type LegalDocumentMeta = {
  file: string;
  title: string;
  subtitle?: string;
};

export function parseLegalText(text: string): LegalBlock[] {
  const blocks: LegalBlock[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let listItems: string[] = [];
  let paragraphLines: string[] = [];
  let inBulletSection = false;

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
    paragraphLines = [];
  };

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push({ type: "list", items: listItems });
    listItems = [];
    inBulletSection = false;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushParagraph();
      inBulletSection = false;
      continue;
    }

    if (trimmed === "⸻") {
      flushList();
      flushParagraph();
      inBulletSection = false;
      blocks.push({ type: "divider" });
      continue;
    }

    if (trimmed === "●") {
      flushParagraph();
      inBulletSection = true;
      continue;
    }

    if (trimmed.startsWith("●")) {
      flushParagraph();
      inBulletSection = true;
      const item = trimmed.replace(/^●\s*/, "");
      if (item) listItems.push(item);
      continue;
    }

    if (/^Article \d+/i.test(trimmed)) {
      flushList();
      flushParagraph();
      inBulletSection = false;
      blocks.push({ type: "heading", text: trimmed });
      continue;
    }

    if (/^Données /.test(trimmed)) {
      flushList();
      flushParagraph();
      inBulletSection = false;
      blocks.push({ type: "subheading", text: trimmed });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      flushParagraph();
      inBulletSection = false;
      blocks.push({ type: "subheading", text: trimmed });
      continue;
    }

    if (inBulletSection) {
      listItems.push(trimmed);
      continue;
    }

    flushList();
    paragraphLines.push(trimmed);
  }

  flushList();
  flushParagraph();
  return blocks;
}
