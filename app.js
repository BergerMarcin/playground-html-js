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
  console.log(
    '%c🚀🚀🚀 App.js start init 🚀🚀🚀',
    'background: #1dd1e9ff; color: #000; font-size: 20px; padding: 2px 8px; border-radius: 4px;'
  );
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
  const msgHTML = `app.js initialized in <u><b>${isStrictMode ? 'strict mode' : 'sloppy mode'}</b></u>`;
  log(msgHTML);
  console.log(msgHTML);
  console.log('this of init', this);
}

const appConsoleStyle = 'background: #08701bff; color: #fff; padding: 2px 8px; border-radius: 4px;';
console.log(
  '%c*************** app.js General playground & check chain calls, scopes, closures ***************',
  appConsoleStyle
);

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

/* ------------------ vanila JS playground ------------------ */

const headerConsoleStyle = 'background: #c62828; color: #fff; padding: 2px 8px; border-radius: 4px;';
const brakeConsoleStyle = 'background: #d4ba26ff; color: #000; padding: 2px 8px; border-radius: 4px;';

/* ------------------ this & globalThis ------------------ */

console.log('%c*************** this & globalThis ***************', headerConsoleStyle);

console.log('Global scope. this:', this);
console.log('Global scope. globalThis:', globalThis);

/* ------------------ `this` in calls of "free" regular function ------------------ */

console.log('%c*************** `this` in calls of "free" regular function ***************', headerConsoleStyle);

function logFirstName() {
  console.log(this?.firstName);
}

const firstPerson = {
  firstName: 'Deepak',
  logFirstName,
};

const secondPerson = {
  firstName: 'Vishnu',
  logFirstName,
};

logFirstName(); // undefined always in strict mode, globalThis.firstName in sloppy mode (here also undefined)
var firstName = 'Vijay';
logFirstName(); // "Vijay" in sloppy mode, undefined in strict mode
firstPerson.logFirstName(); // "Deepak"
secondPerson.logFirstName(); // "Vishnu"
logFirstName.call({ firstName: 'Ajay' }); // "Ajay"
logFirstName.apply(firstPerson); // "Deepak"
logFirstName.bind(secondPerson)(); // "Vishnu"

/* ------------------ `this` in calls of object`s method as regular function ------------------ */

console.log(
  '%c*************** `this` in calls of object`s method as regular function ***************',
  headerConsoleStyle
);

const objectPerson = {
  objectFirstName: 'Ram',
  objectLogFirstName() {
    // the same as: `objectLogFirstName: function () {`
    console.log(this?.objectFirstName);
  },
};

const objectFirstPerson = {
  objectFirstName: 'Deepak',
};

const objectSecondPerson = {
  objectFirstName: 'Vishnu',
};

const freeObjectLogFirstName = objectPerson.objectLogFirstName; // `this` of object was lost here
freeObjectLogFirstName(); // `undefined` (as in sloppy mode as no `objectFirstName` in global scope; as in strict mode global `this` is `undefined`)
var objectFirstName = 'Vijay';
freeObjectLogFirstName(); // "Vijay" in sloppy mode (as `this` is taking from the nearest scope which is global scope); undefined in strict mode

objectPerson.objectLogFirstName(); // "Ram"
objectFirstName = 'Another Vijay';
objectPerson.objectLogFirstName(); // "Ram"
objectPerson.objectLogFirstName.call(this); // "Another Vijay" in sloppy mode, undefined in strict mode
objectPerson.objectLogFirstName.call({ objectFirstName: 'Ajay' }); // "Ajay"
objectPerson.objectLogFirstName.apply(objectFirstPerson); // "Deepak"
objectPerson.objectLogFirstName.bind(objectSecondPerson)(); // "Vishnu"

objectFirstPerson.objectLogFirstName = objectPerson.objectLogFirstName;
objectFirstPerson.objectLogFirstName(); // "Deepak"

/* ------------------ `this` in calls of object`s method as arrow function ------------------ */

console.log(
  '%c*************** `this` in calls of object`s method as arrow function ***************',
  headerConsoleStyle
);

const objectPersonArrow = {
  objectFirstNameArrow: 'RamArrow',
  objectLogFirstNameArrow: () => {
    // arrow function does not have its own `this`, it takes `this` from the surrounding/nearest LEXICAL context
    console.log(this?.objectFirstNameArrow);
  },
};

const objectFirstPersonArrow = {
  objectFirstNameArrow: 'DeepakArrow',
};

const objectSecondPersonArrow = {
  objectFirstNameArrow: 'VishnuArrow',
};

objectPersonArrow.objectLogFirstNameArrow(); // `undefined` in strict mode; "VijayArrow" in sloppy mode (as `this` is taking from the surrounding/nearest LEXICAL scope which is global scope)

