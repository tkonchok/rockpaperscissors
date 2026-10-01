const WINNING_SCORE = 5;
const choices = ["rock", "paper", "scissors"];
const choiceEmojis = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️",
};

let humanScore = 0;
let computerScore = 0;

const playerScoreElement = document.querySelector("#player-score");
const computerScoreElement = document.querySelector("#computer-score");
const resultText = document.querySelector("#result-text");
const playerChoiceElement = document.querySelector("#player-choice");
const computerChoiceElement = document.querySelector("#computer-choice");
const playerChoiceName = document.querySelector("#player-choice-name");
const computerChoiceName = document.querySelector("#computer-choice-name");
const choiceButtons = document.querySelectorAll(".choice-button");
const restartButton = document.querySelector("#restart-button");

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        return "tie";
    }

    const humanWins =
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper");

    return humanWins ? "win" : "lose";
}

function formatChoice(choice) {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
}

function updateScoreboard() {
    playerScoreElement.textContent = humanScore;
    computerScoreElement.textContent = computerScore;
}

function displayChoices(humanChoice, computerChoice) {
    playerChoiceElement.textContent = choiceEmojis[humanChoice];
    playerChoiceElement.setAttribute("aria-label", `You chose ${humanChoice}`);
    playerChoiceName.textContent = formatChoice(humanChoice);

    computerChoiceElement.textContent = choiceEmojis[computerChoice];
    computerChoiceElement.setAttribute("aria-label", `Computer chose ${computerChoice}`);
    computerChoiceName.textContent = formatChoice(computerChoice);
}

function endGame(winner) {
    resultText.textContent = winner === "human"
        ? "You reached 5 points—you win the game! 🎉"
        : "The computer reached 5 points. Try again! 🤖";

    choiceButtons.forEach((button) => {
        button.disabled = true;
    });

    restartButton.hidden = false;
    restartButton.focus();
}

function handleChoice(event) {
    const humanChoice = event.currentTarget.dataset.choice;
    const computerChoice = getComputerChoice();
    const result = playRound(humanChoice, computerChoice);

    displayChoices(humanChoice, computerChoice);

    if (result === "win") {
        humanScore += 1;
        resultText.textContent = `You chose ${formatChoice(humanChoice)}. Computer chose ${formatChoice(computerChoice)}. You win this round!`;
    } else if (result === "lose") {
        computerScore += 1;
        resultText.textContent = `You chose ${formatChoice(humanChoice)}. Computer chose ${formatChoice(computerChoice)}. Computer wins this round.`;
    } else {
        resultText.textContent = `You both chose ${formatChoice(humanChoice)}. It is a tie!`;
    }

    updateScoreboard();

    if (humanScore === WINNING_SCORE) {
        endGame("human");
    } else if (computerScore === WINNING_SCORE) {
        endGame("computer");
    }
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    updateScoreboard();
    resultText.textContent = "Choose your weapon to begin!";
    playerChoiceElement.textContent = "❔";
    playerChoiceElement.setAttribute("aria-label", "No choice yet");
    playerChoiceName.textContent = "Waiting...";
    computerChoiceElement.textContent = "❔";
    computerChoiceElement.setAttribute("aria-label", "No choice yet");
    computerChoiceName.textContent = "Waiting...";

    choiceButtons.forEach((button) => {
        button.disabled = false;
    });

    restartButton.hidden = true;
    choiceButtons[0].focus();
}

choiceButtons.forEach((button) => {
    button.addEventListener("click", handleChoice);
});

restartButton.addEventListener("click", restartGame);
