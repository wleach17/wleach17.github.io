
// Game States
var gameState = "INSTR";
var instrState = "BEGIN";

// Variables
var initialGameBoardWidth;
var initialGameBoardHeight;
var bodyWidth;
var bodyHeight;
var score;
var highscore = 0;
var gameSpeed;
var sequence = [];
var buttonPressed;
var whichButton;
var num;
var seqNum;
var clicked;
var delay;
var numPressed;
var instrPara;
var demoMode;
var wrongColor;
var turnOn;
// Number of correct buttons pressed in demo
demoLimit = 5;
// The number in sequence for demo
var index;
var instructions = ["Starting the game, wait for colors to light up in...", "3", "2", "1", "0"];
var demoInstructions = ["1. Wait for buttons to light up", ""];

// Simon Game and Demo
function playGame(isDemo){

  demoMode = isDemo;
  // Setup game
  hideMenu();
  if (demoMode==true) setTimeout(demoAnimation(), 3000);
  else setTimeout(playAnimation(), 3000);
  gameAnimation();
  gameBoard();

  // If in play mode, set game speed
  if (demoMode==false)
  {
    /*gameSpeed = document.getElementById("range1").value;
    delay = 1500*(1/gameSpeed);*/
    delay = 1500;
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("highscore").style.visibility = "visible";
    document.getElementById("score-value").style.visibility = "visible";
    document.getElementById("highscore-value").style.visibility = "visible";
  }
  // If in demo mode, scores are hidden
  else
  {
    delay = 1500;
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("highscore").style.visibility = "hidden";
    document.getElementById("score-value").style.visibility = "hidden";
    document.getElementById("highscore-value").style.visibility = "hidden";
  }

  // Instruction paragraph
  instrPara = document.getElementById("instructions");
  instrPara.innerHTML = "";

  // Instruction countdown
  score = 0;
  sequence = [];
  document.getElementById("score-value").innerHTML = score;
  num = 0;
  numPressed = 0;
  seqNum = 0;
  setTimer();
}


function waitForButtons()
{
  if (buttonPressed)
  {
    numPressed++;
    stopUserTimer();
  }
}

function turnOffButton()
{
  // turn off button
  getButtonFromColor(whichButton).style.opacity = 0.7;
  stopClickTimer();
}

function setClickTimer()
{
  clickTimer = window.setInterval(turnOffButton, delay);
}

function stopClickTimer()
{
  instrPara = document.getElementById("instructions");
  if (clickTimer != null)
  {
    window.clearInterval(clickTimer);
    // If clicked correct button
    /*console.log("# of buttons pressed: " + numPressed);
    console.log("Which button was just pressed: " + whichButton);
    console.log("Sequence: " + sequence);*/
    --numPressed;
    if (sequence[numPressed]==whichButton)
    {
      ++numPressed;
      // If sequence is complete
      if (numPressed==sequence.length)
      {
        score++;
        document.getElementById("score-value").innerHTML = score;
        seqNum = 0;
        instrPara.innerHTML = "Displaying sequence...";
        // add button to sequence
        sequence.push(mapNumToColor(getRandomNum(4)));
        setButtonOnTimer();
      }
      else
      {
        buttonPressed = false;
        // If not complete, keep waiting for buttons
        setUserTimer();
      }
    }
    else
    {
      if (score>highscore)
      {
        highscore = score;
        document.getElementById("highscore-value").innerHTML = highscore;
      }
      numPressed = 0;
      seqNum = 0;
      sequence = [];
      score = 0;
      document.getElementById("score-value").innerHTML = score;
      // If clicked wrong button, lose
      instrPara.innerHTML = "You pressed the wrong button. You lose!";
    }
  }
}

