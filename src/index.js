const columns = 13;
const midColumn = 7;
const grid = [];

const getNumberOfRows = (column) => {
  // me not good at math
  if (column <= midColumn) return Math.round(column * 2 - 1);
  if (column > midColumn)
    return getNumberOfRows(midColumn - (column - midColumn));
};

for (let column = 0; column < columns; column++) {
  const row = [];
  const numberOfRowsInColumn = getNumberOfRows(column + 1);
  for (let rowNum = 0; rowNum < numberOfRowsInColumn; rowNum++) {
    row.push(rowNum + 1);
  }
  grid.push(row);
}

const gridEl = document.querySelector(".grid");

grid.forEach((column, columnIdx) => {
  const columnEl = document.createElement("div");
  columnEl.className = "column";
  columnEl.setAttribute("id", "col" + columnIdx);
  column.forEach((row, rowIdx) => {
    const rowEl = document.createElement("div");
    rowEl.setAttribute("id", "col" + columnIdx + "row" + rowIdx);
    rowEl.className = "row";
    rowEl.innerText = columnIdx + 1;
    columnEl.appendChild(rowEl);
  });
  gridEl.appendChild(columnEl);
});


const roll = () => {
  fetch("http://localhost:8080/cantstop/roll")
  .then(response => response.json())
  .then(data => {
    console.log(data); 
    createRollOptions(data);
  });
}

const createRollOptions = (options) => {

  const allDiceEl = document.getElementById("allDice");
  const allDiceNode = document.querySelector("#allDice");
  allDiceEl.innerText = "All Dice: ";

  const brEl = document.createElement("BR");

  const img1 = document.createElement("IMG");
  img1.className = "diceImage"
  img1.src = getDieImage(options.allDice[0]);
  const img2 = document.createElement("IMG");
  img2.className = "diceImage"
  img2.src = getDieImage(options.allDice[1]);
  const img3 = document.createElement("IMG");
  img3.className = "diceImage";
  img3.src = getDieImage(options.allDice[2]);
  const img4 = document.createElement("IMG");
  img4.className = "diceImage";
  img4.src = getDieImage(options.allDice[3]);

  allDiceNode.appendChild(brEl);
  allDiceNode.appendChild(img1);
  allDiceNode.appendChild(img2);
  allDiceNode.appendChild(img3);
  allDiceNode.appendChild(img4);

  const firstOptionEl = document.getElementById("option1");
  const allDiceNode = document.querySelector("#option1");
  firstOptionEl.innerText = "Option 1: " + options.combination1[0].value + " " + options.combination1[1].value;
  const brEl2 = document.createElement("BR");

  const secondOptionEl = document.getElementById("option2");
  secondOptionEl.innerText = "Option 2: " + options.combination2[0].value + " " + options.combination2[1].value;

  const thirdOptionEl = document.getElementById("option3");
  thirdOptionEl.innerText = "Option 3: " + options.combination3[0].value + " " + options.combination3[1].value;
}

const getDieImage = (dieRoll) => {

  console.log(dieRoll);
  if (dieRoll == 1) {
    return "./src/img/one.PNG";
  } else if (dieRoll == 2) {
    return "./src/img/two.PNG";
  } else if (dieRoll == 3) {
    return "./src/img/three.PNG";
  } else if (dieRoll == 4) {
    return "./src/img/four.PNG";
  } else if (dieRoll == 5) {
    return "./src/img/five.PNG";
  }

  return "./src/img/six.PNG";

}