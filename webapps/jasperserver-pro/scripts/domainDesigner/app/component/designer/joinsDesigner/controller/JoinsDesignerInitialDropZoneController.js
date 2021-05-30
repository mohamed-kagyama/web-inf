define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerInitialDropZoneController = function JoinsDesignerInitialDropZoneController(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerInitialDropZoneController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.createDraftJoinTreeStrategy = options.createDraftJoinTreeStrategy;
    this.openCannotCreateJoinAttentionDialogStrategy = options.openCannotCreateJoinAttentionDialogStrategy;
    this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = options.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'initialDropZone:drop', this._onInitialDropZoneDrop);
  },
  _onInitialDropZoneDrop: function _onInitialDropZoneDrop(item) {
    if (this.joinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.isSatisfiedBy(item)) {
      this.openCannotCreateJoinAttentionDialogStrategy.execute({
        item: item
      });
    } else {
      this.createDraftJoinTreeStrategy.execute(item);
    }
  }
});

module.exports = JoinsDesignerInitialDropZoneController;

});