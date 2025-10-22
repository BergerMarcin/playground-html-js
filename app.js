const $ = (sel) => document.querySelector(sel);

const timeEl = $('#time');
const consoleEl = $('#console');
const showTimeBtn = $('#showTimeBtn');
const toggleColorBtn = $('#toggleColorBtn');

function log(msgHTML) {
  const now = new Date().toLocaleTimeString();
  consoleEl.innerHTML = `[${now}] ${msgHTML}`;
  console.log(msgHTML);
}

function getCurrentTimeString() {
  return new Date().toLocaleString();
}

function detectStrictMode() {
  try {
    return (function () {
      return this === undefined;
    })();
  } catch (err) {
    return false;
  }
}

function handleShowTime() {
  const s = getCurrentTimeString();
  timeEl.textContent = s;
  log('Displayed current time: ' + s);
}

function handleToggleColor() {
  document.body.classList.toggle('alt-bg');
  const isAlt = document.body.classList.contains('alt-bg');
  log('Toggled background color. alt-bg=' + isAlt);
}

// globalFunction of a small initialization function. You could also fetch data here.
function init() {
  showTimeBtn.addEventListener('click', handleShowTime);
  toggleColorBtn.addEventListener('click', handleToggleColor);

  // Add a little style change when toggled (kept in JS so you can see both files).
  const style = document.createElement('style');
  style.textContent = `
    body.alt-bg { background: linear-gradient(135deg, #f7fbff 0%, #eef7f2 100%); }
  `;
  document.head.appendChild(style);

  // Small demo: write an initial log after load
  const isStrictMode = detectStrictMode();
  const msgHTML = `app.js initialized in <u><b>${isStrictMode ? "strict mode" : 'sloppy mode'}</b></u>`;
  log(msgHTML);
  console.log(msgHTML);
  console.log('this of init', this);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
  console.log('this of main scope during loading', this);
} else {
  init();
  console.log('this of main scope after loading', this);
}

// // Optional: export something (useful when importing this module elsewhere)
// export { getCurrentTimeString };

/*
Optional: globalFunction fetch pattern (commented out). If you want to fetch JSON, do it like this:

async function fetchData() {
  try {
    const res = await fetch('https://api.globalFunction.com/data');
    const json = await res.json();
    log('Fetched data: ' + JSON.stringify(json));
  } catch (err) {
    log('Fetch failed: ' + err.message);
  }
}

fetchData();
*/

/* ------------------ CHAIN CALLS ------------------ */

const ladder = {
  step: 0,
  up() {
    this.step++;
    return this;
  },
  down() {
    this.step--;
    return this;
  },
  showStep() {
    console.log('step:', this.step);
    return this;
  },
};

ladder.up().up().down().showStep().down().showStep();

/* ------------------ CHECKING scopes ------------------ */

// function test() {
//   var testLocalVar = 'I am local';
// }
// test();
// console.log(testLocalVar); // ❌ ReferenceError

/* ------------------ CHECKING scopes. Advanced ------------------ */

console.log('*************** Checking scopes. Advanced. START ***************');
var globalVarWithVar;
let globalVarWithLet = "I'm variable of global with let";

globalFunction(); // ✅ accessible due to hosting

