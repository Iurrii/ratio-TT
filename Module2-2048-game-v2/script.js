//game-field
let gridModel = [];
const numRows = 5,
  numCols = 5,
  gap = 5;

//game-mechanics
let score = null,
  isGameOver = false,
  gameResults = [],
  numberOfGame = 0,
  isVictory = false;
//timer
let isTimerActive = false;

//DOM-variables
const gameField = document.querySelector(".JS-game-field");
const displayCounter = document.getElementById("score-game");
const elem = document.querySelector(".JS-game-field");
const displayTimer = document.getElementById("timer-game");
const displayTableOfResults = document.getElementById("table-of-results");

//shirina-yacheyki-zavisit-ot-shiriny-oblasti-prosmotra
let cellWidth = () => {
  if (window.innerWidth >= 1200) return 110;
  if (window.innerWidth >= 768) return 70;
  if (window.innerWidth >= 320) return 50;
};

window.onload = () => {
  initializeGridModel(numRows, numCols, gridModel);
  createGameGrid(gameField, numRows, numCols, gap);
  document.addEventListener("keydown", controlKeydown);
};

swipeDetect(elem, (swipeDir) => {
  controlSwipeMouse(swipeDir);
});

function controlKeydown(e) {
  if (e.code == "ArrowUp") {
    eventUp();
  } else if (e.code == "ArrowRight") {
    eventRight();
  } else if (e.code == "ArrowDown") {
    eventDown();
  } else if (e.code == "ArrowLeft") {
    eventLeft();
  }
}

function controlSwipeMouse(direction) {
  if (direction == "up") {
    eventUp();
  } else if (direction == "right") {
    eventRight();
  } else if (direction == "down") {
    eventDown();
  } else if (direction == "left") {
    eventLeft();
  }
}

function createGameGrid(parent, rows, cols, x) {
  parent.innerHTML = "";
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("div");
      cell.classList.add("game-field__cell");
      cell.style.width = `${cellWidth()}px`;
      cell.style.height = `${cellWidth()}px`;
      cell.style.top = `${i * (cellWidth() + x * 2) + x}px`;
      cell.style.left = `${j * (cellWidth() + x * 2) + x}px`;
      cell.setAttribute("id", i + " " + j);
      //add-content-for-cell
      let cellValue = gridModel[i][j];
      cell.innerHTML = cellValue;
      //add-dynamic-styles-for-cell
      addDynamicStyles(cellValue, cell);

      //check-of-cell-for-2048
      if (cellValue == "2048") {
        isGameOver = true;
        StartStop();
      }

      parent.appendChild(cell);
    }
  }
  //if-true-get-function
  isGameOver && gameWin();
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
  grid[randRow][randCol] = generateTwoOrFour();
  checkGameOver(numRows, numCols, gridModel);
}

