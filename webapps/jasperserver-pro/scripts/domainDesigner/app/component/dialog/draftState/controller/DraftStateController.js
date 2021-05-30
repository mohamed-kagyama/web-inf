define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var confirmationMessageByDraftStateTypeEnum = require("../enum/confirmationMessageByDraftStateTypeEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var DraftStateController = function DraftStateController(options) {
  this._initialize(options);
};

_.extend(DraftStateController.prototype, Backbone.Events, {
  _initialize: function _initialize(options) {
    this.draftStateEventBus = options.draftStateEventBus;
    this.confirmationDialog = options.confirmationDialog;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.draftStateEventBus, 'dispatcherActionIntercepted', this._onDispatcherActionIntercepted);
  },
  _onDispatcherActionIntercepted: function _onDispatcherActionIntercepted(options) {
    this.listenTo(this.confirmationDialog, 'button:yes', _.bind(this._onConfirmationDialogYesButtonClick, this, options));
    this.listenTo(this.confirmationDialog, 'button:no', this._stopListeningToConfirmationDialog);

    var warningMessage = this._getInterceptedActionWarningMessage(options.draftStateTypes);

    this.confirmationDialog.setContent(warningMessage);
    this.confirmationDialog.open();
  },
  _getInterceptedActionWarningMessage: function _getInterceptedActionWarningMessage(draftStateTypes) {
    var messageCode = confirmationMessageByDraftStateTypeEnum[_.first(draftStateTypes)];

    return i18nMessage(messageCode);
  },
  _onConfirmationDialogYesButtonClick: function _onConfirmationDialogYesButtonClick(options) {
    this._stopListeningToConfirmationDialog();

    this.draftStateEventBus.trigger('allowActionExecution', options);
  },
  _stopListeningToConfirmationDialog: function _stopListeningToConfirmationDialog() {
    this.stopListening(this.confirmationDialog);
  }
});

module.exports = DraftStateController;

});