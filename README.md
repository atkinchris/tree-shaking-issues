# Tree Shaking Issues

This repo is for demonstrating tree shaking issues when using certain language features or libraries. It contains a basic application that imports a single named import, and is bundled with a minimal Webpack configuration.

## What is wrong?

In `src/index.js`, a single named export is imported from a package using ES Modules. However, in `dist/bundle.js`, all other named exports are bundled too. All are correctly marked as `unused harmony export`, but are not removed by `terser`, when minification is enabled.
