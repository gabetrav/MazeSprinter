movable2.addEventListener('touchstart', function(e){
    offset.x = e.x - movable.left;
    offset.y = e.y - movable.top;
});
 
// Note the following similarities -- touch and touchmove do very similar things !

movable2.addEventListener('touch', function(e){
    offset.x = e.x - movable.left;
    offset.y = e.y - movable.top;
	
	// Auto-detect and force scrolling
	
	if (movable.top <= tolerance) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 1); //just a wee bit
    }
    if (movable.top >= 568 - tolerance) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 1); 
    }
    //multi-level threshhold
    else if (movable.top <= toleranceLvl2) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 20); //just a wee bit
    }
    else if (movable.top >= 568 - toleranceLvl2) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 20); 
    }
    else if (movable.top <= toleranceLvl3) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 30); //just a wee bit
    }
    else if (movable.top >= 568 - toleranceLvl3) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 30); 
    }	
});

movable2.addEventListener('touchmove', function(e){
    movable.left = e.x - offset.x;
    movable.top = e.y - offset.y;
     
	// Note that touch and touchmove do very similar things !
    
    //debug display
    console.log ("touchmove Listener", movable.top, "offset", scrollView.contentOffset.y, "e.y", e.y);
    
    // Did they win?  If they hit row 0 !
    
    if (movable.top + scrollView.contentOffset.y <= (cellSize / 2)) {
    	winScoreLabel.text = "Score: " + sec;
    	winWindow.add(winScoreLabel);
    	winSound.play();
    	winWindow.open();
    	winLabel.animate({
			opacity: .3,
			duration: 1000,
			repeat:100,
			autoreverse:true,
			curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
		}); 
    	gameWindow.close();
	    console.log("gamewindow_closed_from_touchmove");
    	clearInterval(refreshIntervalId);
    }	
	
	// Auto-detect and force scrolling

    if (movable.top <= tolerance) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 10); //just a wee bit
    }
    if (movable.top >= 568 - tolerance) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 10); 
    }
    //multi-level threshhold
    if (movable.top <= toleranceLvl2) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 20); //just a wee bit
    }
    if (movable.top >= 568 - toleranceLvl2) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 20); 
    }
    if (movable.top <= toleranceLvl3) {
    	console.log ("*** force scroll down ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y - 30); //just a wee bit
    }
    if (movable.top >= 568 - toleranceLvl3) {
    	console.log ("*** force scroll up ***");
    	scrollView.scrollTo(0, scrollView.contentOffset.y + 30); 
    }
    
    // Did they die?
    
    if (touchedwallofcurrentcell(movable.top + scrollView.contentOffset.y, movable.left + scrollView.contentOffset.x)){
    	deathScoreLabel.text = "Score: " + sec;
    	deathWindow.add(deathScoreLabel);
    	deathWindow.open({modal: true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, });
		deathLabel.animate({
			opacity: .3,
			duration: 1000,
			repeat:100,
			autoreverse:true,
			curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
		});
    	gameWindow.close();
	    console.log("gamewindow_closed");
    	endSound.play();
    	clearInterval(refreshIntervalId);
    }
});

//previously mazePane.addEventListener
/*scrollView.addEventListener('scroll', function(e){
    console.log ("scrollView Scroll listener");
    if (touchedwallofcurrentcell(movable.top + scrollView.contentOffset.y, movable.left + scrollView.contentOffset.x)){
    	console.log ("------------------------");
    	deathWindow.open({modal: true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, });
    	gameWindow.close();
    	endSound.play();
    }
});
*/
 
movable2.addEventListener('touchend', function(e){
    movable2.left = e.x - offset.x;
    movable2.top = e.y - offset.y;
});