function collapseUp(cols, rows, grid) {
  let cellsHaveMoved = false;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let currentValue = grid[row][col];

      if (currentValue != "") {
        let cellIterator = row;
        let nextValue = "";

        let currTop = row * (cellWidth() + gap * 2) + gap;
        let finalTop = null;
        while (cellIterator > 0 && nextValue == "") {
          cellIterator--;
          nextValue = grid[cellIterator][col];
        }
        if (nextValue == currentValue && nextValue != "") {
          grid[row][col] = "";
          grid[cellIterator][col] = currentValue * 2;
          finalTop = cellIterator * cellWidth() + gap;
          //?????????????? ??????????
          score += currentValue * 2;
          showADisplay(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[0][col] = currentValue;
          finalTop = cellIterator * (cellWidth() + gap * 2) + gap;
        } else {
          grid[row][col] = "";
          grid[cellIterator + 1][col] = currentValue;
          finalTop = (cellIterator + 1) * (cellWidth() + gap * 2) + gap;
        }

        let leftPoint = col * (cellWidth() + gap * 2) + gap;
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
        let currTop = row * (cellWidth() + gap * 2) + gap;
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
          finalTop = cellIterator * (cellWidth() + gap * 2) + gap;

          //?????????????? ??????????
          score += currentValue * 2;
          showADisplay(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[rows - 1][col] = currentValue;
          finalTop = (rows - 1) * (cellWidth() + gap * 2) + gap;
        } else {
          grid[row][col] = "";
          grid[cellIterator - 1][col] = currentValue;
          finalTop = (cellIterator - 1) * (cellWidth() + gap * 2) + gap;
        }

        let leftPoint = col * (cellWidth() + gap * 2) + gap;
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
        let currLeft = col * (cellWidth() + gap * 2) + gap;
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
          finalLeft = cellIterator * (cellWidth() + gap * 2) + gap;
          //?????????????? ??????????
          score += currentValue * 2;
          showADisplay(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[row][cols - 1] = currentValue;
          finalLeft = (cols - 1) * (cellWidth() + gap * 2) + gap;
        } else {
          grid[row][col] = "";
          grid[row][cellIterator - 1] = currentValue;
          finalLeft = (cellIterator - 1) * (cellWidth() + gap * 2) + gap;
        }

        let topPoint = row * (cellWidth() + gap * 2) + gap;
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
        let currLeft = col * (cellWidth() + gap * 2) + gap;
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
          finalLeft = cellIterator * (cellWidth() + gap * 2) + gap;
          //?????????????? ??????????
          score += currentValue * 2;
          showADisplay(displayCounter, score);
          ///
        } else if (nextValue == "") {
          grid[row][col] = "";
          grid[row][0] = currentValue;
          finalLeft = 0 * (cellWidth() + gap * 2) + gap;
        } else {
          grid[row][col] = "";
          grid[row][cellIterator + 1] = currentValue;
          finalLeft = (cellIterator + 1) * (cellWidth() + gap * 2) + gap;
        }

        let topPoint = row * (cellWidth() + gap * 2) + gap;
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

function eventUp() {
  !isTimerActive && StartStop();
  collapseUp(numCols, numRows, gridModel);
  addCell(numRows, numCols, gridModel);
  setTimeout(() => {
    createGameGrid(gameField, numRows, numCols, gap);
  }, 150);
}

function eventDown() {
  !isTimerActive && StartStop();
  collapseDown(numCols, numRows, gridModel);
  addCell(numRows, numCols, gridModel);
  setTimeout(() => {
    createGameGrid(gameField, numRows, numCols, gap);
  }, 150);
}

function eventLeft() {
  !isTimerActive && StartStop();
  collapseLeft(numCols, numRows, gridModel);
  addCell(numRows, numCols, gridModel);
  setTimeout(() => {
    createGameGrid(gameField, numRows, numCols, gap);
  }, 150);
}

function eventRight() {
  !isTimerActive && StartStop();
  collapseRight(numRows, numCols, gridModel);
  addCell(numRows, numCols, gridModel);
  setTimeout(() => {
    createGameGrid(gameField, numRows, numCols, gap);
  }, 150);
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
  if (Number.isInteger(value)) {
    //reset-dynamics-styles
    item.classList.remove(!`dynamic-style-${value}`);
    //dobavlyaem-novyy-dinamicheskiy-stil
    item.classList.add(`dynamic-style-${value}`);
  }
}

function generateTwoOrFour() {
  return Math.random() > 0.1 ? 2 : 4;
}

function showADisplay(output, value) {
  output.innerHTML = value;
}

function checkGameOver(rows, cols, grid) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        grid[i][j] == "" ||
        canCollapseWithNeighbor(i, j, gridModel, numRows, numCols)
      ) {
        return false;
      }
    }
  }
  //GAME-IS-LOST
  alert(`???? ??????????????????! ${score}`);
  dataForTableResults(readout, score, gameResults);
  showADisplayResults(displayTableOfResults, gameResults);
  gridModel = [];
  score = null;
  displayCounter.innerHTML = 0;
  isVictory = false;
  ///reset-the-timer
  Clear??lock();
  isTimerActive = false;
  //initialize-new-game
  initializeGridModel(numRows, numCols, gridModel);
  createGameGrid(gameField, numRows, numCols, gap);
  return true;
}

