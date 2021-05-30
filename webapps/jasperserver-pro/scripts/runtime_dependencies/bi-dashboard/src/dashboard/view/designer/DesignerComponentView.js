define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var ComponentView = require('../base/ComponentView');

var dashboardMessageBus = require('../../dashboardMessageBus');

var dashboardMessageBusEvents = require('../../enum/dashboardMessageBusEvents');

var sandboxFactory = require('../../factory/sandboxFactory');

var ParameterMenu = require('../../view/designer/ParameterMenu');

var PropertiesDialogController = require('../../view/designer/propertiesDialog/PropertiesDialogController');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

var _ = require('underscore');

var $ = require('jquery');

var i18n = require("bundle!DashboardBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = ComponentView.extend({
  events: _.extend({}, ComponentView.prototype.events, {
    'click': '_selectComponent',
    'dblclick': '_showPropertiesDialog',
    'contextmenu': '_showContextMenu'
  }),
  initialize: function initialize() {
    ComponentView.prototype.initialize.apply(this, arguments);

    this._initContextMenu();

    if (this.model.get('type') !== dashboardComponentTypes.FILTER_GROUP) {
      this.addOverlay();
    }

    this.on('componentRendered', _.bind(this._onComponentRendered, this));
    this.listenTo(this.model, 'change:selected', this._onComponentSelect);
    this.listenTo(dashboardMessageBus, dashboardMessageBusEvents.TOGGLE_PREVIEW_MODE, _.bind(this._onTogglePreviewMode, this));
    this.listenTo(this.dashboardProperties, 'change', this._onDashboardPropertiesChange);
  },
  remove: function remove() {
    this.propertiesDialogController && this.propertiesDialogController.remove();
    ComponentView.prototype.remove.apply(this, arguments);
  },
  _initContextMenu: function _initContextMenu() {
    var contextMenuOptions = [{
      label: i18n['dashboard.context.menu.option.properties'],
      action: 'properties'
    }, {
      label: i18n['dashboard.context.menu.option.delete'],
      action: 'delete'
    }];

    if (this.additionalContextMenuOptions) {
      contextMenuOptions = contextMenuOptions.concat(this.additionalContextMenuOptions);
    }

    this.contextMenu = new ContextMenu(contextMenuOptions);
    this.listenTo(this.contextMenu, 'option:properties', this._showPropertiesDialog);
    this.listenTo(this.contextMenu, 'option:delete', this._deleteComponent);
    this._initComponentSpecificContextMenuEvents && this._initComponentSpecificContextMenuEvents();
  },
  _onTogglePreviewMode: function _onTogglePreviewMode(previewIsOn) {
    if (this.propertiesDialogController && this.propertiesDialogController.dialog) {
      var dialog = this.propertiesDialogController.dialog;
      var coordinates = this.propertiesDialogController.lastCoordinates;
      this.propertiesDialogController.dialogIsOpened && !previewIsOn ? dialog.open(_.extend({
        silent: true
      }, coordinates)) : dialog.close({
        silent: true
      });
    }
  },
  _onComponentRendered: function _onComponentRendered() {},
  _onComponentSelect: function _onComponentSelect() {
    if (this.model.get('selected')) {
      this.$el.addClass('selected');
    } else {
      this.$el.removeClass('selected');
      this.contextMenu.hide();
    }
  },
  _onDashboardPropertiesChange: function _onDashboardPropertiesChange(model) {},
  _deleteComponent: function _deleteComponent() {
    this.trigger('delete', this.model);
  },
  _selectComponent: function _selectComponent(e) {
    e && e.stopPropagation && e.stopPropagation();
    this.model && this.model.collection && this.model.collection.selectComponent($(e.target).attr('id') || this.model.id);
  },
  _showPropertiesDialog: function _showPropertiesDialog(e) {
    var coordinates = {};

    if (e instanceof Backbone.View) {
      var offset = e.$el.offset();
      coordinates = {
        top: offset.top,
        left: offset.left
      };
    } else {
      e.stopPropagation && e.stopPropagation();
      coordinates = {
        top: e.pageY,
        left: e.pageX
      };
    }

    this.contextMenu.hide();
    ParameterMenu.useModel(sandboxFactory.get(this.model.dashboardId).get('dashboardModel'));

    if (!this.propertiesDialogController) {
      this.propertiesDialogController = new PropertiesDialogController(this.model);
      this.listenTo(this.propertiesDialogController.dialog, 'properties:dialog:select', this._selectComponent);
    }

    this.propertiesDialogController.lastCoordinates = coordinates;
    this.propertiesDialogController.dialog.open(_.extend({
      renderContent: false
    }, coordinates));
  },
  _showContextMenu: function _showContextMenu(e) {
    e.preventDefault();

    this._selectComponent(e);

    this.contextMenu.show({
      left: e.pageX,
      top: e.pageY
    }, this.$el);
  }
});

});