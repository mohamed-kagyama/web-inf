define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/searchVueTemplate.htm");

var i18nComputed = require("../../../vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    return {
      template: template,
      props: ['searchKeyword'],
      data: function data() {
        return {
          currentInputValue: ''
        };
      },
      computed: i18nComputed,
      updated: function updated() {
        this.currentInputValue = this.searchKeyword;
      },
      methods: {
        onSearchKeywordInput: function onSearchKeywordInput(value) {
          this.currentInputValue = value;
        },
        searchByEnterKey: function searchByEnterKey(value) {
          options.eventBus.trigger('change:searchKeyword', value);
        },
        reset: function reset() {
          this.currentInputValue = '';
          options.eventBus.trigger('change:searchKeyword', '');
        },
        searchByClick: function searchByClick() {
          options.eventBus.trigger('change:searchKeyword', this.currentInputValue);
        }
      }
    };
  }
};

});