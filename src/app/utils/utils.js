/**
 * Some useful utils
 */

Game.utils = {
    // get a list of properties of objects' list
    pluck: function(list, name) {
        var i, obj, len, res;
        if (!Array.isArray(list)) return [];
        len = list.length; res = [];

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