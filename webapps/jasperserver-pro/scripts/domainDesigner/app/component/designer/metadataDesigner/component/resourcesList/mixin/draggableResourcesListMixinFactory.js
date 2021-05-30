define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var lazyDraggableMixin = require("../../../../../../common/mixin/draggable/lazyDraggableMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var tree = options.tree;
    return {
      created: function created() {
        this.draggable = {
          selector: 'li',
          scroll: false,
          containment: 'body',
          onDragStart: 'onDragStart',
          onDragStop: 'onDragStop',
          attrs: ['value']
        };
      },
      methods: _.extend({
        onDragStart: function onDragStart() {
          var selection = tree.getValue(),
              selectionLength = selection.length,
              options;

          if (selectionLength <= 1) {
            options = {
              label: selection[0],
              data: selection[0]
            };
          } else {
            options = {
              label: i18nMessage('domain.designer.draggable.items.selected', selectionLength),
              data: selection
            };
          }

          return options;
        },
        onDragStop: function onDragStop() {
          tree.fetch({
            keepPosition: true
          });
        }
      }, lazyDraggableMixin)
    };
  }
};

});