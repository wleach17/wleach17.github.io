/*HEARTHSTONE INFO ARRAYS*/
var informationTypes = []; // Patch, classes, ...
var information = []; // Actual data
var patch;
var classes = [];
var sets = [];
var standard = [];
var wild = [];
var types = [];
var factions = [];
var qualities = [];
var races = [];
var locales = [];

/*SINGLE CARD INFO*/
var name;
var cardSet;
var type;
var rarity;
var cost;
var attack;
var health;
var text;
var flavor;
var race;
var playerClass;
var img;
var imgGold;
var mechanics = [];

/*POSITION VARIABLES*/
var namePos;
var setPos;
var typePos;
var rarityPos;
var costPos;
var attackPos;
var healthPos;
var textPos;
var flavorPos;
var racePos;
var classPos;
var imgPos;
var goldPos;
var mechPos;

/*ALL CARDS ARRAY*/
var allCards = [];

/*CLASS CARDS ARRAY*/
var classCards = [];

/*SET CARDS ARRAY*/
var setCards = [];

/*RARITY CLASS ARRAY*/
var rarityCards = [];

/*BOOLEANS*/
// Once the basic info has been retrieved, don't re get it
var infoGot = false;
// Once all cards has been retrieved, don't re get it
var allCardsGot = false;

// Basic Hearthstone Game Info
function getInfo()
{
  // If we already got the info, show it
  if (infoGot==true)
  {
    showInfo();
  }
  else
  {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var response = JSON.parse(this.responseText);
        //console.log(response);
        // Information types array
        informationTypes = Object.keys(response);

        // Information array
        information = Object.values(response);
        //console.log(information);
        // Patch info
        patch = information[0];
        console.log("Patch loaded: " + patch);

        // Class info
        classes = information[1];

        // Sets info
        sets = information[2];

        // Standard info
        standard = information[3];

        // Wild info
        wild = information[4];

        // Types info
        types = information[5];

        // Factions info
        factions = information[6];

        // Qualities info
        qualities = information[7];

        // Races info
        races = information[8];

        // Locales info
        //locales = information[9];

        showInfo();
      }
    });

    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.rapidapi.com/info");
    xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    xhr.send(data);
  }
}

// Get All cards (name), stored in all cards array
function getAllCards()
{
  // If we already got all cards, show them
  if (allCardsGot==true)
  {
    showAllCards();
  }
  else
  {
    // Reset all cards array
    allCards = [];

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var response = JSON.parse(this.responseText);

        collections = Object.values(response);
        for (var i = 0; i < collections.length; i++)
        {
          for (var j = 0; j < collections[i].length; j++)
          {
            var card = Object.values(collections[i][j]);
            // Only store cards with 12 attributes or more
            if (card.length > 11)
            {
              allCards.push(card[2]);
            }
          }
        }
        showAllCards();
      }
    });

    xhr.open("GET", "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards");
    xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    xhr.send(data);
  }
}

