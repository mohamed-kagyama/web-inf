define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/cellActionsTemplate.htm");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['filter'],
      computed: {
        canEdit: function canEdit() {
          return this.filter.type !== schemaEntitiesEnum.COMPLEX_FILTER;
        }
      },
      methods: {
        onDelete: function onDelete() {
          options.filtersDesignerEventBus.trigger('filter:remove', {
            id: this.filter.id,
            sourceId: this.filter.sourceId,
            sourceType: this.filter.sourceType
          });
        },
        onEdit: function onEdit() {
          options.filtersDesignerEventBus.trigger('filter:edit', {
            id: this.filter.id,
            sourceId: this.filter.sourceId,
            sourceType: this.filter.sourceType
          });
        }
      }
    };
  }
};

});