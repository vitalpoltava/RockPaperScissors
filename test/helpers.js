/**
 * Helper: trigger click event for PhantomJS
 *
 * @param el
 */
var triggerClick = function(el) {
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
};

/**
 * Helper: check what nodes from list are visible
 *
 * @param nodes
 * @returns {*}
 */
var getNodesVisibility = function(nodes) {
    return Array.prototype.map.call(nodes, function(l){return l.style.display === 'none' ? 0:1});
};