// Search for a single card by name
function getSingleCard(nameOfCard)
{
  //console.log("Parameter card: " + nameOfCard);
  //console.log("Field card: " + $("#singleCardName").val());
  // If no parameter is given, get card name from text field
  if (nameOfCard==null)
  {
    //console.log("no parameter");
    var cardName = $("#singleCardName").val();
  }
  // If parameter given, then use that card name
  else
  {
    cardName = nameOfCard;
  }

  if (cardName=="")
  {
    // If no card name was input, output error
    alert("You need to enter the card name!");
  }
  else
  {

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status === 200)
        {
          var responses = JSON.parse(this.responseText);
          var whichCard = 0;

          //console.log(responses);
          //console.log("responses length: " + responses.length);

          // Picks the card with the highest number of items/attributes
          for (var i = 0; i < responses.length; i++)
          {
            //console.log("response " + i + ": " + Object.values(responses[i]).length);
            if (Object.values(responses[i]).length >= 17)
            {
              if (Object.values(responses[whichCard]).length < Object.values(responses[i]).length)
              {
                whichCard = i;
              }
            }
          }

          //console.log("which card: " + whichCard);

          var response = responses[whichCard];

          // Position of name in array
          namePos = Object.keys(response).indexOf("name");

          // Position of set in array
          setPos = Object.keys(response).indexOf("cardSet");

          // Position of type in array
          typePos = Object.keys(response).indexOf("type");

          // Position of rarity in array
          rarityPos = Object.keys(response).indexOf("rarity");

          // Position of cost in array
          costPos = Object.keys(response).indexOf("cost");

          // Position of attack in array
          attackPos = Object.keys(response).indexOf("attack");

          // Position of health in array
          healthPos = Object.keys(response).indexOf("health");

          // Position of text in array
          textPos = Object.keys(response).indexOf("text");

          // Position of flavor in array
          flavorPos = Object.keys(response).indexOf("flavor");

          // Position of race in array
          racePos = Object.keys(response).indexOf("race");

          // Position of class in array
          classPos = Object.keys(response).indexOf("playerClass");

          // Position of img in array
          imgPos = Object.keys(response).indexOf("img");

          // Position of gold img in array
          goldPos = Object.keys(response).indexOf("imgGold");

          // Position of mechanics in array
          mechPos = Object.keys(response).indexOf("mechanics");

          // Returns -1 if the item is not found
          if (namePos==-1) {
            name = "";
          }
          else
          {
            // Card name
            name = Object.values(response)[namePos];
          }

          // Returns -1 if the item is not found
          if (setPos==-1) {
            cardSet = "";
          }
          else
          {
            // Card set
            cardSet = Object.values(response)[setPos];
          }

          // Returns -1 if the item is not found
          if (typePos==-1) {
            type = "";
          }
          else
          {
            // Card type
            type = Object.values(response)[typePos];
          }

          // Returns -1 if the item is not found
          if (rarityPos==-1) {
            rarity = "";
          }
          else
          {
            // Card rarity
            rarity = Object.values(response)[rarityPos];
          }

          // Returns -1 if the item is not found
          if (costPos==-1) {
            cost = "";
          }
          else
          {
            // Card cost
            cost = Object.values(response)[costPos];
          }

          // Returns -1 if the item is not found
          if (attackPos==-1) {
            attack = "";
          }
          else
          {
            // Card attack
            attack = Object.values(response)[attackPos];
          }

          // Returns -1 if the item is not found
          if (healthPos==-1) {
            health = "";
          }
          else
          {
            // Card health
            health = Object.values(response)[healthPos];
          }

          // Returns -1 if the item is not found
          if (textPos==-1) {
            text = "";
          }
          else
          {
            // Card text
            text = Object.values(response)[textPos];
          }

          // Returns -1 if the item is not found
          if (flavorPos==-1) {
            flavor = "";
          }
          else
          {
            // Card flavor
            flavor = Object.values(response)[flavorPos];
          }

          // Returns -1 if the item is not found
          if (racePos==-1) {
            race = "";
          }
          else
          {
            // Card race
            race = Object.values(response)[racePos];
          }

          // Returns -1 if the item is not found
          if (classPos==-1) {
            playerClass = "";
          }
          else
          {
            // Card class
            playerClass = Object.values(response)[classPos];
          }

          // Returns -1 if the item is not found
          if (imgPos==-1) {
            img = "";
          }
          else
          {
            // Card img
            img = Object.values(response)[imgPos];
          }

          // Returns -1 if the item is not found
          if (goldPos==-1) {
            imgGold = "";
          }
          else
          {
            // Card img gold
            imgGold = Object.values(response)[goldPos];
          }

          // Returns -1 if the item is not found
          if (mechPos==-1) {
            mechanics = "";
          }
          else
          {
            // Card mechanics
            mechanics = Object.values(response)[mechPos];
          }

          var newArr = [];
          for (var i = 0; i<mechanics.length; i++)
          {
            newArr[i] = Object.values(mechanics[i]);
            mechanics[i] = newArr[i][0];
          }
          updateCardInfo();
        }
        else
        {
          console.log("receivted status code: " + this.status);
          alert("Invalid card name");
        }
      }
    });

      var url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/" + cardName;

      xhr.open("GET", url);
      xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
      xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

      xhr.send(data);
  }
}

