define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!CommonBundle");

var ClassUtil = require("runtime_dependencies/js-sdk/src/common/util/classUtil");

var PropertiesDialogView = require('./view/PropertiesDialogView');

var propertiesTitleFactory = require('../../../factory/propertiesTitleFactory');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var dashboardMessageBus = require('../../../dashboardMessageBus');

var dashboardMessageBusEvents = require('../../../enum/dashboardMessageBusEvents');

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PropertiesDialog = Dialog.extend(
/** @lends PropertiesDialog.prototype */
{
  /**
   * @constructor PropertiesDialog
   * @extends Dialog
   * @access private
   * @classdesc PropertiesDialog - dialog with model input validation and previous state saving.
   */
  events: _.extend({
    'mousedown .header.mover, .subcontainer, .footer': '_onPropertiesDialogSelect'
  }, Dialog.prototype.events),

  /**
   * @description Opens properties dialog. Sets properties dialog model, and original state.
   */
  open: function open() {
    //reset dialog to start from basic tab.
    this.content.openTab('basic');
    this.content.model.set(this.content.original.clone().attributes);
    this.content.originalState.set(this.content.original.clone().attributes);
    Dialog.prototype.open.apply(this, arguments);
    this.content.model.validate();
  },

  /**
   * @description on dialog mouse down handler
   * @access protected
   * @fires PropertiesDialog#properties:dialog:select
   */
  _onPropertiesDialogSelect: function _onPropertiesDialogSelect() {
    this.trigger('properties:dialog:select', this);
  }
});

var getAdditionalCssClasses = function getAdditionalCssClasses(model) {
  var classes = 'dashboardLevelPropertiesDialog ' + model.get('type') + 'Dialog';

  if (model.get('type') !== dashboardComponentTypes.DASHBOARD_PROPERTIES) {
    classes += ' dashletLevelPropertiesDialog';
  }

  return classes;
};

module.exports = ClassUtil.extend(
/** @lends PropertiesDialogController.prototype */
{
  /**
   * @constructor PropertiesDialogController
   * @classdesc PropertiesDialogController - constructs properties dialog and initializes properties dialog actions handlers.
   * @param {object} model - component model for which properties dialog is needed.
   */
  constructor: function constructor(model) {
    this.dialog = new PropertiesDialog({
      model: model,
      additionalCssClasses: getAdditionalCssClasses(model),
      title: propertiesTitleFactory(model),
      content: new PropertiesDialogView({
        model: model
      }),
      buttons: [{
        label: i18n['button.apply'],
        action: 'apply',
        primary: true
      }, {
        label: i18n['button.ok'],
        action: 'ok',
        primary: false
      }, {
        label: i18n['button.cancel'],
        action: 'cancel',
        primary: false
      }]
    });
    this.initialize();
  },

  /**
   * @description Initialize function. Initializes events and public property dialogIsOpened.
   */
  initialize: function initialize() {
    this._initEvents();

    this.dialogIsOpened = false;
  },

  /**
   * @description On dialog apply button click handler. Applies changes without closing dialog.
   */
  onDialogApply: function onDialogApply() {
    var self = this;

    if (this.dialog.content.hyperlinkParametersSectionView && this.dialog.content.hyperlinkParametersSectionView.isEditing) {
      this.dialog.content.hyperlinkParametersSectionView.confirmAbort(function () {
        self.applyModel();
      });
    } else {
      this.applyModel();
    }
  },

  /**
   * @description On dialog ok button click handler. Applies, saves changes and closes dialog.
   */
  onDialogOk: function onDialogOk() {
    var self = this;

    if (this.dialog.content.hyperlinkParametersSectionView && this.dialog.content.hyperlinkParametersSectionView.isEditing) {
      this.dialog.content.hyperlinkParametersSectionView.confirmAbort(function () {
        if (self.applyModel()) {
          self.saveModel();
          Dialog.prototype.close.apply(self.dialog, arguments);
        }
      });
    } else {
      if (this.applyModel()) {
        this.saveModel();
        Dialog.prototype.close.apply(this.dialog, arguments);
      }
    }
  },

  /**
   * @description On dialog ok button click handler. Returns made changes (if such was) to previous state.
   */
  onDialogCancel: function onDialogCancel() {
    this.dialog.content.hyperlinkParametersSectionView && this.dialog.content.hyperlinkParametersSectionView.resetState();
    this.rollbackModel();
    Dialog.prototype.close.apply(this.dialog, arguments);
  },

  /**
   * @description Saves model (made changes) if its valid.
   * @fires dashboardMessageBus#saveDashboardState
   */
  saveModel: function saveModel() {
    var originalState = this.dialog.content.originalState;

    if (!_.isEqual(this.dialog.content.original.attributes, this.dialog.content.originalState.attributes)) {
      originalState.set(this.dialog.content.original.toJSON());
      dashboardMessageBus.trigger(dashboardMessageBusEvents.SAVE_DASHBOARD_STATE);
    }
  },

  /**
   * @description Applies changes if they are valid.
   */
  applyModel: function applyModel() {
    if (this.dialog.content.model.isValid(true)) {
      this.dialog.content.original && this.dialog.content.original.set(this.dialog.content.model.attributes);
      return true;
    }

    return false;
  },

  /**
   * @description Rollbacks model if its needed.
   * @param {object} [options]
   * @param {boolean} [options.silent] - rollback without event firing.
   */
  rollbackModel: function rollbackModel(options) {
    var options = options || {};
    var original = this.dialog.content.original;
    var originalState = this.dialog.content.originalState;
    var originalStateJSON = originalState.toJSON();
    options.silent ? original.set(originalStateJSON, {
      silent: true
    }) : original.set(originalStateJSON);
  },

  /**
   * @description Toggles propeties dialog controller property.
   * @param {string} prop - properties dialog controller property.
   */
  toggleDialogStateProps: function toggleDialogStateProps(prop) {
    this[prop] ? this[prop] = false : this[prop] = true;
  },

  /**
   * @description Initializes event handlers: on dialog open, close and apply.
   * @access protected
   */
  _initEvents: function _initEvents() {
    var self = this;
    this.dialog.on('open', function () {
      self.toggleDialogStateProps('dialogIsOpened');
    });
    this.dialog.on('close', function () {
      self.toggleDialogStateProps('dialogIsOpened');
      self.dialog.content.trigger('close');
    });
    this.dialog.on('button:cancel', _.bind(this.onDialogCancel, this));
    this.dialog.on('button:apply', _.bind(this.onDialogApply, this));
    this.dialog.on('button:ok', _.bind(this.onDialogOk, this));
    this.dialog.listenTo(this.dialog.content, 'saveAndGoToFilterManager', function () {
      self.onDialogOk();
      dashboardMessageBus.trigger(dashboardMessageBusEvents.OPEN_FILTER_MANAGER);
    });
  },

  /**
   * @description Removes dialog, sign off all of the attached event handlers.
   */
  remove: function remove() {
    this.dialog.content.remove();
    this.dialog.off('button:cancel');
    this.dialog.off('button:apply');
    this.dialog.off('button:ok');
    this.dialog.off('open');
    this.dialog.off('close');
    this.dialog.remove();
  }
});

});