function demoButtons()
{
  /*// if index hits demoLimit, choose wrong button to turn on
  if (index == demoLimit)
  {
    // Choose wrong button
    wrongColor = getWrongColor(sequence[index]);
    // Turn on wrong button
    getButtonFromColor(wrongColor).style.opacity = 4.0;
    index++;
  }
  // if index is greater than demoLimit, turn off wrong button and stop timer
  else if (index > demoLimit)
  {
    // Turn off wrong button
    getButtonFromColor(wrongColor).style.opacity = 0.7;
    // End demo
    stopDemoTimer();
  }*/

  if (turnOn)
  {
    // if index is sequence's length, turn off last button
    if (index >= sequence.length)
    {
      index = 0;
      // Go back to display buttons
      stopDemoTimer();
    }
    else if (index == 0)
    {
      console.log("Demo Button on" + sequence[index]);
      // Display correct button pressed
      getButtonFromColor(sequence[index]).style.opacity = 4.0;
      index++;
      turnOn = false;
    }
    else
    {
      // Display correct button pressed
      console.log("Demo Button on" + sequence[index]);
      getButtonFromColor(sequence[index]).style.opacity = 4.0;
      index++;
      turnOn = false;
    }
  }
  else
  {
    // Turn off last button
    --index;
    console.log("Demo Button off" + sequence[index]);
    getButtonFromColor(sequence[index]).style.opacity = 0.7;
    ++index;
    turnOn = true;
  }
}

/*function getWrongColor(rightColor)
{
  var wrongColor;
  if (rightColor=="green")
  {
    wrongColor = "red";
  }
  else if (rightColor=="red")
  {
    wrongColor = "blue";
  }
  else if (rightColor=="blue")
  {
    wrongColor = "yellow";
  }
  else
  {
    wrongColor = "green";
  }
}*/

function setUserTimer()
{
  if (demoMode==false) {
    userTimer = window.setInterval(waitForButtons, 100);
  }
  else {
    index = 0;
    turnOn = true;
    demoTimer = window.setInterval(demoButtons, delay);
  }
}

function stopDemoTimer()
{
  if (demoTimer != null)
  {
    window.clearInterval(demoTimer);
    // Back to display buttons
    setTimer();
  }
}

function stopUserTimer()
{
 if (userTimer != null)
  {
    window.clearInterval(userTimer);
    // light up button
    getButtonFromColor(whichButton).style.opacity = 4.0;
    setClickTimer();
  }
}

function setButtonOnTimer() {
  // light up button
  buttonOnTimer = window.setInterval(function() {
    getButtonFromColor(sequence[seqNum]).style.opacity = 4.0;
    console.log("Button on" + sequence[seqNum]);
    stopButtonOnTimer();
  }, delay);
}

function stopButtonOnTimer() {
  if (buttonOnTimer != null)
  {
    window.clearInterval(buttonOnTimer);
    setButtonOffTimer();
  }
}

function setButtonOffTimer() {
  buttonOffTimer = window.setInterval(function() {
      // Turn off button
      getButtonFromColor(sequence[seqNum]).style.opacity = 0.7;
      console.log("Button off" + sequence[seqNum]);
      // Next seqNum
      ++seqNum;
      stopButtonOffTimer();
    }, delay);
}

function stopButtonOffTimer() {
  instrPara = document.getElementById("instructions");
  if (buttonOffTimer != null)
  {
    window.clearInterval(buttonOffTimer);
    // Displayed all in sequence
    if (seqNum==sequence.length)
    {
      console.log("All buttons played");
      if (demoMode==false) {
        instrPara.innerHTML = "Play back the sequence";
      }
      else
      {
        instrPara.innerHTML = "2. User plays back the sequence";
      }
      buttonPressed = false;
      numPressed = 0;
      setUserTimer();
    }
    // Have more to display
    else
    {
      setButtonOnTimer();
    }
  }
}

function append()
{
  var para = document.getElementById("instructions");

  if (demoMode==false)
  {
    if (para.innerHTML=='0')
    {
      para.style.visibility = "hidden";
      stopTimer();
    }
    else
    {
      para.innerHTML = instructions[num];
      num++;
    }
  }
  else
  {
    if (num==1)
    {
      num = 0;
      stopTimer();
    }
    else
    {
      para.innerHTML = demoInstructions[num];
      num++;
    }
  }
}

function setTimer() {
    timer = window.setInterval(append, delay);
}

function stopTimer() {
  instrPara = document.getElementById("instructions");
  if (timer != null)
  {
    window.clearInterval(timer);
    seqNum = 0;
    if (demoMode==false)
    {
      instrPara.style.visibility = 'visible';
      instrPara.innerHTML = "Displaying sequence...";
    }
    // add button to sequence
    sequence.push(mapNumToColor(getRandomNum(4)));
    setButtonOnTimer();
  }
}

