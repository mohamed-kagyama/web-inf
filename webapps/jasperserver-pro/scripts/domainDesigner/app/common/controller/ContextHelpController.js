define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var canvasViewDesignersEnum = require('../../model/enum/canvasViewDesignersEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ContextHelpController = function ContextHelpController(options) {
  this.initialize(options);
};

_.extend(ContextHelpController.prototype, {
  initialize: function initialize(options) {
    this.storeChangeEventBus = options.storeChangeEventBus;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._setConextHelp);
  },
  _setConextHelp: function _setConextHelp(state) {
    var contextHelpKey = 'domain2'; // Default value
    // The context help keys are defined in jasperserver/jasperserver-war/shared-config/applicationContext-webHelp.xml

    switch (state.viewState.getCurrentDesigner()) {
      case canvasViewDesignersEnum.METADATA_DESIGNER:
        contextHelpKey = 'domain_metadata';
        break;

      case canvasViewDesignersEnum.JOINS_DESIGNER:
        contextHelpKey = 'domain_joins';
        break;

      case canvasViewDesignersEnum.FILTERS_DESIGNER:
        contextHelpKey = 'domain_filters';
        break;

      case canvasViewDesignersEnum.PRESENTATION_DESIGNER:
        contextHelpKey = 'domain_presentation';
        break;

      case canvasViewDesignersEnum.CALCULATED_FIELDS_DESIGNER:
        contextHelpKey = 'metadataDesigner';
        break;

      case canvasViewDesignersEnum.SECURITY_DESIGNER:
        contextHelpKey = 'domain_security';
        break;

      case canvasViewDesignersEnum.OPTIONS_DESIGNER:
        contextHelpKey = 'domain_locales';
        break;
    }

    webHelpModule.setCurrentContext(contextHelpKey);
  }
}, Backbone.Events);

module.exports = ContextHelpController;

});