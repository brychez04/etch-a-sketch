const reset = document.getElementById("reset");
const gridSizeInput = document.getElementById("grid-size");
const cells = document.getElementById("cells");
//grid will be gridSize x gridSize cells
let gridSize = 16;
generateGrid(16);


function generateGrid(gridSize){
    cells.replaceChildren();
    
    for(i = 0; i < gridSize; i++){
        let row = document.createElement("row");
        row.classList.add("row");
        for (j = 0; j < gridSize; j++){
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor
            cell.addEventListener("mouseover", (e)=>{
                if(e.buttons == 1 || e.buttons == 3) color(cell);
            });
            row.appendChild(cell);
            cell.style.back
        }
        cells.appendChild(row);
    }
}

function color(cell){
    //The alpha value in rgba value of cell color. It determines the opacity of the cell color, and it ranges from 0 to 1;
    let alpha = parseFloat(cell.style.backgroundColor.substring(cell.style.backgroundColor.length - 4, cell.style.backgroundColor.length - 1));
    //once the alpha is 1, the color will turn into an rgb value, and the alpha vlaue will dissapear. 
    //This will make the code below parse the b value instead, and so alpha will equal the b value. It doesn't affect functionality, but it looks confusing

    if(cell.style.backgroundColor == ""){
        let r = Math.random()*255;
        let g = Math.random()*255;
        let b = Math.random()*255;
        cell.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", " + .1 + ")";
    }else{
        if(alpha < 1){
            //the increaseOpacity function increases the alpha value by string manipulation
            cell.style.backgroundColor = increaseOpacity(cell.style.backgroundColor, alpha);
        }
    }
}

function increaseOpacity(color, alpha){
    //parsed rbga value. It looks like this: "rbga(n, n, n, "
    color = color.substring(0, color.length - 4);
    //increase opacity
    alpha += .1;
    //reconstructing string. Looks like this: "rgba(n, n, n, " + "alpha)"
    color += alpha + ")";
    return color;
}


gridSizeInput.addEventListener("keyup", ({key})=> {
    if (key === "Enter") {
        gridSize = gridSizeInput.value;
        gridSizeInput.blur();
        if(isNaN(Number(gridSize)) || gridSize > 100 || gridSize < 1 ){
            alert("For grid size, please enter an integer from 1 to 100");

        }else{
            gridSize = Math.round(gridSize);
            gridSizeInput.value = gridSize;
            generateGrid(gridSize);
        } 
    }
});

reset.addEventListener("click", ()=>{
    let allCells = cells.getElementsByTagName("*");

    for(i = 0; i < allCells.length; i++){
        let cell = allCells.item(i)
        cell.style.backgroundColor = "";
    }
});