const freeObjectLogFirstNameArrow = objectPersonArrow.objectLogFirstNameArrow; // `this` of object was lost here as arrow function is using outside lexical scope from definition place and object has not literally `this`
freeObjectLogFirstNameArrow(); // `undefined` (as in sloppy mode as no `objectFirstNameArrow` in global scope; as in strict mode global `this` is `undefined`)
var objectFirstNameArrow = 'VijayArrow';
freeObjectLogFirstNameArrow(); // "VijayArrow" in sloppy mode (as `this` is taking from the surrounding/nearest LEXICAL scope which is global scope); `undefined` in strict mode (as global `this` is `undefined`)

objectPersonArrow.objectLogFirstNameArrow(); // "VijayArrow" in sloppy mode; `undefined` in strict mode (as global `this` is `undefined`)
objectFirstNameArrow = 'Another VijayArrow';
objectPersonArrow.objectLogFirstNameArrow(); // "Another VijayArrow" in sloppy mode (as `this` is taking from the surrounding/nearest LEXICAL scope which is global scope); `undefined` in strict mode (as global `this` is `undefined`)
objectPersonArrow.objectLogFirstNameArrow.call(this); // "Another VijayArrow" in sloppy mode; `undefined` in strict mode
objectPersonArrow.objectLogFirstNameArrow.call({ objectFirstNameArrow: 'AjayArrow' }); // "Another VijayArrow" in sloppy mode; `undefined` in strict mode
objectPersonArrow.objectLogFirstNameArrow.apply(objectFirstPersonArrow); // "Another VijayArrow" in sloppy mode; `undefined` in strict mode
objectPersonArrow.objectLogFirstNameArrow.bind(objectSecondPersonArrow)(); // "Another VijayArrow" in sloppy mode; `undefined` in strict mode

objectFirstPersonArrow.objectLogFirstNameArrow = objectPersonArrow.objectLogFirstNameArrow;
objectFirstPersonArrow.objectLogFirstNameArrow(); // "Another VijayArrow" in sloppy mode, `undefined` in strict mode

/* ------------------ `this` in calls of object`s method as regular function, object created with function constructor ------------------ */

console.log(
  '%c*************** `this` in calls of object`s method as regular function, object created with function constructor ***************',
  headerConsoleStyle
);

function PersonFunctionConstructor(personName) {
  this.personName = personName;

  this.sayPersonName = function () {
    console.log(this?.personName); // ? to avoid error when `this` is `undefined` (especially in strict mode)
  };
}

const person1 = new PersonFunctionConstructor('Person One'); // object created with function constructor (new instance of function constructor)
person1.sayPersonName(); // "Person One"
const person2 = new PersonFunctionConstructor('Person Two'); // next object created with function constructor (new instance of function constructor)
person2.sayPersonName(); // "Person Two"

person2.sayPersonName.call(person1); // reusage; "Person One"
person2.sayPersonName.apply(person1); // reusage; "Person One"
person2.sayPersonName.bind(person1)(); // reusage; "Person One"

const sayPersonNameToThis = person1.sayPersonName; // `this` of object was lost here
sayPersonNameToThis(); // `undefined` (as in sloppy mode no `personName` in global scope; as in strict mode global `this` is `undefined`)
sayPersonNameToThis.call(person2); // reusage; "Person Two"
var personName = 'Global Person'; // in sloppy mode `this` of global scope got property `personName` (hoisted to the top of code) and assign value "Global Person" here; in strict mode `this` of global scope is `undefined`
sayPersonNameToThis(); // reusage; "Global Person" in sloppy mode (`this` in method of object created by function instance created via `new` is taken from the nearest scope by the default, contrary to class instance method); `undefined` in strict mode
sayPersonNameToThis.call(this); // reusage; "Global Person" in sloppy mode (as `this` has property `personName` with value "Global Person" and method is taken from the nearest scope by the default, contrary to class instance method); `undefined` in strict mode
personName = 'Another Global Person'; // in sloppy mode `this`'s property `personName` gets/assigns value `Another Global Person` here; in strict mode `this` of global scope is `undefined`
sayPersonNameToThis(); // reusage; "Another Global Person" in sloppy mode (as `this` has property `personName` with value `Another Global Person`); `undefined` in strict mode

/* ------------------ `this` in calls of object`s method as arrow function, object created with function constructor ------------------ */

console.log(
  '%c*************** `this` in calls of object`s method as arrow function, object created with function constructor ***************',
  headerConsoleStyle
);

function PersonFunctionConstructorArrow(personNameArrow) {
  this.personNameArrow = personNameArrow;

  this.sayPersonNameArrow = () => {
    console.log(this?.personNameArrow); // ? to avoid error when `this` is `undefined` (especially in strict mode)
  };
}

