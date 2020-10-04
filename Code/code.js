//create and cash all variables
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
const gridCells = document.getElementsByClassName("grid-item");


//create a dynamic grid based on the user choice
function createGrid(rows, cols) {
    gridContainer_div.style.setProperty("--grid-rows", rows);
    gridContainer_div.style.setProperty("--grid-cols", cols);
    for (i = 0; i < (rows*cols); i++) {
        let cell = document.createElement("div");
        cell.addEventListener("mouseover", () => { cell.style.backgroundColor = bgColor;})
        gridContainer_div.appendChild(cell).className = "grid-item";
    };
};

//adds event listeners for the grid buttons
function gridBtns() {
    sixteen_btn.addEventListener("click", function() {
        this.classList.add("playing");
        createGrid(16, 16);
    }, {once : true});

    thirtyTwo_btn.addEventListener("click", function() {
        this.classList.add("playing");
        createGrid(32, 32);
    }, {once : true});

    sixtyFour_btn.addEventListener("click", function() {
        this.classList.add("playing");
        createGrid(64, 64);
    }, {once : true});
};

gridBtns();

//adds event listeners for the color buttons
function colorBtns() {
    black_btn.addEventListener("click", e => {
        black_btn.classList.add("playing");
        bgColor = `${e.target.id}`;
    });

    white_btn.addEventListener("click", e => {
        white_btn.classList.add("playing");
        bgColor = `${e.target.id}`;
    });

    rainbow_btn.addEventListener("click", () => {
        rainbow_btn.classList.add("playing");
        for (i = 0; i < gridCells.length; i++) {
            gridCells[i].onmouseover = function(e) {
                var letters = '0123456789ABCDEF';
                var color = '#';
                for (var i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
                }
                bgColor = color;
                return bgColor;
            }
            
        }
    });
};

colorBtns();

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

//event to remove the transition
gridBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));
colorBtns_div.forEach(btn => btn.addEventListener("transitionend", removeTransition));