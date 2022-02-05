// **** Buttons ****

// Set button click listener
function enableButtonClick() {
    $(".btn").on("click",
        function (event) {
            //Display guess
            displayButtonPress($(event.target))

            // Play button noise
            playButtonNoise(buttonArray.index($(event.target)));

            // Add guess to list
            playerGuesses.push(event.target) ;
            // Check if guess correct
            checkGuess(playerGuesses.length - 1);

        });
}

// Disable button click
function disableButtonClick() {
    $(".btn").off("click");
}

// Display button as pressed
function displayButtonPress(button) {
    button.addClass("pressed");
    setTimeout(function () {
        button.removeClass("pressed");
    }, 400);
}

// Play button noise
function playButtonNoise(button) {
    let sounds = [];

    sounds.push(new Audio("sounds/green.mp3"));
    sounds.push(new Audio("sounds/red.mp3"));
    sounds.push(new Audio("sounds/yellow.mp3"));
    sounds.push(new Audio("sounds/blue.mp3"));

    sounds[button].play();
}

// ***** Game Logic *****
let gameMemory = [];
let playerGuesses = [];
const buttonArray = $(".btn");
let currentLevel = 0;
startNewGame();

// Start game
function startNewGame() {
    currentLevel = 0;
    gameMemory.length = 0;

    let gameStarted = false;

    $(document).on("keydown", function (event) {

        if (!gameStarted) {

            $("body").removeClass("game-over");
            setTimeout(function (){
                playNextRound();
            }, 400);

            gameStarted = true;
            enableButtonClick();
        }
    })

}

// Change level title
function updateTitle(currentLevel) {
    currentLevel++;
    $("#level-title").text("Level " + currentLevel);

    return currentLevel;
}

// Randomize next button
function randomButton() {
    return Math.floor(Math.random() * 4);

}

// Play next round
function playNextRound() {

    // Update title
    currentLevel = updateTitle(currentLevel);

    // Remove counter text
    $("#counter").text("");

    // Clear player guesses
    playerGuesses.length = 0;

    // Get random button
    gameMemory.push(randomButton());

    // Display current button
    let newButton = $(buttonArray[gameMemory[gameMemory.length - 1]]);
    displayButtonPress(newButton);
    //  Play button noise
    playButtonNoise(gameMemory[gameMemory.length-1]);

}

// Check if guess correct
function checkGuess(i) {
    let currentButton = buttonArray[gameMemory[i]];

    if (currentButton === playerGuesses[i]) { // Player guessed correctly
        // Update counter
        $("#counter").text(playerGuesses.length + "/" + gameMemory.length);

        if (playerGuesses.length === gameMemory.length) { // Level over
            // Start next level
            setTimeout(function (){
                playNextRound();
            }, 1000);
        }
    }
    else { // Player guessed incorrectly
        gameOver();
    }
}

// Display game over
function gameOver() {
    // Disable button clicks
    disableButtonClick();

    // Display game over UI
    $("body").addClass("game-over");
    $("#level-title").text("Game over.\n Press any key to play again. ");
    $("#counter").text("Try again?");
    displayButtonPress(buttonArray);
    // Play wrong noise
    let wrongNoise = new Audio("sounds/wrong.mp3")
    wrongNoise.play();
    startNewGame();

}