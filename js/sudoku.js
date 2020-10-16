const sudoku = document.getElementById("sudoku");
const btnSolve = document.getElementById("solve");

btnSolve.addEventListener("click",compute);

let temp = new Array(9);

/**
 * Create sudoku grid
 * @param {int} array array with number
 */
function createTable(array) {
    let table = document.createElement("table");
    sudoku.appendChild(table);
	for (let i = 0; i < array.length; i++) {
		array[i] = new Array(9);
		let row = document.createElement("tr");
		table.appendChild(row);
		for (let j = 0; j < array[i].length; j++) {
            array[i][j] = document.createElement("input");   
            array[i][j].type = "text";
            array[i][j].maxLength = "1"; 
			if (j === 2 || j == 5) {
				array[i][j].className = "blackCase";
				if (i === 2 || i === 5) {
					array[i][j].className = "blackCase2";
				}
			} else if (i === 2 || i === 5) {
				array[i][j].className = "blackCase3";
			} else {
				array[i][j].className = "case";
            }		
			row.appendChild(array[i][j]);
		}
    }
}

/**
 * Create array to put value
 * @param {int} array 
 */
function toArray(array) {
    let toRet = new Array(9);
    for (let i = 0; i < array.length; i++) {
        toRet[i] = new Array(9);
		for (let j = 0; j < array[i].length; j++) {
            if (array[i][j].value > 0 && array[i][j].value < 10) {
                array[i][j].style.color = "red";
                toRet[i][j] = parseInt(array[i][j].value);
            } else {
                toRet[i][j] = 0;
            }
        }
    }
    return toRet;
}

/**
 * Display array
 * @param {int} array 
 */
function toDisplay(array) {
    for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) { 
            temp[i][j].value = array[i][j];
        }
    }
}

/**
 * Reload page
 */
function doIt() {
    location.reload();
}

/**
 * Determine if a value is in row
 * @param {int} k value 
 * @param {int} array sudoku
 * @param {int} i row
 */
function lineOk(k,array,i) {
    for (let j = 0; j < 9; j++) {
        if (array[i][j] == k) {
            return false;
        }
    }
    return true;
}

/**
 * Determine if a value is in column
 * @param {int} k value to search
 * @param {int} array sudoku
 * @param {int} j column
 */
function columnOk(k,array,j) {
    for (let i=0; i < 9; i++) {
        if (array[i][j] == k) {
            return false;
        }
    }
    return true;
}

/**
 * Determine if a value is in block
 * @param {int} k value to search
 * @param {int} array sudoku
 * @param {int} i row
 * @param {int} j column
 */
function blockOk(k,array,i,j) {
    let _i = i - (i % 3), _j = j - (j % 3);  
    for (i =_i; i < _i+3; i++) {
        for (j =_j; j < _j+3; j++) {
            if (array[i][j] == k) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Determine if a value is not in 
 * line, column and block
 * @param {int} k number to search
 * @param {int} array array of value 
 * @param {int} i row
 * @param {int} j column
 */
function isOk(k,array,i,j) {
    return lineOk(k,array,i) && columnOk(k,array,j) && blockOk(k,array,i,j);
}

/**
 * Solve the sudoku with backtracking algorithm
 * @param {int} array array with value
 * @param {int} position case number
 */
function solve(array,position) {
    if (position === 81)
        return true;

    let i = Math.floor(position / 9), j = Math.floor(position % 9);

    if (array[i][j] != 0) {
        return solve(array, position+1);
	}

    for (let k = 1; k <= 9; k++) {
        if (isOk(k,array,i,j)) {
            array[i][j] = k;
            if (solve(array, position+1)) {
				return true;
			}
        }
    }
    array[i][j] = 0;
    return false;
}

/**
 * Solve sudoku
 */
function compute() {

    let grid = toArray(temp);

    btnSolve.hidden = "true";

    let startTime = new Date().getTime();
    let elapsedTime = 0;

    solve(grid,0);

    toDisplay(grid);
   
    elapsedTime = (new Date().getTime() - startTime) / 1000;

    let time = document.createElement("p");
    let content = document.createTextNode("Solved in : " + elapsedTime + " seconds");
    time.appendChild(content);
    document.body.appendChild(time);

    let again = document.createElement("button");
	let contentAgain = document.createTextNode("Again");
    again.appendChild(contentAgain);
    document.body.appendChild(again);
    again.addEventListener("click",doIt);
}


createTable(temp);

