/*!
 * idebug v0.0.1
 * (c) 2018 Weich
 * Released under the MIT License.
 */
var result = (function (jQuery) {
    'use strict';

    jQuery = jQuery && jQuery.hasOwnProperty('default') ? jQuery['default'] : jQuery;

    // src/main.js

    var main = (function () {
        console.log(jQuery);
        console.log('version：0.0.1');
    });

    return main;

}(jQuery));
/* idebug version 0.0.1 */
