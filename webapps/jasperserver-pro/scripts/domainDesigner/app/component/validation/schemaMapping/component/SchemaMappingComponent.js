define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var SchemaMappingItemComponent = require('./SchemaMappingItemComponent');

var template = require("text!../template/schemaMappingDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  template: template,
  components: {
    'schemaMappingItem': SchemaMappingItemComponent
  },
  data: function data() {
    return {
      existingSchemas: this.existingSchemas,
      availableSchemas: this.availableSchemas,
      isSelectingExistingSchema: this.isSelectingExistingSchema,
      isSelectingAvailableSchema: this.isSelectingAvailableSchema,
      allowLink: false,
      allowUnlink: false
    };
  },
  computed: {
    i18n: function i18n() {
      return _i18n;
    },
    narrow: function narrow() {
      return this.isSelectingExistingSchema || this.isSelectingAvailableSchema;
    }
  },
  methods: {
    onConfirm: function onConfirm() {
      this.$options.domainValidationEventBus.trigger('schemaMappingDialog:confirm');
    },
    onReject: function onReject() {
      this.$options.domainValidationEventBus.trigger('schemaMappingDialog:reject');
    },
    onSchemaItemClicked: function onSchemaItemClicked(schema) {
      this.$options.domainValidationEventBus.trigger('schemaMappingDialog:schemaItemClicked', schema);
    },
    onLinkButtonClicked: function onLinkButtonClicked() {
      this.$options.domainValidationEventBus.trigger('schemaMappingDialog:linkButtonClicked');
    },
    onUnlinkButtonClicked: function onUnlinkButtonClicked() {
      this.$options.domainValidationEventBus.trigger('schemaMappingDialog:unlinkButtonClicked');
    }
  }
};

});