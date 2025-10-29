// Import all shapes
import * as square from './shapes/square.js';
import * as circle from './shapes/circle.js';
import * as triangle from './shapes/triangle.js';

// Export everything as a single object / aggregated modules object
// Note: a little less convenient than namespaces approach
export const shapes = {
  square,
  circle,
  triangle,
};