// Search for cards by class
function getClassCards()
{
  var className = $("#className").val();

  // Reset class cards array
  classCards = [];

  if (className=="")
  {
    // If no card name was input, output error
    alert("You need to enter the class name!");
  }
  else
  {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status === 200)
        {
          var response = JSON.parse(this.responseText);

          for (var i = 0; i < response.length; i++)
          {
            var card = Object.values(response[i]);
            // Only store cards with 13 attributes or more
            if (card.length > 12)
            {
              classCards.push(card[2]);
            }
          }
          classCards = removeDuplicates(classCards);
          updateClassInfo();
        }
        else
        {
          console.log("receivted status code: " + this.status);
          alert("Invalid class name");
        }
      }
    });

    var url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/" + className;

    xhr.open("GET", url);
    xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    xhr.send(data);
  }
}

// Search for cards by set
function getSetCards()
{
  var setName = $("#setName").val();

  // Reset class cards array
  setCards = [];

  if (setName=="")
  {
    // If no card name was input, output error
    alert("You need to enter the set name!");
  }
  else
  {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status === 200)
        {
          var response = JSON.parse(this.responseText);

          for (var i = 0; i < response.length; i++)
          {
            var card = Object.values(response[i]);
            // Only store cards with 12 attributes or more
            if (card.length > 11)
            {
              setCards.push(card[2]);
            }
          }
          setCards = removeDuplicates(setCards);
          updateSetInfo();
        }
        else
        {
          console.log("receivted status code: " + this.status);
          alert("Invalid set name");
        }
      }
    });

    var url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/sets/" + setName;

    xhr.open("GET", url);
    xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    xhr.send(data);
  }
}

// Search for cards by rarity
function getRarityCards()
{
  var rarityName = $("#rarityName").val();

  // Reset class cards array
  rarityCards = [];

  if (rarityName=="")
  {
    // If no card name was input, output error
    alert("You need to enter the rarity name!");
  }
  else
  {
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        if (this.status === 200)
        {
          var response = JSON.parse(this.responseText);

          for (var i = 0; i < response.length; i++)
          {
            var card = Object.values(response[i]);

            // If the card has 18 or more attributes, add it
            if (card.length > 17)
            {
              rarityCards.push(card[2]);
            }
          }
          rarityCards = removeDuplicates(rarityCards);
          updateRarityInfo();
        }
        else
        {
          console.log("receivted status code: " + this.status);
          alert("Invalid rarity name");
        }
      }
    });

    var url = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/qualities/" + rarityName;

    xhr.open("GET", url);
    xhr.setRequestHeader("x-rapidapi-key", "a1429cbd22mshc5bbea16ab33b2fp1ccb5cjsn07f67ef2f6d2");
    xhr.setRequestHeader("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com");

    xhr.send(data);
  }
}

// Remove duplicates in an array
function removeDuplicates(array)
{
  var uniqueChars = new Set(array);
  return Array.from(uniqueChars);
}

/*DISPLAY FUNCTIONS*/
// Onload of page, hearthstone symbol
function symbolLoad()
{
  // Display symbol
  // Pulse light for x time
  // call display page and hide symbol
  showHome();
}

// Display Home page
function showHome()
{
  // Hide basic info, all cards, and card page
  $(".infoPage").fadeOut("slow");
  $(".allCardsPage").fadeOut("slow");
  $(".cardPage").fadeOut("slow");

  // Show home page
  $(".homePage").fadeIn("slow");
}

// Display basic info page
function showInfo()
{

  // Hide home, all cards, and card page
  $(".homePage").fadeOut("slow");
  $(".allCardsPage").fadeOut("slow");
  $(".cardPage").fadeOut("slow");

  // Show basic info
  $(".infoPage").fadeIn("slow");

  // Add spaces between items for displaying
  var classesAsString = classes.join(', ');
  var setsAsString = sets.join(', ');
  var standardAsString = standard.join(', ');
  var wildAsString = wild.join(', ');
  var typesAsString = types.join(', ');
  var factionsAsString = factions.join(', ');
  var qualitiesAsString = qualities.join(', ');
  var racesAsString = races.join(', ');

    // Update the paragraph with card info
  document.getElementById("basicInfo").innerHTML = "<b>Current Patch:</b> " + patch + "<br />" + "<br />" + "<b>Classes:</b> " + classesAsString + "<br />" + "<br />" + "<b>Card Sets:</b> " + setsAsString + "<br />" + "<br />" + "<b>Standard Card Sets:</b> " + standardAsString + "<br />" + "<br />" + "<b>Wild Card Sets:</b> " + wildAsString + "<br />" + "<br />" + "<b>Types:</b> " + typesAsString + "<br />" + "<br />" + "<b>Factions:</b> " + factionsAsString + "<br />" + "<br />" + "<b>Rarities:</b> " + qualitiesAsString + "<br />" + "<br />" + "<b>Races:</b> " + racesAsString + "<br />";

  infoGot = true;
}

