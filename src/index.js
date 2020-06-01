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

  const img1 = getDieImage(options.allDice[0], "diceImage");
  const img2 = getDieImage(options.allDice[1], "diceImage");
  const img3 = getDieImage(options.allDice[2], "diceImage");
  const img4 = getDieImage(options.allDice[3], "diceImage");

  allDiceNode.appendChild(brEl);
  allDiceNode.appendChild(img1);
  allDiceNode.appendChild(img2);
  allDiceNode.appendChild(img3);
  allDiceNode.appendChild(img4);

  const firstOptionEl = document.getElementById("option1text")
  firstOptionEl.textContent = options.combination1[0].value + " " + options.combination1[1].value;
  const firstOptionNode = document.querySelector("#option1");
  getCombinationImages(firstOptionNode, options.combination1);

  const secondOptionEl = document.getElementById("option2text")
  secondOptionEl.textContent = options.combination2[0].value + " " + options.combination2[1].value;
  const secondOptionNode = document.querySelector("#option2");
  getCombinationImages(secondOptionNode, options.combination2);

  const thirdOptionEl = document.getElementById("option3text")
  thirdOptionEl.textContent = options.combination3[0].value + " " + options.combination3[1].value;
  const thirdOptionNode = document.querySelector("#option3");
  getCombinationImages(thirdOptionNode, options.combination3);
}

const getCombinationImages = (node, combination) => {

  const optimg1 = getDieImage(combination[0].dice[0], "diceImage");
  const optimg2 = getDieImage(combination[0].dice[1], "endOfPairImage");
  node.appendChild(optimg1);
  node.appendChild(optimg2);

  const optimg3 = getDieImage(combination[1].dice[0], "diceImage");
  const optimg4 = getDieImage(combination[1].dice[1], "diceImage");
  node.appendChild(optimg3);
  node.appendChild(optimg4);

}

const getDieImage = (dieRoll, className) => {

  const img = document.createElement("IMG");
  img.className = className;

  let src = "./src/img/six.PNG";

  if (dieRoll == 1) {
    src = "./src/img/one.PNG";
  } else if (dieRoll == 2) {
    src = "./src/img/two.PNG";
  } else if (dieRoll == 3) {
    src = "./src/img/three.PNG";
  } else if (dieRoll == 4) {
    src = "./src/img/four.PNG";
  } else if (dieRoll == 5) {
    src = "./src/img/five.PNG";
  }

  img.src = src;

  return img;

}