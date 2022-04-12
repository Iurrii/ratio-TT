const gridModel = [];
let numRows = 5;
let numCols = 5;
let gap = 5;
let gameField = document.querySelector(".JS-game-field");

window.onload = () => {
  initializeGridModel(numRows, numCols, gridModel);
  createGameGrid(gameField, numRows, numCols, gap); //drawgridmodel
};

window.onkeydown = (e) => {
  if (e.code == "ArrowUp") {
    collapseUp(numCols, numRows, gridModel);
    addCell(numRows, numCols, gridModel);
  } else if (e.code == "ArrowRight") {
  } else if (e.code == "ArrowDown") {
  } else if (e.code == "ArrowLeft") {
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

      let cellValue = gridModel[i][j];
      cell.innerHTML = cellValue;
      if (cellValue == "") {
        cell.style.backgroundColor = "#eeeeee";
      } else {
        cell.style.backgroundColor = "black";
        cell.style.color = "white";
      }

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
      }
    }
  }
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
timecode - 6:25