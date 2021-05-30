define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

module.exports = function (control) {
  var slaveDependencies = control.slaveDependencies; // const hasMasterDependencies = masterDependencies ? masterDependencies.length > 0 : false;

  var hasSlaveDependencies = slaveDependencies ? slaveDependencies.length > 0 : false; // return hasMasterDependencies || hasSlaveDependencies;

  return hasSlaveDependencies;
};

});