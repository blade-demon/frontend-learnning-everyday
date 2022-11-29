// 对某商品列表进行默认排序，排序规则
// 1.库存为0的置底，优先级最高
// 2.isTop为true置顶，多个为true时按4，5规则排序
// 3.isRecommend为true置顶，优先级低于isTop的产品,多个为true时按4，5规则排序
// 4.按价格升序
// 5.价格相同时按上架时间降序

const list = [
  {
    name: "商品2",
    price: 40,
    isTop: true,
    isRecommend: false,
    createTime: "2020/09/09 00:00:00",
    inventory: 0,
  },

  {
    name: "商品4",
    price: 50,
    isTop: false,
    isRecommend: true,
    createTime: "2020/09/10 00:00:00",
    inventory: 12,
  },
  {
    name: "商品3",
    price: 30,
    isTop: false,
    isRecommend: true,
    createTime: "2020/09/08 00:00:00",
    inventory: 2,
  },
  {
    name: "商品5",
    price: 30,
    isTop: false,
    isRecommend: true,
    createTime: "2020/09/07 00:00:00",
    inventory: 2,
  },
  {
    name: "商品1",
    price: 20,
    isTop: true,
    isRecommend: true,
    createTime: "2020/09/10 00:00:00",
    inventory: 9,
  },
];

const sortProducts = (arr) => {
  arr.sort((a, b) => {
    // 先考虑库存不为0
    if (a.inventory !== 0 && b.inventory !== 0) {
      if (a.isTop === b.isTop) {
        // top 相同的情况下按照 recommend 进行排序
        if (a.isRecommend && b.isRecommend) {
          if (a.price === b.price) {
            // 降序
            return new Date(b.createTime).getTime() - new Date(a.createTime);
          }
          return a.price - b.price;
        } else {
          return a.isRecommend - b.isRecommend;
        }
      } else {
        // 降序
        return b.isTop - a.isTop;
      }
    } else {
      // 库存为0的话直接降序排序
      return b.inventory - a.inventory;
    }
  });
  return arr;
};

console.log(sortProducts(list));
