import { Formatter } from '../js/utils/formatting.js';

const tests = [
  { input: 0, expected: "0" },
  { input: 999, expected: "999" },
  { input: 1000, expected: "1k" },
  { input: 1500, expected: "1.5k" },
  { input: 1000000, expected: "1.00M" },
  { input: 1500000, expected: "1.50M" },
  { input: 1000000000, expected: "1.00B" },
  { input: 1234000000, expected: "1.23B" },
  { input: 1e12, expected: "1.00T" },
  { input: 1e15, expected: "1.00Qa" },
  { input: 1e18, expected: "1.00Qi" },
  { input: 1e21, expected: "1.00Sx" },
  { input: 1e33, expected: "1.00Dc" }, // Decillion
  { input: 1e36, expected: "1.00e+36" }, // Fallback to exponential
];

console.log("Running Formatting Tests...");
let passed = 0;
tests.forEach(t => {
  const result = Formatter.formatNumber(t.input);
  if (result === t.expected) {
    passed++;
  } else {
    console.error(`FAIL: Input ${t.input} -> Expected ${t.expected}, Got ${result}`);
  }
});

console.log(`Passed ${passed}/${tests.length} tests.`);

// Currency Test
const currencyTests = [
    { input: 1000000, expected: "$1.00M" },
    { input: 2500000000, expected: "$2.50B" }
];

currencyTests.forEach(t => {
    if (t.input >= 1000000) {
        const result = Formatter.formatCurrency(t.input);
        if (result === t.expected) {
            passed++;
        } else {
            console.error(`FAIL Currency: Input ${t.input} -> Expected ${t.expected}, Got ${result}`);
        }
    }
});
