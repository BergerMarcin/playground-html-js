// import parent/aggregated namespace of all modules
import * as shapes from '../modules/shapes-namspace-exports.js';
// import single namespace of single module
import { square } from '../modules/shapes-namspace-exports.js';

const appConsoleStyle = 'background: #08701bff; color: #fff; padding: 2px 8px; border-radius: 4px;';
console.log('%c*************** app-namespace-exports.js Namespace export(s) ***************', appConsoleStyle);

// Access everything through the parent/aggregated namespace (the shapes object)
// Note: perfect typing notes in VSC of JS! 🔥🔥🔥
console.log('Square area via parent-namespace:', shapes.square.calculate(4)); // 16
console.log('Circle area via parent-namespace:', shapes.circle.calculate(3)); // ~28.27
console.log('Triangle area via parent-namespace:', shapes.triangle.calculate(5, 3)); // 7.5

// Access only single namespace of single module (the circle object)
// Note: perfect typing notes in VSC of JS! 🔥🔥🔥
console.log('Circle area via single namespace:', square.calculate(3)); // 9
