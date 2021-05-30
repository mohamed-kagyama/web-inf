define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var SingleSelectComponent = require("runtime_dependencies/js-sdk/src/components/singleSelect/view/SingleSelectNew");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var $ = options.$ || jQuery;
    var SingleSelect = options.SingleSelect || SingleSelectComponent;
    return {
      template: '<div class=\'jr\'></div>',
      props: ['value', 'formatValue'],
      methods: {
        initEvents: function initEvents() {
          this.singleSelect.on('selection:change', _.bind(this.triggerSelectionChangeEvent, this));
          this.singleSelect.on('listRenderError', _.bind(this.onListRenderError, this));
        },
        triggerSelectionChangeEvent: function triggerSelectionChangeEvent(selection) {
          this.$emit('selection:change', selection);
        },
        onListRenderError: function onListRenderError(responseStatus, error) {
          if (responseStatus === requestCanceledEnum.CANCELED) {
            this.singleSelect.listView.reset();
          }
        }
      },
      created: function created() {
        var singleSelectOptions = _.isUndefined(this.value) ? options : _.defaults({}, options, {
          value: this.value,
          formatValue: this.formatValue
        });
        this.singleSelect = new SingleSelect(singleSelectOptions);
        this.initEvents();
      },
      updated: function updated() {
        this.singleSelect.setValue(this.value);
      },
      mounted: function mounted() {
        $(this.$el).append(this.singleSelect.$el);
      },
      destroyed: function destroyed() {
        this.singleSelect.remove();
      }
    };
  }
};

});