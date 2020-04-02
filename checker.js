const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Checks if proposed solution is valid
function solutionChecker(solution) {
	// check rows
	for(let i = 0; i <= 8; i++) {
		if(!checkRow(solution[i])) return false;
	}
	// check collums
	let auxRow;
	for(let i = 0; i <= 8; i++) {
		auxRow = [];
		for(let j = 0; j <= 8; j++) {
			auxRow.push(solution[j][i]);		// 	 the numbers of the collumn are put in an array,
		}										//  so its easier to analyse
		if(!checkRow(auxRow)) return false;		
	}
	// check big squares
	for(let i = 0; i <= 2; i++) {
		for(let j = 0; j <= 2; j++) {
			auxRow = solution[i*3].slice(j*3, j*3+3)  // the same is done to the numbers of a big square
				.concat(
					solution[i*3+1].slice(j*3, j*3+3)
				).concat(
					solution[i*3+2].slice(j*3, j*3+3)			
				);
			if(!checkRow(auxRow)) return false;		
		}
	}
	return true;
	function checkRow(row) {
		return numbers.every(number => {
			return row.some(num => num == number);
		});
	}
}

//   Checks if the final state agrees with the initial state
//   This is necessary to make sure the permutations and tranposition
//  have been correctly reversed
function reversionChecker(state, initialState) {
	for(let i = 0; i <= 8; i++) {
		for(let j = 0; j <= 8; j++) {
			if(initialState[i][j] == 0) continue;
			if(initialState[i][j] != state[i][j]) return false;
		}
	}
	return true;
}

module.exports = {
	solution: solutionChecker,
	reversion: reversionChecker
};