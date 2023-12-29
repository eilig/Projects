//lost files for libraries and user interface :(

//initializes variables
var income;
var indexLandscape = 0;

//grabs list information of US state data
var listIncome = getColumn("US States", "Median Household Income");
var listLandscape = getColumn("US States", "Landscape Background");
var listName = getColumn("US States", "State Name");

//sets the screen and variables
setScreen("startScreen");
setVariables();

//sets next screen to dropdown
onEvent("nextStart", "click", function( ) {
  setScreen("dropdownScreen");
});

//filters out certain states
//based on average income selected
//sets next screen to landscape
onEvent("nextDropdown", "click", function( ) {
  for (var i = 0; i < listIncome.length; i++) {
    income = getText("dropdownIncome");
    var currentIncome = listIncome[i];
    if (income == "<$50,000") {
      if (currentIncome >= 50000) {
        removeItem(listLandscape, i);
        removeItem(listName, i);
        removeItem(listIncome, i);
        i = i - 1;
      }
    }
    if (income == "$50,000-$59,999") {
      if (currentIncome < 50000 || currentIncome > 59999) {
        removeItem(listLandscape, i);
        removeItem(listName, i);
        removeItem(listIncome, i);
        i = i - 1;
      }
    }
    if (income == "$60,000-$69,999") {
      if (currentIncome < 60000 || currentIncome > 69999) {
        removeItem(listLandscape, i);
        removeItem(listName, i);
        removeItem(listIncome, i);
        i = i - 1;
      }
    }
    if (income == "≥$70,000") {
      if (currentIncome < 70000) {
        removeItem(listLandscape, i);
        removeItem(listName, i);
        removeItem(listIncome, i);
        i = i - 1;
      }
    }
  }
  setScreen("landscapeScreen");
  hideElement("limitDisclaimer");
  updateScreen();
});

//sets screen back to start
onEvent("backDropdown", "click", function( ) {
  setScreen("startScreen");
});

//changes current image to last image 
//stops at the end of list and makes disclaimer
onEvent("leftButton","click",function(){
  if(indexLandscape > 0){
    hideElement("limitDisclaimer");
    indexLandscape = indexLandscape - 1;
  } else {
    showElement("limitDisclaimer");
  }
  updateScreen();
});

//changes current image to next image
//stops at the end of list and makes disclaimer
onEvent("rightButton","click",function(){
  if(indexLandscape < listLandscape.length-1){
    hideElement("limitDisclaimer");
    indexLandscape = indexLandscape + 1;
  } else {
    showElement("limitDisclaimer");
  }
  updateScreen();
});

//sets next screen to results
onEvent("nextLandscape", "click", function( ) {
  setScreen("resultScreen");
  updateScreen();
});

//sets screen back to dropdown
//resets variables
onEvent("backLandscape", "click", function( ) {
  setScreen("dropdownScreen");
  setVariables();
});

//sets screen back to start
//resets variables
onEvent("tryAgain", "click", function( ) {
  setScreen("startScreen");
  setVariables();
});

//sets the images after list removals
//sets the final results
function updateScreen(){
  var currentLandscape = listLandscape[indexLandscape];
  var currentName = listName[indexLandscape];
  setProperty("landscapeImage","image",currentLandscape);
  setProperty("resultImage", "image", currentLandscape);
  setProperty("resultTitle", "text", "You should live in " + "\n" + currentName + "!");
}

//resets variables
function setVariables() {
  indexLandscape = 0;
  listIncome = getColumn("US States", "Median Household Income");
  listLandscape = getColumn("US States", "Landscape Background");
  listName = getColumn("US States", "State Name");
  setProperty("dropdownIncome", "text", "<$50,000");
}
