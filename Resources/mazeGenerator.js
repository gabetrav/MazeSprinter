function dataSetup() {
	//reset variables so they can play again
	console.log("dataSetup");
	
	diameterTouchPoint = 35;
	radiusBorder = diameterTouchPoint/2;
    movable.top = yStartTouchPoint;
    movable.left = xStartTouchPoint;
    movable2.top = yStartTouchPoint;
    movable2.left = xStartTouchPoint;
    movable.width = diameterTouchPoint;
    movable.height = diameterTouchPoint;

    score = 0;
    sec = 0;
    nearTop = false;

	mazeWidth = 3;
	mazeHeight = 30;
	cellSize = 320/mazeWidth;
	lineSize = 4;
	mazePane.height = mazeHeight*cellSize;
	
	tolerance = 3*cellSize;
	toleranceLvl2 = 2*cellSize;
	toleranceLvl3 = cellSize;
	
	return (null);
}


function newMaze(x, y) {
    // Establish variables and starting grid
    
    var totalCells = x*y;
    var cells = new Array();
    var unvis = new Array();
    
    for (var i = 0; i < y; i++) {
        cells[i] = new Array();
        unvis[i] = new Array();
        for (var j = 0; j < x; j++) {
            cells[i][j] = [0,0,0,0];
            unvis[i][j] = true;
        }
    }
    console.log("newmaze x ",x,"y",y);
    
    // Set a random position to start from
    //var currentCell = [Math.floor(Math.random()*y), Math.floor(Math.random()*x)];
    var currentCell = [mazeHeight - 1, 0];
    
    var path = [currentCell];
    unvis[currentCell[0]][currentCell[1]] = false;
    var visited = 1;
    
    // Loop through all available cell positions
    while (visited < totalCells) {
        // Determine neighboring cells
        var pot = [[currentCell[0]-1, currentCell[1], 0, 2],
                [currentCell[0], currentCell[1]+1, 1, 3],
                [currentCell[0]+1, currentCell[1], 2, 0],
                [currentCell[0], currentCell[1]-1, 3, 1]];
        var neighbors = new Array();
        
        // Determine if each neighboring cell is in game grid, and whether it has already been checked
        for (var l = 0; l < 4; l++) {
            if (pot[l][0] > -1 && pot[l][0] < y && pot[l][1] > -1 && pot[l][1] < x && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
        }
        
        // If at least one active neighboring cell has been found
        if (neighbors.length) {
            // Choose one of the neighbors at random
            next = neighbors[Math.floor(Math.random()*neighbors.length)];
            
            // Remove the wall between the current cell and the chosen neighboring cell
            cells[currentCell[0]][currentCell[1]][next[2]] = 1;
            cells[next[0]][next[1]][next[3]] = 1;
            
            // Mark the neighbor as visited, and set it as the current cell
            unvis[next[0]][next[1]] = false;
            visited++;
            currentCell = [next[0], next[1]];
            path.push(currentCell);
        }
        // Otherwise go back up a step and keep going
        else {
            currentCell = path.pop();
        }
    }
    return cells;
}