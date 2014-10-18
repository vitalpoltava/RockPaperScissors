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
     '<div class="choice-item">',
        '<div class="result-header">YOU</div>',
        '<div class="result-icon"><img class="tools-item-image" src="images/{{yourChoice}}.png" /></div>',
        '<div class="result-name">{{yourChoice}}</div>',
     '</div>',
     '<div class="choice-item divider"></div>',
     '<div class="choice-item">',
        '<div class="result-header">COMPUTER</div>',
        '<div class="result-icon"><img class="tools-item-image" src="images/{{machineChoice}}.png" /></div>',
        '<div class="result-name">{{machineChoice}}</div>',
     '</div>'
].join('');

Game.returnTemplate = [
     '<div class="return-message">{{message}}</div>',
     '<div class="return-alert"><div class="msg">again</div></div>'
].join('');
