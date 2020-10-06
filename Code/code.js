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
        cell.addEventListener("mouseover", () => { cell.style.backgroundColor = bgColor;})
        gridContainer_div.appendChild(cell).className = "grid-item";
    };
};

createGrid(16, 16); //Start with a deafault 16x16 grid

//remove current grid before adding a new one
function removeGrid() {
    while(gridCells_div.length) {
        gridContainer_div.removeChild(gridContainer_div.lastChild);
    }
}

//adds event listeners to grid buttons and create the grid according to user choice
function gridBtns() {
    gridBtns_div.forEach(btn => btn.addEventListener("click", e => {
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

gridBtns();

//adds event listeners to color buttons and change the background according to user choice
function colorBtns() {
    colorBtns_div.forEach(btn => btn.addEventListener("click", e => {
        switch (e.target.id) {
            case "black":
                black_btn.classList.add("playing");
                bgColor = "black";
                break;
            case "white":
                white_btn.classList.add("playing");
                bgColor = "white";
                break;
            case "rainbow":
                rainbow_btn.classList.add("playing");
                rainbowCreator();
                break;
        };
    }));
};

colorBtns();

//generate random hex number for each cell hovered over
function rainbowCreator() {
    for (i = 0; i < gridCells_div.length; i++) {
        gridCells_div[i].onmouseover = () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
              color += letters[Math.floor(Math.random() * 16)];
            };
            bgColor = `${color}`;
            return bgColor;
        };
    };
};

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

//remove the click event transition after the transform ends
function removeTransition(e) {
    if (e.propertyName !== "transform") return; //skip the property name if it is not a transform
    this.classList.remove("playing");
}

//event to remove the transition for the respective buttons
gridBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));
colorBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));