//create and cash all variables
const black_btn = document.getElementById("black");
const white_btn = document.getElementById("white");
const rainbow_btn = document.getElementById("rainbow");
const sixteen_btn = document.getElementById("16x");
const thirtyTwo_btn = document.getElementById("32x");
const sixtyFour_btn = document.getElementById("64x");
const gridContainer_div = document.getElementById("grid-container");
const btnsContainer_div = document.getElementById("btns-container");
let gridItem_div = document.getElementsByClassName("grid-item");

//create a dynamic grid based on the user choice
function createGrid(rows, cols) {
    gridContainer_div.style.setProperty("--grid-rows", rows);
    gridContainer_div.style.setProperty("--grid-cols", cols);
    for (i = 0; i < (rows*cols); i++) {
        let cell = document.createElement("div");
        gridContainer_div.appendChild(cell).className = "grid-item";
    };
};

//adds event listeners fot the color buttons
function colorBtns() {
    black_btn.addEventListener("click", changeColor(black));
}
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
//Set up a hover effect so that the grid divs change color when your mouse passes over
//add a new class to the div in order to changes it's color

//refresh window
function refreshGame() {
    window.location.reload();
}

//Button to reset the game refreshing the browser window
function replayButton() {
    let replayBtn = document.createElement("button");
    replayBtn.innerHTML = "Reset"
    btnsContainer_div.appendChild(replayBtn);
    replayBtn.addEventListener("click", refreshGame);
}

replayButton();