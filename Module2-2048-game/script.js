document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("keydown", control);

  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const resultDisplay = document.getElementById("result");
  const widthBoard = 5;
  let sells = [];

  createBoard();

  function createBoard() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      let sell = document.createElement("div");
      sell.classList.add("grid__element");
      // sell.innerHTML = '';
      gridDisplay.appendChild(sell);
      sells.push(sell);
    }
    generate();
    generate();
    dinamicsStylesCell(sells);
  }

  function generate() {
    let randomNumber = Math.floor(Math.random() * sells.length);
    if (sells[randomNumber].innerHTML == 0) {
      console.log(sells);
      sells[randomNumber].innerHTML = 2;
    } else generate();
  }

  function moveToRight() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 === 0) {
        let totalOne = sells[i].innerHTML;
        let totalTwo = sells[i + 1].innerHTML;
        let totalThree = sells[i + 2].innerHTML;
        let totalFour = sells[i + 3].innerHTML;
        let totalFive = sells[i + 4].innerHTML;
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

        let newRow = zeros.concat(filteredRow);

        sells[i].innerHTML = newRow[0];
        sells[i + 1].innerHTML = newRow[1];
        sells[i + 2].innerHTML = newRow[2];
        sells[i + 3].innerHTML = newRow[3];
        sells[i + 4].innerHTML = newRow[4];
      }
    }
  }

  function moveToLeft() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 === 0) {
        let totalOne = sells[i].innerHTML;
        let totalTwo = sells[i + 1].innerHTML;
        let totalThree = sells[i + 2].innerHTML;
        let totalFour = sells[i + 3].innerHTML;
        let totalFive = sells[i + 4].innerHTML;
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

        sells[i].innerHTML = newRow[0];
        sells[i + 1].innerHTML = newRow[1];
        sells[i + 2].innerHTML = newRow[2];
        sells[i + 3].innerHTML = newRow[3];
        sells[i + 4].innerHTML = newRow[4];
      }
    }
  }

  function moveToDown() {
    for (let i = 0; i < widthBoard; i++) {
      let totalOne = sells[i].innerHTML;
      let totalTwo = sells[i + widthBoard].innerHTML;
      let totalThree = sells[i + widthBoard * 2].innerHTML;
      let totalFour = sells[i + widthBoard * 3].innerHTML;
      let totalFive = sells[i + widthBoard * 4].innerHTML;
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
      let newColumn = zeros.concat(filteredColumn);
      sells[i].innerHTML = newColumn[0];
      sells[i + widthBoard].innerHTML = newColumn[1];
      sells[i + widthBoard * 2].innerHTML = newColumn[2];
      sells[i + widthBoard * 3].innerHTML = newColumn[3];
      sells[i + widthBoard * 4].innerHTML = newColumn[4];
    }
  }

  function moveToUp() {
    for (let i = 0; i < widthBoard; i++) {
      let totalOne = sells[i].innerHTML;
      let totalTwo = sells[i + widthBoard].innerHTML;
      let totalThree = sells[i + widthBoard * 2].innerHTML;
      let totalFour = sells[i + widthBoard * 3].innerHTML;
      let totalFive = sells[i + widthBoard * 4].innerHTML;
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
      sells[i].innerHTML = newColumn[0];
      sells[i + widthBoard].innerHTML = newColumn[1];
      sells[i + widthBoard * 2].innerHTML = newColumn[2];
      sells[i + widthBoard * 3].innerHTML = newColumn[3];
      sells[i + widthBoard * 4].innerHTML = newColumn[4];
    }
  }

  function combineRow() {
    for (let i = 0; i < widthBoard * widthBoard; i++) {
      if (i % 5 !== 4 && sells[i].innerHTML === sells[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(sells[i].innerHTML) + parseInt(sells[i + 1].innerHTML);
        sells[i].innerHTML = combinedTotal;
        sells[i + 1].innerHTML = "";
      }
    }
  }

  function combineColumn() {
    for (let i = 0; i < widthBoard * widthBoard - widthBoard; i++) {
      if (
        //если раскомментировать не складывает вертикально
        // i % 5 !== 4 &&
        sells[i].innerHTML === sells[i + widthBoard].innerHTML
      ) {
        let combinedTotal =
          parseInt(sells[i].innerHTML) +
          parseInt(sells[i + widthBoard].innerHTML);
        sells[i].innerHTML = combinedTotal;
        sells[i + widthBoard].innerHTML = "";
      }
    }
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
  }

  function directionToRight() {
    moveToRight();
    combineRow();
    moveToRight();
    generate();
    dinamicsStylesCell(sells);
  }
  function directionToLeft() {
    moveToLeft();
    combineRow();
    moveToLeft();
    generate();
    dinamicsStylesCell(sells);
  }
  function directionToUp() {
    moveToUp();
    combineColumn();
    moveToUp();
    generate();
    dinamicsStylesCell(sells);
  }
  function directionToDown() {
    moveToDown();
    combineColumn();
    moveToDown();
    generate();
    dinamicsStylesCell(sells);
  }

  function dinamicsStylesCell(arr) {
    arr.forEach((item) => {
      item.classList.remove(
        "color-shadow-2",
        "color-shadow-4",
        "color-shadow-8",
        "color-shadow-16",
        "color-shadow-32",
        "color-shadow-64",
        "color-shadow-128",
        "color-shadow-256",
        "color-shadow-512",
        "color-shadow-1024",
        "color-shadow-2054"
      );

      if (item.innerHTML == "2") {
        item.classList.add("color-shadow-2");
      }
      if (item.innerHTML == "4") {
        item.classList.add("color-shadow-4");
      }
      if (item.innerHTML == "8") {
        item.classList.add("color-shadow-8");
      }
      if (item.innerHTML == "16") {
        item.classList.add("color-shadow-16");
      }
      if (item.innerHTML == "32") {
        item.classList.add("color-shadow-32");
      }
      if (item.innerHTML == "64") {
        item.classList.add("color-shadow-64");
      }
      if (item.innerHTML == "128") {
        item.classList.add("color-shadow-128");
      }
      if (item.innerHTML == "256") {
        item.classList.add("color-shadow-256");
      }
      if (item.innerHTML == "512") {
        item.classList.add("color-shadow-512");
      }
      if (item.innerHTML == "1024") {
        item.classList.add("color-shadow-1024");
      }
      if (item.innerHTML == "2048") {
        item.classList.add("color-shadow-2048");
      }
    });
  }
});
