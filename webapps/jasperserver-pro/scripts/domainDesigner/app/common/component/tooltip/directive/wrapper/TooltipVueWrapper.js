define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var positionUtil = require("../../../util/positionUtil");

var tooltipVueConfig = require("../../component/tooltipVueConfig");

var tooltipOffsetByPlacementAndTargetSize = require("../../util/tooltipOffsetByPlacementAndTargetSize");

var template = require("text!./template/tooltipWrapperTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_TIMEOUT = 500;

function getDefaultState() {
  return {
    type: '',
    placement: '',
    content: {},
    isVisible: true,
    timeout: DEFAULT_TIMEOUT,
    offset: {
      top: 0,
      left: 0
    },
    target: '',
    styleObj: {}
  };
}

function getTotalOffset(options) {
  return tooltipOffsetByPlacementAndTargetSize.getOffset(options.placement, {
    target: options.target,
    offset: options.offset
  });
}

function setStateWithDelay(state) {
  _.extend(this, state, {
    isVisible: true,
    styleObj: {
      visibility: 'hidden'
    }
  });

  if (this.placement) {
    this.$nextTick(function () {
      var position = positionUtil.getPlacementWithPosition({
        placement: this.placement,
        targetEl: this.target,
        parentEl: this.$el.parentElement,
        sourceEl: this.$el
      });
      var placement = position.placement,
          totalOffset = getTotalOffset({
        placement: placement,
        target: this.target,
        offset: this.offset
      });

      _.extend(this, {
        isVisible: true,
        styleObj: {
          top: totalOffset.top + position.top + 'px',
          left: totalOffset.left + position.left + 'px',
          position: 'absolute'
        },
        placement: placement
      });
    });
  }
}

module.exports = Vue.extend({
  template: template,
  components: {
    tooltip: Vue.extend(tooltipVueConfig)
  },
  data: function data() {
    return getDefaultState();
  },
  computed: {
    getTimeout: function getTimeout() {
      return _.isNumber(this.timeout) && this.timeout >= 0 ? this.timeout : DEFAULT_TIMEOUT;
    }
  },
  methods: {
    setState: function setState(state) {
      this.timerId = setTimeout(_.bind(setStateWithDelay, this), this.getTimeout, state);
    },
    remove: function remove() {
      this.$destroy();
    },
    resetState: function resetState() {
      _.extend(this, getDefaultState());

      clearTimeout(this.timerId);
    }
  }
});

});