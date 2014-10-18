/**
 *  Templates
 */

Game.itemTemplate = [
    '<div class="tools-item-wrapper" data-name="{{name}}" title="Click to choose {{name}} and start!">',
        '<div class="tools-item-icon" data-name="{{name}}"><img data-name="{{name}}" class="tools-item-image" src="images/{{name}}.png" /></div>',
        '<div class="tools-item-name" data-name="{{name}}">{{name}}</div>',
    '</div>'
].join('');

Game.resultTemplate = [
    '<div>',
        '<div>Your choice: {{yourChoice}}</div>',
        '<div>Machine: {{machineChoice}}</div>',
    '</div>'
].join('');

Game.returnTemplate = [
    '<div>',
        '<div>{{message}}</div>',
        '<div>Click to play again!</div>',
    '</div>'
].join('');
