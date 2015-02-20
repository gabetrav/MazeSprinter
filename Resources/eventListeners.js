scrollView.addEventListener('scroll',function(e){
        console.log("NearTop? mazepane.GetRect.height ",mazePane.getRect().height, "e.y", e.y);
        
        //nearBottom = (mazePane.getRect().height - e.y) <= (scrollView.getRect().height + tolerance);
        //TRUE					THIS                     <=    THIS                  
        //if (mazePane.getRect().height - e.y < tolerance) {
        	//console.log("forcescroll1??");
        	//nearTop = true;
        //};
});

scrollView.addEventListener('scrollend',function(e){
        if (nearTop) {
            //this.scrollTo(0,bottomLine);
            //loadingView.setVisible(true);
            //console.log("ScrollEnd??");
            //nearTop = false;
            //scrollView.fireEvent('InfiniteScrolling');
        }
}); 
    
// Other event listeners

pauseButton.addEventListener('click', function(e){
	//when added pause window shows but cannot be transparent 	
	gameWindow.close();
    console.log("gamewindow_close_from_paused");
	pauseWindow.open();
	sound.play();
});

creditsButton.addEventListener('click', function(e){
    creditsAlert.show();
    sound.play();
});

//pauseWindow.addEventListener('touchstart', function(e){
   // pauseWindow.close();
  //  gameWindow.open();
//});
musicButton.addEventListener('click', function(e){
    musicButton.opacity = .5;
    musicButton.url = null;
    sound.play();
});
soundButton.addEventListener('click', function(e){
    soundButton.opacity = .5;
    sound.play();
});
leaderboardsButton.addEventListener('click', function(e){
    alert('Leaderboards Functionality is not yet avalible but will be coming in the near future!');
    sound.play();
});

optionsButton.addEventListener('click', function(e){
    sound.play();
    optionsButton.animate(spin);
    optionsScrollView.scrollTo(250,0);
    setTimeout(function(){
    optionsButton.animate(backspin);
    optionsScrollView.scrollTo(0,0);
}, 4000);
    sound.play();
});


mainWindow.addEventListener("open", function(e){
	title.animate({
		opacity: .3,
		duration: 1000,
		repeat:100,
		autoreverse:true,
		curve:Titanium.UI.ANIMATION_CURVE_EASE_IN_OUT
	});
	console.log("--mainwindow.open got called--");
	
	scrollView.scrollTo(0, cellSize * mazeHeight);
	//scrollView.decelerationRate = UIScrollViewDecelerationRateFast;
	//console.log('on open scrollview y', cellSize * mazeHeight);
	
	//attempt
	//mainWindow.add(scrollView);
	//mazeCells = newMaze(mazeWidth, mazeHeight);
	//canvas.begin();
    //canvas.beginPath();
    //canvas.lineCap('round');
    //canvas.lineWidth(lineSize);
	dataSetup();

});

difficultyButton.addEventListener('click', function(e){
    sound.play();
    mainWindow.add(difficultyView);
    //difficultyView.open();
    difficultyPicker.setSelectedRow(0, 0, false);
});
tapToResume.addEventListener('click', function(e){
 	gameWindow.open();
    console.log("gamewindow_opened");
 	pauseWindow.close();
    sound.play();
});

mainMenuButton.addEventListener('click', function(e){
	//gameWindow.close();
    //console.log("gamewindow_closed_from_main");

	//deathWindow.close();
	pauseWindow.close();
	mainWindow.open({modal: true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, });
	sound.play();
	//all varibles should be set to null? execpt this would remove the views so maybe only the ones like location of movable
});

playButton.addEventListener('click', function(e){
    console.log("playButtonClick fired");	
	// IT APPEARS THAT AFTER WINNING, THIS IS NOT GETTING CALLED ON PLAY BUTTON
	// CHECK WHETHER THE SAME IS TRUE FOR DYING
	//dataSetup();
	
    mainWindow.close();

    ////gameWindow.open();
    gameWindow.open({modal: true, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, });
    ////gameWindow.open({modal: false, modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE, });

    console.log("gamewindow_opened");
    
    canvas.begin();
    canvas.beginPath();
    canvas.lineCap('round');
    canvas.lineWidth(lineSize);
    canvas.strokeStyle="#191970";
    mazeCells = newMaze(mazeWidth, mazeHeight);
        
    //GT SUGGESTION
    //if difficulty level was NOT just changed THEN scroll
    ///uncommented this -- 
    scrollView.scrollTo(0, cellSize * mazeHeight);
    //console.log('done scrollview y', cellSize * mazeHeight);   
    
    refreshIntervalId = setInterval(function() {
    	scoreLabel.text = "Score: " + sec;
    	gameWindow.add(scoreLabel);
    	//console.log('counting' + sec); 
    	sec = sec + 1;
    }, 1000);
    
    //canvas.strokeStyle= "#000000";
	startSound.play();
    // let play game
    
	movable.top = yStartTouchPoint; 
	movable.left = xStartTouchPoint;
	movable2.top = yStartTouchPoint; 
	movable2.left = xStartTouchPoint;
	play_game();
	
	/////we've experienced a new anomaly with the maze's lines not appearing until we scroll the maze -- so wwe'll try firing a manual mini-scroll
	canvas.fireEvent('scroll');
});

difficultyPicker.addEventListener('change', function(e){
	var catValue = e.rowIndex;
	console.log ("picker eventlistener catValue", catValue);
	if (catValue == 0) {
		//beginner
		mazeWidth = 3;
	}
	else if (catValue == 1) {
		//intermediate
		mazeWidth = 4;
	}
	else if (catValue == 2) {
		//advanced
		mazeWidth = 5;
	}
});

 done.addEventListener('click', function () {
        //difficultyView.close();
        console.log ("resetting, cellSize + mazeWidth =", mazeWidth);
        cellSize = 320/mazeWidth;
        mazePane.height = mazeHeight*cellSize;
        
        ///mazeCells = newMaze(mazeWidth, mazeHeight);
        ///when this used to be active code, it was scrolling correctly -- but it's duplicate ! 
        
        mainWindow.remove(difficultyView);
        scrollView.scrollTo(0, cellSize * mazeHeight);
        console.log('done scrollview y', cellSize * mazeHeight);
    });

//makes maze display instantly but requires gameWindow to be opened at launch
/*gameWindow.addEventListener('open', function (e) {
    canvas.begin();
    canvas.beginPath();
    canvas.lineCap('round');
    canvas.lineWidth(4);
    canvas.strokeStyle="#00042A";
});*/