// Example of using the shapes object directly i.e. aggregated modules object
import { shapes } from './modules/shapes-aggregated-modules-object.js';

const headerConsoleStyle = 'background: #08701bff; color: #fff; padding: 2px 8px; border-radius: 4px;';
console.log(
  '%c*************** app-aggregated-modules-object.js Aggregated modules object ***************',
  headerConsoleStyle
);

// Access everything through the shapes object / aggregated modules object
// Note: a little strange typing notes in VSC of JS but it works! 😅
console.log('Square area:', shapes.square.calculate(4)); // 16
console.log('Circle area:', shapes.circle.calculate(3)); // ~28.27
console.log('Triangle area:', shapes.triangle.calculate(5, 3)); // 7.5
