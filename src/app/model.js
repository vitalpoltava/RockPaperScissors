Game.model = (function(){
    return {

        init: function() {
            var tools = [];
            var config = [
                {
                    name: 'Stone',
                    wins: ['Scissors'],
                    loose: ['Paper']
                },
                {
                    name: 'Scissors',
                    wins: ['Paper'],
                    loose: ['Stone']
                },
                {
                    name: 'Paper',
                    wins: ['Stone'],
                    loose: ['Scissors']
                }
            ];

            // init game instances
            config.forEach(function(tool) {
                tools.push(new Game.toolsFactory(tool));
            });

            this.tools = tools;
            this.subscribeEvents();
        },

        /**
         * Subscribing for inner system events
         *
         */
        subscribeEvents: function() {
            Game.mediator.subscribe('toolSelected', this.populateChoice.bind(this));
        },

        /**
         * Remember a current choice and 'tell' the view to render layout
         *
         * @param name
         */
        populateChoice: function(name) {
            this.currentSelection = {
                yourChoice: name,
                machineChoice: this._getRandomTool()
            };
            Game.mediator.publish('toolSelectionReady');
        },

        /**
         * Based on game results return result message
         *
         * @returns {{message: string}}
         */
        getResultMessage: function() {
            var your = this.currentSelection.yourChoice;
            var its = this.currentSelection.machineChoice;
            var tool = this._getToolObjByName(your);
            var res =  tool.check(its);
            switch (res) {
                case 0: return {message:'DRAW'};
                case 1: return {message:'YOU WIN!'};
                case -1: return {message:'YOU LOOSE'};
            }
        },

        // selector of random tool
        _getRandomTool: function() {
            return Game.utils.pluck(this.tools, 'name')[Game.utils.random(0, this.tools.length-1)];
        },

        // get tool object by name
        _getToolObjByName: function(name) {
            return this.tools.find(function(obj) { return obj.name === name; });
        }
    }
}());