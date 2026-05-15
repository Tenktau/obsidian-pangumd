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

      result.push(prefix + processInlineCode(text));
      continue;
    }

    result.push(processInlineCode(line));
  }

  return result.join("\n");
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