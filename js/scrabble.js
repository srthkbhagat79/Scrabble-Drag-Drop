/*Name:Sarthak Bhagat
  Course name: GUI I
  Instructor- Wenjin Zhou
  Assignment#8 - Creating Scrabble Game Using Drag and Drop
  sources used: https://www.w3schools.com/css, cs.uml.edu server, https://www.w3schools.com/js
  https://www.w3schools.com/jquery
  File type: .js file
*/

/* These features/pieces were directly copy pasted from the graphics_data.zip
provided by the instructor */
features = {
  "pieces": [{
      "letter": "A",
      "value": 1,
      "amount": 9
    },
    {
      "letter": "B",
      "value": 3,
      "amount": 2
    },
    {
      "letter": "C",
      "value": 3,
      "amount": 2
    },
    {
      "letter": "D",
      "value": 2,
      "amount": 4
    },
    {
      "letter": "E",
      "value": 1,
      "amount": 12
    },
    {
      "letter": "F",
      "value": 4,
      "amount": 2
    },
    {
      "letter": "G",
      "value": 2,
      "amount": 3
    },
    {
      "letter": "H",
      "value": 4,
      "amount": 2
    },
    {
      "letter": "I",
      "value": 1,
      "amount": 9
    },
    {
      "letter": "J",
      "value": 8,
      "amount": 1
    },
    {
      "letter": "K",
      "value": 5,
      "amount": 1
    },
    {
      "letter": "L",
      "value": 1,
      "amount": 4
    },
    {
      "letter": "M",
      "value": 3,
      "amount": 2
    },
    {
      "letter": "N",
      "value": 1,
      "amount": 6
    },
    {
      "letter": "O",
      "value": 1,
      "amount": 8
    },
    {
      "letter": "P",
      "value": 3,
      "amount": 2
    },
    {
      "letter": "Q",
      "value": 10,
      "amount": 1
    },
    {
      "letter": "R",
      "value": 1,
      "amount": 6
    },
    {
      "letter": "S",
      "value": 1,
      "amount": 4
    },
    {
      "letter": "T",
      "value": 1,
      "amount": 6
    },
    {
      "letter": "U",
      "value": 1,
      "amount": 4
    },
    {
      "letter": "V",
      "value": 4,
      "amount": 2
    },
    {
      "letter": "W",
      "value": 4,
      "amount": 2
    },
    {
      "letter": "X",
      "value": 8,
      "amount": 1
    },
    {
      "letter": "Y",
      "value": 4,
      "amount": 2
    },
    {
      "letter": "Z",
      "value": 10,
      "amount": 1
    }
  ]
};
var letterAmount = 111; // Letter tiles amount
var squareBoardCount = 0;
var points = 0; // Player score
var vertical_arr = new Array(7); // Vertical tiles
var horizontal_arr = new Array(7); // Horizontal Tiles

//loads the game and executes drag and drop of the tiles
$(document).ready(function() {
  localStorage.clear();
  play();
  dragDrop();
});

//This function checks if the word exists in English dictionary and if not spitts out an alert message
function checkWord() {
  var message = "";
  if (vertical_arr !== "") {
    if (!isFound(vertical_arr)) {
      message = "Sorry this Vertical word was not found in English dictionary\n";
    } else {
      message = "Success! Great Going. Vertical word found in English dictionary\n";
    }
  }
  if (horizontal_arr !== "") {
    if (!isFound(horizontal_arr)) {
      message += "Sorry this Horizontal word not found in English dictionary\n";
    } else {
      message += "Success! Great Going. Horizontal word found in English dictionary\n";
    }
  }
  alert(message);
}

