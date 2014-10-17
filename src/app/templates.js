/**
 *  Templates
 */

Game.itemTemplate = [
    '<div class="tools-item-wrapper">',
        '<div>{{name}}</div>',
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
