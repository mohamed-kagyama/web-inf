define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var positionUtil = require("../../../util/positionUtil");

var popoverVueConfig = require("../../component/popoverVueConfig");

var popoverComputedMixin = require("../../mixin/popoverComputedMixin");

var template = require("text!./template/popoverWrapperTemplate.htm");

require("runtime_dependencies/js-sdk/src/common/extension/customEventExtension");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  template: template,
  components: {
    popover: Vue.extend(popoverVueConfig)
  },
  watch: {
    text: function text(_text) {
      if (_text) {
        this.document.addEventListener('mousedown', this.onDocumentMousedown);
      } else {
        this.document.removeEventListener('mousedown', this.onDocumentMousedown);
      }
    }
  },
  computed: {
    normalizedOffset: function normalizedOffset() {
      var offset = {
        top: 0,
        left: 0
      };

      if (!_.isUndefined(this.offset.top)) {
        offset.top = this.offset.top;
      }

      if (!_.isUndefined(this.offset.left)) {
        offset.left = this.offset.left;
      }

      return offset;
    }
  },
  mixins: [popoverComputedMixin],
  data: function data() {
    return {
      type: '',
      placement: '',
      title: '',
      text: '',
      target: '',
      offset: {},
      position: {
        top: 0,
        left: 0
      },
      inheritTargetWidth: false
    };
  },
  created: function created() {
    this.document = this.$options.document || document;
  },
  methods: {
    setState: function setState(state) {
      state = _.extend({}, state, {
        target: this.$options.directiveEl
      });

      _.extend(this, state);

      this.$nextTick(function () {
        _.extend(this, {
          position: this._getPosition()
        });
      });
    },
    onDocumentMousedown: function onDocumentMousedown(event) {
      var isElContainsEventTarget = this.$el.contains(event.target);

      if (!isElContainsEventTarget) {
        this._closePopover();
      }
    },
    getTargetWidth: function getTargetWidth() {
      if (this.inheritTargetWidth) {
        return this.target.offsetWidth;
      }
    },
    remove: function remove() {
      this.document.removeEventListener('mousedown', this.onDocumentMousedown);
      this.$el.parentNode.removeChild(this.$el);
      this.$destroy();
    },
    // private methods
    _getPosition: function _getPosition() {
      var position = {
        top: 0,
        left: 0
      };

      if (this.isVisible) {
        position = positionUtil.getPlacementWithPosition({
          placement: this.placement,
          targetEl: this.target,
          parentEl: this.$el.parentElement,
          sourceEl: this.$el
        });
        position.top = position.top + this.normalizedOffset.top;
        position.left = position.left + this.normalizedOffset.left;
      }

      return position;
    },
    _closePopover: function _closePopover() {
      var closePopoverEvent = new CustomEvent('popoverClose');
      this.target.dispatchEvent(closePopoverEvent);
    }
  }
});

});