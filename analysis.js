const mod = require('./mod');

//  Tells if the number 'num' can go into the '(x, y)' cell, i.e.
// if the number isn't already on the same row, collumn or big square
//  If it can't the function returns false and an empty array
//  if it can it returns true and the state matrix with 'num' written on the '(x, y)' cell
function analysis(state, num, x, y) {
	let newState = mod.copyState(state);
	let possible = true;
	for(let i = 0; i < 9; i++) {
		if(state[y][i] == num) return [false, []]; // check if the row already have the number
		if(state[i][x] == num) return [false, []]; // the same for the column
	}
    let y0 = mod.bigSquareIndex(y) *3;
    let x0 = mod.bigSquareIndex(x) *3;
    for(let i = y0; i <= (y0 + 2); i++) {		   // now for the big square
	    for(let j = x0; j <= (x0 + 2); j++) {
	    	if(state[i][j] == num) return [false, []];
	    }
    }
    newState[y][x] = num;
	return [true, newState];
}

module.exports = analysis;