import vue from "rollup-plugin-vue";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import del from "rollup-plugin-delete";
import dts from "rollup-plugin-dts";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

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
        file: "dist/index.cjs.js",
        plugins: [terser()],
      },
      {
        format: "umd",
        file: "dist/index.umd.js",
        name: "Vue3GoogleLogin",
        globals: {
          vue: 'Vue'
        },
        plugins: [terser()],
      },
    ],
    external: ['vue'],
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
      resolve(),
      commonjs(),
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