define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var VisualizationTypesController = require('./VisualizationTypesController');

var TabView = require('./view/TabView');

var BodyView = require('./view/BodyView');

var template = require("text!./template/visualChooserTemplate.htm");

var adHocVisualizationTemplate = require("text!./template/adHocVisualizationTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(template),
  adhoctemplate: _.template(adHocVisualizationTemplate),
  el: function el() {
    if (this.isDesignView) {
      return this.adhoctemplate({
        options: this.options
      });
    } else {
      return this.template({
        options: this.options
      });
    }
  },
  constructor: function constructor(options) {
    this.options = _.defaults(options || {}, this.defaults);
    this.typesManager = this.options.typesManager;
    this.isDesignView = window.isDesignView;

    if (!this.typesManager) {
      this.typesManager = new VisualizationTypesController();
    }

    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    _.bindAll(this, '_onGroupSelectionChange', '_onTypeChange');

    this.tabView = new TabView({
      minimized: this.options.minimized,
      typesManager: this.typesManager
    });
    this.bodyView = new BodyView({
      typesManager: this.typesManager
    });
    this.tabView.setShowDisabledIcons(true);
    this.bodyView.setShowDisabledIcons(true);
    var self = this,
        avoidHover = ['jr-mVisualchooser-menu-item-icon', 'jr-mVisualchooser-menu-item-label', 'jr-mVisualchooser-menu-item-wrapper'];
    this.isDesignView && $(this.el).on('mouseover', function (evt) {
      var containsClass = avoidHover.some(function (item) {
        return $(evt.target).hasClass(item);
      });

      if (!containsClass) {
        var $typeElements = self.$('li.jr-mVisualchooser-menu-item.jr-isSelected');
        var type = self.bodyView.getChartType($typeElements);
        $('.jr-mVisualchooser-rule').addClass('jr-isSelected');
        self.isDesignView && type && self.bodyView.showMessages(type, false);
      }
    });
    this.listenTo(this.tabView, 'tabMinimizedEvent', this._onTabMinimizedEvent);
    this.listenTo(this.tabView, 'change:groupSelected', this._onGroupSelectionChange);
    this.listenTo(this.bodyView, 'change:visualizationType', this._onTypeChange);
  },
  render: function render() {
    this.$('.jr-mVisualchooser').html(this.tabView.render().$el).append(this.bodyView.render().$el);
    return this;
  },
  remove: function remove() {
    this.tabView.remove();
    this.bodyView.remove();
    Backbone.View.prototype.remove.call(this);
  },
  setSelectedType: function setSelectedType(type) {
    this.bodyView.setSelectedType(type);
  },
  setDisabledTypes: function setDisabledTypes(types) {
    this.bodyView.setDisabledTypes(types);
  },
  // methods getState() and applyState() are used to restore the state of the dialog to the same state
  // as it was at some point of time
  getState: function getState() {
    return {
      selectedType: this.bodyView.getSelectedType(),
      selectedGroupName: this.tabView.getSelectedGroupName(),
      scrollPosition: this.bodyView.getScrollPosition(),
      areGroupsMinimized: this.tabView.isMinimized()
    };
  },
  applyState: function applyState(state) {
    if (!_.isUndefined(state.selectedType)) {
      this.setSelectedType(state.selectedType);
    }

    if (!_.isUndefined(state.selectedGroupName)) {
      this.tabView.changeTabToGroupName(state.selectedGroupName);
    }

    if (!_.isUndefined(state.scrollPosition)) {
      this.bodyView.setScrollPosition(state.scrollPosition);
    }

    if (!_.isUndefined(state.areGroupsMinimized)) {
      this.tabView.setMinimized(state.areGroupsMinimized);
    }
  },
  _onTabMinimizedEvent: function _onTabMinimizedEvent(isMinimized, tabSize) {
    this.trigger('tabMinimizedEvent', isMinimized, tabSize);
  },
  _onGroupSelectionChange: function _onGroupSelectionChange(groupType) {
    this.bodyView.trigger('change:groupSelected', groupType);
  },
  _onTypeChange: function _onTypeChange(chartType) {
    this.trigger('change:visualizationType', chartType);
  }
});

});