import fs from "fs";
import yaml from "js-yaml";
import path from "path";
import { Entries } from "./types";
import { asMarkdown, asRuleset } from "./utils";

const SOURCE_FILENAME = path.join(__dirname, "..", "entries.yml");
const UBL_FILENAME = path.join(__dirname, "..", "subscription.txt");
const MD_FILENAME = path.join(__dirname, "..", "docs", "index.md");

async function main() {
  let entries = yaml.load(fs.readFileSync(SOURCE_FILENAME, "utf8")) as Entries;

  // entries = await completeNameField(entries);
  // fs.writeFileSync(
  //   SOURCE_FILENAME,
  //   yaml.dump(entries, {
  //     lineWidth: 150,
  //   })
  // );
  // console.log("Written to", SOURCE_FILENAME);

  const md = asMarkdown(entries);
  fs.writeFileSync(MD_FILENAME, md);
  console.log("Written to", MD_FILENAME);

  const ruleset = asRuleset(entries);

  fs.writeFileSync(UBL_FILENAME, ruleset);
  console.log("Written to", UBL_FILENAME);
}

main().catch((err) => {
  console.log(err);
});
