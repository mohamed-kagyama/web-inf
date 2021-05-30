define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function findComponentForVertex(vertexId, graph, used, component) {
  component = component || [];

  if (!_.isUndefined(vertexId) && !_.isNull(vertexId)) {
    component.push(vertexId);
    used = used || {};
    used[vertexId] = true;
    var connectedVertexes = graph[vertexId];
    component = _.reduce(connectedVertexes, function (component, value, key) {
      var vertexId = value;

      if (!used[vertexId]) {
        component = findComponentForVertex(vertexId, graph, used, component);
      }

      return component;
    }, component);
  }

  return component;
}

function findComponents(graph) {
  var used = {};
  var components = [];
  return _.reduce(graph, function (components, value, key) {
    var vertexId = key;

    if (!used[vertexId]) {
      var component = findComponentForVertex(vertexId, graph, used);
      components = components.concat([component]);
    }

    return components;
  }, components);
} // Graph should be defined as a map where the key is the
// vertex id and value is a set of ids of connected vertexes:
//
// Example:
// "vertex3" ---- "vertex1" ---- "vertex2"
//
// Version 1:
// var graph1= {
//      "vertex1": ["vertex2", "vertex3"],
//      "vertex2": ["vertex1"],
//      "vertex3": ["vertex1"]
// }
//
// Version 2:
// var graph2= {
//      "vertex1": {"vertex2": "vertex2", "vertex3": "vertex3"},
//      "vertex2": {"vertex1": "vertex1"},
//      "vertex3": {"vertex2": "vertex2"}
// }
//
// Version 3:
// 0 ----- 1 ----- 2
// var graph3 = [
//      [1]
//      [0, 2]
//      [1]
// ]
//
//
// For findComponentForVertex method next version is also applicable
// Version 4:
// 0 ----- 1 ----- 2
// var graph3 = [
//      "0": [1]
//      "1": [0, 2]
//      "2": [1]
// ]
// Graph should be defined as a map where the key is the
// vertex id and value is a set of ids of connected vertexes:
//
// Example:
// "vertex3" ---- "vertex1" ---- "vertex2"
//
// Version 1:
// var graph1= {
//      "vertex1": ["vertex2", "vertex3"],
//      "vertex2": ["vertex1"],
//      "vertex3": ["vertex1"]
// }
//
// Version 2:
// var graph2= {
//      "vertex1": {"vertex2": "vertex2", "vertex3": "vertex3"},
//      "vertex2": {"vertex1": "vertex1"},
//      "vertex3": {"vertex2": "vertex2"}
// }
//
// Version 3:
// 0 ----- 1 ----- 2
// var graph3 = [
//      [1]
//      [0, 2]
//      [1]
// ]
//
//
// For findComponentForVertex method next version is also applicable
// Version 4:
// 0 ----- 1 ----- 2
// var graph3 = [
//      "0": [1]
//      "1": [0, 2]
//      "2": [1]
// ]


module.exports = {
  // result is an array of vertexes which are in same component as a specified vertex
  // [ "vertex3", "vertex1", "vertex2 ]
  findComponentForVertex: findComponentForVertex,
  // result is an array of sub-graphs where each sub-graph is a single component:
  // [ [ "vertex3", "vertex1", "vertex2 ] ]
  findComponents: findComponents
};

});