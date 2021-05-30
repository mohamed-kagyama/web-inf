define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
var ITEM_STATE_COLLAPSED = false;
var ITEM_STATE_EXPANDED = true;
var expandTypes = [];

function expandTypeInit(typeId, imgPrefix, linkPrefix, expandImgSrc, expandTooltip, expandCall, collapseImgSrc, collapseTooltip, collapseCall) {
  var expandState = new ExpandState(expandImgSrc, expandTooltip, collapseCall);
  var collapseState = new ExpandState(collapseImgSrc, collapseTooltip, expandCall);
  var states = [];
  states[ITEM_STATE_COLLAPSED] = expandState;
  states[ITEM_STATE_EXPANDED] = collapseState;
  expandTypes[typeId] = new ExpandType(imgPrefix, linkPrefix, states);
}

function expandToggle(typeId, itemId) {
  expandTypes[typeId].toggle(itemId);
}

function ExpandType(imgPrefix, linkPrefix, states) {
  this.imgPrefix = imgPrefix;
  this.linkPrefix = linkPrefix;
  this.states = states;
  this.items = {};
  this.toggle = ExpandTypeToggle;
  this.collapseAll = ExpandTypeCollapseAll;
  this.applyState = ExpandTypeApplyState;
}

function ExpandState(imgSrc, tooltip, call) {
  this.imgSrc = imgSrc;
  this.tooltip = tooltip;
  this.call = call;
}

function ExpandTypeToggle(itemId) {
  var itemState = this.items[itemId];
  var newState;

  if (typeof itemState == "boolean") {
    newState = !itemState;
  } else {
    newState = ITEM_STATE_EXPANDED;
  }

  if (newState == ITEM_STATE_EXPANDED) {
    this.collapseAll();
  }

  this.applyState(itemId, newState);
}

function ExpandTypeCollapseAll() {
  for (var item in this.items) {
    if (this.items[item] == ITEM_STATE_EXPANDED) {
      this.applyState(item, ITEM_STATE_COLLAPSED);
    }
  }
}

function ExpandTypeApplyState(itemId, stateId) {
  this.items[itemId] = stateId;
  var state = this.states[stateId];
  var link = document.getElementById(this.linkPrefix + itemId);
  link.title = state.tooltip;
  var img = document.getElementById(this.imgPrefix + itemId);
  img.src = state.imgSrc;
  img.alt = state.tooltip;
  state.call(itemId);
}

window.expandTypeInit = expandTypeInit;
window.expandToggle = expandToggle;
exports.expandTypeInit = expandTypeInit;
exports.expandToggle = expandToggle;

});