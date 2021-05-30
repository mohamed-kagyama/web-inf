define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var inputControlTrait = require('../../base/componentViewTrait/inputControlTrait');

var dashboardMessageBus = require('../../../dashboardMessageBus');

var dashboardMessageBusEvents = require('../../../enum/dashboardMessageBusEvents');

var ReportsParametersCollection = require('../../../collection/ReportsParametersCollection');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParametersCache = ReportsParametersCollection.instance;
/**
 * @description Mixin that adds methods to DesignerComponentView.
 * @mixin designerInputControlTrait
 * @augments inputControlTrait
 */

module.exports = _.extend(
/** @lends designerInputControlTrait */
{}, inputControlTrait, {
  /**
   * @description Calls _onViewInitialize method of inputControlTrait and initializes events.
   * @memberof designerInputControlTrait
   * @private
   */
  _onViewInitialize: function _onViewInitialize() {
    var self = this;

    inputControlTrait._onViewInitialize.apply(this, arguments); // We do not need to update IC appearance on value change, because it happens in Viewer mode only
    // We do not need to update IC appearance on value change, because it happens in Viewer mode only


    this.stopListening(this.model, 'change:value'); // When we go yo preview mode, ICs with radio buttons get checked on preview canvas, that's why nothing is selected when we
    // go back to designer mode. That's why we need to fix selection on radio buttons when we get back to designer mode.
    // When we go yo preview mode, ICs with radio buttons get checked on preview canvas, that's why nothing is selected when we
    // go back to designer mode. That's why we need to fix selection on radio buttons when we get back to designer mode.

    this.listenTo(dashboardMessageBus, dashboardMessageBusEvents.TOGGLE_PREVIEW_MODE, function (previewModeEnabled) {
      if (!previewModeEnabled) {
        for (var viewName in self.component.controlViews) {
          if (self.component.controlViews[viewName].model.get('type') === 'singleSelectRadio') {
            self.component.controlViews[viewName].updateOptionsSelection();
          }
        }
      }
    });
  },

  /**
   * @description Calls _initComponent method of inputControlTrait and initializes events.
   * @memberof designerInputControlTrait
   * @private
   */
  _initComponent: function _initComponent() {
    var self = this;

    inputControlTrait._initComponent.apply(this, arguments);

    this.listenTo(ParametersCache, 'change:inputControl', function (model) {
      if (model.id === self.model.getOwnerUri()) {
        self.reset();
      }
    });
  },
  _onComponentPropertiesChange: function _onComponentPropertiesChange() {
    var changedAttrs = this.model.changedAttributes(),
        model = this.inputControlCollection.models[0];

    if (changedAttrs && 'label' in changedAttrs) {
      model && model.set({
        label: this.model.get('label')
      });
      this.component.render();
    }
  },
  reset: function reset() {
    var self = this,
        args = arguments;

    if (this.inputControlCollection.models && this.inputControlCollection.models.length > 0) {
      inputControlTrait.reset.apply(this, arguments);
    } else {
      ParametersCache.getReportControls(this.model.getOwnerUri()).done(function (params) {
        var control = _.findWhere(params, {
          id: self.model.getOwnerParameterName()
        });

        if (control) {
          var preparedControl = _.extend({}, control, {
            label: self.model.get('label') || control.label,
            slaveDependencies: [],
            state: {},
            isDesignerMode: true
          });

          self.inputControlCollection.reset([preparedControl]);
        }

        inputControlTrait.reset.apply(self, args);
      }).fail(function () {
        inputControlTrait.reset.apply(self, args);
      });
    }
  }
});

});