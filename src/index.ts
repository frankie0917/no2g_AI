const colIndicatorEl = document.getElementById("col-indicator")!;
const rowIndicatorEl = document.getElementById("row-indicator")!;
const contentEl = document.getElementById("content")!;

type Cell = "O" | "X" | "-";

type Board = Cell[][];

type BoardData = {
  success: Board;
};

type Indicator = number[][];

const successBoard: Board = [
  ["O", "X", "O", "O", "X"],
  ["O", "O", "X", "O", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "O", "O", "O", "X"],
];

let currentBoard: Board = [];

let indicatorMap: {
  success: {
    row: Indicator;
    col: Indicator;
  };
  row: HTMLElement[];
  col: HTMLElement[];
} = {
  success: {
    row: [],
    col: [],
  },
  row: [],
  col: [],
};

const main = async () => {
  const { colIndicator, rowIndicator } = makeIndicators(successBoard);
  indicatorMap.success.row = rowIndicator;
  indicatorMap.success.col = colIndicator;
  currentBoard = Array(Object.keys(rowIndicator).length).fill(
    Array(Object.keys(colIndicator).length).fill("-")
  );
  renderIndicators(colIndicator, rowIndicator);
  makeContent();
};

main();

function makeContent() {
  for (const [rowIndex, row] of currentBoard.entries()) {
    const rowEl = createEl("div");
    rowEl.className =
      "flex flex-row justify-between border-b-2 border-gray-400";
    rowEl.style.height = `${100 / currentBoard.length}%`;
    for (let index = 0; index < row.length; index++) {
      const itemEl = createEl("div");
      itemEl.className =
        "border-gray-400 text-gray-700 flex justify-center items-center";
      itemEl.classList.add("border-r-2");
      itemEl.style.fontSize = "80px";
      itemEl.style.width = `${100 / row.length}%`;
      itemEl.addEventListener("click", () => {
        setItemValue(rowIndex, index, itemEl);
      });
      rowEl.appendChild(itemEl);
    }
    contentEl.appendChild(rowEl);
  }
}

function setItemValue(
  rowIndex: number,
  cellIndex: number,
  itemEl: HTMLElement
) {
  let value: Cell = "-";
  switch (currentBoard[rowIndex][cellIndex]) {
    case "X":
      value = "-";
      itemEl.innerText = "";
      itemEl.classList.remove("bg-gray-700");
      break;
    case "O":
      itemEl.innerText = "X";
      itemEl.classList.remove("bg-gray-700");
      value = "X";
      break;
    default:
      itemEl.innerText = "";
      itemEl.classList.add("bg-gray-700");
      value = "O";
      break;
  }
  const copy = JSON.parse(JSON.stringify(currentBoard));
  copy[rowIndex][cellIndex] = value;
  currentBoard = copy;

  let valid = true;
  for (const [rowIndex, row] of currentBoard.entries()) {
    for (const [cellIndex, cell] of row.entries()) {
      if (
        (successBoard[rowIndex][cellIndex] === "O" && cell !== "O") ||
        (successBoard[rowIndex][cellIndex] !== "O" && cell === "O")
      ) {
        valid = false;
      }
    }
  }

  const { rowIndicator, colIndicator } = makeIndicators(currentBoard);

  for (const [rowIndex, row] of indicatorMap.success.row.entries()) {
    if (JSON.stringify(rowIndicator[rowIndex]) == JSON.stringify(row)) {
      indicatorMap.row[rowIndex].classList.remove("bg-gray-700");
      indicatorMap.row[rowIndex].classList.add("bg-gray-500");
    } else {
      indicatorMap.row[rowIndex].classList.remove("bg-gray-500");
      indicatorMap.row[rowIndex].classList.add("bg-gray-700");
    }
  }

  for (const [colIndex, col] of indicatorMap.success.col.entries()) {
    if (JSON.stringify(colIndicator[colIndex]) == JSON.stringify(col)) {
      indicatorMap.col[colIndex].classList.remove("bg-gray-700");
      indicatorMap.col[colIndex].classList.add("bg-gray-500");
    } else {
      indicatorMap.col[colIndex].classList.remove("bg-gray-500");
      indicatorMap.col[colIndex].classList.add("bg-gray-700");
    }
  }

  if (valid) {
    setTimeout(() => {
      confirm("成功啦！");
    }, 0);
  }
}

function renderIndicators(colIndicator: Indicator, rowIndicator: Indicator) {
  for (const [colIndex, currentCol] of colIndicator.entries()) {
    const colEl = createEl("div");
    colEl.className = "mt-auto text-center h-full flex flex-col justify-end";
    if (colIndex !== colIndicator.length - 1) {
      colEl.classList.add("border-r-2");
    }
    colEl.style.width = `${100 / colIndicator.length}%`;
    for (const i of currentCol) {
      const itEl = createEl("div");
      itEl.className = "h-6";
      itEl.innerText = i + "";
      colEl.appendChild(itEl);
    }
    indicatorMap.col.push(colEl);
    colIndicatorEl.appendChild(colEl);
  }

  for (const currentRow of rowIndicator) {
    const rowEl = createEl("div");
    rowEl.className = "flex flex-row justify-end items-center border-b-2";
    rowEl.style.height = `${100 / rowIndicator.length}%`;
    for (const i of currentRow) {
      const itEl = createEl("div");
      itEl.className = "w-6";
      itEl.innerText = i + "";
      rowEl.appendChild(itEl);
    }
    indicatorMap.row.push(rowEl);
    rowIndicatorEl.appendChild(rowEl);
  }
}

function makeIndicators(board: Board) {
  let colIndicator: Indicator = [];
  let rowIndicator: Indicator = [];

  for (const [rowIndex, row] of board.entries()) {
    for (const [cellIndex, cell] of row.entries()) {
      if (!colIndicator[cellIndex]) {
        colIndicator[cellIndex] = [];
      }

      if (!rowIndicator[rowIndex]) {
        rowIndicator[rowIndex] = [];
      }

      const currentCol = colIndicator[cellIndex];
      const currentRow = rowIndicator[rowIndex];

      if (cell === "O") {
        if (rowIndex === 0) {
          currentCol.push(1);
        }

        if (rowIndex > 0) {
          currentCol[currentCol.length - 1] += 1;
        }

        if (cellIndex === 0) {
          currentRow.push(1);
        }

        if (cellIndex > 0) {
          currentRow[currentRow.length - 1] += 1;
        }
      } else {
        currentCol.push(0);
        currentRow.push(0);
      }
    }
  }

  for (const [colIndex, currentCol] of colIndicator.entries()) {
    colIndicator[colIndex] = currentCol.filter((it) => it !== 0);
    if (colIndicator[colIndex].length === 0) {
      colIndicator[colIndex].push(0);
    }
  }

  for (const [rowIndex, currentRow] of rowIndicator.entries()) {
    rowIndicator[rowIndex] = currentRow.filter((it) => it !== 0);
    if (rowIndicator[rowIndex].length === 0) {
      rowIndicator[rowIndex].push(0);
    }
  }
  return {
    rowIndicator,
    colIndicator,
  };
}

function createEl(tag: string) {
  return document.createElement(tag);
}
