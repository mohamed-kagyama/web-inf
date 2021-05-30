define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var VisualizationTypesController = require('../VisualizationTypesController');

var template = require("text!../template/tabTemplate.htm");

var i18n = require("bundle!AdHocBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  className: 'jr-mVisualchooser-panel jr',
  template: _.template(template),
  events: {
    'click .jr-mTab-item': '_onClickTab',
    'click .jr-Visualchooser-panel-minimize': '_onClickMinimize',
    'mouseenter .jr-mTab-item': '_onMouseEnter',
    'mouseleave .jr-mTab-item': '_onMouseLeave'
  },
  constructor: function constructor(options) {
    this.options = _.defaults(options || {}, this.defaults);
    this._selectedGroupName = null;
    this.typesManager = this.options.typesController;
    this._minimized = false;

    if (!_.isUndefined(this.options.minimized)) {
      this._minimized = this.options.minimized;
    }

    this._tabSize = {
      // -1 means the value is unknown
      expanded: -1,
      collapsed: -1
    };

    if (!this.typesManager) {
      this.typesManager = new VisualizationTypesController();
    }

    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    this.i18n = i18n;
    this.showDisabledIcons = true;
  },
  render: function render() {
    var allGroups = this.typesManager.getAllGroups();
    this.$el.html(this.template({
      groups: allGroups,
      showDisabledIcons: this.showDisabledIcons
    }));
    this.$tabElements = this.$('li.jr-mTab-item');
    this.setMinimized(this._minimized);
    return this;
  },
  _onMouseEnter: function _onMouseEnter(event) {
    this.$(event.currentTarget).hasClass('jr-isActive') || this.$(event.currentTarget).addClass('jr-isHovered');
  },
  _onMouseLeave: function _onMouseLeave(event) {
    this.$(event.currentTarget).removeClass('jr-isHovered');
  },
  _onClickTab: function _onClickTab(click) {
    var $groupEl = this.$(click.currentTarget);
    var selectedGroupName = $groupEl.data('groupName');
    this.changeTabToGroupName(selectedGroupName);
  },
  changeTabToGroupName: function changeTabToGroupName(newGroupName) {
    var $tab = this.$tabElements.filter(function (index, element) {
      return $(element).data('groupName') === newGroupName;
    });

    if ($tab.length !== 1) {
      return;
    }

    this.$tabElements.filter('.jr-isActive').removeClass('jr-isActive');
    this.$tabElements.filter('.jr-isHovered').removeClass('jr-isHovered');
    $tab.addClass('jr-isActive');
    this._selectedGroupName = newGroupName;
    this.trigger('change:groupSelected', this._selectedGroupName);
  },
  recordTabDimensions: function recordTabDimensions() {
    // for the minimization logic we need to know the size of the tab
    // because this value will be used to mode the dialog.
    // And this method is called after the moment then the dialog is attached to the DOM.
    if (this._minimized && this._tabSize.collapsed === -1) {
      this._tabSize.collapsed = Math.round(this.$el.outerWidth());
    }

    if (!this._minimized && this._tabSize.expanded === -1) {
      this._tabSize.expanded = Math.round(this.$el.outerWidth());
    }
  },
  _onClickMinimize: function _onClickMinimize() {
    this.recordTabDimensions();
    this.setMinimized(!this._minimized);
    this.recordTabDimensions();
    this.trigger('tabMinimizedEvent', this._minimized, this._tabSize.expanded - this._tabSize.collapsed);
  },
  setShowDisabledIcons: function setShowDisabledIcons(status) {
    this.showDisabledIcons = status;
  },
  setMinimized: function setMinimized(minimized) {
    this._minimized = minimized;
    var adhocChooserBodyWidth = $('.jr-mVisualchooser-body').width(),
        otherChooserBodyWidth = this.$el.parents('#visualSelector').find('.jr-mVisualchooser-body').width(),
        widthOfBody = window.isDesignView ? adhocChooserBodyWidth : otherChooserBodyWidth,
        visualPanelMinIcon = this.$('.jr-Visualchooser-panel-minimize-icon');

    if (this._minimized) {
      visualPanelMinIcon.removeClass('jr-caretLeft').addClass('jr-caretRight');
      this.$el.addClass('jr-isMinimized');
    } else {
      visualPanelMinIcon.removeClass('jr-caretRight').addClass('jr-caretLeft');
      this.$el.removeClass('jr-isMinimized');
    }

    var dialog = window.isDesignView ? $('#adhocVisual') : this.$el.parents('#visualSelector');
    dialog.width(widthOfBody + this.$el.outerWidth());
    dialog && this.setDialogMinWidth(dialog);
  },
  setDialogMinWidth: function setDialogMinWidth(element) {
    var dialogMinWidth;

    if (element.find('.jr-Visualchooser-panel-minimize-icon').hasClass('jr-caretLeft')) {
      dialogMinWidth = '502px';
    } else {
      dialogMinWidth = '312px';
    }

    element.css({
      "min-width": dialogMinWidth
    });
  },
  getSelectedGroupName: function getSelectedGroupName() {
    return this._selectedGroupName;
  },
  isMinimized: function isMinimized() {
    return this._minimized;
  }
});

});