/**
 * Various utils
 */

Game.utils = {
    pluck: function(list, name) {
        if (!Array.isArray(list)) return [];
        var i, obj, len = list.length, res = [];

        for(i = 0; i < len; i += 1) {
            obj = list[i] || {};
            if (obj.hasOwnProperty(name)) {
                res.push(obj[name]);
            }
        }
        return res;
    },

    random: function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    }
};