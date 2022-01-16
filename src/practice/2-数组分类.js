/**
 * 使用 JavaScript 进行数据分组最优雅的方式
 * @link 参考链接：https://mp.weixin.qq.com/s/U9stOyfVEpiYkRBycE1OOg
 */

const questionList = [
  {
    type: "adequacy",
    questId: "400001",
    questNo: "1",
  },
  {
    type: "kyc",
    questId: "4001",
    questNo: "2",
  },
  {
    type: "kyc",
    questId: "4002",
    questNo: "3",
  },
  {
    type: "kyc",
    questId: "4003",
    questNo: "4",
  },
  {
    type: "kyc",
    questId: "4004",
    questNo: "5",
  },
  {
    type: "kyc",
    questId: "4005",
    questNo: "6",
  },
  {
    type: "kyc",
    questId: "4006",
    questNo: "7",
  },
  {
    type: "kyc",
    questId: "4007",
    questNo: "8",
  },
  {
    type: "kyc",
    questId: "4008",
    questNo: "9",
  },
  {
    type: "kyc",
    questId: "4009",
    questNo: "10",
  },
  {
    type: "kyc",
    questId: "4010",
    questNo: "11",
  },
  {
    type: "adequacy",
    questId: "1001001",
    questNo: "12",
  },
  {
    type: "adequacy",
    questId: "400018",
    questNo: "13",
  },
  {
    type: "crs",
    questId: "400020",
    questNo: "14",
  },
];

// 方法一：利用Object
function groupArrayBy1(items) {
  const groupedBy = {};
  for (let question of items) {
    if (groupedBy[question.type]) {
      groupedBy[question.type].push(question);
    } else {
      groupedBy[question.type] = [question];
    }
  }
  return groupedBy;
}

// 方法二：利用reduce
function groupArray2(items) {
  return items.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.type]: [...(acc[curr.type] ?? []), curr],
    }),
    {}
  );
}

// 方法三：使用fromEntries, Array.from
function groupArrayBy3(items) {
  Object.fromEntries(
    Array.from(new Set(items.map(({ type }) => type))).map((type) => [
      type,
      items.filter((item) => item.type === type),
    ])
  );
}

// const { kyc, crs, adequacy } = groupArrayBy1(questionList);
// const { kyc, crs, adequacy } = groupArrayBy2(questionList);
// const { kyc, crs, adequacy } = groupArrayBy3(questionList);
// console.log(kyc);
// console.log(crs);
// console.log(adequacy);
