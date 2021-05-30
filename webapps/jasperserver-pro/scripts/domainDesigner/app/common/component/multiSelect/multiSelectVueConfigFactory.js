define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var MultiSelect = require("runtime_dependencies/js-sdk/src/components/multiSelect/view/MultiSelectWithTrueAll");

var SelectedItemsDataProvider = require("runtime_dependencies/js-sdk/src/components/multiSelect/dataprovider/SelectedItemsDataProvider");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {
      multiSelectOptions: {}
    };
    var multiSelectOptions = options.multiSelectOptions || {};
    var $ = options.$ || jQuery;
    var MultiSelectConstr = options.MultiSelect || MultiSelect,
        SelectedItemsDataProviderConstr = options.SelectedItemsDataProvider || SelectedItemsDataProvider;
    return {
      template: '<div class=\'jr\'></div>',
      props: ['options'],
      watch: {
        options: function options(_options) {
          this.setValue(_options);
        }
      },
      methods: {
        initEvents: function initEvents() {
          this.multiSelect.on('selection:change', _.bind(this.triggerSelectionChangeEvent, this));
          this.multiSelect.on('listRenderError', _.bind(this.onListRenderError, this));
        },
        triggerSelectionChangeEvent: function triggerSelectionChangeEvent(selection, options) {
          var data;

          if (!options.isTrueAll) {
            data = this.selectedItemsDataProvider.getAllCachedData();
            selection = data.map(function (item) {
              return item.value;
            });
          }

          this.$emit('selection:change', selection, options);
        },
        onListRenderError: function onListRenderError(responseStatus, error) {
          if (responseStatus === requestCanceledEnum.CANCELED) {
            this.multiSelect.reset();
            this.setValue(this.options);
          }
        },
        setValue: function setValue(options) {
          this.multiSelect.setTrueAll(options.isTrueAll, {
            silent: true
          });

          if (!options.isTrueAll) {
            this.multiSelect.setValue(options.value, {
              silent: true
            });
          }
        }
      },
      created: function created() {
        this.selectedItemsDataProvider = new SelectedItemsDataProviderConstr(this.options.selectedListOptions);
        var options = _.isUndefined(this.options.value) ? multiSelectOptions : _.extend({}, multiSelectOptions, {
          value: this.options.value,
          selectedItemsDataProvider: this.selectedItemsDataProvider
        });
        this.multiSelect = new MultiSelectConstr(options);

        if (this.options.isTrueAll) {
          this.multiSelect.setTrueAll(this.options.isTrueAll, {
            silent: true
          });
        }

        this.initEvents();
      },
      mounted: function mounted() {
        $(this.$el).append(this.multiSelect.$el);
      },
      destroyed: function destroyed() {
        this.multiSelect.remove();
      }
    };
  }
};

});