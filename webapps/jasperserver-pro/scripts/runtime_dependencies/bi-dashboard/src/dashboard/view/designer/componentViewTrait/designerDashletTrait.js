define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dashletTrait = require('../../base/componentViewTrait/dashletTrait');

var dashboardSettings = require('../../../dashboardSettings');

var dashboardComponentTypes = require('../../../enum/dashboardComponentTypes');

var _ = require('underscore');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register("designerDashletTrait");

function setDataAttributes($el, componentModel) {
  var attrs = ['x', 'y', 'width', 'height'];

  _.each(attrs, function (attr) {
    $el.attr('data-' + attr, componentModel.get(attr));
  });

  $el.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE, componentModel.id);
}

module.exports = _.extend({}, dashletTrait, {
  _onViewInitialize: function _onViewInitialize() {
    dashletTrait._onViewInitialize.apply(this, arguments);

    if (_.contains([dashboardComponentTypes.ADHOC_VIEW, dashboardComponentTypes.REPORT, dashboardComponentTypes.CHART, dashboardComponentTypes.TABLE, dashboardComponentTypes.CROSSTAB], this.model.get('type'))) {
      if (this.model.get('showVizSelectorIcon') === undefined) {
        this.model.set('showVizSelectorIcon', !dashboardSettings.DASHBOARD_SHOW_VISUALIZE_SELECTOR_ICON);
      }
    }

    this.listenTo(this.model, 'change:x change:y', this._onComponentMove);
    this.listenTo(this.model, 'change:width change:height', this._onComponentResize);
  },
  _onViewRemove: function _onViewRemove() {
    dashletTrait._onViewRemove.apply(this, arguments);

    this.$content.off('mousedown');
  },
  _onComponentResize: function _onComponentResize() {
    this.$el.parent().css(this.model.getCssPosition());
    setDataAttributes(this.$el.parent(), this.model);
    this.resize();
    log.debug('resized dashlet ' + this.model.id);
  },
  _onComponentMove: function _onComponentMove() {
    this.$el.parent().css(this.model.getCssPosition());
    setDataAttributes(this.$el.parent(), this.model);
    log.debug('moved dashlet ' + this.model.id);
  },
  _onDashboardPropertiesChange: function _onDashboardPropertiesChange(model) {
    var changedAttrs = model.changedAttributes();

    if (changedAttrs && ('showDashletBorders' in changedAttrs || 'dashletPadding' in changedAttrs || 'titleBarColor' in changedAttrs || 'titleTextColor' in changedAttrs || 'dashletMargin' in changedAttrs)) {
      this._setDashletVisualAppearance();

      this.resize();
    }
  },
  _toggleDashletToolbarButtons: function _toggleDashletToolbarButtons() {
    if (this.toolbar) {
      this.toolbar.getOptionView('refresh').disable();
      this.toolbar.getOptionView('maximize').disable();
      this.toolbar.getOptionView('export').disable();
      this.toolbar.getOptionView('export').enable = this.toolbar.getOptionView('export').disable;
    }
  },

  /**
   * Updates dashlet title
   * @memberof designerDashletTrait
   * @public
   */
  updateTitle: function updateTitle() {
    this.toolbar && this.toolbar.$('.innerLabel > p').text(this.model.get('name'));
  }
});

});