function getButtonFromColor(color) {
  var nextButton;
  if (color=='green')
  {
    nextButton = document.getElementById("green-button");
  }
  else if (color=='red')
  {
    nextButton = document.getElementById("red-button");
  }
  else if (color=='yellow')
  {
    nextButton = document.getElementById("yellow-button");
  }
  else if (color=='blue')
  {
    nextButton = document.getElementById("blue-button");
  }
  return nextButton;
}

function getRandomNum(max) {
  return Math.floor(Math.random()*Math.floor(max));
}

function mapNumToColor(num) {
  var color;
  if (num==0) color = "green";
  else if (num==1) color = "red";
  else if (num==2) color = "yellow";
  else if (num==3) color = "blue";
  return color;
}

function whichButtonPressed(button)
{
  // one of the buttons was buttonPressed
  buttonPressed = true;
  whichButton = button;
}

function rules()
{
  hideMenu();
  rulesAnimation();
}

function history()
{
  hideMenu();
  historyAnimation();
}

function customize()
{
  hideMenu();
  customizeAnimation();
}

function gameBoard()
{
  // reset opacity of each button
  document.getElementById("red-button").style.opacity = "0.7";
  document.getElementById("green-button").style.opacity = "0.7";
  document.getElementById("yellow-button").style.opacity = "0.7";
  document.getElementById("blue-button").style.opacity = "0.7";
  // board size
  var boardSize = document.getElementById("range2").value;
  // color picker
  var radio1 = document.getElementById("red").checked;
  var radio2 = document.getElementById("purple").checked;
  var radio3 = document.getElementById("OrangeRed").checked;
  var radio4 = document.getElementById("Tomato").checked;

  // Red/Green/Yellow/Blue
  if (radio1==true)
  {
    document.getElementById("red-button").style.backgroundColor = "Red";
    document.getElementById("green-button").style.backgroundColor = "Green";
    document.getElementById("yellow-button").style.backgroundColor = "Yellow";
    document.getElementById("blue-button").style.backgroundColor = "Blue";
  }
  // Orchid/Lime/Gold/Turqoise
  else if (radio2==true)
  {
    document.getElementById("red-button").style.backgroundColor = "Orchid";
    document.getElementById("green-button").style.backgroundColor = "Lime";
    document.getElementById("yellow-button").style.backgroundColor = "Gold";
    document.getElementById("blue-button").style.backgroundColor = "turquoise";
  }
  // OrangeRed/LimeGreen/LightYellow/Navy
  else if (radio3==true)
  {

    document.getElementById("red-button").style.backgroundColor = "OrangeRed";
    document.getElementById("green-button").style.backgroundColor = "LimeGreen";
    document.getElementById("yellow-button").style.backgroundColor = "LightYellow";
    document.getElementById("blue-button").style.backgroundColor = "Navy";
  }
  // Tomato/SpringGreen/Khaki/SteelBlue
  else if (radio4==true)
  {
    document.getElementById("red-button").style.backgroundColor = "Tomato";
    document.getElementById("green-button").style.backgroundColor = "SpringGreen";
    document.getElementById("yellow-button").style.backgroundColor = "Khaki";
    document.getElementById("blue-button").style.backgroundColor = "SteelBlue";
  }
  // default
  else
  {
    document.getElementById("red-button").style.backgroundColor = "Red";
    document.getElementById("green-button").style.backgroundColor = "Green";
    document.getElementById("yellow-button").style.backgroundColor = "Yellow";
    document.getElementById("blue-button").style.backgroundColor = "Blue";
  }
}

function sliderValue()
{
  // Sliders and Checkbox
  var slider1 = document.getElementById("range1");
  var slider2 = document.getElementById("range2");
  var output1 = document.getElementById("slide1");
  var output2 = document.getElementById("slide2");

  output1.innerHTML = slider1.value + "X";
  output2.innerHTML = slider2.value + "X";

  var ratio = slider2.value;
  /*console.log("initial width: " + initialGameBoardWidth);
  console.log("initial height: " + initialGameBoardHeight);
  console.log("Ratio: " + ratio);*/

  $(".game-board").css("height", initialGameBoardHeight * ratio)
  $(".game-board").css("width", initialGameBoardWidth * ratio)

  /*var width = $(".game-board").width();
  console.log("Width after: " + width);
  var height = $(".game-board").height();
  console.log("Height after: " + height);*/
}

