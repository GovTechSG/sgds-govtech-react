import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";

// import jsx from "acorn-jsx";
const extensions = [".js", ".jsx", ".ts", ".tsx"];

const pkg = require("./package.json");

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "esm",
            sourcemap: true
        }
    ],
    // acornInjectPlugins: [jsx()],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true }),
        babel({
            extensions,
            babelHelpers: "bundled",
            include: ["src/**/*"]
        })
    ]
};
