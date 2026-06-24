function applySpacing(text: string): string {

  const CJK = "[\\u4E00-\\u9FFF]";
  const LATIN = "[A-Za-z0-9]";

  return text

    // 中文 + 英文/数字
    .replace(
      new RegExp(`(${CJK})(${LATIN})`, "g"),
      "$1 $2"
    )

    // 英文/数字 + 中文
    .replace(
      new RegExp(`(${LATIN})(${CJK})`, "g"),
      "$1 $2"
    )

    // 多空格压缩
    .replace(/ {2,}/g, " ");
}

export function formatMarkdown(content: string): string {
  const lines = content.split("\n");

  let inCodeBlock = false;

  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trimStart();

    // fenced code block
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      result.push(line);
      continue;
    }

    if (inCodeBlock) {
      result.push(line);
      continue;
    }

    // task list
    const taskMatch = line.match(/^(\s*[-*+] \[[ xX]\] )(.+)$/);

    if (taskMatch) {
      const prefix = taskMatch[1];
      const text = taskMatch[2];

      result.push(prefix + processWikiLinks(text));
      continue;
    }

    result.push(processWikiLinks(line));
  }

  return result.join("\n");
}

/** Wiki link pattern: [[link]] or ![[image.png|500]] */
const WIKI_LINK_RE = /!?\[\[[^\]]*\]\]/g;

/**
 * Process a line by first protecting wiki links, then inline code,
 * and finally applying spacing to the remaining text.
 */
function processWikiLinks(line: string): string {
  const parts = line.split(WIKI_LINK_RE);

  // Collect matched wiki links in order
  const matches: string[] = [];
  let m: RegExpExecArray | null;
  WIKI_LINK_RE.lastIndex = 0;
  while ((m = WIKI_LINK_RE.exec(line)) !== null) {
    matches.push(m[0]);
  }

  // Interleave: parts[i] is text, matches[i] is the wiki link between them
  return parts
    .map((part, i) => {
      const processed = processInlineCode(part);
      return matches[i] ? processed + matches[i] : processed;
    })
    .join("");
}

function processInlineCode(line: string): string {
  const parts = line.split(/(`[^`]*`)/g);

  return parts
    .map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return part;
      }

      return applySpacing(part);
    })
    .join("");
}