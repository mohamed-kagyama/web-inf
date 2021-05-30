define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var typeToTypeClassEnum = require('../enum/typeToTypeClassEnum');

var typeToIconClassEnum = require('../enum/typeToIconClassEnum');

var placementToPlacementClassEnum = require('../enum/placementToPlacementClassEnum');

var pointerOffsetByPlacementUtil = require("../../util/pointerOffsetByPlacementUtil");

var popoverComputedMixin = require('../mixin/popoverComputedMixin');

var popoverTemplate = require("text!./template/popoverTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  template: popoverTemplate,
  props: {
    type: '',
    placement: '',
    title: '',
    text: '',
    target: '',
    width: 0,
    position: {
      top: 0,
      left: 0
    }
  },
  mixins: [popoverComputedMixin],
  computed: {
    typeClass: function typeClass() {
      return typeToTypeClassEnum[this.type] || typeToTypeClassEnum.info;
    },
    placementClass: function placementClass() {
      return placementToPlacementClassEnum[this.placement] || '';
    },
    iconClass: function iconClass() {
      if (this.type) {
        return typeToIconClassEnum[this.type];
      }

      return typeToIconClassEnum.info;
    },
    isVisibleClass: function isVisibleClass() {
      return this.isVisible ? '' : 'jr-isInvisible';
    },
    pointerOffset: function pointerOffset() {
      return pointerOffsetByPlacementUtil.getPointerOffset(this.placement) || {
        top: 0,
        left: 0
      };
    },
    positionWithPointerOffset: function positionWithPointerOffset() {
      return {
        top: this.position.top + this.pointerOffset.top + 'px',
        left: this.position.left + this.pointerOffset.left + 'px',
        position: 'absolute'
      };
    },
    widthInPx: function widthInPx() {
      var width = {};

      if (this.width) {
        width = {
          width: this.width + 'px'
        };
      }

      return width;
    },
    style: function style() {
      var style = {};
      return _.extend(style, this.positionWithPointerOffset, this.widthInPx);
    }
  },
  methods: {
    close: function close() {
      if (this.isVisible) {
        this.$emit('close');
      }
    }
  }
};

});