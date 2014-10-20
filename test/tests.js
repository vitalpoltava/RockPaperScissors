describe("RockPaperScissors", function() {
    var layouts, visibility;

    // init Game check
    it("Game loaded", function() {
        expect("Game" in window).toBe(true);
        expect("model" in Game).toBe(true);
        expect("view" in Game).toBe(true);
        expect("toolsFactory" in Game && typeof Game.toolsFactory === 'function').toBe(true);
    });

    // test tools factory - 1
    it("Good Config", function() {
        var tools = [];
        try {
            config.forEach(function(toolConfig) { tools.push(new Game.toolsFactory(toolConfig)); });
        } catch(err) {
            // shouldn't fire
            console.log(err)
        };
        expect(tools.length).toBe(3);
    });

    // test tools factory - 2
    it("Wrong Config", function() {
        var tools = [];
        try {
            wrongConfig.forEach(function(toolConfig) { tools.push(new Game.toolsFactory(toolConfig)); });
        } catch(err) {
            // should fire
            expect(typeof err).toBe('object');
        };
    });

    // model loaded
    it("Model loaded", function() {
        expect(Game.model.tools.length).toBeGreaterThan(0);
    });



    /**
     *  Behaviours
     *  ----------
     */

    // starting layouts
    it("Initial layouts placement", function() {
        layouts = document.querySelectorAll('.layout');
        visibility = getNodesVisibility(layouts);

        expect(layouts.length).toBe(3);
        expect(visibility).toEqual([1, 0, 0]);
    });

    // change to layout #2 after click
    it("change to layout #2 after click", function(done) {
        var el = document.querySelector('.layout .tools-item-name');
        triggerClick(el);

        setTimeout(function() {
            visibility = getNodesVisibility(layouts);

            expect(visibility).toEqual([0, 1, 0]);
            expect(typeof Game.model.currentSelection).toBe('object'); // we have selection stored
            done();
        }, 200);
    });

    // change to layout #3 after click
    it("change to layout #3 after click", function(done) {
        var showingResultLayout = document.querySelectorAll('.layout')[1];
        triggerClick(showingResultLayout);

        setTimeout(function() {
            visibility = getNodesVisibility(layouts);

            expect(visibility).toEqual([0, 0, 1]);
            done();
        }, 200);
    });

    // change to layout #1 after loop
    it("change to layout #1 after game finished", function(done) {
        var returnLayout = document.querySelectorAll('.layout')[2];
        triggerClick(returnLayout);

        setTimeout(function() {
            visibility = getNodesVisibility(layouts);

            expect(visibility).toEqual([1, 0, 0]);
            done();
        }, 200);
    });

});