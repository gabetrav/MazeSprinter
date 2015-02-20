//windows
var windowBackgroundColor = '#20B2AA';
var titleTextColor = '#191970';
var smallTextColor = '#86B8E23';

var mainWindow = Ti.UI.createWindow({
	backgroundColor: windowBackgroundColor,
	fullscreen:true
});
var gameWindow = Ti.UI.createWindow({
	backgroundColor: windowBackgroundColor,
	fullscreen:true
});
var pauseWindow = Ti.UI.createWindow({	
	backgroundColor: windowBackgroundColor,
	fullscreen:true,
});
var deathWindow = Ti.UI.createWindow({
	backgroundColor: windowBackgroundColor,
	fullscreen:true
});
var winWindow = Ti.UI.createWindow({
	backgroundColor: windowBackgroundColor,
	fullscreen:true
});

var mazeWidth = 3;
var mazeHeight = 30;
var mazeCells = [];

var cellSize = 320/mazeWidth;
var lineSize = 4;
var fade = {opacity: 1.0, duration: 200};

var nearTop = false;

var title = Ti.UI.createLabel({
    text : 'Maze Sprinter',
    bottom : 170,
    color: titleTextColor,
    font: { fontSize:45 },
    fontWeight:'bold',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
});
var winLabel = Ti.UI.createLabel({
    text : 'You Won!',
    color: titleTextColor,
    font: { fontSize:45 },
    fontWeight:'bold',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
});
var winText = Ti.UI.createLabel({
    text : "Now, try a harder difficulty!",
    color: smallTextColor,
    bottom: 195,
    font: { fontSize:15 },
    fontWeight:'bold',
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
});
var pauseLabel = Ti.UI.createLabel ({
	text: 'Paused',
	color: titleTextColor,
	font: { fontSize:45 },
	fontWeight:'bold',
});
var playButton = Ti.UI.createLabel({
	text: "Tap to Play",
	color: smallTextColor,
	font: { fontSize:25 },
	width: 250,
    height: 40,
    bottom: 120,
    borderRadius: 10,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
});
var leaderboardsButton = Ti.UI.createLabel({
	text: "LeaderBoards",
	color: smallTextColor,
	font: { fontSize:25 },
	width: 250,
    height: 40,
    bottom: 80,
    borderRadius: 10,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
});
var mainMenuButton = Ti.UI.createLabel({
	text: "Exit to Main Menu",
	color: smallTextColor,
	font: { fontSize:25 },
	width: 250,
    height: 40,
    bottom: 60,
    borderRadius: 10,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
 });
var tapToResume = Ti.UI.createLabel({
	text: "Tap to resume",
	color: smallTextColor,
	font: { fontSize:25 },
    bottom: 160,
    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
 });
var creditsButton = Ti.UI.createLabel({
	backgroundImage: 'ios7-information.png',
	width: 40,
    height: 40,
    right: 50
});
var optionsButton = Ti.UI.createLabel({
	width: 60,
    height: 60,
    //right: 200,
    bottom: 10,
    right: 10,
    backgroundImage: "ios7-gear.png"
});
var difficultyButton = Ti.UI.createLabel({
	width: 40,
    height: 40,
    right: 200,
    backgroundImage: "ios7-speedometer.png"
});
var pauseButton = Ti.UI.createView({
   top: 10,
   backgroundImage:'ios7-pause.png',
   height:20,
   width:20,
   right: 10,
});
var musicButton = Ti.UI.createView({
   //bottom: 10,
   backgroundImage:'ios7-musical-notes.png',
   height:40,
   width:40,
   right: 150,
});
var soundButton = Ti.UI.createView({
   //bottom: 40,
   backgroundImage:'ios7-volume-high.png',
   height:40,
   width:40,
   right: 100,
});
var sound = Titanium.Media.createSound({
	url: 'sound111.wav',
	preload: true
});
var winSound = Titanium.Media.createSound({
	url: 'success-2.wav',
	preload: true
});
var endSound = Titanium.Media.createSound({
	url: 'endSound.wav',
	preload: true
});
var startSound = Titanium.Media.createSound({
	url: 'startSound.wav',
	preload: true
});
var optionsScrollView = Titanium.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: false,
  showHorizontalScrollIndicator: false,
  height: 40,
  width: 250,
  bottom: 20,
  right: 70,
  disableBounce: true,
  //setDecelerationRate: Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST,
  decelerationRate:  Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST,
});
var optionsView = Ti.UI.createView({
   backgroundColor: windowBackgroundColor,
   height:40,
   width:550,
});
var difficultyView = Ti.UI.createView({
   backgroundColor: windowBackgroundColor,
   height:175,
   bottom: 0,
   width:320,
});
var statusBar = Ti.UI.createView({
   backgroundColor: 'blue',
   height:40,
   top: 0,
   width:320,
});
var scrollView = Titanium.UI.createScrollView({
  contentWidth: 'auto',
  contentHeight: 'auto',
  showVerticalScrollIndicator: false,
  showHorizontalScrollIndicator: false,
  height: '100%',
  width: '100%',
  disableBounce: true,
  //touchEnabled: false,
  decelerationRate: Titanium.UI.iOS.SCROLL_DECELERATION_RATE_FAST, // .9
});
var deathLabel = Ti.UI.createLabel({
	text: 'Bad Luck!',
	color: titleTextColor,
	font: { fontSize:45 },
	fontWeight:'bold',
});
var diameterTouchPoint = 35;
var xStartTouchPoint = 20;//cellSize/2;
var yStartTouchPoint = 520;//gameWindow.height - cellSize/2; //mazeHeight * cellSize - (cellSize/2);
var radiusBorder = diameterTouchPoint/2;
var movable = Titanium.UI.createView({
    width: diameterTouchPoint, 
    height: diameterTouchPoint,
    backgroundImage:'ios7-circle-filled.png',
    top:  yStartTouchPoint, 
    left: xStartTouchPoint,
    borderRadius: radiusBorder,
});
var movable2 = Titanium.UI.createView({
    width: diameterTouchPoint, 
    height: diameterTouchPoint,
    top:  yStartTouchPoint, 
    left: xStartTouchPoint,
    borderRadius: radiusBorder,
});
var mazePane = Ti.UI.createView({
  //backgroundColor: windowBackgroundColor,
  backgroundColor: 'transparent',
  height: mazeHeight*cellSize,
  width: '100%'
});
var creditsAlert = Titanium.UI.createAlertDialog({
    title:'Credits',
    message:'Created by Gabe Travis with help from Paul Travis'
});
var tCanvas = require('ti.canvas');
var canvas = tCanvas.createView();
var offset = {};
var deathScoreLabel = Ti.UI.createLabel({
	bottom: 220,
	text: "Score: " + sec,
	color: smallTextColor
});
var winScoreLabel = Ti.UI.createLabel({
	bottom: 230,
	text: "Score: " + sec,
	color: smallTextColor
});
var tolerance = 3*cellSize;
var toleranceLvl2 = 2*cellSize;
var toleranceLvl3 = cellSize;

