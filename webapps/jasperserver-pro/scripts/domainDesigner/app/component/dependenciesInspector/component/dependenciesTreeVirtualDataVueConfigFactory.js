define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/dependenciesTreeVirtualDataTemplate.htm");

var _alignmentClass = require('../enum/dependenciesTreeAlignmentClassEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    var virtualData = options.virtualData;
    var store = options.store;
    var mixins = options.mixins;
    return {
      components: {
        virtualData: virtualData
      },
      props: {
        alignment: {
          type: String
        },
        label: {
          type: String
        }
      },
      computed: {
        styleObject: function styleObject() {
          return {
            height: this.canvasHeight + 'px',
            overflowY: 'auto',
            width: '100%'
          };
        },
        wrapperStyleObject: function wrapperStyleObject() {
          return {
            height: this.canvasHeight + 'px',
            overflow: 'hidden'
          };
        },
        alignmentClass: function alignmentClass() {
          return _alignmentClass[this.alignment];
        },
        widthClass: function widthClass() {
          return this.alignmentClass ? 'jr-uWidth-48pc' : '';
        }
      },
      data: function data() {
        return store;
      },
      methods: {
        onToggle: function onToggle(props) {
          options.dependenciesTreeVirtualDataComponentEventBus.trigger('tree:toggle', props);
        }
      },
      mixins: mixins,
      template: template
    };
  }
};

});