//This method keeps track of the words being inserted into the vertical or horzintal array
function wordTracker(word, id) {
  var currWord = "";
  for (var i = 0; i < word.length; i++) {
    if (typeof word[i] === 'undefined') {

    } else {
      currWord += word[i];
    }
  }
  if (currWord) {
    $('#' + id).html(currWord);

  }
}
//This function is used for drag and drop of the squareblocks onto the game board.
function dragDrop() {
  $("#gameBoard").droppable({
    accept: '.img'
  });
  $(".img").draggable({
    snap: ".square_blocks",
    snapMode: "inner",
    revert: 'invalid'
  });

  function Drag(event, ui) {

    if (ui.draggable.attr("id") === vertical_arr[$(this).attr("id")]) {
      vertical_arr[$(this).attr("id")] = "";
      wordTracker(vertical_arr, "vertical_input");
    }
    if (ui.draggable.attr("id") === horizontal_arr[$(this).attr("id")]) {
      horizontal_arr[$(this).attr("id")] = "";
      wordTracker(horizontal_arr, "horizontal_input");
    }

  }
  $(".square_blocks").droppable({
    accept: '.img',
    drop: Drop,
    out: Drag
  });

  function Drop(event, ui) {
    var character = ui.draggable.prop('id');
    var elem = $(this).attr("id");
    var integer = parseInt(elem);
    if (integer === 6) {
      points = 0;
      vertical_arr[integer] = character;
      wordTracker(vertical_arr, "vertical_input");
      horizontal_arr[0] = character;
      wordTracker(horizontal_arr, "horizontal_input");
    } else if (integer < 6) {
      points = 0;
      vertical_arr[integer] = character;
      wordTracker(vertical_arr, "vertical_input");
    } else if (integer > 6) {
      points = 0;
      horizontal_arr[integer - 6] = character;
      wordTracker(horizontal_arr, "horizontal_input");

    }
    scoreTracker(vertical_arr);
    scoreTracker(horizontal_arr);
  }
}
//The function keeps track of the player score by determining the square blocks being placed
// on the board. If inserted on bonus square double the points, else same points written on the tiles
// Also, the tile connecting the vertical and horizontal array is counted twice the points mentioned on tiles.
function scoreTracker(word) {
  var scoring = 0;
  var doublePoints = 0;
  for (var i = 0; i < word.length; i++) {
    for (var j = 0; j < features.pieces.length; j++) {
      if (word[i] !== "" && (word[i] === features.pieces[j].letter)) {
        //Count the double words index
        if (i === 2) {
          scoring += features.pieces[j].value * 2;
        }
        if (i === 5) {
          doublePoints++;
          scoring += features.pieces[j].value;
        }
        if (i !== 2 && i !== 5) {
          scoring += features.pieces[j].value;
        }
      }
    }
  }
  //multiple the scoring by 2
  if (doublePoints !== 0) {
    points += scoring * 2;
  } else {
    points += scoring;
  }
  //score being showed
  $('#Total_Score').html(points);
}

//The function checks for the word in the English dicitonary. If so, return true, else false.
function isFound(word) {
  var currWord = "";
  for (var i = 0; i < word.length; i++) {
    if (typeof word[i] === 'undefined') {

    } else {
      currWord += word[i];
    }
  }
  if (dict[currWord] === true) {
    return true;
  }
  return false;
}
// Starts the Game
function startGame() {
  localStorage.clear();
  gamebegin();
  releasepull();
}

// This is used for replace the tiles if the user gets stuck.
function next_Search() {
  play();
  localStorage.setItem("squareBoardCount", squareBoardCount);
  localStorage.setItem("Total_Score", points);
  dragDrop();
}
//Game loaded and starts
function play() {
  if (localStorage.getItem("squareBoardCount") !== null && localStorage.getItem("squareBoardCount") !== "undefined") {
    squareBoardCount = localStorage.getItem("squareBoardCount");
  } else {
    squareBoardCount = 0;
  }
  if (localStorage.getItem("Total_Score") !== null && localStorage.getItem("Total_Score") !== "undefined") {
    points = localStorage.getItem("Total_Score");
  } else {
    points = 0;
  }
  var alphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  var html = "";
  var squareTiles = letterAmount - squareBoardCount;

  // SqaureTiles is being set to 13. That will provide 50% chance of getting the desired tile.
  // Those 13 tiles are selected at Random. Those 13 tiles will have a image from the images folder according to the character
  // inserted into the array
  if (squareTiles > 13)
    squareTiles = 13;
  for (i = 0; i < squareTiles; i++) {
    var num = Math.floor((Math.random() * 26));
    character = alphabetArray[num];
    html += '<img class="img" id="' + character + '" src="images/Scrabble_Tile_' + character + '.jpg" height="50" width="50"/>';
    squareBoardCount++;
  }
  //Tiles Remaining after each insert. Keeps track of the total number of tiles left.
  var tilesRemaining = letterAmount - squareBoardCount;
  if (tilesRemaining < 0)
    tilesRemaining = 0;

  // This is used to display all the results in the html file(index.html) where it can be loaded and seen
  // on the browser.
  vertical_arr = new Array(7);
  horizontal_arr = new Array(7);
  $("#vertical_input").html(vertical_arr);
  $("#horizontal_input").html(horizontal_arr);
  $("#Total_Score").html(points);
  $("#squareBoardCount").html(tilesRemaining);
  $("#gameBoard").html(html);

}
