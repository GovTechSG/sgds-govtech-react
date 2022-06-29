const prettier = require("prettier/standalone");
const plugins = [require("prettier/parser-babylon")];

export function formatCode(code) {
  return prettier.format(code, { parser: "babel", plugins });
}
