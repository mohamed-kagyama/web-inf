define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/propertyEditorTemplate.htm");

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      mixins: options.mixins || [],
      props: ['editProperty', 'item', 'propertyName'],
      data: function data() {
        return {
          isHovered: false,
          isFocused: false
        };
      },
      components: {
        tooltip: options.components.tooltip
      },
      computed: {
        label: function label() {
          return this.item[this.propertyName];
        },
        isEditMode: function isEditMode() {
          var item = this.editProperty.item || {};
          return this.item.id === item.id && this.propertyName === this.editProperty.propertyName;
        },
        errorMessage: function errorMessage() {
          return this.editProperty.errorMessage;
        },
        isErrorMessageVisible: function isErrorMessageVisible() {
          return this.errorMessage && this.isEditMode;
        },
        tooltipType: function tooltipType() {
          return options.errorTooltipConfig.type;
        },
        tooltipPlacement: function tooltipPlacement() {
          return options.errorTooltipConfig.placement;
        },
        tooltipStyle: function tooltipStyle() {
          return this.item.isPropertiesEditorExpanded ? options.errorTooltipConfig.style.expanded : options.errorTooltipConfig.style.collapsed;
        }
      },
      methods: {
        onMouseEnter: function onMouseEnter() {
          this.isHovered = true;
        },
        onMouseLeave: function onMouseLeave() {
          this.isHovered = false;
        },
        onClickOnValue: function onClickOnValue() {
          options.presentationDesignerEventBus.trigger('edit:property', {
            item: this.item,
            propertyName: this.propertyName,
            value: this.label
          });
        },
        onEnter: function onEnter() {
          options.presentationDesignerEventBus.trigger('edit:enter:property');
        },
        onEsc: function onEsc() {
          options.presentationDesignerEventBus.trigger('edit:esc:property');
        },
        onInput: function onInput(value) {
          options.presentationDesignerEventBus.trigger('edit:input:property', value);
        },
        onBlur: function onBlur() {
          options.presentationDesignerEventBus.trigger("edit:blur:property", this.editProperty);
        }
      },
      updated: function updated() {
        if (this.isEditMode && !this.isFocused) {
          var jQuery = options.jQuery || $;
          jQuery(this.$el).find('input').focus();
          this.isFocused = true;
        } else if (!this.isEditMode) {
          this.isFocused = false;
        }
      }
    };
  }
};

});