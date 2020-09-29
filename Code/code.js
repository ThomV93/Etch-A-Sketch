//create and cash all variables
let bgColor
const black_btn = document.getElementById("black");
const white_btn = document.getElementById("white");
const rainbow_btn = document.getElementById("rainbow");
const sixteen_btn = document.getElementById("16x");
const thirtyTwo_btn = document.getElementById("32x");
const sixtyFour_btn = document.getElementById("64x");
const gridContainer_div = document.getElementById("grid-container");
const btnsContainer_div = document.getElementById("btns-container");
const colorBtnsContainer_div = document.getElementById("color-btns-container")

//create a dynamic grid based on the user choice
function createGrid(rows, cols) {
    gridContainer_div.style.setProperty("--grid-rows", rows);
    gridContainer_div.style.setProperty("--grid-cols", cols);
    for (i = 0; i < (rows*cols); i++) {
        let cell = document.createElement("div");
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = bgColor;
        })
        gridContainer_div.appendChild(cell).className = "grid-item";
    };
};

//adds event listeners for the color buttons
function colorBtns() {
    black_btn.addEventListener("click", e => {
        bgColor = `${e.target.id}`;
    });

    white_btn.addEventListener("click", e => {
        bgColor = `${e.target.id}`;
    });

    rainbow_btn.addEventListener("click", () => {
        bgColor = `${generateRandomColor()}`;
    });
};

colorBtns();
//adds event listeners for the grid buttons
function gridBtns() {
    sixteen_btn.addEventListener("click", function() {
        createGrid(16, 16);
    });

    thirtyTwo_btn.addEventListener("click", function() {
        createGrid(32, 32);
    });

    sixtyFour_btn.addEventListener("click", function() {
        createGrid(64, 64);
    });
};

gridBtns();

//generate random color
function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

//refresh window
function refreshGame() {
    window.location.reload();
}

//Button to reset the game refreshing the browser window
function replayButton() {
    let replayBtn = document.createElement("button");
    replayBtn.innerHTML = "Reset"
    btnsContainer_div.insertBefore(replayBtn, colorBtnsContainer_div);
    replayBtn.addEventListener("click", refreshGame);
}

replayButton();