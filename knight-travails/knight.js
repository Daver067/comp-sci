class Knight {
  constructor(startLocation) {
    this.startLocation = startLocation;
  }
}

class board {
  constructor() {
    this.board = this.buildBoard();
    this.edgeList = this.buildEdgeList();
    this.squaresVisited = [];
    this.queue = [];
  }
  buildBoard() {
    let board = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        board.push([x, y]);
      }
    }
    return (this.board = board);
  }
  // helper function for building edge list
  checkLegalMove(move) {
    if (move[0] < 0 || move[1] < 0 || move[0] > 7 || move[1] > 7) return null;
    return move;
  }
  // builds an edge list of all the possible knight moves.
  buildEdgeList() {
    let edgeListMini = [];
    this.board.forEach((square) => {
      for (let x = -2; x < 3; x++) {
        if (x === 0) continue;
        for (let y = -2; y < 3; y++) {
          if (y === x || y === -x || y === 0) continue;
          if (this.checkLegalMove([square[0] + x, square[1] + y]) === null)
            continue;
          if (
            JSON.stringify(edgeListMini).includes(
              JSON.stringify([[square[0] + x, square[1] + y], square])
            ) ||
            JSON.stringify(edgeListMini).includes(
              JSON.stringify([square, [square[0] + x, square[1] + y]])
            )
          )
            continue;
          edgeListMini.push([[square[0] + x, square[1] + y], square]);
        }
      }
    });
    return (this.edgeList = edgeListMini);
  }
  findPath(startLocation, endLocation) {
    // que will only empty when start location is end location
    if (this.queue === []) {
      return;
    }
    // if this is the end location empty the que and return this location
    if (JSON.stringify(startLocation[0]) === JSON.stringify(endLocation)) {
      this.queue = [];
      let returnStatement = `The Quickest Route from ${
        startLocation[startLocation.length - 1]
      } to ${endLocation} is:   `;
      for (let i = startLocation.length - 1; i >= 0; i--) {
        if (i === 0) {
          returnStatement += `${startLocation[i]}`;
          continue;
        }
        returnStatement += `${startLocation[i]}  ---->  `;
      }
      return returnStatement;
    }
    this.edgeList.forEach((arr) => {
      // for every edge list if the first or second location is the square we are starting in go to next if statement
      if (
        JSON.stringify(arr[0]) === JSON.stringify(startLocation[0]) ||
        JSON.stringify(arr[1]) === JSON.stringify(startLocation[0])
      ) {
        // if the square visited already includes the other vertex from the starting location skip it
        if (
          JSON.stringify(this.squaresVisited).includes(
            JSON.stringify(arr[0])
          ) ||
          JSON.stringify(this.squaresVisited).includes(JSON.stringify(arr[1]))
        ) {
          return;
        }
        // we now know the arr contains the square we are in, and a square we haven't been to. Let's push the
        // square we havent been to to the queue, along with the path we have taken so far.
        let queList = [];
        let startingSquareIndex;
        // having fun with array === array... JSON is the winning method so far
        if (JSON.stringify(arr[0]) === JSON.stringify(startLocation[0])) {
          startingSquareIndex = 0;
        } else if (
          JSON.stringify(arr[1]) === JSON.stringify(startLocation[0])
        ) {
          startingSquareIndex = [1];
        }
        // push the right square
        if (startingSquareIndex === 0) {
          queList.push(arr[1]);
          for (let i = 0; i < startLocation.length; i++) {
            queList.push(startLocation[i]);
          }
        } else {
          queList.push(arr[0]);
          for (let i = 0; i < startLocation.length; i++) {
            queList.push(startLocation[i]);
          }
        }
        this.queue.push(queList);
      }
    });
    // add curent square to the already visited squares, to no backtrack and shift this out of the queue
    this.squaresVisited.push(startLocation[0]);
    this.queue.shift();

    return this.findPath(this.queue[0], endLocation);
  }
}
// start array and endArray must be in format [0,0] - [7,7] min/max respectively.
function knightMoves(startArray, endArray) {
  const gameboard = new board();
  gameboard.queue.push([startArray]);
  return gameboard.findPath([startArray], endArray);
}

console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([2, 4], [1, 0]));
console.log(knightMoves([5, 7], [1, 1]));
