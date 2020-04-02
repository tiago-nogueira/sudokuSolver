const mod = require('./mod');

// Initialize important variables
function initialize() {
	this.permutations.rowsPerms = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	this.permutations.collumnsPerms = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	this.permutations.transposed = false;
}

// Prepares the state matrix acording to the strategy
function prepare(state, strategy) {
	initialize();
	if(strategy.permRows) permuteRows();
	if(strategy.permCollums) {
		state = mod.transpose(state);
		this.transposed = !this.transposed;
		permuteRows();
		state = mod.transpose(state);	
		this.transposed = !this.transposed;			
	}
	if(strategy.transpose){
		state = mod.transpose(state);
		this.transposed = !this.transposed;
	} ;
	return state;

//  This function orders the row blocks by the number of filled cells of their most filled row
// (row blocks: rows 0 - 2, 3 - 5 and 6 - 8)
//	Then it orders the rows within each row block by their number of filled cells
	function permuteRows() {
		// swaping blocks of rows 
		let max;
		let bigY;
		let filledMaxOverall;
		for(let i = 0; i <= 1; i++) {
			max = i *3;
			for(let j = i *3; j < 9; j++) {
				if(mod.filledSpacesRow(state, j) > mod.filledSpacesRow(state, max))
					max = j;
			}
			bigY = mod.bigSquareIndex(max);
			state = swapRowBlocks(state, bigY, i);

			if(i == 0) filledMaxOverall = mod.filledSpacesRow(state, max);
		}
		// swaping rows inside each block
		for(let i = 0; i <= 2; i++) {
			for(let j = i *3; j <= i *3 +1; j++) {
				max = j;
				for(let k = j +1; k <= i *3 +2; k++) {
					if(mod.filledSpacesRow(state, k) > mod.filledSpacesRow(state, max))
						max = k;
				}
				state = swapRows(state, max, j);
			}
		}
		return filledMaxOverall;
	}
}

function swapRowBlocks(state, i0, i1) {
	if(i0 == i1) return state;
	let swaped = mod.copyState(state);
	let whichPerm = this.permutations.transposed ? "collumnsPerms" : "rowsPerms";	
	for(let j = 0; j <= 2; j++) {
		swaped = swapRows(swaped, i0 *3 +j, i1 *3 +j);
	}
	return swaped;
}

function swapRows(state, i0, i1) {
	if(i0 == i1) return state;	
	let swaped = mod.copyState(state);
	swaped[i0].forEach((cell, index) => {
		swaped[i0][index] = state[i1][index];
	});
	swaped[i1].forEach((cell, index) => {
		swaped[i1][index] = state[i0][index];
	});
	let whichPerm = this.permutations.transposed ? "collumnsPerms" : "rowsPerms";
	[this.permutations[whichPerm][i0], this.permutations[whichPerm][i1]] = 
		[this.permutations[whichPerm][i1], this.permutations[whichPerm][i0]];
	return swaped;
}

// Undo the permutations and/or transposition
function reverse(state) {
	let reversed = mod.copyState(state);
	let transposed = this.transposed;
	reversed = reverseRows(reversed, transposed);
	reversed = mod.transpose(reversed);
	transposed = !transposed;
	reversed = reverseRows(reversed, transposed);
	if(transposed)
		reversed = mod.transpose(reversed);
	return reversed;
}

function reverseRows(state, transposed) {
	let newState = mod.copyState(state);
	let perms;
	if(transposed)
		perms = this.permutations.collumnsPerms;
	else 
		perms = this.permutations.rowsPerms;
	perms.forEach((number, i) => {
		newState[number].forEach((cell, j) => {
			newState[number][j] = state[i][j];
		});
	});
	return newState;
}

module.exports = {
	prepare: prepare,
	reverse: reverse,
//	rowsPerms: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//	collumnsPerms: [0, 1, 2, 3, 4, 5, 6, 7, 8],
//	transposed: false
};