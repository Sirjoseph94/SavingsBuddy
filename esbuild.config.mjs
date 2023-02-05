// const { join } = require("path");

// module.exports = {
//   entry: join(__dirname, "src/index.ts"),
//   outfile: join(__dirname, "dist/index.mjs"),
//   format: "esm",
//   target: "node18",
//   bundle: true,
//   minify: true,
//   tsconfig: join(__dirname, "tsconfig.json"),
// };

import * as esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: true,
  format: "esm",
  platform: 'node',
  loader: { ".ts": "ts" },
  tsconfig: './tsconfig.json',
  target: ['node18'],
  outfile: 'build/index.mjs',
}).then(() => console.log("⚡ Done"))
  .catch(() => process.exit(1));
