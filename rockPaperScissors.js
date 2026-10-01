
function getComputerChoice() {
    return Math.random() < 0.33 ? "rock" : Math.random() < 0.66 ? "paper" : "scissors";
}

function getHumanChoice() {
    return prompt("Choose rock, paper, or scissors:")
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    console.log(`You chose ${humanChoice}, computer chose ${computerChoice}`);

    if (humanChoice === computerChoice) {
        console.log("It's a tie!");
    }
    if (humanChoice === "rock" && computerChoice === "scissors") {
        console.log("You win!");
        humanScore++;   
    }
    if (humanChoice === "paper" && computerChoice === "rock") {
        console.log("You win!");
        humanScore++;
    }
    if (humanChoice === "scissors" && computerChoice === "paper") {
        console.log("You win!");
        humanScore++;
    }  
    if (humanChoice === "rock" && computerChoice === "paper") {
        console.log(`You lose! ${computerChoice} Beats ${humanChoice}`);
        computerScore++;
    }
    if (humanChoice === "paper" && computerChoice === "scissors") {
        console.log(`You lose! ${computerChoice} Beats ${humanChoice}`);
        computerScore++;
    }
    if (humanChoice === "scissors" && computerChoice === "rock") {
        console.log(`You lose! ${computerChoice} Beats ${humanChoice}`);
        computerScore++;
    }                                                                            
    }

    for (let round = 0; round < 5; round++) {
        playRound(getHumanChoice(), getComputerChoice());
    }

    if (humanScore > computerScore) {
        console.log("You win the game!");
    } else if (computerScore > humanScore) {
        console.log("Computer wins the game!");
    } else {
        console.log("The game is a tie!");
    }

}

playGame();