const gridModel = [];
let numRows = 5;
let numCols = 5;
let gap = 5;
let score = null;
let gameField = document.querySelector(".JS-game-field");
let displayCounter = document.getElementById("score");

window.onload = () => {
  initializeGridModel(numRows, numCols, gridModel);
  createGameGrid(gameField, numRows, numCols, gap); //drawgridmodel
};

window.onkeydown = (e) => {
  if (e.code == "ArrowUp") {
    collapseUp(numCols, numRows, gridModel) &&
      addCell(numRows, numCols, gridModel);
  } else if (e.code == "ArrowRight") {
    collapseRight(numRows, numCols, gridModel) &&
      addCell(numRows, numCols, gridModel);
  } else if (e.code == "ArrowDown") {
    collapseDown(numCols, numRows, gridModel) &&
      addCell(numRows, numCols, gridModel);
  } else if (e.code == "ArrowLeft") {
    collapseLeft(numCols, numRows, gridModel) &&
      addCell(numRows, numCols, gridModel);
  }
  setTimeout(() => {
    createGameGrid(gameField, numRows, numCols, gap);
  }, 150);
};

function createGameGrid(parent, rows, cols, x) {
  parent.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.classList.add("game-field__cell");
      cell.style.top = `${i * 60 + x}px`;
      cell.style.left = `${j * 60 + x}px`;
      cell.setAttribute("id", i + " " + j);
      //управление содержимым создаваемой ячейки
      let cellValue = gridModel[i][j];
      cell.innerHTML = cellValue;

      //управление стилями создаваемой ячейки
      addDynamicStyles(cellValue, cell);

      parent.appendChild(cell);
    }
  }
}

function initializeGridModel(rows, cols, grid) {
  for (let i = 0; i < rows; i++) {
    let aRow = [];
    for (let j = 0; j < cols; j++) {
      let value = "";
      aRow.push(value);
    }
    grid.push(aRow);
  }
  addCell(numRows, numCols, gridModel);
  addCell(numRows, numCols, gridModel);
}

function addCell(rows, cols, grid) {
  let randRow = Math.floor(Math.random() * rows);
  let randCol = Math.floor(Math.random() * cols);
  while (grid[randRow][randCol] !== "") {
    randRow = Math.floor(Math.random() * rows);
    randCol = Math.floor(Math.random() * cols);
  }
  grid[randRow][randCol] = Math.random() > 0.1 ? 2 : 4;
}

function collapseUp(cols, rows, grid) {
  let cellsHaveMoved = false;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let currentValue = grid[row][col];

      if (currentValue != "") {
        let cellIterator = row;
        let nextValue = "";

        let currTop = row * 60 + gap;
        let finalTop = null;
        while (cellIterator > 0 && nextValue == "") {
          cellIterator--;
          nextValue = grid[cellIterator][col];
        }
        if (nextValue == currentValue && nextValue != "") {
          grid[row][col] = "";
          grid[cellIterator][col] = currentValue * 2;
          finalTop = cellIterator * 60 + gap;
          //счётчик очков
          score += currentValue * 2;
          showCounter(displayCounter, score)
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[0][col] = currentValue;
          finalTop = cellIterator * 60 + gap;
        } else {
          grid[row][col] = "";
          grid[cellIterator + 1][col] = currentValue;
          finalTop = (cellIterator + 1) * 60 + gap;
        }

        let leftPoint = col * 60 + gap;
        divToMove = document.getElementById(row + " " + col);
        animateDivFromPointToPoint(
          divToMove,
          leftPoint,
          leftPoint,
          currTop,
          finalTop
        );
        if (currTop != finalTop) cellsHaveMoved = true;
      }
    }
  }

  return cellsHaveMoved;
}

function collapseDown(cols, rows, grid) {
  let cellsHaveMoved = false;

  for (let col = 0; col < cols; col++) {
    for (let row = rows - 1; row >= 0; row--) {
      let currentValue = grid[row][col];

      if (currentValue != "") {
        let currTop = row * 60 + gap;
        let finalTop = null;

        let cellIterator = row;
        let nextValue = "";

        while (cellIterator < rows - 1 && nextValue == "") {
          cellIterator++;
          nextValue = grid[cellIterator][col];
        }
        if (nextValue == currentValue && nextValue != "") {
          grid[row][col] = "";
          grid[cellIterator][col] = currentValue * 2;
          finalTop = cellIterator * 60 + gap;

          //счётчик очков
          score += currentValue * 2;
          showCounter(displayCounter, score);
          ///

        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[rows - 1][col] = currentValue;
          finalTop = (rows - 1) * 60 + gap;
        } else {
          grid[row][col] = "";
          grid[cellIterator - 1][col] = currentValue;
          finalTop = (cellIterator - 1) * 60 + gap;
        }

        let leftPoint = col * 60 + gap;
        divToMove = document.getElementById(row + " " + col);
        animateDivFromPointToPoint(
          divToMove,
          leftPoint,
          leftPoint,
          currTop,
          finalTop
        );
        if (currTop != finalTop) cellsHaveMoved = true;
      }
    }
  }

  return cellsHaveMoved;
}