// Show/Hide Headers and Menus

function showMenu()
{
  $(".simon-game").fadeOut("slow");
  $(".rules").fadeOut("slow");
  $(".demo").fadeOut("slow");
  $(".play").fadeOut("slow");
  $(".customize").fadeOut("slow");
  $(".history").fadeOut("slow");
  $(".menu-select").fadeIn("slow");
  $("#header").fadeIn("slow");
}

function hideMenu()
{
  $(".menu-select").fadeOut("slow");
  $("#header").fadeOut("slow");
}

function gameAnimation() {
  $(".simon-game").fadeIn("slow");
}

function playAnimation() {
  $(".play").fadeIn("slow");
   // play header
  document.querySelector(".play h1").animate([ {color: "white"},
  {color: "dodgerblue"}], { duration: 3000, iterations: 1});
  document.querySelector(".play h1").style.color = "dodgerblue";
}

function rulesAnimation() {
   $(".rules").fadeIn("slow");
   // rules header
  document.querySelector(".rules h1").animate([ {color: "white"},
  {color: "springgreen"}], { duration: 3000, iterations: 1});
  document.querySelector(".rules h1").style.color = "springgreen";
}

function demoAnimation() {
   $(".demo").fadeIn("slow");
   // demo header
  document.querySelector(".demo h1").animate([ {color: "white"},
  {color: "red"}], { duration: 3000, iterations: 1});
  document.querySelector(".demo h1").style.color = "red";
}

function customizeAnimation() {
   $(".customize").fadeIn("slow");
   // customize header
  document.querySelector(".customize h1").animate([ {color: "white"},
  {color: "yellow"}], { duration: 3000, iterations: 1});
  document.querySelector(".customize h1").style.color = "yellow";
}

function historyAnimation() {
   $(".history").fadeIn("slow");
   // rules header
  document.querySelector(".history h1").animate([ {color: "white"},
  {color: "red"}], { duration: 3000, iterations: 1});
  document.querySelector(".history h1").style.color = "red";
}

function headerAnimation() {
  // S is green
  document.getElementById("S").animate([ {color: "white"},
  {color: "springgreen"}], { duration: 3000, iterations: 1});
  document.getElementById("S").style.color = "springgreen";

  // i is red
  document.getElementById("i").animate([ {color: "white"},
  {color: "red"}], { duration: 3000, iterations: 1});
  document.getElementById("i").style.color = "red";

  // m is yellow
  document.getElementById("m").animate([ {color: "white"},
  {color: "yellow"}], { duration: 3000, iterations: 1});
  document.getElementById("m").style.color = "yellow";

  // o is blue
  document.getElementById("o").animate([ {color: "white"},
  {color: "dodgerblue"}], { duration: 3000, iterations: 1});
  document.getElementById("o").style.color = "dodgerblue";

  // n is green
  document.getElementById("n").animate([ {color: "white"},
  {color: "springgreen"}], { duration: 3000, iterations: 1});
  document.getElementById("n").style.color = "springgreen";

  // S is red
  document.getElementById("S2").animate([ {color: "white"},
  {color: "red"}], { duration: 3000, iterations: 1});
  document.getElementById("S2").style.color = "red";

  // a is yellow
  document.getElementById("a").animate([ {color: "white"},
  {color: "yellow"}], { duration: 3000, iterations: 1});
  document.getElementById("a").style.color = "yellow";

  // y is blue
  document.getElementById("y").animate([ {color: "white"},
  {color: "dodgerblue"}], { duration: 3000, iterations: 1});
  document.getElementById("y").style.color = "dodgerblue";

  // s is green
  document.getElementById("s").animate([ {color: "white"},
  {color: "springgreen"}], { duration: 3000, iterations: 1});
  document.getElementById("s").style.color = "springgreen";

  initialGameBoardWidth = $(".game-board").width();
  initialGameBoardHeight = $(".game-board").height();
  bodyWidth = $("body").width();
  bodyHeight = $("body").height();
}