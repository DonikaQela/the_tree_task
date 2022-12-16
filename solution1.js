//Question 1: how many trees are visible from outside the grid?

const readData = async () => {
  const response = await fetch("input");
  const data = await response.text();

  console.log(data.split(/\r?\n/).map((row) => row.split("")));
  return data.split(/\r?\n/).map((row) => row.split(""));
};

(async () => {
  const matrix = await readData();

  const [numberOfRows, numberOfCols] = [matrix.length, matrix[0].length];

  let res = 0;
  const isEdge = (row, col) =>
    row === 0 ||
    col === 0 ||
    row === numberOfRows - 1 ||
    col === numberOfCols - 1;

  const isVisible = (row, col) => {
    if (isEdge(row, col)) return true;

    const isValid = (cellValue) => cellValue < matrix[row][col];

    const [rowValues, colValues] = [
      matrix[row],
      Array.from({ length: numberOfRows }, (_, i) => matrix[i][col]),
    ];
    console.log([rowValues, colValues]);

    return [
      rowValues.slice(0, col).every(isValid),
      rowValues.slice(col + 1).every(isValid),
      colValues.slice(0, row).every(isValid),
      colValues.slice(row + 1).every(isValid),
    ].some(Boolean);
  };

  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      res += isVisible(row, col);
    }
  }

  console.log(res);
})();
