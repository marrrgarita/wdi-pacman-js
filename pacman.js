// Setup initial game stats
var score = 0;
var lives = 5;
var powerPellets = 4;
var dots = 240;
var ghostsEaten = 0;

// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]
// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '     Power Pellets: ' + powerPellets + '     Dots: ' + dots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  if (powerPellets > 0) {
    console.log('(p) Eat Power-Pellet');
  }
  if (dots >= 100) {
    console.log('(h) Eat 100 Dots');
    console.log('(t) Eat 10 Dots');
  }
  else if (dots >= 10){
      console.log('(t) Eat 10 Dots');
  }
  console.log('(d) Eat Dot');
  ghosts.forEach(displayGhost);
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


function displayGhost(element, index, ghosts) {
  if (element.edible === false) {
    console.log('(' + element.menu_option + ') Eat ' + element.name + '(inedible)');
  }
  else if (element.edible === true) {
    console.log('(' + element.menu_option + ') Eat ' + element.name + '(edible)');
  }
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
  dots -= 1;
}

function eatHundredDots() {
  if (dots >= 100) {
    console.log('\nChomp! Chomp! CHOMP!');
    score += 1000;
    dots -= 100;
  }
  else {
    console.log('\nNot enough dots!')
  }
}

function eatTenDots() {
  if (dots >= 10) {
    console.log('\nChomp! Chomp!');
    score += 100;
    dots -= 10;
  }
  else {
    console.log('\nNot enough dots!')
  }
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\nYou have been killed by ' + ghost.name + ' who is the colour ' + ghost.colour);
    lives -= 1;
  }
  else {
    console.log('\nYou have eaten ' + ghost.name + ' who is ' + ghost.character);
    ghostsEaten += 1;
    ghost.edible = false;
    switch (ghostsEaten) {
      case 1:
        score += 200;
        break;
      case 2:
        score += 400;
        break;
      case 3:
        score += 800;
        break;
      case 4:
        score += 1600;
        ghostsEaten = 0;
    }
  }
  checkLives();
}

function eatPowerPellet() {
  if (powerPellets > 0) {
    console.log('\nAte Power Pellet!');
    powerPellets -= 1;
    score += 50;
    ghosts.forEach(function(ghost) {
      ghost.edible = true;
    });
  }
  else {
    console.log('\nNo more power pellets!');
  }
}


function checkLives() {
  if (lives === 0) {
    displayStats();
    process.exit();
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'p':
      eatPowerPellet();
      break;
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'h':
      eatHundredDots();
      break;
    case 't':
      eatTenDots();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}



//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 500); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
