import fetch from "cross-fetch";
import { JSDOM } from "jsdom";
import { Entries, Entry } from "./types";

export function asRuleset(entries: Entry[]): string {
  return entries
    .map((entry) => `*://www.youtube.com${entry.pathname}`)
    .join("\n");
}

export function asMarkdown(entries: Entry[]): string {
  let buf = "";

  for (const entry of entries) {
    buf += `#### ${entry.name} (\`${entry.pathname}\`)\n\n`;
    for (const reason of entry.reasons) {
      const source = (
        Array.isArray(reason.source) ? reason.source : [reason.source]
      )
        .map((s, i) => `[[${i + 1}]](${s})`)
        .join(" ");
      buf += `- ${reason.description} ${source}\n`;
    }
    buf += "\n";
  }

  return buf;
}

export function prettyPrint(entries: Entry[]): void {
  console.log(asMarkdown(entries));
}

async function grabTitlesFromEntry(entry: Entry) {
  const res = await fetch(`https://www.youtube.com${entry.pathname}`);
  const body = await res.text();
  const document = new JSDOM(body).window.document;
  const title = document.querySelector("title")?.textContent ?? "";
  return title.replace(/ - YouTube$/, "");
}

export async function completeNameField(entries: Entries) {
  return await Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      name: await grabTitlesFromEntry(entry),
    }))
  );
}
