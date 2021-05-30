define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var selectionMixin = require("../../../../../common/mixin/selection/selectionMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SidebarTreeExpandCollapsePlugin = function SidebarTreeExpandCollapsePlugin(options) {
  this.initialize(options);
};

var EVENT_TYPES = {
  CLICK: 'click',
  DBLCLICK: 'dblclick'
};

_.extend(SidebarTreeExpandCollapsePlugin.prototype, {
  selection: {
    selector: 'li',
    event: 'click dblclick',
    attrs: ['resourceId', 'resourceType'],
    onSelection: 'toggleLevel'
  },
  initialize: function initialize(options) {
    this.$el = options.el;
    this.expandedNodesProvider = options.expandedNodesProvider;
    this.searchKeywordProvider = options.searchKeywordProvider;
    this.eventBus = options.eventBus;
    this.expandNodeEvent = options.expandNodeEvent;
    this.collapseNodeEvent = options.collapseNodeEvent;
    this.collapser = options.collapser || '.jr-jTreeCollapser';
    this._initializeSelectable && this._initializeSelectable();
  },
  toggleLevel: function toggleLevel(item, e) {
    var id = item.resourceId,
        eventType = e.type,
        isClick = EVENT_TYPES.CLICK === eventType,
        isDblClick = EVENT_TYPES.DBLCLICK === eventType,
        isCollapserClicked = this._collapserWasClicked(e),
        isNodeExpanded,
        isNodeCollapsed,
        searchKeyword,
        eventOptions;

    if (isClick && isCollapserClicked || isDblClick) {
      isNodeExpanded = this.expandedNodesProvider.isNodeExpanded(id);
      isNodeCollapsed = this.expandedNodesProvider.isNodeCollapsed(id);
      searchKeyword = this.searchKeywordProvider.get();
      eventOptions = {
        resourceId: item.resourceId,
        type: item.resourceType
      };

      if (searchKeyword) {
        if (isNodeCollapsed) {
          this.eventBus.trigger(this.expandNodeEvent, eventOptions);
        } else {
          this.eventBus.trigger(this.collapseNodeEvent, eventOptions);
        }
      } else if (isNodeExpanded) {
        this.eventBus.trigger(this.collapseNodeEvent, eventOptions);
      } else {
        this.eventBus.trigger(this.expandNodeEvent, eventOptions);
      }
    }
  },
  _collapserWasClicked: function _collapserWasClicked(e) {
    return $(e.target).is(this.collapser);
  }
}, selectionMixin);

module.exports = SidebarTreeExpandCollapsePlugin;

});