function globalFunction() {
  console.log('------- globalFunction start -------');

  var functionVarWithVar =
    "I'm variable of function with var (I was thinking I'm global but I'm local due to being in scope of globalFunction function)";
  let functionVarWithLet = "I'm variable of function with let";
  functionVarWithoutDeclarationOperator = "I'm variable of function without declaration operator"; // in 'strict mode' ❌ ReferenceError & stop running code

  nestedInGlobalFunction(); // ✅ accessible due to hosting in function scope of `globalFunction` function

  function nestedInGlobalFunction() {
    console.log("I'm nested function");
  }

  {
    var functionBlockScopeVarWithVar = "I'm variable of function -> block scope with var";
    let functionBlockScopeVarWithLet = "I'm variable of function -> block scope with let";

    console.log('function -> block scope. functionBlockScopeVarWithVar:', functionBlockScopeVarWithVar); // ✅ accessible
    console.log('function -> block scope. functionBlockScopeVarWithLet:', functionBlockScopeVarWithLet); // ✅ accessible
  }

  console.log('globalFunction function. globalVarWithVar:', globalVarWithVar); // ✅ accessible (but undefined ☹️)
  console.log('globalFunction function. globalVarWithLet:', globalVarWithLet); // ✅ accessible

  console.log('globalFunction function. functionVarWithVar:', functionVarWithVar); // ✅ accessible
  console.log('globalFunction function. functionVarWithLet:', functionVarWithLet); // ✅ accessible
  console.log('globalFunction function. functionVarWithoutDeclarationOperator:', functionVarWithoutDeclarationOperator); // ❌ in 'strict mode' code stopped before, ✅ accessible in 'sloppy mode'

  console.log('function -> block scope. functionBlockScopeVarWithVar:', functionBlockScopeVarWithVar); // ✅ accessible
  // console.log("function -> block scope. functionBlockScopeVarWithLet:", functionBlockScopeVarWithLet); // ❌ ReferenceError

  console.log('------- globalFunction end -------');
}

// block scope (ES6+) in currly brackets
{
  var blockScopeVarWithVar = "I'm variable of block scope with var";
  let blockScopeVarWithLet = "I'm variable of block scope with let";

  blockFunction(); // ✅ accessible due to hosting in block scope

  console.log('block scope. blockScopeVarWithVar:', blockScopeVarWithVar); // ✅ accessible
  console.log('block scope. blockScopeVarWithLet:', blockScopeVarWithLet); // ✅ accessible

  function blockFunction() {
    console.log('------- blockFunction start & end -------');
  }
}

console.log('global scope. globalVarWithVar:', globalVarWithVar); // ✅ accessible (but undefined ☹️)
globalVarWithVar = "I'm variable of global with var";
console.log('global scope. globalVarWithVar:', globalVarWithVar); // ✅ accessible (with value 🙂)
console.log('global scope. globalVarWithLet:', globalVarWithLet); // ✅ accessible

blockFunction(); // ❌ in 'strict mode' code stopped before, ✅ accessible in 'sloppy mode'
console.log('global scope. blockScopeVarWithVar:', blockScopeVarWithVar); // ✅ accessible
// console.log("global scope. blockScopeVarWithLet:", blockScopeVarWithLet); // ❌ ReferenceError

console.log('global scope. functionVarWithoutDeclarationOperator:', functionVarWithoutDeclarationOperator); // ❌ in 'strict mode' code stopped before, ✅ accessible in 'sloppy mode'
// console.log("global scope. functionVarWithVar:", functionVarWithVar);  // ❌ ReferenceError
// console.log("global scope. functionVarWithLet:", functionVarWithLet);  // ❌ ReferenceError

// nestedInGlobalFunction(); // ❌ ReferenceError

// console.log('global scope. functionBlockScopeVarWithVar:', functionBlockScopeVarWithVar); // ❌ ReferenceError
// console.log("global scope. functionBlockScopeVarWithLet:", functionBlockScopeVarWithLet); // ❌ ReferenceError

console.log('*************** Checking scopes. Advanced. END ***************');

/* ------------------ CLOSURE ------------------ */

// const closureGenerator_Outer = function(count) {
//     return function increment_Closure_Inner() {
//         globalCount++;
//         count++;
//         return [globalCount, count];
//     }
// };

// let globalCount = 100;

// globalCount++;

// const incrementFn = closureGenerator_Outer(1);
// console.log(incrementFn());
// globalCount++;
// console.log(incrementFn());
// console.log(globalCount);

// const incrementFn2 = closureGenerator_Outer(10);
// console.log(incrementFn2());
// globalCount++;
// console.log(incrementFn2());
// console.log(globalCount);

/* ------------------ CLOSURE with complex variables ------------------ */

// let a = 1;
// let b = 2;

// function outer() {
//   b = 102;
//   let c = 3;

//   function inner() {
//     b++;
//     c++;
//     let d = 4;
//     console.log([a, b, c, d]);
//   }

//   return inner;
// }

// const fn = outer(); // outer() returns inner
// a = 11;
// b = 112;
// fn(); // executes inner()
// fn();

/* ------------------------------------ */
