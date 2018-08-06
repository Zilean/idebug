/*!
 * idebug v0.0.1
 * (c) 2018 Weich
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.IDebug = factory());
}(this, (function () { 'use strict';

    // src/main.js

    function idebug () {
        console.log('version：0.0.1' );
    }

    return idebug;

})));
