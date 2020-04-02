// 	Given the current strategy 'strat' (undefined on the first run),
// outputs the next strategy
// The strategies order is the following:
// 1 - Rows and collumns permutations + matrix transposition
// 2 - Rows and collumns permutations
// 3 - Rows permutations + matrix transposition
// 4 - Rows permutations
// 5 - Collumns permutations + matrix transposition
// 6 - Collumns permutations
// 7 - Matrix transposition
// 8 - No permutations or transposition
function newStrategy(strat) {
	if(strat == undefined)
		return {
			permRows: true,
			permCollums: true,
			transpose: true
		};
	if(strat.transpose == true) {
		strat.transpose = false;
		return strat;
	}
	if(strat.permCollums == true) {
		strat.permCollums = false;
		strat.transpose = true;
		return strat;
	}
	if(strat.permRows == true) {
		strat.permRows = false;
		strat.permCollums = true;
		strat.transpose = true;
		return strat;
	}
	throw Error("Ran out of strategies");
}
module.exports = newStrategy;