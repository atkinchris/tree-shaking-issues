# Tree Shaking Issues

This repo is for demonstrating tree shaking issues when using certain language features or libraries. It contains a basic application that imports a single named import, and is bundled with a minimal Webpack configuration.

## What is wrong?

In `src/index.js`, a single named export is imported from a package using ES Modules. However, in `dist/bundle.js`, all other named exports are bundled too. All are correctly marked as `unused harmony export`, but are not removed by `terser`, when minification is enabled.

## What fixed it?

1. Annotating `iconHandler` as `/*#__PURE__*/`, for the non-imported icons that should be excluded.
1. Removing the statically assigned `propTypes`.

When both these things were done, the bundle was correctly tree shaken, and the unused exports were removed.

I tried marking the imported package as side effect free, but putting `"sideEffects": false` in it's `package.json`. This did not work on it's own, nor had any apparent effect on other changes.
