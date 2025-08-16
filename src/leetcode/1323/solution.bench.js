const { maximum69Number, maximum69NumberWithMath, maximum69NumberWithBigInt } = require("./solution");

// --- Benchmark for standard Numbers ---
const NUMBER_ITERATIONS = 100000;
const testNumbers = [];

/**
 * Generates a random number (1 to 4 digits) composed only of 6s and 9s.
 * @returns {number}
 */
function generate69Number() {
  let str = "";
  const length = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < length; i++) {
    str += Math.random() < 0.5 ? "6" : "9";
  }
  return Number(str);
}

for (let i = 0; i < 1000; i++) {
  testNumbers.push(generate69Number());
}

console.log("--- Benchmarking with standard Numbers ---");
console.log(`Running with ${NUMBER_ITERATIONS} iterations on ${testNumbers.length} numbers...`);
console.log("--------------------------------------------------");

console.time("String-based (Number)");
for (let i = 0; i < NUMBER_ITERATIONS; i++) {
  for (const num of testNumbers) {
    maximum69Number(num);
  }
}
console.timeEnd("String-based (Number)");

console.time("Math-based (Number)");
for (let i = 0; i < NUMBER_ITERATIONS; i++) {
  for (const num of testNumbers) {
    maximum69NumberWithMath(num);
  }
}
console.timeEnd("Math-based (Number)");
console.log("--------------------------------------------------\n");

// --- Benchmark for BigInts ---
const BIGINT_ITERATIONS = 1000;
const BIGINT_LENGTH = 500; // 500-digit numbers
const testBigInts = [];

function generate69BigInt(length) {
  let str = "";
  for (let i = 0; i < length; i++) {
    str += Math.random() < 0.5 ? "6" : "9";
  }
  // Ensure there's at least one '6' to replace for a fair test
  const randomIndex = Math.floor(Math.random() * length);
  str = `${str.substring(0, randomIndex)}6${str.substring(randomIndex + 1)}`;
  return BigInt(str);
}

for (let i = 0; i < 100; i++) {
  testBigInts.push(generate69BigInt(BIGINT_LENGTH));
}

console.log("--- Benchmarking with BigInts ---");
console.log(`Running with ${BIGINT_ITERATIONS} iterations on ${testBigInts.length} ${BIGINT_LENGTH}-digit numbers...`);
console.log("--------------------------------------------------");

console.time("String-based (BigInt)");
for (let i = 0; i < BIGINT_ITERATIONS; i++) {
  for (const num of testBigInts) {
    maximum69Number(num);
  }
}
console.timeEnd("String-based (BigInt)");

console.time("Math-based (BigInt)");
for (let i = 0; i < BIGINT_ITERATIONS; i++) {
  for (const num of testBigInts) {
    maximum69NumberWithBigInt(num);
  }
}
console.timeEnd("Math-based (BigInt)");
console.log("--------------------------------------------------");
console.log("Note: Lower time is better.");
