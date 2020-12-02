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

/*CHART CLASS COUNTERS*/
var deathKnight = 0;
var druid = 0;
var hunter = 0;
var mage = 0;
var paladin = 0;
var priest = 0;
var rogue = 0;
var shaman = 0;
var warlock = 0;
var warrior = 0;
var dream = 0;
var neutral = 0;
var demonHunter = 0;

/*CHART SET COUNTERS*/
var basic = 0;
var classic = 0;
var hallOfFame = 0;
var missions = 0;
var demo = 0;
var system = 0;
var slush = 0;
var promo = 0;
var naxxramas = 0;
var goblins = 0;
var blackrock = 0;
var grand = 0;
var credits = 0;
var hero = 0;
var tavernBrawl = 0;
var league = 0;
var whispers = 0;
var karazhan = 0;
var gadgetzan = 0;
var ungoro = 0;
var knights = 0;
var kobolds = 0;
var witchwood = 0;
var boomsday = 0;
var rastakhan = 0;
var shadows = 0;
var tavernsOfTime = 0;
var saviors = 0;
var dragons = 0;
var galakrond = 0;
var outland = 0;
var wildEvent = 0;
var scholomance = 0;
var battlegrounds = 0;
var initiate = 0;
var darkmoon = 0;

/*CHART RARITY COUNTERS*/
var common = 0;
var free = 0;
var rare = 0;
var epic = 0;
var legendary = 0;

/*CHART TYPES COUNTERS*/
var hero = 0;
var minion = 0;
var spell = 0;
var enchantment = 0;
var weapon = 0;
var heroPower = 0;

/*CHART RACES COUNTERS*/
var orc = 0;
var murloc = 0;
var demon = 0;
var mech = 0;
var elemental = 0;
var beast = 0;
var totem = 0;
var pirate = 0;
var dragon = 0;
var all = 0;

/*CHART FACTIONS COUNTER*/
var horde = 0;
var alliance = 0;
var neutralFaction = 0;

/*BOOLEANS*/
// Once the basic info has been retrieved, don't re get it
var infoGot = false;
// Once all cards has been retrieved, don't re get it
var allCardsGot = false;
// Currently making any CHART
var makingChart = false;
// Currently making CLASS CHART
var makingClassChart = false;
// Currently making SET CHART
var makingSetChart = false;
// Currently making RARITY CHART
var makingRarityChart = false;
// Currently making TYPE CHART
var makingTypeChart = false;
// Currently making RACE CHART
var makingRaceChart = false;
// Currently making FACTION CHART
var makingFactionChart = false;

/*TESTING*/
var storedCards = 0;
var totalCards = 0;

