//create and cash all variables used
let bgColor
const btnsContainer_div = document.getElementById("btns-container");
const colorBtnsContainer_div = document.getElementById("color-btns-container")
const gridBtns_div = document.querySelectorAll(".grid-btns");
const colorBtns_div = document.querySelectorAll(".color-btns");
const black_btn = document.getElementById("black");
const white_btn = document.getElementById("white");
const rainbow_btn = document.getElementById("rainbow");
const sixteen_btn = document.getElementById("16x");
const thirtyTwo_btn = document.getElementById("32x");
const sixtyFour_btn = document.getElementById("64x");
const gridContainer_div = document.getElementById("grid-container");
const gridCells_div = document.getElementsByClassName("grid-item");

//create a dynamic grid based on the user choice
function createGrid(rows, cols) {
    gridContainer_div.style.setProperty("--grid-rows", rows);//set CSS variable with fallback values
    gridContainer_div.style.setProperty("--grid-cols", cols);
    for (i = 0; i < (rows*cols); i++) {
        let cell = document.createElement("div");
        cell.addEventListener("mouseover", () => { cell.style.backgroundColor = bgColor;});
        gridContainer_div.appendChild(cell).className = "grid-item";
    };
};

//remove current grid before adding a new one
function removeGrid() {
    while(gridCells_div.length) {
        gridContainer_div.removeChild(gridContainer_div.lastChild);
    }
}

//adds event listeners to grid buttons and create the grid according to user choice
function gridBtns() {
    Array.from(gridBtns_div).map(btn => btn.addEventListener("click", e => {
        switch (e.target.id) {
            case "16x":
                removeGrid();
                sixteen_btn.classList.add("playing");//adds transition class
                createGrid(16, 16);
                break;
            case "32x":
                removeGrid();
                thirtyTwo_btn.classList.add("playing");
                createGrid(32, 32);
                break;
            case "64x":
                removeGrid();
                sixtyFour_btn.classList.add("playing");
                createGrid(64, 64);
                break;
        };
    }));
};

//adds event listeners to color buttons and change the background according to user choice
function colorBtns() {
    Array.from(colorBtns_div).map(btn => btn.addEventListener("click", e => {
        switch (e.target.id) {
            case "black":
                black_btn.classList.add("playing");
                blackGenerator();
                break;
            case "white":
                white_btn.classList.add("playing");
                whiteGenerator();
                break;
            case "rainbow":
                rainbow_btn.classList.add("playing");
                rainbowGenerator();
                break;
        };
    }));
};

//generate white background for each cell hovered over
function blackGenerator() {
    for (i = 0; i < gridCells_div.length; i++) {
        gridCells_div[i].onmouseover = () => {
            bgColor = "black";
        };
    };
};

//generate white background for each cell hovered over
function whiteGenerator() {
    for (i = 0; i < gridCells_div.length; i++) {
        gridCells_div[i].onmouseover = () => {
            bgColor = "white";
        };
    };
};

//generate random RGB value for each cell hovered over
function rainbowGenerator() {
    for (i = 0; i < gridCells_div.length; i++) {
        gridCells_div[i].onmouseover = () => {
            let r = () => Math.random() * 256 >> 0;
            bgColor = `rgb(${r()}, ${r()}, ${r()})`;
            return bgColor;
        };
    };
};

//clear the grid painting it all white again
function clearBg() {
    Array.from(gridCells_div).map(cell => cell.style.backgroundColor = "white");
};

//Button to reset the game refreshing the browser window
function replayButton() {
    let replayBtn = document.createElement("button");
    replayBtn.innerHTML = "Reset"
    btnsContainer_div.insertBefore(replayBtn, colorBtnsContainer_div);
    replayBtn.addEventListener("click", clearBg);
}

//remove the click event transition after the transform ends
function removeTransition(e) {
    if (e.propertyName !== "transform") return; //skip the property name if it is not a transform
    this.classList.remove("playing");
}

//event to remove the transition for the respective buttons
gridBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));
colorBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));


createGrid(16, 16); //Start with a deafault 16x16 grid

gridBtns(); //Event listeners and subsequent actions dependending on grid button selected by the user

colorBtns(); //Event listeners and subsequent actions dependending on grid button selected by the user

replayButton(); //button to reset the background color for divs in the grid