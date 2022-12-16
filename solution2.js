//Question 2: What is the highest scenic score possible for any tree?
const readData = async () => {
  const response = await fetch("input");
  const data = await response.text();
  console.log(data.split(/\r?\n/).map((row) => row.split("")));

  return data.split(/\r?\n/).map((row) => row.split(""));
};

(async () => {
  const matrix = await readData();

  const [numberOfRows, numberOfCols] = [matrix.length, matrix[0].length];

  let res = Number.NEGATIVE_INFINITY;
  const isEdge = (row, col) =>
    row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1;

  const calculateScenicScore = (row, col) => {
    if (isEdge(row, col)) return 0;

    const scoreAccumulator = ({ count, stop }, el) => {
      if (stop) return { count, stop };

      stop = el >= matrix[row][col];
      count += 1;

      return { count, stop };
    };

    const [rowValues, colValues] = [
      matrix[row],
      Array.from({ length: numberOfRows }, (_, i) => matrix[i][col]),
    ];

    return [
      rowValues
        .slice(0, col)
        .reverse()
        .reduce(scoreAccumulator, { count: 0, stop: false }).count,
      rowValues
        .slice(col + 1)
        .reduce(scoreAccumulator, { count: 0, stop: false }).count,
      colValues
        .slice(0, row)
        .reverse()
        .reduce(scoreAccumulator, { count: 0, stop: false }).count,
      colValues
        .slice(row + 1)
        .reduce(scoreAccumulator, { count: 0, stop: false }).count,
    ].reduce((acc, el) => acc * el, 1);
  };

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      res = Math.max(res, calculateScenicScore(row, col));
    }
  }

  console.log(res);
})();
