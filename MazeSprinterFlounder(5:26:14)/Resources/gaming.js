

function play_game(){
	//while user is in bounds
		plot_maze();
		//allow finger object to move
		//scrolling
	//when user leaves bounds user has died
}


function plot_maze(){
	//expect that the canvas has been "prepared"
		
	for (hh = 0; hh < mazeHeight; hh++) {
		for (ww = 0; ww < mazeWidth; ww++) {
			// if this cell has the north bit set, plot line at top
			// and so on for other three walls
		
			if (mazeCells[hh][ww][0] === 0) {  			//ceiling
				//horizontalLine.top = (hh * cellSize);
				//horizontalLine.left = (ww * cellSize);
				//gameWindow.add(horizontalLine);
				canvas.moveTo(ww * cellSize, hh * cellSize);
		        canvas.lineTo((ww+1)*cellSize - 1, hh * cellSize);
			}
			if (mazeCells[hh][ww][1] === 0) {			// right wall
				//horizontalLine.top = (hh * cellSize);
				//horizontalLine.left = ((ww + 1) * cellSize) - 1;
				//gameWindow.add(horizontalLine);
				canvas.moveTo((ww+1) * cellSize - 1, (hh * cellSize));
		        canvas.lineTo((ww+1) * cellSize - 1, (hh + 1) * cellSize - 1);
			}
			if (mazeCells[hh][ww][2] === 0) {			// floor
				//verticalLine.top = ((hh + 1) * cellSize) - 1;
				//verticalLine.left = (ww * cellSize);
				//gameWindow.add(verticalLine);
				canvas.moveTo(ww * cellSize, (hh + 1) * cellSize - 1);
		        canvas.lineTo((ww+1)*cellSize - 1, (hh + 1) * cellSize - 1);
			}
			if (mazeCells[hh][ww][3] === 0) {			// left wall
				//verticalLine.top = (hh * cellSize);
				//verticalLine.left = (ww * cellSize);
				//gameWindow.add(verticalLine);
				canvas.moveTo(ww * cellSize, (hh * cellSize));
		        canvas.lineTo(ww * cellSize, (hh + 1) * cellSize - 1);
			}
		} // end for ww
	} // end for hh
		
	canvas.stroke(); //what does this really do?
    canvas.commit(); //what does this really do?
    
    //var foo = 972.21;
    //gameWindow.add(canvas);
}
//end maze generator

function touchedwallofcurrentcell(y, x) {
	// figure out parameters for touch point
	var upLeftX = x;
	var upLeftY = y;
	var lowerRightX = x + diameterTouchPoint;
	var lowerRightY = y + diameterTouchPoint;

	// divide y and x by cellSize (inverse of plot_maze does) to know which row & column we're dealing with
	var gridrow = Math.floor(upLeftY / cellSize); 
	var gridcol = Math.floor(upLeftX / cellSize);
	//console.log("touchedwall:" + gridrow, gridcol);
	
	//for each wall that is present, check if we hit it
	if (mazeCells[gridrow][gridcol][0] === 0 && 
		upLeftY < gridrow*cellSize + lineSize) {  				//ceiling
			return(true);
	}
	if (mazeCells[gridrow][gridcol][1] === 0 &&
		lowerRightX > (gridcol+1)*cellSize - lineSize-1) {  	//right wall
			return(true);
	}
	if (mazeCells[gridrow][gridcol][2] === 0 &&  				
		lowerRightY > (gridrow+1)*cellSize - lineSize-1) {		//floor
			return(true);
	}
	if (mazeCells[gridrow][gridcol][3] === 0 &&
		upLeftX < gridcol*cellSize + lineSize) {  				//left wall
			return(true);
	}
	return(false);
}
