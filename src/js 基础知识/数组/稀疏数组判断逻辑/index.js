/* eslint-disable no-sparse-arrays */
const sparseArr = [1, 2, 3, 11, , , , , 10];
const denseArr = [1, 2, 3, undefined, 10];

/**
 * 检查是否是稀疏数组
 * @param {Array} arr 数组
 * @returns {Boolean} 是否是稀疏数组
 */
function checkSparseArray(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (!(i in arr)) {
      return true;
    }
  }
  return false;
}

/**
 * 检查是否是稀疏数组
 * @param {Array} arr 数组
 * @returns {Boolean} 是否是稀疏数组
 */
function checkSparseArray2(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(arr, i)) {
      return true;
    }
  }
  return false;
}

checkSparseArray(sparseArr); // true

checkSparseArray(denseArr); // false

checkSparseArray2(sparseArr); // true

checkSparseArray2(denseArr); // false