// Basic Hearthstone Game Info
function getInfo()
{
  // Hide home, all cards, and card page
  $(".homePage").fadeOut("slow");
  $(".allCardsPage").fadeOut("slow");
  $(".cardPage").fadeOut("slow");

  // If we already got the info, show it
  if (infoGot==true)
  {
    showInfo();
  }
  else
  {
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";
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
        classes = removeDuplicates(classes);

        // Sets info
        sets = information[2];
        sets = removeDuplicates(sets);

        // Standard info
        standard = information[3];
        standard = removeDuplicates(standard);

        // Wild info
        wild = information[4];
        wild = removeDuplicates(wild);

        // Types info
        types = information[5];
        types = removeDuplicates(types);

        // Factions info
        factions = information[6];
        factions = removeDuplicates(factions);

        // Qualities info
        qualities = information[7];
        qualities = removeDuplicates(qualities);

        // Races info
        races = information[8];
        races = removeDuplicates(races);

        // Locales info
        //locales = information[9];

        // Stop loader
        document.getElementsByClassName("loader")[0].style.visibility = "hidden";
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
  // Hide home page, basic info, and card page
  $(".homePage").fadeOut("slow");
  $(".infoPage").fadeOut("slow");
  $(".cardPage").fadeOut("slow");

  // If we already got all cards, show them
  if ((allCardsGot==true)&&(makingChart==false))
  {
    showAllCards();
  }
  else
  {
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";

    // Reset all cards array
    allCards = [];

    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        var response = JSON.parse(this.responseText);
        console.log("get all cards");

        collections = Object.values(response);
        for (var i = 0; i < collections.length; i++)
        {
          for (var j = 0; j < collections[i].length; j++)
          {
            var card = Object.values(collections[i][j]);
            totalCards++;

            // Only store cards with 12 attributes or more
            if (card.length > 11)
            {
              // Position of class in array
              var classPos2 = Object.keys(collections[i][j]).indexOf("playerClass");
              // Position of set in array
              var setPos2 = Object.keys(collections[i][j]).indexOf("cardSet");
              // Position of rarity in array
              var rarityPos2 = Object.keys(collections[i][j]).indexOf("rarity");
              // Position of type in array
              /*var typePos2 = Object.key(collections[i][j]).indexOf("type");
              console.log("reads type");
              // Position of faction in array
              var factionPos2 = Object.key(collections[i][j]).indexOf("faction");
              console.log("reads faction");
              // Position of race in array
              var racePos2 = Object.key(collections[i][j]).indexOf("race");console.log("reads race");*/

              storedCards++;
              // Card name
              allCards.push(card[2]);

              if (makingClassChart)
              {
                var whichClass = card[classPos2];

                switch(whichClass) {
                  case "Death Knight":
                    deathKnight++;
                  break;
                  case "Druid":
                    druid++;
                  break;
                  case "Hunter":
                    hunter++;
                  break;
                  case "Mage":
                    mage++;
                  break;
                  case "Paladin":
                    paladin++;
                  break;
                  case "Priest":
                    priest++;
                  break;
                  case "Rogue":
                    rogue++;
                  break;
                  case "Shaman":
                    shaman++;
                  break;
                  case "Warlock":
                    warlock++;
                  break;
                  case "Warrior":
                    warrior++;
                  break;
                  case "Dream":
                    dream++;
                  break;
                  case "Neutral":
                    neutral++;
                  break;
                  case "Demon Hunter":
                    demonHunter++;
                  break;
                }
              }
              else if (makingSetChart)
              {
                var whichSet = card[setPos2];

                switch(whichSet) {
                  case "Basic":
                    basic++;
                  break;
                  case "Classic":
                    classic++;
                  break;
                  case "Hall of Fame":
                    hallOfFame++;
                  break;
                  case "Missions":
                    missions++;
                  break;
                  case "Demo":
                    demo++;
                  break;
                  case "System":
                    system++;
                  break;
                  case "Slush":
                    slush++;
                  break;
                  case "Promo":
                    promo++;
                  break;
                  case "Naxxramas":
                    naxxramas++;
                  break;
                  case "Goblins vs Gnomes":
                    goblins++;
                  break;
                  case "Blackrock Mountain":
                    blackrock++;
                  break;
                  case "The Grand Tournament":
                    grand++;
                  break;
                  case "Credits":
                    credits++;
                  break;
                  case "Hero Skins":
                    hero++;
                  break;
                  case "Tavern Brawl":
                    tavernBrawl++;
                  break;
                  case "The League of Explorers":
                    league++;
                  break;
                  case "Whispers of the Old Gods":
                    whispers++;
                  break;
                  case "One Night in Karazhan":
                    karazhan++;
                  break;
                  case "Mean Streets of Gadgetzan":
                    gadgetzan++;
                  break;
                  case "Journey to Un'Goro":
                    ungoro++;
                  break;
                  case "Knights of the Frozen Throne":
                    knights++;
                  break;
                  case "Kobolds & Catacombs":
                    kobolds++;
                  break;
                  case "The Witchwood":
                    witchwood++;
                  break;
                  case "The Boomsday Project":
                    boomsday++;
                  break;
                  case "Rastakhan's Rumble":
                    rastakhan++;
                  break;
                  case "Rise of Shadows":
                    shadows++;
                  break;
                  case "Taverns of Time":
                    tavernsOfTime++;
                  break;
                  case "Saviors of Uldum":
                    saviors++;
                  break;
                  case "Descent of Dragons":
                    dragons++;
                  break;
                  case "Galakrond's Awakening":
                    galakrond++;
                  break;
                  case "Ashes of Outland":
                    outland++;
                  break;
                  case "Wild Event":
                    wildEvent++;
                  break;
                  case "Scholomance Academy":
                    scholomance++;
                  break;
                  case "Battlegrounds":
                    battlegrounds++;
                  break;
                  case "Demon Hunter Initiate":
                    initiate++;
                  break;
                  case "Darkmoon Faire":
                    darkmoon++;
                  break;
                }
              }
              else if (makingRarityChart)
              {
                var whichRarity = card[rarityPos2];

                switch(whichRarity) {
                  case "Common":
                    common++;
                  break;
                  case "Free":
                    free++;
                  break;
                  case "Rare":
                    rare++;
                  break;
                  case "Epic":
                    epic++;
                  break;
                  case "Legendary":
                    legendary++;
                  break;
                }
              }
              /*
              else if (makingTypesChart)
              {
                var whichType = card[typePos2];

                switch(whichType) {
                  case "Hero":
                    hero++;
                  break;
                  case "Minion":
                    minion++;
                  break;
                  case "Spell":
                    spell++;
                  break;
                  case "Enchantment":
                    enchantment++;
                  break;
                  case "Weapon":
                    weapon++;
                  break;
                  case "Hero Power":
                    heroPower++;
                  break;
                }
              }
              else if (makingFactionChart)
              {
                var whichFaction = card[factionPos2];

                switch(whichFaction) {
                  case "Horde":
                    horde++;
                  break;
                  case "Alliance":
                    alliance++;
                  break;
                  case "Neutral":
                    neutralFaction++;
                  break;
                }
              }
              else if (makingRaceChart)
              {
                var whichRace = card[racePos2];

                switch(whichRace) {
                  case "Orc":
                    orc++;
                  break;
                  case "Murloc":
                    murloc++;
                  break;
                  case "Demon":
                    demon++;
                  break;
                  case "Mech":
                    mech++;
                  break;
                  case "Elemental":
                    elemental++;
                  break;
                  case "Beast":
                    beast++;
                  break;
                  case "Totem":
                    totem++;
                  break;
                  case "Pirate":
                    pirate++;
                  break;
                  case "Dragon":
                    dragon++;
                  break;
                  case "All":
                    all++;
                  break;
                }
              }
              */
            }
          }
          console.log("under for 1");
        }
        console.log("under for 2");

        // Stop loader
        document.getElementsByClassName("loader")[0].style.visibility = "hidden";

        if (!makingChart)
        {
          console.log("show all cards");
          showAllCards();
        }
        else if(makingClassChart)
        {
          classChart();
        }
        else if (makingSetChart)
        {
          setChart();
        }
        else if (makingRarityChart)
        {
          rarityChart();
        }
        else if (makingTypeChart)
        {
          typeChart();
        }
        else if (makingFactionChart)
        {
          factionChart();
        }
        else if (makingRaceChart)
        {
          raceChart();
        }
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
    // Hide image
    document.getElementById("cardImage").style.visibility = "hidden";
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";
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
          // Show image
          document.getElementById("cardImage").style.visibility = "visible";
          // Stop loader
          document.getElementsByClassName("loader")[0].style.visibility = "hidden";
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
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";
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
          // Stop loader
          document.getElementsByClassName("loader")[0].style.visibility = "hidden";
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
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";
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
          // Stop loader
          document.getElementsByClassName("loader")[0].style.visibility = "hidden";
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
    // Start loader
    document.getElementsByClassName("loader")[0].style.visibility = "visible";
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
          // Stop loader
          document.getElementsByClassName("loader")[0].style.visibility = "hidden";
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
function setLoadTimer()
{
  // Display background
  // Start loader
    document.getElementsByClassName("smallLoader")[0].style.visibility = "visible";
  // After 4 seconds, change background and move to back
  loadTimer = window.setInterval(function() {
    // Change to plain background
    //document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMFULURkraHVxc0bwNlDD4UzrpL7lA8plzSw&usqp=CAU')";

    document.body.style.background = "url('https://wallpaperaccess.com/full/552581.jpg') no-repeat center center fixed";
    // Stop loader
    document.getElementsByClassName("smallLoader")[0].style.visibility = "hidden";
    document.body.style.backgroundSize = "cover";

    //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rBmvAitwmX6szyUPgqpWjqKb9IkrqGvHwQ&usqp=CAU
    // No background
    //document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rBmvAitwmX6szyUPgqpWjqKb9IkrqGvHwQ&usqp=CAU')";

    // Turn visibility on for header, navbar, home page
    document.getElementsByClassName("header")[0].style.visibility = "visible";
    document.getElementsByClassName("navbar")[0].style.visibility = "visible";
    document.getElementsByClassName("homePage")[0].style.visibility = "visible";
    /*
    // Show header
    $(".header").fadeIn("slow");

    // Show navbar
    $(".navbar").fadeIn("slow");

    // Show home page
    $(".homePage").fadeIn("slow");
    */

    // Stop load timer
    stopLoadTimer();
  }, 4000);
}

// Loads the rest of the page
function stopLoadTimer()
{
  if (loadTimer != null)
  {
    window.clearInterval(loadTimer);

  }
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
  // Info page is visible
  document.getElementsByClassName("infoPage")[0].style.visibility = "visible";

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
  // All cards page is visible
  document.getElementsByClassName("allCardsPage")[0].style.visibility = "visible";

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

  // Show all cards page
  $(".allCardsPage").fadeIn("slow");

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

  // Hide other chart buttons
  document.getElementById("classChartButton").style.visibility = "hidden";
  document.getElementById("setChartButton").style.visibility = "hidden";
  document.getElementById("rarityChartButton").style.visibility = "hidden";

  // Hide charts
  hideCharts();

  // Hide class, set, rarity input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("typeChartButton").style.visibility = "hidden";
  document.getElementById("factionChartButton").style.visibility = "hidden";
  document.getElementById("raceChartButton").style.visibility = "hidden";

  // Show name input field
  document.getElementById("singleCardName").style.visibility = "visible";

  // Show card header
  document.getElementById("cardHeader").style.visibility = "visible";

  // Hide class, set, rarity buttons
  document.getElementById("classNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";

  // Show card page header
  document.getElementsByClassName("cardPageHeader")[0].style.visibility = "visible";

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
function showChartOptions()
{
  // Hide card header
  document.getElementById("cardHeader").style.visibility = "hidden";

  // Hide card title
  document.getElementById("cardTitle").style.visibility = "hidden";

  // Hide charts
  hideCharts();

  // Hide class, name, set, rarity input fields
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";
  document.getElementById("className").style.visibility = "hidden";

  // Hide class, name, set, rarity buttons
  document.getElementById("cardNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";
  document.getElementById("classNameButton").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("classChartButton").style.visibility = "hidden";
  document.getElementById("setChartButton").style.visibility = "hidden";
  document.getElementById("rarityChartButton").style.visibility = "hidden";

  // Show card page header
  document.getElementsByClassName("cardPageHeader")[0].style.visibility = "visible";

  // Show chart buttons
  document.getElementById("typeChartButton").style.visibility = "visible";
  document.getElementById("factionChartButton").style.visibility = "visible";
  document.getElementById("raceChartButton").style.visibility = "visible";

  // Hides card name img, golden button, and card description
  hideCardName();

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

  // Hide charts
  hideCharts();

  // Hide other chart buttons
  document.getElementById("typeChartButton").style.visibility = "hidden";
  document.getElementById("factionChartButton").style.visibility = "hidden";
  document.getElementById("raceChartButton").style.visibility = "hidden";

  // Hide name, set, rarity input fields
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Show class input field
  document.getElementById("className").style.visibility = "visible";

  // Show card header
  document.getElementById("cardHeader").style.visibility = "visible";

  // Hide name, set, rarity buttons
  document.getElementById("cardNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("setChartButton").style.visibility = "hidden";
  document.getElementById("rarityChartButton").style.visibility = "hidden";

  // Show card page header
  document.getElementsByClassName("cardPageHeader")[0].style.visibility = "visible";

  // Show class button
  document.getElementById("classNameButton").style.visibility = "visible";

  // Show chart button
  document.getElementById("classChartButton").style.visibility = "visible";

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

  // Hide charts
  hideCharts();

  // Hide other chart buttons
  document.getElementById("classChartButton").style.visibility = "hidden";
  document.getElementById("rarityChartButton").style.visibility = "hidden";

  // Hide class, name, rarity input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";

  // Show set input field
  document.getElementById("setName").style.visibility = "visible";

  // Show card page header
  document.getElementsByClassName("cardPageHeader")[0].style.visibility = "visible";

  // Show card header
  document.getElementById("cardHeader").style.visibility = "visible";

  // Hide other chart buttons
  document.getElementById("typeChartButton").style.visibility = "hidden";
  document.getElementById("factionChartButton").style.visibility = "hidden";
  document.getElementById("raceChartButton").style.visibility = "hidden";

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

  // Show chart button
  document.getElementById("setChartButton").style.visibility = "visible";

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

  // Hide charts
  hideCharts();

  // Hide other chart buttons
  document.getElementById("typeChartButton").style.visibility = "hidden";
  document.getElementById("factionChartButton").style.visibility = "hidden";
  document.getElementById("raceChartButton").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("classChartButton").style.visibility = "hidden";
  document.getElementById("setChartButton").style.visibility = "hidden";

  // Hide class, set, name input fields
  document.getElementById("className").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("singleCardName").style.visibility = "hidden";

  // Show rarity input field
  document.getElementById("rarityName").style.visibility = "visible";

  // Show card header
  document.getElementById("cardHeader").style.visibility = "visible";

  // Show card page header
  document.getElementsByClassName("cardPageHeader")[0].style.visibility = "visible";

  // Hide class, set, name buttons
  document.getElementById("classNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("cardNameButton").style.visibility = "hidden";

  // Show rarity button
  document.getElementById("rarityNameButton").style.visibility = "visible";

  // Show chart button
  document.getElementById("rarityChartButton").style.visibility = "visible";

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

/*CHARTS*/
// Initial class chart Call
function classChartCall()
{
  makingChart = true;
  makingClassChart = true;

  // Get all cards
  getAllCards();
}
// Class CHART
function classChart()
{
  // Make the chart
  let ctx = document.getElementById("classChart");

      var classChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior', 'Demon Hunter'
          ],
          datasets: [{
            label: '# of Cards',
            data: [druid, hunter, mage, paladin, priest, rogue, shaman, warlock, warrior, demonHunter
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 26, 76, 0.2)',
              'rgba(80, 255, 9, 0.2)',
              'rgba(190, 157, 137, 0.2)',
              'rgba(30, 157, 255, 0.2)',
              'rgba(157, 77, 255, 0.2)',
              'rgba(71, 255, 144, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 26, 76, 1)',
              'rgba(80, 255, 9, 1)',
              'rgba(190, 157, 137, 1)',
              'rgba(30, 157, 255, 1)',
              'rgba(157, 77, 255, 1)',
              'rgba(71, 255, 144, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("classChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingClassChart = false;
  makingChart = false;
}

// Initial set chart Call
function setChartCall()
{
  makingChart = true;
  makingSetChart = true;

  // Get all cards
  getAllCards();
}

// Set CHART
function setChart()
{
  // Make the chart
  let ctx = document.getElementById("setChart");

      var setChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Basic', 'Classic', 'Hall of Fame', 'Missions', 'Demo', 'System', 'Slush', 'Promo', 'Naxxramas', 'Goblins vs Gnomes', 'Blackrock Mountain', 'The Grand Tournament', 'Credits', 'Hero Skins', 'Tavern Brawl', 'The League of Explorers', 'Whispers of the Old Gods', 'One Night in Karazhan', 'Mean Streets of Gadgetzan', "Journey to Un'Goro", 'Knights of the Frozen Throne', 'Kobolds & Catacombs', 'The Witchwood', 'The Boomsday Project', "Rastakhan's Rumble", 'Rise of Shadows', 'Taverns of Time', 'Saviors of Uldum', 'Descent of Dragons', "Galakrond's Awakening", 'Ashes of Outland', 'Wild Event', 'Scholomance Academy', 'Battlegrounds', 'Demon Hunter Initiate', 'Darkmoon Faire'
          ],
          datasets: [{
            label: '# of Cards',
            data: [basic, classic, hallOfFame, missions, demo, system, slush, promo, naxxramas, goblins, blackrock, grand, credits, hero, tavernBrawl, league, whispers, karazhan, gadgetzan, ungoro, knights,kobolds, witchwood, boomsday, rastakhan, shadows, tavernsOfTime, saviors, dragons, galakrond, outland, wildEvent, scholomance, battlegrounds, initiate, darkmoon
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 26, 76, 0.2)',
              'rgba(80, 255, 9, 0.2)',
              'rgba(190, 157, 137, 0.2)',
              'rgba(30, 157, 255, 0.2)',
              'rgba(157, 77, 255, 0.2)',
              'rgba(71, 255, 144, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 26, 76, 0.2)',
              'rgba(80, 255, 9, 0.2)',
              'rgba(190, 157, 137, 0.2)',
              'rgba(30, 157, 255, 0.2)',
              'rgba(157, 77, 255, 0.2)',
              'rgba(71, 255, 144, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 26, 76, 0.2)',
              'rgba(80, 255, 9, 0.2)',
              'rgba(190, 157, 137, 0.2)',
              'rgba(30, 157, 255, 0.2)',
              'rgba(157, 77, 255, 0.2)',
              'rgba(71, 255, 144, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 26, 76, 1)',
              'rgba(80, 255, 9, 1)',
              'rgba(190, 157, 137, 1)',
              'rgba(30, 157, 255, 1)',
              'rgba(157, 77, 255, 1)',
              'rgba(71, 255, 144, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 26, 76, 1)',
              'rgba(80, 255, 9, 1)',
              'rgba(190, 157, 137, 1)',
              'rgba(30, 157, 255, 1)',
              'rgba(157, 77, 255, 1)',
              'rgba(71, 255, 144, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 26, 76, 1)',
              'rgba(80, 255, 9, 1)',
              'rgba(190, 157, 137, 1)',
              'rgba(30, 157, 255, 1)',
              'rgba(157, 77, 255, 1)',
              'rgba(71, 255, 144, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("setChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingSetChart = false;
  makingChart = false;
}

// Initial rarity chart Call
function rarityChartCall()
{
  makingChart = true;
  makingRarityChart = true;

  // Get all cards
  getAllCards();
}

// Rarity CHART
function rarityChart()
{
  // Make the chart
  let ctx = document.getElementById("rarityChart");

      var rarityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Common', 'Free', 'Rare', 'Epic', 'Legendary'
          ],
          datasets: [{
            label: '# of Cards',
            data: [common, free, rare, epic, legendary
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("rarityChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingRarityChart = false;
  makingChart = false;
}

// Initial type chart Call
function typeChartCall()
{
  makingChart = true;
  makingTypeChart = true;

  // Get all cards
  getAllCards();
}

// Type CHART
function typeChart()
{
  // Make the chart
  let ctx = document.getElementById("typeChart");

      var typeChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Hero', 'Minion', 'Spell', 'Enchantment', 'Weapon', 'Hero Power'
          ],
          datasets: [{
            label: '# of Cards',
            data: [hero, minion, spell, enchantment, weapon, heroPower
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("typeChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingTypeChart = false;
  makingChart = false;
}

// Initial faction chart Call
function factionChartCall()
{
  makingChart = true;
  makingFactionChart = true;

  // Get all cards
  getAllCards();
}

// Faction CHART
function factionChart()
{
  // Make the chart
  let ctx = document.getElementById("factionChart");

      var factionChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Horde', 'Alliance', 'Neutral'
          ],
          datasets: [{
            label: '# of Cards',
            data: [horde, alliance, neutralFaction
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("factionChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingFactionChart = false;
  makingChart = false;
}

// Initial class chart Call
function classRaceCall()
{
  makingChart = true;
  makingRaceChart = true;

  // Get all cards
  getAllCards();
}

// Race CHART
function raceChart()
{
  // Make the chart
  let ctx = document.getElementById("raceChart");

      var raceChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Orc', 'Murloc', 'Demon', 'Mech', 'Elemental', 'Beast', 'Totem', 'Pirate', 'Dragon', 'All'
          ],
          datasets: [{
            label: '# of Cards',
            data: [orc, murloc, demon, mech, elemental, beast, totem, pirate, dragon, all
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 26, 76, 0.2)',
              'rgba(80, 255, 9, 0.2)',
              'rgba(190, 157, 137, 0.2)',
              'rgba(30, 157, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 26, 76, 1)',
              'rgba(80, 255, 9, 1)',
              'rgba(190, 157, 137, 1)',
              'rgba(30, 157, 255, 1)'
            ],
            borderWidth: 1

          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });


  console.log("Total cards: " + totalCards);
  console.log("Stored cards: " + storedCards);
  // Hide card name
  hideCardName();

  // Hide card lists
  document.getElementsByClassName("cardLists")[0].style.visibility = "hidden";
  document.getElementsByClassName("cardTitle")[0].style.visibility = "hidden";

  // Show chart
  document.getElementById("raceChart").style.visibility = "visible";
  document.getElementsByClassName("charts")[0].style.visibility = "visible";
  showCardPage();

  makingRaceChart = false;
  makingChart = false;
}

// Hide charts
function hideCharts()
{
  document.getElementById("classChart").style.visibility = "hidden";
  document.getElementById("setChart").style.visibility = "hidden";
  document.getElementById("rarityChart").style.visibility = "hidden";
  document.getElementById("typeChart").style.visibility = "hidden";
  document.getElementById("factionChart").style.visibility = "hidden";
  document.getElementById("raceChart").style.visibility = "hidden";
}


// Coming soon
function comingSoon()
{
  // Display generic card page
  showCardPage();
  hideCharts();
  hideCardName();

  // Hide card header
  document.getElementById("cardHeader").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("typeChartButton").style.visibility = "hidden";
  document.getElementById("factionChartButton").style.visibility = "hidden";
  document.getElementById("raceChartButton").style.visibility = "hidden";
  document.getElementById("classChartButton").style.visibility = "hidden";

  // Hide name, set, rarity input fields
  document.getElementById("singleCardName").style.visibility = "hidden";
  document.getElementById("setName").style.visibility = "hidden";
  document.getElementById("rarityName").style.visibility = "hidden";
  document.getElementById("className").style.visibility = "hidden";

  // Hide name, set, rarity buttons
  document.getElementById("cardNameButton").style.visibility = "hidden";
  document.getElementById("setNameButton").style.visibility = "hidden";
  document.getElementById("rarityNameButton").style.visibility = "hidden";
  document.getElementById("classNameButton").style.visibility = "hidden";

  // Hide other chart buttons
  document.getElementById("setChartButton").style.visibility = "hidden";
  document.getElementById("rarityChartButton").style.visibility = "hidden";
  document.getElementById("classChartButton").style.visibility = "hidden";

  document.getElementById("cardTitle").style.visibility = "visible";
  document.getElementById("cardTitle").innerHTML = "Coming soon!"
}