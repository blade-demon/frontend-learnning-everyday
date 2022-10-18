/**
 * 只要满足两个条件即可：
 * 1，数组除0外的数最大值最小值差值必须在4以及4以内。
 * 2. 除0以外的数保证不重复
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
  let min = 14;
  let max = 0;

  // 一次遍历获得最大以及最小非0元素
  for (let i = 0; i < 5; i++) {
    if (max < nums[i]) {
      max = nums[i];
    }

    if (nums[i] < min && nums[i] !== 0) {
      min = nums[i];
    }
  }

  if (max - min > 4) {
    return false;
  }

  // 找出数组中是否存在重复的数字，没有重复数字就一定可以认为可以组成顺子
  let flag = new Array(5).fill(false);
  for (let i = 0; i < 5; i++) {
    if (nums[i] != 0 && flag[nums[i] - min] == false) {
      flag[nums[i] - min] = true;
    } else if (nums[i] != 0 && flag[nums[i] - min] == true) {
      return false;
    }
  }

  return true;
};

/**
 * 方法二 遍历数组
 * 非0的最大最小不能大于4，不能有重复非0元素
 * @param {number[]} nums
 * @return {boolean}
 */
var isStraight = function (nums) {
  // 排序
  nums.sort((a, b) => Number(a) - Number(b));

  let numOfZero = 0;
  for (let i = 0; i < 5; i++) {
    if (nums[i] === 0) {
      numOfZero++;
      continue;
    }
    if (nums[i] == nums[i + 1]) {
      return false;
    }
  }

  return nums[4] - nums[numOfZero] < 5;
};
