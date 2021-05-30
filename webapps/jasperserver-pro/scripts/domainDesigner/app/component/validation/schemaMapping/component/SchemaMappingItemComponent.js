define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var template = require("text!../template/schemaMappingDialogItemTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  template: template,
  props: ['schema'],
  computed: {
    i18n: function i18n() {
      return _i18n;
    }
  },
  methods: {
    onClickSchemaItem: function onClickSchemaItem(schema) {
      this.$emit('schemaItemClicked', schema);
    }
  }
});

});