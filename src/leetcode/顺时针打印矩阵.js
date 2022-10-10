var spiralOrder = function (matrix) {
  if (matrix.length == 0) return [];
  let resList = [];
  let x1 = 0,
    y1 = 0,
    x2 = matrix.length - 1,
    y2 = matrix[0].length - 1;

  while (x1 <= x2 && y1 <= y2) {
    helpPrintMatrix(matrix, x1++, y1++, x2--, y2--, resList);
  }

  return resList;
};

function helpPrintMatrix(matrix, x1, y1, x2, y2, resList) {
  if (x1 == x2) {
    for (let i = y1; i <= y2; i++) {
      resList.push(matrix[x1][i]);
    }
  } else if (y1 == y2) {
    for (let i = x1; i <= x2; i++) {
      resList.push(matrix[i][y1]);
    }
    //知道（x1, y1）和（x2, y2）可以确定一个矩阵
  } else {
    let curX = x1;
    let curY = y1;
    while (curY != y2) {
      resList.push(matrix[x1][curY]);
      curY++;
    }
    while (curX != x2) {
      resList.push(matrix[curX][y2]);
      curX++;
    }
    while (curY != y1) {
      resList.push(matrix[x2][curY]);
      curY--;
    }
    while (curX != x1) {
      resList.push(matrix[curX][y1]);
      curX--;
    }
  }
}

spiralOrder();
