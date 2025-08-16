/**
 * @param {number | bigint} num
 * @return {number | bigint}
 */
const maximum69Number = function (num) {
  // To get the maximum number, we should change the first '6' to a '9'.
  // String.prototype.replace() with a string as the first argument only
  // replaces the first occurrence, which is exactly what we need.
  // This approach is generally the most readable and concise, and is also
  // very performant, especially for BigInts.
  const s = String(num).replace("6", "9");
  return typeof num === "bigint" ? BigInt(s) : Number(s);
};

/**
 * An alternative solution using only mathematical operations.
 * @param {number} num
 * @return {number}
 */
const maximum69NumberWithMath = function (num) {
  let tempNum = num;
  let sixLocation = -1;
  let placeValue = 1;

  while (tempNum > 0) {
    if (tempNum % 10 === 6) {
      sixLocation = placeValue;
    }
    tempNum = Math.floor(tempNum / 10);
    placeValue *= 10;
  }

  return sixLocation === -1 ? num : num + 3 * sixLocation;
};

/**
 * A BigInt-compatible version of the mathematical solution.
 * This avoids string conversion, but can be less performant for very large
 * numbers (BigInts) due to the overhead of repeated arithmetic operations in a loop.
 * @param {bigint} num
 * @return {bigint}
 */
const maximum69NumberWithBigInt = function (num) {
  let tempNum = num;
  let sixLocation = -1n;
  let placeValue = 1n;

  while (tempNum > 0n) {
    if (tempNum % 10n === 6n) {
      sixLocation = placeValue;
    }
    tempNum /= 10n; // Integer division for BigInt
    placeValue *= 10n;
  }

  return sixLocation === -1n ? num : num + 3n * sixLocation;
};

module.exports = {
  maximum69Number,
  maximum69NumberWithMath,
  maximum69NumberWithBigInt,
};
