/**
 * Factory of tools instances
 *
 */
Game.toolsFactory = (function() {

    // ---------
    //  helpers
    // ---------

    var _has = function(obj, name) {
        return obj.hasOwnProperty(name);
    };

    var _intersection = function(arr1, arr2) {
        var i, res = false, len1 = arr1.length;
        for(i = 0; i < len1; i += 1) {
            if(arr2.indexOf(arr1[i])) {
                res = true;
                break;
            }
        }
        return res;
    };



    // --------------------
    //  Main functionality
    // --------------------

    // Constructor for a single tool
    var GamingTool = function(configObj) {
        if (!configObj || !_has(configObj, 'name') ||!_has(configObj, 'wins') || !_has(configObj, 'loose')) throw new Error('GamingTool: proper config object is required!');
        this.name = configObj.name;
        this.wins(configObj.wins);
        this.loose(configObj.loose);
    };

    // save list of names we can win over
    GamingTool.prototype.wins = function(loosersList) {
        if (!Array.isArray(loosersList)) throw new Error(this.name + ': loosers list should be an Array!');
        if (this.iLoose && _intersection(this.iLoose, loosersList).length > 0) throw new Error(this.name + ': same tools for winners and loosers!');

        this.iWin = loosersList;
    };

    // save list stronger tools
    GamingTool.prototype.loose = function(winnersList) {
        if (!Array.isArray(winnersList)) throw new Error(this.name + ': winners list should be an Array!');
        if (this.iWin && _intersection(this.iWin, winnersList).length > 0) throw new Error(this.name + ': same tools for winners and loosers!');

        this.iLoose = winnersList;
    };

    // check if we win or loose against specific enemy
    GamingTool.prototype.check = function(enemyName) {
        if (!this.iLoose || !this.iWin) throw new Error(this.name + ': list of winners/loosers not specified!');
        if (typeof enemyName !== 'string') throw new Error(this.name + ': enemy name should be a String!');

        if (this.name === enemyName) return 0; // draw
        if (this.iLoose.indexOf(enemyName) !== -1) return -1; // player loose
        if (this.iWin.indexOf(enemyName) !== -1) return 1; // player wins
        else throw new Error(this.name + ': enemy name ['+ enemyName +'] is not listed!');
    };

    return GamingTool;
})();