## Start

```bash
npm run dev
```
or
```bash
npm run dev-live-server
```

## Apps

This project contains few apps checking different JS features.

### Main App (app.js): strict vs sloppy mode

App entry JS file: `src/apps/app.js`

This small project contains a plain JavaScript file (`app.js`) and an HTML page (`src/index.html`). The repository includes a few small example apps that demonstrate different module-loading patterns and how code can behave differently when run in strict mode (ES modules) vs sloppy/non-strict mode (classic scripts).

Why this matters

- Browsers treat regular scripts (`<script src="app.js"></script>`) as "sloppy" (non-strict) by default. If you load the same file as an ES module (`<script type="module" src="app.js"></script>`), the code runs in strict mode.
- Some language differences are visible in examples (for instance, using an undeclared variable will throw in strict mode). The examples in `src/apps/` are intentionally minimal so you can toggle loading modes and observe differences in the browser console.

How to switch modes in `src/index.html`

Open `src/index.html` and find the script tags near the end of the file. You will see two variants: the classic (sloppy) script tag and an alternative `type="module"` tag. Example:

Current (sloppy mode):

```html
<!-- *sloppy mode* / non strict mode & *async* loading strategy -->
<script async src="./apps/app.js"></script>
<!-- default *strict mode* & default *defer* loading strategy as it is *module* -->
<!-- <script type="module" src="./app.js"></script> -->
```

To run in strict mode, comment out the sloppy tag and uncomment the module tag. Example (after change):

```html
<!-- *sloppy mode* / non strict mode & *async* loading strategy -->
<!-- <script async src="./apps/app.js"></script> -->
<!-- default *strict mode* & default *defer* loading strategy as it is *module* -->
<script type="module" src="./app.js"></script>
```

To switch back to sloppy mode, reverse the change.

### App: aggregated modules object

This app presents a pattern where multiple module implementations are aggregated into a single object (a registry) and then consumed from a non-module or module context. It's useful to compare how the aggregator is constructed 

App entry JS file: `src/apps/shapes-aggregated-modules-object.js`

Important JS file: `src/modules/shapes-namespace-exports.js`

### App: namespace exports

This app presents namespace exports (the module namespace object) where multiple named exports are imported together

App entry JS file: `src/apps/app-namespace-exports.js`

Important JS file: `src/modules/shapes-namespace-exports.js`

### App: dynamic imports

This app uses dynamic `import()` to load modules at runtime. Dynamic imports always return a promise and are executed in module semantics. This example is good for seeing on-demand loading in different syntaxes, also using `await`

App entry JS file: `src/apps/app-dynamic-imports.js`

## Quick notes / tips

- Open the browser DevTools Console to observe the example output and any runtime errors (useful when comparing strict vs sloppy behavior)
- The example app files live in `src/apps/` and the supporting modules live in `src/modules/` (see `src/modules/shapes/` for individual shape implementations)
- If you want to run a single app directly, open `src/index.html`, adjust the script tag to load the desired app entry (the examples log to the console by default)
