// A module with some helper functions

// Copy an entire array of matrices (states)
function copyManyStates(array) {
	let newArray = [];
	array.forEach(state => {
		newArray.push(copyState(state));
	});
	return newArray;
}

// Copy one state matrix
function copyState(state) {
	let newState = [];
	state.forEach((row, y) => {
		newState.push([]);
		row.forEach((cell, x) => {
			newState[y][x] = cell;
		});
	});
	return newState;
}

// Outputs a blank matrix
function blankState() {
	let blank = [];
	for(let i = 0; i <= 8; i++) {
		blank.push([]);
	}
	return blank;
}

// Given the row index 'i', outputs the index of the row block
// (index 0 for rows 0, 1, 2 - index 1 for rows 3, 4, 5 - index 2 for 6, 7, 8)
function bigSquareIndex(i) {
    let bigI = i +1;
    if(i %3 == 0) bigI = i /3;
    else bigI = Math.floor(i /3 -1) +1;
    return bigI;
}

// Returns how many cells in the 'y' row are filled
function filledSpacesRow(state, y) {
	return state[y].reduce((res, cell) => {
		if(cell != 0) return res +1;
		return res;
	}, 0);
}

// Transpose the state matrix
// (rows become collumns and collumns become rows)
function transpose(state) {
	let transp = blankState();
	for(let i = 0; i <= 8; i++) {
		for(let j = 0; j <= 8; j++) {
			transp[i][j] = state[j][i];
		}
	}
	return transp;
}

module.exports = {
	copyManyStates: copyManyStates,
	copyState: copyState,
	blankState: blankState,
	bigSquareIndex: bigSquareIndex,
	filledSpacesRow: filledSpacesRow,
	transpose: transpose
};