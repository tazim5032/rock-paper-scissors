const crypto = require('crypto');
const KeyGenerator = require('./KeyGenerator');
const HMACGenerator = require('./HMACGenerator');
const Rules = require('./Rules');

class Game {
  constructor(moves) {
    this.moves = moves;
    this.computerMove = null;
    this.key = null;
    this.hmac = null;
  }

  start() {
    if (!this.validateMoves()) {
      console.error("Error: You must provide an odd number (≥ 3) of non-repeating moves.");
      console.error("Example: node Game.js rock paper scissors");
      process.exit(1);
    }

    this.key = KeyGenerator.generateKey();
    this.computerMove = this.getRandomMove();
    this.hmac = HMACGenerator.generateHMAC(this.key, this.computerMove);
    console.log(`HMAC: ${this.hmac}`);
    
    this.displayMenu();
    this.promptUser();
  }

  validateMoves() {
    const isOdd = this.moves.length % 2 === 1;
    const isUnique = new Set(this.moves).size === this.moves.length;
    return this.moves.length >= 3 && isOdd && isUnique;
  }

  getRandomMove() {
    const randomIndex = crypto.randomInt(this.moves.length);
    return this.moves[randomIndex];
  }

  displayMenu() {
    console.log("Available moves:");
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log("0 - exit");
    console.log("? - help");
  }

  promptUser() {
    const stdin = process.stdin;
    stdin.setEncoding('utf-8');
    
    stdin.on('data', (input) => {
      const userChoice = input.trim();

      if (userChoice === '0') {
        console.log("Exiting...");
        process.exit(0);
      }

      if (userChoice === '?') {
        this.showHelp();
        this.displayMenu();
      } else {
        const userMoveIndex = parseInt(userChoice) - 1;
        if (userMoveIndex >= 0 && userMoveIndex < this.moves.length) {
          const userMove = this.moves[userMoveIndex];
          this.evaluateGame(userMove);
        } else {
          console.log("Invalid move! Please try again.");
          this.displayMenu();
        }
      }
    });
  }

  evaluateGame(userMove) {
    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${this.computerMove}`);
    
    const rules = new Rules(this.moves);
    const result = rules.getResult(userMove, this.computerMove);

    console.log(result);
    console.log(`HMAC key: ${this.key}`);
    process.exit(0);
  }

  showHelp() {
    const rules = new Rules(this.moves);
    rules.displayRules();
  }
}

const moves = process.argv.slice(2);
const game = new Game(moves);
game.start();