const personArrow1 = new PersonFunctionConstructorArrow('Person One Arrow'); // object created with function constructor (new instance of function constructor)
personArrow1.sayPersonNameArrow(); // "Person One Arrow"
const personArrow2 = new PersonFunctionConstructorArrow('Person Two Arrow'); // next object created with function constructor (new instance of function constructor)
personArrow2.sayPersonNameArrow(); // "Person Two Arrow"

personArrow2.sayPersonNameArrow.call(personArrow1); // "Person Two Arrow" as `call` is not working as arrow function has not own `this`
personArrow2.sayPersonNameArrow.apply(personArrow1); // "Person Two Arrow" as `apply` is not working as arrow function has not own `this`
personArrow2.sayPersonNameArrow.bind(personArrow1)(); // "Person Two Arrow" as `bind` is not working as arrow function has not own `this`

const sayPersonNameToThisArrow = personArrow1.sayPersonNameArrow; // `this` of object was NOT lost here, as arrow function behaves as closure (so context is taken from place of declaration) and `this` of/in arrow function is taken from the nearest surrounding/lexical scope which is function constructor's scope where `this` is the instance created with `new`
sayPersonNameToThisArrow(); // "Person One Arrow" as arrow function is working as closure (so `this` is taken from outside scope acc. lexical, so from declaration place)
sayPersonNameToThisArrow.call(personArrow2); // "Person One Arrow" as `call` is not working as arrow function has not own `this`
var personNameArrow = 'Global Person Arrow'; // in sloppy mode `this` of global scope got property `personNameArrow` (hoisted to the top of code) and assign value "Global Person Arrow" here; in strict mode `this` of global scope is `undefined`
sayPersonNameToThisArrow(); // "Person One Arrow" as arrow function is working as closure (so `this` is taken from outside scope acc. lexical, so from declaration place)
sayPersonNameToThisArrow.call(this); // "Person One Arrow" as `call` is not working as arrow function has not own `this`
personNameArrow = 'Another Global Person Arrow'; // in sloppy mode `this`'s property `personNameArrow` gets/assigns value `Another Global Person Arrow` here; in strict mode `this` of global scope is `undefined`
sayPersonNameToThisArrow(); // "Person One Arrow" as arrow function is working as closure (so `this` is taken from outside scope acc. lexical, so from declaration place)

/* ------------------ `this` in calls of class intance method ------------------ */

console.log('%c*************** `this` in calls of class intance method ***************', headerConsoleStyle);

class User {
  constructor(userName) {
    this.userName = userName;
  }
  sayHi() {
    console.log(this?.userName); // ? to avoid error when `this` is `undefined` (especially in strict mode)
  }
}

const alice = new User('Alice');
alice.sayHi(); // "Alice"

const bob = new User('Bob');
bob.sayHi(); // "Bob"

bob.sayHi.call(alice); // reusage; "Alice"
bob.sayHi.apply(alice); // reusage; "Alice"
bob.sayHi.bind(alice)(); // reusage; "Alice"

const sayHiToThis = alice.sayHi; // `this` of class instance was lost here
sayHiToThis(); // reusage; `undefined` as connection to `this` of class instance was lost in above line AND class methods are not taking `this` from the nearest scope/context
sayHiToThis.call(bob); // reusage; "Bob"
alice.sayHiToThis?.(); // error as `sayHiToThis` is not function on class instance level

var userName = 'Global User'; // in sloppy mode `this` of global scope got property `userName` (hoisted to the top of code) and assign value `Global User` here; in strict mode `this` of global scope is `undefined`
sayHiToThis(); // `undefined` as class methods are not taking `this` from the nearest scope/context
sayHiToThis.call(this); // reusage; "Global User" in sloppy mode (as `this` has property `userName` with value "Global User"); `undefined` in strict mode
bob.sayHi.bind(this)(); // reusage; "Global User"
userName = 'Another Global User'; // in sloppy mode `this`'s property `userName` gets/assigns value "Another Global User" here; in strict mode `this` of global scope is `undefined`
sayHiToThis.call(this); // reusage; "Another Global User" in sloppy mode (as `this` has property `userName` with value "Another Global User"); `undefined` in strict mode

const john = new User('John');
john.sayHi(); // "John"
john.constructor.userName = 'George'; // define property `userName` at static context i.e. at class/constructor level via class instance's constructor
john.constructor.sayHi?.(); // error as sayHi is not function on constructor level (it is not static method)
john.sayHi(); // "John" as `this` is `john` instance which has property `userName` of value "John"

/* ------------------ `this` in class class static method ------------------ */

console.log('%c*************** `this` in calls of class static method ***************', headerConsoleStyle);