// Display all cards page
function showAllCards()
{
  // Hide home page, basic info, and card page
  $(".homePage").fadeOut("slow");
  $(".infoPage").fadeOut("slow");
  $(".cardPage").fadeOut("slow");

  // Show all cards page
  $(".allCardsPage").fadeIn("slow");

  var numLists = 5;
  var counter = 0;
  var listIdArray = ["firstList", "secondList", "thirdList", "fourthList", "fifthList"];

  for (var i = 0; i < allCards.length; i++)
  {
    // Cycle through listIdArray 0-4
    if (counter==numLists) counter = 0;

    // Create new li item
    var newItem = document.createElement("LI");

    // Create link with text that is card name
    // and an onclick that goes to singlecarddisplay
    // Create link element
    var a = document.createElement('a');

    // Create the text for link element
    //var link = document.createTextNode(allCards[i]);
    a.textContent = allCards[i];

    // Set onclick
    a.onclick = function () {

      // Show card page, also hides all cards page
      showCardName();

      // Get single card
      getSingleCard(this.textContent);
    }

    // Append text to li
    newItem.appendChild(a);

    // Append li to specific ul
    document.getElementById(listIdArray[counter]).appendChild(newItem);

    // Next list
    counter++;
  }

  allCardsGot = true;
}

// Display card page based on name
function showCardName()
{
  // Reset text field
  document.getElementById("singleCardName").value = "";

  // Reset img
  document.getElementById("cardImage").src = "https://w7.pngwing.com/pngs/915/909/png-transparent-gold-star-emblem-hearthstone-overwatch-league-of-legends-starcraft-ii-wings-of-liberty-dota-2-lottery-game-video-game-blizzard-entertainment.png";

  // Reset card description
  document.getElementById("singleCardDescription").innerHTML = "";

  // Change span title to name
  document.getElementById("whichSearch").innerHTML = "Name";

  // Hide class, set, rarity input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Show name input field
  document.getElementById("singleCardName").style.visibility = "visible";

  // Hide class, set, rarity buttons
  document.getElementById("classNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";

  // Hide card title
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show image, golden button, card description
  // Show image
  document.getElementById("cardImage").style.visibility = "visible";
  // Show golden button
  document.getElementsByClassName("makeGolden")[0].style.visibility = "visible";
  // Show card description
  document.getElementsByClassName("cardDescription")[0].style.visibility = "visible";

  // Show name button
  document.getElementById("cardNameButton").style.visibility = "visible";

  // Display generic card page
  showCardPage();
}

// Display card page based on class
function showCardClass()
{
  // Reset field
  document.getElementById("className").value = "";

  // Reset lists
  resetCardLists();

  // Change title to class name
  document.getElementById("cardTitle").innerHTML = "Class Name";

  // Change span title to class
  document.getElementById("whichSearch").innerHTML = "Class";

  // Hide name, set, rarity input fields
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Show class input field
  document.getElementById("className").style.visibility = "visible";

  // Hide name, set, rarity buttons
  document.getElementById("cardNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";

  // Show class button
  document.getElementById("classNameButton").style.visibility = "visible";

  // Hides card name img, golden button, and card description
  hideCardName();

  // Show card lists
  showCardLists();

  // Display generic card page
  showCardPage();
}

// Display card page based on set
function showCardSet()
{
  // Reset field
  document.getElementById("setName").value = "";

  // Reset lists
  resetCardLists();

  // Change title to class name
  document.getElementById("cardTitle").innerHTML = "Set Name";

  // Change span title to set
  document.getElementById("whichSearch").innerHTML = "Set";

  // Hide class, name, rarity input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Show set input field
  document.getElementById("setName").style.visibility = "visible";

  // Hide class, name, rarity buttons
  document.getElementById("classNameButton").style.visibility = "hidden";
  document.getElementById("cardNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";

  // Hides card name img, golden button, and card description
  hideCardName();

  // Show card lists
  showCardLists();

  // Show set button
  document.getElementById("setNameButton").style.visibility = "visible";

  // Display generic card page
  showCardPage();
}

// Display card page based on rarity
function showCardRarity()
{
  // Reset field
  document.getElementById("rarityName").value = "";

  // Reset lists
  resetCardLists();

  // Change title to class name
  document.getElementById("cardTitle").innerHTML = "Rarity Name";

  // Change span title to rarity
  document.getElementById("whichSearch").innerHTML = "Rarity";

  // Hide class, set, name input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("singleCardName").style.visibility = "hidden";

  // Show rarity input field
  document.getElementById("rarityName").style.visibility = "visible";

  // Hide class, set, name buttons
  document.getElementById("classNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("cardNameButton").style.visibility = "hidden";

  // Show rarity button
  document.getElementById("rarityNameButton").style.visibility = "visible";

  // Hides card name img, golden button, and card description
  hideCardName();

  // Show card lists
  showCardLists();

  // Display generic card page
  showCardPage();
}

// Display generic card page
function showCardPage()
{
  // Hide home page, basic info page, and all cards page
  $(".homePage").fadeOut("slow");
  $(".infoPage").fadeOut("slow");
  $(".allCardsPage").fadeOut("slow");

  // Show card page
  $(".cardPage").fadeIn("slow");
}

// Called from in getSingleCard()
function updateCardInfo()
{
  // If no mechanics
  if (mechanics.length!=0)
  {
    // Add spaces between items for displaying
    var mechanicsAsString = mechanics.join(', ');
  }
  else
  {
    // If the card has no mechanics
    var mechanicsAsString = "No mechanics";
  }

  // If no attack
  if (attack=="")
  {
    attack = "N/A";
  }

  // If no health
  if (health=="")
  {
    health = "N/A";
  }

  // If no race
  if (race=="")
  {
    race = "N/A";
  }

  if (text!="")
  {
    // Remove \n from text string
    text = text.replace(/\\n/g, ", ");
    // Remove _ from text string
    text = text.replace(/_/g, " ");
    // Remove [x] from text string
    text = text.replace(/\[x\]/g, " ");
  }

  // Update the paragraph with card info
  document.getElementById("singleCardDescription").innerHTML = "<b>Card name:</b> " + name + "<br />" + "<b>Card Set:</b> " + cardSet + "<br />" + "<b>Type:</b> " + type + "<br />" + "<b>Rarity:</b> " + rarity + "<br />" + "<b>Cost:</b> " + cost + "<br />" + "<b>Attack:</b> " + attack + "<br />" + "<b>Health:</b> " + health + "<br />" + "<b>Text:</b> " + text + "<br />" + "<b>Flavor:</b> " + flavor + "<br />" + "<b>Race:</b> " + race + "<br />" + "<b>Class:</b> " + playerClass + "<br />" + "<b>Mechanics:</b> " + mechanicsAsString + "<br />" + "<br />";

  if (img=="")
  {
    img="https://w7.pngwing.com/pngs/915/909/png-transparent-gold-star-emblem-hearthstone-overwatch-league-of-legends-starcraft-ii-wings-of-liberty-dota-2-lottery-game-video-game-blizzard-entertainment.png";
    alert("no card image was found");
  }
  // Update card Image
  document.getElementById("cardImage").src = img;
}

// Make card image Golden
function makeImgGolden()
{
  if (imgGold=="")
  {
    alert("golden image not available");
  }
  else
  {
    document.getElementById("cardImage").src = imgGold;
  }
}

// Called from in getClassCards()
function updateClassInfo()
{
  // Update title to class name
  document.getElementById("cardTitle").innerHTML = $("#className").val();

  var numLists = 5;
  var counter = 0;
  var listClassArray = ["firstList", "secondList", "thirdList", "fourthList", "fifthList"];

  for (var i = 0; i < classCards.length; i++)
  {
    // Cycle through listClassArray 0-4
    if (counter==numLists) counter = 0;

    // Create new li item
    var newItem = document.createElement("LI");

    // Create link with text that is card name
    // and an onclick that goes to singlecarddisplay
    // Create link element
    var a = document.createElement('a');

    // Create the text for link element
    a.textContent = classCards[i];

    // Set onclick
    a.onclick = function () {

      // Show card page, also hides class page
      showCardName();

      // Get single card
      getSingleCard(this.textContent);
    }

    // Append text to li
    newItem.appendChild(a);

    // Append li to specific ul
    document.getElementsByClassName(listClassArray[counter])[0].appendChild(newItem);

    // Next list
    counter++;
  }
}

// Called from in getSetCards()
function updateSetInfo()
{
  // Update title to set name
  document.getElementById("cardTitle").innerHTML = $("#setName").val();

  var numLists = 5;
  var counter = 0;
  var listClassArray = ["firstList", "secondList", "thirdList", "fourthList", "fifthList"];

  for (var i = 0; i < setCards.length; i++)
  {
    // Cycle through listClassArray 0-4
    if (counter==numLists) counter = 0;

    // Create new li item
    var newItem = document.createElement("LI");

    // Create link with text that is card name
    // and an onclick that goes to singlecarddisplay
    // Create link element
    var a = document.createElement('a');

    // Create the text for link element
    a.textContent = setCards[i];

    // Set onclick
    a.onclick = function () {

      // Show card page, also hides set page
      showCardName();

      // Get single card
      getSingleCard(this.textContent);
    }

    // Append text to li
    newItem.appendChild(a);

    // Append li to specific ul
    document.getElementsByClassName(listClassArray[counter])[0].appendChild(newItem);

    // Next list
    counter++;
  }
}

// Called from in getRarityCards()
function updateRarityInfo()
{
  // Update title to rarity name
  document.getElementById("cardTitle").innerHTML = $("#rarityName").val();

  var numLists = 5;
  var counter = 0;
  var listClassArray = ["firstList", "secondList", "thirdList", "fourthList", "fifthList"];

  for (var i = 0; i < rarityCards.length; i++)
  {
    // Cycle through listClassArray 0-4
    if (counter==numLists) counter = 0;

    // Create new li item
    var newItem = document.createElement("LI");

    // Create link with text that is card name
    // and an onclick that goes to singlecarddisplay
    // Create link element
    var a = document.createElement('a');

    // Create the text for link element
    a.textContent = rarityCards[i];

    // Set onclick
    a.onclick = function () {

      // Show card page, also hides class page
      showCardName();

      // Get single card
      getSingleCard(this.textContent);
    }

    // Append text to li
    newItem.appendChild(a);

    // Append li to specific ul
    document.getElementsByClassName(listClassArray[counter])[0].appendChild(newItem);

    // Next list
    counter++;
  }
}

// Show card lists
function showCardLists()
{
  document.getElementsByClassName("cardLists")[0].style.visibility = "visible";

  // Show card title
  document.getElementsByClassName("cardTitle")[0].style.visibility = "visible";
}

// Hides card name img, golden button, and card description
function hideCardName()
{
  // Hide image
  document.getElementById("cardImage").style.visibility = "hidden";

  // Hide golden button
  document.getElementsByClassName("makeGolden")[0].style.visibility = "hidden";

  // Hide card description
  document.getElementsByClassName("cardDescription")[0].style.visibility = "hidden";
}

// Reset card lists
function resetCardLists()
{
  // First list
  document.getElementsByClassName("firstList")[0].innerHTML = "";
  // Second list
  document.getElementsByClassName("secondList")[0].innerHTML = "";
  // Third list
  document.getElementsByClassName("thirdList")[0].innerHTML = "";
  // Fourth list
  document.getElementsByClassName("fourthList")[0].innerHTML = "";
  // Fifth list
  document.getElementsByClassName("fifthList")[0].innerHTML = "";
}