const areaOutputEl = document.getElementById('area-output');
const squareBtn = document.getElementById('square-btn');
const circleBtn = document.getElementById('circle-btn');
const triangleBtn = document.getElementById('triangle-btn');

function log(msgHTML) {
  const now = new Date().toLocaleTimeString();
  areaOutputEl.innerHTML = `<b>Area:</b> ${msgHTML} [${now}]`;
  console.log(msgHTML);
}

function formatNumber(n) {
  if (typeof n !== 'number' || Number.isNaN(n)) return String(n);
  const rounded = Math.round(n * 100) / 100;
  return rounded
    .toFixed(2)
    .replace(/\.0+$|(?<=\.[0-9])0+$/g, '')
    .replace(/\.$/, '');
}

// Promise (classic) dynamic import of the shapes module
squareBtn?.addEventListener('click', async () => {
  import('../modules/shapes-namespace-exports.js').then((shapesModule) => {
    const area = shapesModule.square.calculate(5);
    log(`<b>${formatNumber(area)}</b> (square area with side 5)`);
  });
});

// Await dynamic import of the shapes module
circleBtn?.addEventListener('click', async () => {
  const shapesModule = await import('../modules/shapes-namespace-exports.js');
  const area = shapesModule.circle.calculate(6);
  log(`<b>${formatNumber(area)}</b> (circle area with radius 6)`);
});

// Await dynamic import of the shapes module with destruction and renaming function
triangleBtn?.addEventListener('click', async () => {
  const {
    triangle: { calculate: calcTriangle },
  } = await import('../modules/shapes-namespace-exports.js');
  const area = calcTriangle(7, 8);
  log(`<b>${formatNumber(area)}</b> (triangle area with base 7 and height 8)`);
});
