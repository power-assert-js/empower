'use strict';

var empowerCore = require('empower-core');
var extend = require('xtend');

module.exports = function defaultOptions () {
    return extend(empowerCore.defaultOptions(), {
        modifyMessageOnRethrow: false,
        saveContextOnRethrow: false
    });
};
