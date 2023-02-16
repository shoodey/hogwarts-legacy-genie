import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/**/*.ts", "!src/**/*.d.ts"],
  outDir: "build",
  format: ["esm"],
  minify: true,
  skipNodeModulesBundle: true,
  sourcemap: false,
  target: "esnext",
  tsconfig: "tsconfig.json",
  bundle: false,
  shims: false,
  keepNames: true,
  splitting: false,
});