function canCollapseWithNeighbor(row, col, grid, rows, cols) {
  if (row > 0 && grid[row][col] == grid[row - 1][col]) return true;
  if (row < rows - 1 && grid[row][col] == grid[row + 1][col]) return true;
  if (col > 0 && grid[row][col] == grid[row][col - 1]) return true;
  if (col < cols - 1 && grid[row][col] == grid[row][col + 1]) return true;
  return false;
}

function gameWin() {
  //GAME-IS-WON
  alert(`???? ????????????????! ${score}`);
  isVictory = true;
  dataForTableResults(readout, score, gameResults);
  showADisplayResults(displayTableOfResults, gameResults);
  //reset-variables-for-new-game
  isGameOver = false;
  gridModel = [];
  score = null;
  displayCounter.innerHTML = 0;
  isVictory = false;
  ///reset-the-timer
  Clear??lock();
  isTimerActive = false;
  //initialize-new-game
  initializeGridModel(numRows, numCols, gridModel);
  createGameGrid(gameField, numRows, numCols, gap);
}

function dataForTableResults(value1, value2, toArray) {
  numberOfGame++;
  let resultThisGame = isVictory ? "Vin" : "Lose";
  result = `Game ${numberOfGame}---Time ${value1}---Score ${value2}---${resultThisGame}`;
  toArray.push(result);
}

function showADisplayResults(output, arr) {
  output.innerHTML = "";
  arr.forEach((item) => {
    output.innerHTML += `<tr><td>${item}</td><td>`;
  });
}

//////////////////////---TIMER---//////////////////////////////////

//variables

let clocktimer, dateObj, dh, dm, ds;
let readout = null;
let h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0;
init = 0;

//?????????????? ?????? ?????????????? ????????
function Clear??lock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  readout = "00:00:00";
  showADisplay(displayTimer, readout);
}

//start-timer
function StartTIME() {
  let base = 60;
  let cdateObj = new Date();
  let t = cdateObj.getTime() - dateObj.getTime() - s * 1000;
  if (t > 999) {
    s++;
  }
  if (s >= m * base) {
    ts = 0;
    m++;
  } else {
    ts = parseInt(ms / 100 + s);
    if (ts >= base) {
      ts = ts - (m - 1) * base;
    }
  }
  if (m > h * base) {
    tm = 1;
    h++;
  } else {
    tm = parseInt(ms / 100 + m);
    if (tm >= base) {
      tm = tm - (h - 1) * base;
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = "00";
  }
  if (ms > 0 && ms <= 9) {
    ms = "0" + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = "0" + ts;
    }
  } else {
    ds = "00";
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = "0" + dm;
    }
  } else {
    dm = "00";
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = "0" + dh;
    }
  } else {
    dh = "00";
  }
  readout = dh + ":" + dm + ":" + ds;
  showADisplay(displayTimer, readout);
  clocktimer = setTimeout("StartTIME()", 1);
}

//start/stop-timer
function StartStop() {
  if (init == 0) {
    Clear??lock();
    dateObj = new Date();
    StartTIME();
    init = 1;
    isTimerActive = true;
  }
  //stop-the-timer
  else {
    clearTimeout(clocktimer);
    init = 0;
  }
}
//////////////////////---TIMER-END---//////////////////////////////////

function swipeDetect(elem, callback) {
  let touchsurface = elem,
    swipeDir,
    startX,
    startY,
    distX,
    distY,
    threshold = 30, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipeDir) {};

  touchsurface.addEventListener(
    "pointerdown",
    (e) => {
      swipeDir = "none";
      dist = 0;
      startX = e.pageX;
      startY = e.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
    },
    false
  );

  touchsurface.addEventListener(
    "pointermove",
    (e) => {
      e.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  touchsurface.addEventListener(
    "pointerup",
    (e) => {
      distX = e.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = e.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipeDir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipeDir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipeDir);
      e.preventDefault();
    },
    false
  );
}