class StaticUser {
  constructor(userName) {
    this.userName = userName;
  }
  static staticSayHi() {
    console.log(this?.userName); // `?` to avoid error when `this` is `undefined` (especially in strict mode). Note: `this` in static method is class/constructor itself i.e. it is static context
  }
}

StaticUser.staticSayHi(); // `undefined` as static context/`this` (i.e. of `StaticUser` class/constructor) has no property `userName` (note: property `userName` should be defined at class/constructor level)

const charlie = new StaticUser('Charlie');
charlie.constructor.staticSayHi(); // `undefined` as static context/`this` (i.e. of `StaticUser` class/constructor) has no property `userName`

StaticUser.staticSayHi(); // `undefined` as static context/`this` (i.e. of `StaticUser` class/constructor) has no property `userName`

var userName = 'Global Static User';
StaticUser.staticSayHi(); // `undefined` as static context/`this` (i.e. of `StaticUser` class/constructor) has no property `userName` and not taking `userName` from global
StaticUser.staticSayHi.call({ userName: 'Some Static User' }); // "Some Static User" as `this` is the object passed in `call` which has property `userName` of value "Some Static User"

const staticSayHi = StaticUser.staticSayHi; // static context/`this` (i.e. of `StaticUser` class) was lost here
staticSayHi(); // `undefined` as class methods are not taking `this` from the nearest scope/context. `this` is "hermetized".
staticSayHi.call(this); // "Global Static User" in sloppy mode (as `this` has property `userName` with value "Global Static User"); `undefined` in strict mode

StaticUser.staticSayHi.bind(this)(); // "Global Static User" in sloppy mode (as `this` has property `userName` with value "Global Static User"); `undefined` in strict mode

StaticUser.userName = 'Static User'; // define property `userName` at static context / at class level and assign value "Static User"
StaticUser.staticSayHi(); // "Static User" as static context/`this` (i.e. of `StaticUser` class) now has property `userName` of value "Static User"
StaticUser.staticSayHiToHoney = function () {
  console.log(`Hi ${this?.userName}, honey!`);
}; // define new static method at class level
StaticUser.staticSayHiToHoney(); // "Hi Static User, honey!" as static context/`this` (i.e. of `StaticUser` class) now has static method `staticSayHiToHoney` and property `userName` of value "Static User"

charlie.constructor.userName = 'Another Charlie'; // define property `userName` at static context / at class level via class instance's constructor. In fact reassign value to "Another Charlie"
charlie.constructor.staticSayHi(); // "Another Charlie" as context/`this` is static/class `StaticUser` and ithas property `userName` of value "Another Charlie"
charlie.constructor.staticSayHiToHoney(); // "Hi Static User, honey!" as static context/`this` (i.e. of `StaticUser` class) now has static method `staticSayHiToHoney` and property `userName` of value "Another Charlie"

StaticUser.staticSayHi(); // "Another Charlie" as static `this` is `StaticUser` class which has property `userName` from constructor

StaticUser.userName = 'Another Static User'; // reassign value to "Another Static User" of property `userName` at class level
StaticUser.staticSayHi(); // "Another Static User" as `this` is `StaticUser` class which has property `userName` of value "Static User"

/* ------------------ CHAIN CALLS ------------------ */

console.log('%c*************** CHAIN CALLS ***************', headerConsoleStyle);

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

console.log('%c*************** CHECKING scopes ***************', headerConsoleStyle);

// function test() {
//   var testLocalVar = 'I am local';
// }
// test();
// console.log(testLocalVar); // ❌ ReferenceError

/* ------------------ CHECKING scopes. Advanced ------------------ */

console.log('%c*************** CHECKING scopes. Advanced ***************', headerConsoleStyle);

var globalVarWithVar;
let globalVarWithLet = "I'm variable of global with let";

globalFunction(); // ✅ accessible due to hosting

function globalFunction() {
  console.log('%c------- globalFunction start -------', brakeConsoleStyle);

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

  console.log('%c------- globalFunction end -------', brakeConsoleStyle);
}

// block scope (ES6+) in currly brackets
{
  var blockScopeVarWithVar = "I'm variable of block scope with var";
  let blockScopeVarWithLet = "I'm variable of block scope with let";

  blockFunction(); // ✅ accessible due to hosting in block scope

  console.log('block scope. blockScopeVarWithVar:', blockScopeVarWithVar); // ✅ accessible
  console.log('block scope. blockScopeVarWithLet:', blockScopeVarWithLet); // ✅ accessible

  function blockFunction() {
    console.log('%c------- blockFunction start & end -------', brakeConsoleStyle);
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

/* ------------------ CLOSURE ------------------ */

console.log('%c*************** CLOSURE ***************', headerConsoleStyle);

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

console.log('%c*************** CLOSURE with complex variables ***************', headerConsoleStyle);

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

console.log('%c*************** END ***************', headerConsoleStyle);
