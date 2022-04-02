document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", control);

  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const widthBoard = 5;
  let cells = [];
  let score = 0;
  let isScoreChanged = false;
  let isCellsMoved = false;

  createBoard();

  function createBoard() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      let cell = document.createElement("div");
      cell.classList.add("grid__element");
      gridDisplay.appendChild(cell);
      cells.push(cell);
    }
    generate();
    generate();
    dynamicsStylesCell(cells);
  }

  function generate() {
    let randomNumber = Math.floor(Math.random() * cells.length);
    if (cells[randomNumber].innerHTML == "") {
      cells[randomNumber].innerHTML = twoOrFourGenerator();
      checkForGameOver(cells);
    } else generate();
  }

  function moveToRight() {

    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 === 0) {

        let totalOne = cells[i].innerHTML;
        let totalTwo = cells[i + 1].innerHTML;
        let totalThree = cells[i + 2].innerHTML;
        let totalFour = cells[i + 3].innerHTML;
        let totalFive = cells[i + 4].innerHTML;
        let row = [
          parseInt(totalFive),
          parseInt(totalFour),
          parseInt(totalThree),
          parseInt(totalTwo),
          parseInt(totalOne),
        ];


        let filteredRow = row.filter((num) => num);

        let missing = 5 - filteredRow.length;
        let zeros = Array(missing).fill(null);

        let newRow = zeros.concat(filteredRow);

        cells[i].innerHTML = newRow[0];
        cells[i + 1].innerHTML = newRow[1];
        cells[i + 2].innerHTML = newRow[2];
        cells[i + 3].innerHTML = newRow[3];
        cells[i + 4].innerHTML = newRow[4];
      }

    }
  }

  function moveToLeft() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 === 0) {
        let totalOne = cells[i].innerHTML;
        let totalTwo = cells[i + 1].innerHTML;
        let totalThree = cells[i + 2].innerHTML;
        let totalFour = cells[i + 3].innerHTML;
        let totalFive = cells[i + 4].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
          parseInt(totalFive),
        ];

        let filteredRow = row.filter((num) => num);

        let missing = 5 - filteredRow.length;
        let zeros = Array(missing).fill(null);

        let newRow = filteredRow.concat(zeros);

        cells[i].innerHTML = newRow[0];
        cells[i + 1].innerHTML = newRow[1];
        cells[i + 2].innerHTML = newRow[2];
        cells[i + 3].innerHTML = newRow[3];
        cells[i + 4].innerHTML = newRow[4];
      }
    }
  }

  function moveToDown() {
    for (let i = 0; i < widthBoard; i++) {
      let totalOne = cells[i].innerHTML;
      let totalTwo = cells[i + widthBoard].innerHTML;
      let totalThree = cells[i + widthBoard * 2].innerHTML;
      let totalFour = cells[i + widthBoard * 3].innerHTML;
      let totalFive = cells[i + widthBoard * 4].innerHTML;
      let column = [
        parseInt(totalFive),
        parseInt(totalFour),
        parseInt(totalThree),
        parseInt(totalTwo),
        parseInt(totalOne),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 5 - filteredColumn.length;
      let zeros = Array(missing).fill(null);
      let newColumn = zeros.concat(filteredColumn);
      cells[i].innerHTML = newColumn[0];
      cells[i + widthBoard].innerHTML = newColumn[1];
      cells[i + widthBoard * 2].innerHTML = newColumn[2];
      cells[i + widthBoard * 3].innerHTML = newColumn[3];
      cells[i + widthBoard * 4].innerHTML = newColumn[4];
    }
  }

  function moveToUp() {
    for (let i = 0; i < widthBoard; i++) {
      let totalOne = cells[i].innerHTML;
      let totalTwo = cells[i + widthBoard].innerHTML;
      let totalThree = cells[i + widthBoard * 2].innerHTML;
      let totalFour = cells[i + widthBoard * 3].innerHTML;
      let totalFive = cells[i + widthBoard * 4].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
        parseInt(totalFive),
      ];
      let filteredColumn = column.filter((num) => num);
      let missing = 5 - filteredColumn.length;
      let zeros = Array(missing).fill(null);
      let newColumn = filteredColumn.concat(zeros);
      cells[i].innerHTML = newColumn[0];
      cells[i + widthBoard].innerHTML = newColumn[1];
      cells[i + widthBoard * 2].innerHTML = newColumn[2];
      cells[i + widthBoard * 3].innerHTML = newColumn[3];
      cells[i + widthBoard * 4].innerHTML = newColumn[4];
    }
  }

  function combineRow() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 !== 4 && cells[i].innerHTML === cells[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(cells[i].innerHTML) + parseInt(cells[i + 1].innerHTML);
        cells[i].innerHTML = combinedTotal;
        cells[i + 1].innerHTML = "";
        if (!Number.isNaN(combinedTotal)) {
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
          generate();
        }
      }
    }
    checkForWin(cells);
  }

  function combineColumn() {
    for (let i = 0; i < widthBoard * widthBoard - widthBoard; i++) {
      if (
        //если раскомментировать не складывает вертикально
        // i % 5 !== 4 &&
        cells[i].innerHTML === cells[i + widthBoard].innerHTML
      ) {
        let combinedTotal =
          parseInt(cells[i].innerHTML) +
          parseInt(cells[i + widthBoard].innerHTML);
        cells[i].innerHTML = combinedTotal;
        cells[i + widthBoard].innerHTML = "";

        if (!Number.isNaN(combinedTotal)) {
          score += combinedTotal;
          scoreDisplay.innerHTML = score;
          generate();
        }
      }
    }
    checkForWin(cells);
  }

  function control(e) {
    if (e.code == "ArrowUp") {
      directionToUp();
    } else if (e.code == "ArrowRight") {
      directionToRight();
    } else if (e.code == "ArrowDown") {
      directionToDown();
    } else if (e.code == "ArrowLeft") {
      directionToLeft();
    }
    generate();
    dynamicsStylesCell(cells);
  }

  function directionToRight() {
    moveToRight();
    combineRow();
    moveToRight();
  }

  function directionToLeft() {
    moveToLeft();
    combineRow();
    moveToLeft();
  }

  function directionToUp() {
    moveToUp();
    combineColumn();
    moveToUp();
  }

  function directionToDown() {
    moveToDown();
    combineColumn();
    moveToDown();
  }

  function dynamicsStylesCell(arr) {
    arr.forEach((item) => {
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

      if (item.innerHTML == "2") {
        item.classList.add("dynamic-style-2");
      }
      if (item.innerHTML == "4") {
        item.classList.add("dynamic-style-4");
      }
      if (item.innerHTML == "8") {
        item.classList.add("dynamic-style-8");
      }
      if (item.innerHTML == "16") {
        item.classList.add("dynamic-style-16");
      }
      if (item.innerHTML == "32") {
        item.classList.add("dynamic-style-32");
      }
      if (item.innerHTML == "64") {
        item.classList.add("dynamic-style-64");
      }
      if (item.innerHTML == "128") {
        item.classList.add("dynamic-style-128");
      }
      if (item.innerHTML == "256") {
        item.classList.add("dynamic-style-256");
      }
      if (item.innerHTML == "512") {
        item.classList.add("dynamic-style-512");
      }
      if (item.innerHTML == "1024") {
        item.classList.add("dynamic-style-1024");
      }
      if (item.innerHTML == "2048") {
        item.classList.add("dynamic-style-2048");
      }
    });
  }

  function checkForWin(arr) {
    arr.forEach((item) => {
      if (item.innerHTML == 2048) {
        document.removeEventListener("keydown", control);
        resultDisplay.innerHTML = "Win!";
      }
    });
  }

  function checkForGameOver(arr) {
    let emptyCells = 0;
    arr.forEach((item) => {
      if (item.innerHTML === "") {
        emptyCells++;
      }
    });
    if (emptyCells === 0) {
      document.removeEventListener("keydown", control);
      resultDisplay.innerHTML = "Lose!";
    }
  }

  function checkForCellsMove() {

  }

  function twoOrFourGenerator() {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    switch (randomNumber) {
      case 10: return 4;
      default: return 2;
    }
  }

  function isEqual(a, b) {
    // если длина не равна

    if (a.length != b.length) return "False";
    else {
      // сопоставляем каждый элемент массива

      for (var i = 0; i < a.length; i++) {
        if (a[i] != b[i]) return "False";
      }

      return "True";
    }
  }

});
