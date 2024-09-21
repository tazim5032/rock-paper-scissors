class Rules {
    constructor(moves) {
      this.moves = moves;
      this.numMoves = moves.length;
    }
  
    getResult(userMove, computerMove) {
      const userIndex = this.moves.indexOf(userMove);
      const computerIndex = this.moves.indexOf(computerMove);
  
      if (userIndex === computerIndex) {
        return "Draw!";
      }
  
      const half = Math.floor(this.numMoves / 2);
      const winningRange = [...Array(half).keys()].map(i => (userIndex + 1 + i) % this.numMoves);
  
      if (winningRange.includes(computerIndex)) {
        return "You win!";
      } else {
        return "Computer wins!";
      }
    }
  
    displayRules() {
      console.log("Rules:");
      const tableHeader = ['Move', ...this.moves];
      console.log(tableHeader.join('\t'));
  
      this.moves.forEach((move, index) => {
        const row = [move];
        this.moves.forEach((opponentMove, opponentIndex) => {
          if (index === opponentIndex) {
            row.push('Draw');
          } else {
            const result = this.getResult(move, opponentMove);
            row.push(result.includes("win") ? "Win" : "Lose");
          }
        });
        console.log(row.join('\t'));
      });
    }
  }
  
  module.exports = Rules;
  