function collapseRight(rows, cols, grid) {
  let cellsHaveMoved = false;

  for (let row = 0; row < rows; row++) {
    for (let col = cols - 1; col >= 0; col--) {
      let currentValue = grid[row][col];

      if (currentValue != "") {
        let currLeft = col * 60 + gap;
        let finalLeft = null;

        let cellIterator = col;
        let nextValue = "";

        while (cellIterator < cols - 1 && nextValue == "") {
          cellIterator++;
          nextValue = grid[row][cellIterator];
        }
        if (nextValue == currentValue && nextValue != "") {
          grid[row][col] = "";
          grid[row][cellIterator] = currentValue * 2;
          finalLeft = cellIterator * 60 + gap;
          //счётчик очков
          score += currentValue * 2;
          showCounter(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[row][cols - 1] = currentValue;
          finalLeft = (cols - 1) * 60 + gap;
        } else {
          grid[row][col] = "";
          grid[row][cellIterator - 1] = currentValue;
          finalLeft = (cellIterator - 1) * 60 + gap;
        }

        let topPoint = row * 60 + gap;
        divToMove = document.getElementById(row + " " + col);
        animateDivFromPointToPoint(
          divToMove,
          currLeft,
          finalLeft,
          topPoint,
          topPoint
        );
        if (currLeft != finalLeft) cellsHaveMoved = true;
      }
    }
  }

  return cellsHaveMoved;
}

function collapseLeft(rows, cols, grid) {
  let cellsHaveMoved = false;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let currentValue = grid[row][col];

      if (currentValue != "") {
        let currLeft = col * 60 + gap;
        let finalLeft = null;

        let cellIterator = col;
        let nextValue = "";

        while (cellIterator > 0 && nextValue == "") {
          cellIterator--;
          nextValue = grid[row][cellIterator];
        }
        if (nextValue == currentValue && nextValue != "") {
          grid[row][col] = "";
          grid[row][cellIterator] = currentValue * 2;
          finalLeft = cellIterator * 60 + gap;
          //счётчик очков
          score += currentValue * 2;
          showCounter(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[row][0] = currentValue;
          finalLeft = 0 * 60 + gap;
        } else {
          grid[row][col] = "";
          grid[row][cellIterator + 1] = currentValue;
          finalLeft = (cellIterator + 1) * 60 + gap;
        }

        let topPoint = row * 60 + gap;
        divToMove = document.getElementById(row + " " + col);
        animateDivFromPointToPoint(
          divToMove,
          currLeft,
          finalLeft,
          topPoint,
          topPoint
        );
        if (currLeft != finalLeft) cellsHaveMoved = true;
      }
    }
  }

  return cellsHaveMoved;
}

function animateDivFromPointToPoint(
  div,
  leftPoint,
  finalLeft,
  currTop,
  finalTop
) {
  drawEmptyCell(leftPoint, currTop, gameField);
  div.style.zIndex = 2;
  setTimeout(() => {
    div.style.left = finalLeft + "px";
    div.style.top = finalTop + "px";
  }, 10);
}

function drawEmptyCell(leftPoint, topPoint, parent) {
  let cell = document.createElement("div");
  cell.style.position = "absolute";
  cell.style.left = leftPoint;
  cell.style.top = topPoint;
  parent.appendChild(cell);
}

function addDynamicStyles(value, item) {
  item.classList.remove(
    "dynamic-style-2",
    "dynamic-style-4",
    "dynamic-style-8",
    "dynamic-style-16",
    "dynamic-style-32",
    "dynamic-style-64",
    "dynamic-style-128",
    "dynamic-style-256",
    "dynamic-style-512",
    "dynamic-style-1024",
    "dynamic-style-2054"
  );
  value == "2" && item.classList.add("dynamic-style-2");
  value == "4" && item.classList.add("dynamic-style-4");
  value == "8" && item.classList.add("dynamic-style-8");
  value == "16" && item.classList.add("dynamic-style-16");
  value == "32" && item.classList.add("dynamic-style-32");
  value == "64" && item.classList.add("dynamic-style-64");
  value == "128" && item.classList.add("dynamic-style-128");
  value == "256" && item.classList.add("dynamic-style-256");
  value == "512" && item.classList.add("dynamic-style-512");
  value == "1024" && item.classList.add("dynamic-style-1024");
  value == "2048" && item.classList.add("dynamic-style-2048");
}

function showCounter(output, value) {
  output.innerHTML = value;
}

//part 5