var refreshIntervalId;
var score;
var sec = 0;
var scoreLabel = Ti.UI.createLabel({
	top: 5,
	text: "Score: " + sec,
	left: 5,
});

var difficultyPicker = Ti.UI.createPicker({
  bottom:0,
  visible: true
});
var pickerData = [];
pickerData[0]=Ti.UI.createPickerRow({title:'Beginner'});
pickerData[1]=Ti.UI.createPickerRow({title:'Intermediate'});
pickerData[2]=Ti.UI.createPickerRow({title:'Advanced'});
//difficultyPicker.add(pickerData);
difficultyPicker.selectionIndicator = true;
difficultyLevel = 0; //basic = 0, int = 1, advanced = 2

//difficulty toolbar

var cancel = Ti.UI.createLabel({
        text: 'Select Difficulty...'
    });
    
    var done = Ti.UI.createButton({
        systemButton : Ti.UI.iPhone.SystemButton.DONE
    });
   
 
var spacer = Ti.UI.createButton({
        systemButton : Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
var toolbar = Ti.UI.iOS.createToolbar({
        items :[cancel,spacer,done],
        height : 43,
        top: 0,
        backgroundColor : '#bbb'
    });
var t = Ti.UI.create2DMatrix();
var bt = Ti.UI.create2DMatrix();
var spin = Titanium.UI.createAnimation();
t = t.rotate(250);
spin.transform = t;
var backspin = Titanium.UI.createAnimation();
t = t.rotate(-250);
backspin.transform = bt;	


//Stuff we added to make it work
//gameWindow.open();

//.adds
scrollView.add(mazePane);
mazePane.add(canvas);
optionsScrollView.add(optionsView);


//gameWindow.add(mazePane);
gameWindow.add(scoreLabel);
gameWindow.add(scrollView);
gameWindow.add(pauseButton);
gameWindow.add(movable);
gameWindow.add(movable2);

optionsView.add(musicButton);
optionsView.add(soundButton);
optionsView.add(creditsButton);
optionsView.add(difficultyButton);

winWindow.add(winLabel);
winWindow.add(mainMenuButton);
winWindow.add(winScoreLabel);
winWindow.add(winText);

mainWindow.add(optionsScrollView);
mainWindow.add(optionsButton);
mainWindow.add(title);
mainWindow.add(leaderboardsButton);
mainWindow.add(playButton);

difficultyView.add(difficultyPicker);
difficultyPicker.add(pickerData);
difficultyView.add(toolbar);  

pauseWindow.add(tapToResume);
pauseWindow.add(mainMenuButton);
pauseWindow.add(pauseLabel);

deathWindow.add(deathLabel);
deathWindow.add(mainMenuButton);
deathWindow.add(deathScoreLabel);

/* Any includes */		
Ti.include('shuffle.js');
Ti.include('mazeGenerator.js');
Ti.include('gaming.js');
Ti.include('eventListeners.js');
Ti.include('draggableElements.js');

mainWindow.open();