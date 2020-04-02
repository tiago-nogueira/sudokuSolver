/*  Program to solve sudokus
	It gets a sudoku puzzle from the file 'sudokus.js'
and permutes some rows and collumns, and maybe transposes
the game (turn rows into collumns and vice-versa) in order
to make it easier to solve. Then it solves them by brute force
	Because some hard puzzles may exceed node's memory limit,
the program may try many strategies to find the solution.

*/
const initialState = require("./sudokus"),
	analysis = require("./analysis"),
	mod = require('./mod'),
	numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	permutations = require('./permutations');
	newStrategy = require('./strategies');
	checker = require('./checker');

let states,
	cleanedStates,
	strategy,
	preparedState;
let finish = false;
class ArraySizeError extends Error {}; // custom error
console.log("Solving the puzzle...");
while(!finish) {
	try {
		strategy = newStrategy(strategy);
		// preparedState is the state after permutations and/or transposition
		preparedState = permutations.prepare(initialState, strategy);
		// states is an array of all the possibilities so far that have not been discarded
		states = [mod.copyState(preparedState)];
		for(let y = 0; y < 9; y++) {
			for(let x = 0; x < 9; x++) {
				if(preparedState[y][x] != 0) continue;
				cleanedStates = false;
				states.forEach(state => {
					// the 'states' variable have to be cleaned before holding the states of the next step
					if(!cleanedStates) {
						states = [];
						cleanedStates = true;
					}
					if(state[y][x] != 0) return;
					numbers.forEach(num => {
						// checking if 'num' can go in the cell '(x, y)'
						let [possible, newState] = analysis(state, num, x, y);
						// Throwing an error before a memory fatal error happens 
						if(states.length > 600000) throw new ArraySizeError("Array too big");
						if(possible) states.push(newState);
					});
				});
			}
		}
		finish = true; // If there haven't been any errors, the solution should have been found
	} catch(error) {
		// If the error is a 'ErrorSizeError', the program will try to solve again with another strategy
		if(!(error instanceof ArraySizeError)) {
			console.log(error);
			throw error;
		}	
	};	
}
for(let i = 0; i < states.length; i++) {
	states[i] = permutations.reverse(states[i]);  // Reversing the permutations and/or transposition
	// Checking the reversion
	if(!checker.reversion(states[i], initialState)) throw Error("Proposed solution doesn't match the puzzle");
	// Checking if the solution is valid
	if(!checker.solution(states[i])) throw Error("Proposed solution is invalid");
}
// Printing the results
if(states.length == 1) {
	console.log("SOLUTION:");
	console.log(states[0]);
}else if(states.length > 1) {
	console.log("This puzzle has " + states.length + " solutions");
	console.log("Here are two of them: ")
	console.log(states[0]);
	console.log(states[1]);
}else if(states.length == 0) {
	console.log("This puzzle has no solutions");
}
