export const MathUtils = {
  clamp: (val, min, max) => Math.min(Math.max(val, min), max),
  
  randomRange: (min, max) => Math.random() * (max - min) + min,
  
  randomInt: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
  
  chance: (percentage) => Math.random() < percentage,
};
