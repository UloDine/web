import { marked } from "marked";
import TurndownService from "turndown";

const turndown = new TurndownService();

marked.setOptions({ async: false });

export function useMarkdownConverter() {
  const mdToHtml = async (md: string) => marked(md);
  const htmlToMd = (html: string) => turndown.turndown(html);
  return { mdToHtml, htmlToMd };
}
