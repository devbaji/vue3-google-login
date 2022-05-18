import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/plugin/index.ts",
    output: [
      {
        format: "esm",
        file: "dist/index.esm.js",
        plugins: [terser()],
      },
      {
        format: "cjs",
        file: "dist/index.js",
        plugins: [terser()],
      },
    ],
    plugins: [
      vue(),
      peerDepsExternal(),
      typescript({
        check: false,
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            sourceMap: true,
            declarationMap: true,
          },
        },
      }),
      postcss(),
      del({ targets: "dist/*" }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      del({
        hook: "buildEnd",
        targets: ["./dist/**/*.d.ts", "./dist/**/*.d.ts.map"],
        ignore: ["./dist/index.d.ts", "./dist/index.d.ts.map"],
      }),
    ],
  },
];
