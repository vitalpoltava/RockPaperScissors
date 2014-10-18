/**
 * Game View
 *
 * Tested on latest Chrome, FF and Safari for Mac
 */

Game.view = (function(){
    return {

        // here placed ids of main DOM wrappers
        config: {
            selectWrapperId: 'select-wrapper',
            resultWrapperId: 'results-wrapper',
            returnWrapperId: 'return-wrapper'
        },

        /**
         * Initialize the view
         */
        init: function() {
            this
                .populateProps()
                .selectInitialLayout()
                .subscribeEvents()
                .attachEvents();
        },

        /**
         * Adding main "app-wide" properties to deal with later
         *
         * @returns {Game.view}
         */
        populateProps: function() {
            this.layouts = document.getElementsByClassName('layout');
            this.selectWrapper = document.getElementById(this.config.selectWrapperId);
            this.resultWrapper = document.getElementById(this.config.resultWrapperId);
            this.returnWrapper = document.getElementById(this.config.returnWrapperId);
            return this;
        },

        /**
         * Start view with the first layout (items selection)
         *
         * @returns {Game.view}
         */
        selectInitialLayout: function() {
            this._changeLayout(1);
            return this;
        },

        /**
         * Subscribing for inner system events
         *
         * @returns {Game.view}
         */
        subscribeEvents: function() {
            Game.mediator.subscribe('toolSelectionReady', this._changeLayout.bind(this, 2));
            Game.mediator.subscribe('resultShown', this._changeLayout.bind(this, 3));
            Game.mediator.subscribe('returnClicked', this._changeLayout.bind(this, 1));
            return this;
        },

        /**
         * Adding reactions to basic DOM events and initiate inner events flow
         *
         * @returns {Game.view}
         */
        attachEvents: function() {
            this.selectWrapper.addEventListener('click', function(event) {
                var target = event.target ? event.target : event.srcElement;
                Game.mediator.publish('toolSelected', this._sanitize(target.dataset.name));
            }.bind(this));

            this.resultWrapper.addEventListener('click', function() {
                Game.mediator.publish('resultShown');
            }.bind(this));

            this.returnWrapper.addEventListener('click', function() {
                Game.mediator.publish('returnClicked');
            }.bind(this));

            return this;
        },

        /**
         * Composite method: render respective layout and show it
         *
         * @param num
         * @returns {Game.view}
         * @private
         */
        _changeLayout: function(num) {
            this.currentLayout = num;
            this._renderLayout();
            this._showLayout();
            return this;
        },

        /**
         * Renders respective layout
         *
         * @private
         */
        _renderLayout: function() {
            switch (this.currentLayout) {
                case 1: this.renderItemsGame();
                    break;
                case 2: this.renderResult();
                    break;
                case 3: this.renderReturn();
                    break;
            }
        },

        /**
         * Based on current app state we show one layout of three
         *
         * @returns {Game.view}
         * @private
         */
        _showLayout: function() {
            var forEach = Array.prototype.forEach;
            var current = this.currentLayout;
            var nodes = this.layouts;

            forEach.call(nodes, function(el) {
                if(+el.dataset.number === current) {
                    el.style.display = 'table';
                } else {
                    el.style.display = 'none';
                }
            });
            return this;
        },

        /**
         * Renders list of items
         *
         * @param list
         * @returns {Game.view}
         */
        renderItemsGame: function(list) {
            this.selectWrapper.innerHTML = '';
            Game.model.tools.forEach(this._renderGameItem.bind(this));
            return this;
        },

        /**
         * Render single tool column
         *
         * @param itemObj
         * @private
         */
        _renderGameItem: function(itemObj) {
            this._appendItem(this.selectWrapper, Game.itemTemplate, itemObj);
        },

        /**
         * Render game result layout
         *
         * @returns {Game.view}
         */
        renderResult: function() {
            this.resultWrapper.innerHTML = '';
            this._appendItem(this.resultWrapper, Game.resultTemplate, Game.model.currentSelection);
            return this;
        },

        /**
         * Render 'play another game' layout
         *
         * @returns {Game.view}
         */
        renderReturn: function() {
            this.returnWrapper.innerHTML = '';
            this._appendItem(this.returnWrapper, Game.returnTemplate, Game.model.getResultMessage());
            return this;
        },

        /**
         * Generic method to append one compiled template piece to wrapper
         *
         * @param wrapper
         * @param template
         * @param obj
         * @private
         */
        _appendItem: function(wrapper, template, obj) {
            var html = this._compileTemplate(template, obj);
            wrapper.innerHTML += html;
        },

        /**
         * Simple template compiling function
         *
         * @param html
         * @param obj
         * @returns {*}
         * @private
         */
        _compileTemplate: function(html, obj) {
            var pattern;

            for(var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    pattern = new RegExp('{{' + prop + '}}', "g");
                    html = html.replace(pattern, obj[prop]);
                }
            }
            return html;
        },

        /**
         * We should sanitize inputs, derived from outer space
         *
         * @param raw
         * @returns {*}
         * @private
         */
        _sanitize: function(raw) {
            return raw.replace(/[^\w\s]/g, '');
        }
    }
}());