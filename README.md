# Running app.js: strict vs sloppy mode

This small project ships a plain JavaScript file (`app.js`) and an HTML page (`index.html`).

Browsers treat regular scripts (`<script src="app.js"></script>`) as "sloppy" (non-strict) by default. If you load the same file as an ES module (`<script type="module" src="app.js"></script>`), the code runs in strict mode.

Why this matters
- Some code behaves differently in strict mode (for example, using an undeclared variable will throw a ReferenceError). The repository includes logic and examples that demonstrate strict vs sloppy behavior.

How to switch modes in `index.html`

Open `index.html` and find these two script tags near the end of the file:

Current (sloppy mode):

```html
  <!-- sloppy mode / non strict mode -->
  <script src="app.js"></script>

  <!-- strict mode as it is module -->
  <!-- <script type="module" src="app.js"></script> -->
```

To run in strict mode, comment out the sloppy tag and uncomment the module tag. Example (after change):

```html
  <!-- sloppy mode / non strict mode -->
  <!-- <script src="app.js"></script> -->

  <!-- strict mode as it is module -->
  <script type="module" src="app.js"></script>
```

To switch back to sloppy mode, reverse the change.

Tip: If you prefer toggling quickly during development, use your editor's block-comment shortcuts or git branches to switch between the two variants.
