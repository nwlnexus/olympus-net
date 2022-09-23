import { build } from "esbuild";

build({
  bundle: true,
  format: "esm",
  mainFields: ["browser", "module", "main"],
  platform: "neutral",
  target: "es2020",
  entryPoints: ["./src/index.ts"],
  outfile: "./dist/index.mjs",
  sourcemap: false,
  charset: "utf8",
  minify: process.env.NODE_ENV === "production"
}).catch(err => {
  console.error(err.stack);
  process.exitCode = 1;
});
