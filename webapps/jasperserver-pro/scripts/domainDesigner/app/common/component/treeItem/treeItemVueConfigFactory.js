define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var tooltipDirectiveFactory = require("../tooltip/directive/tooltipDirectiveFactory");

var template = require("text!./template/treeItemTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var debounceTime = options.debounceTime;
    var props = {
      id: String,
      label: String,
      icon: String,
      invalid: {
        type: Boolean,
        "default": false
      },
      properties: Object,
      open: Boolean,
      selected: Boolean,
      isSelectable: Boolean,
      level: {
        type: Number,
        "default": 1
      },
      visible: {
        type: Boolean,
        "default": true
      },
      tooltip: {
        type: Object
      },
      group: {
        type: Boolean,
        "default": false
      }
    };

    function pickOnlyDefinedProps(object) {
      return _.pick.apply(null, [object].concat(Object.keys(props)));
    }

    return {
      directives: {
        tooltip: tooltipDirectiveFactory.create()
      },
      template: template,
      props: props,
      computed: {
        isLeaf: function isLeaf() {
          return !_.isBoolean(this.open);
        },
        classObject: function classObject() {
          var classObject = {
            'jr-isSelected': this.isSelectable && this.selected,
            'jr-isInvalid': this.invalid
          };

          if (!this.group) {
            _.extend(classObject, {
              'jr-isOpen': !this.isLeaf && this.open,
              'jr-isClosed': !this.isLeaf && !this.open,
              'jr-mTree-node': !this.isLeaf,
              'jr-mTree-leaf': this.isLeaf
            });
          } else {
            _.extend(classObject, {
              'jr-isExpanded': this.open,
              'jr-isCollapsed': !this.open,
              'jr-mTree-group': true
            });
          }

          var treeItemClass = 'jr-mTree-';

          if (this.isLeaf) {
            treeItemClass += 'leaf-';
          } else {
            treeItemClass += 'node-';
          }

          treeItemClass += this.level;
          classObject[treeItemClass] = true;
          return classObject;
        },
        classTreeLabel: function classTreeLabel() {
          if (!this.group) {
            return {
              'jr-mTree-label': true
            };
          } else {
            return {
              'jr-mTree-group-label': true
            };
          }
        },
        classGroupExpander: function classGroupExpander() {
          return {
            'jr-caretDown': this.open,
            'jr-caretRight': !this.open
          };
        }
      },
      methods: {
        toggle: _.debounce(function () {
          if (!this.isLeaf) {
            this.$emit('toggle', pickOnlyDefinedProps(this));
          }
        }, debounceTime, true),
        select: function select() {
          if (this.isSelectable) {
            this.$emit('select', pickOnlyDefinedProps(this));
          }
        }
      }
    };
  }
};

});