define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/virtualDataTemplate.htm");

var jQuery = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var localState = {},
        $ = options.$ || jQuery,
        $window = options.$window || $(window),
        debounce = _.isNumber(options.debounce) ? options.debounce : 0;
    return {
      template: template,
      props: ['top', 'height', 'scrollPos'],
      computed: {
        topPx: function topPx() {
          return Math.round(this.top) + 'px';
        },
        heightPx: function heightPx() {
          return Math.round(this.height) + 'px';
        }
      },
      data: function data() {
        return {
          currentScrollPos: 0
        };
      },
      methods: {
        onScroll: function onScroll(event) {
          if (debounce > 0) {
            this._debouncedScroll.call(this, event);
          } else {
            this._scroll(event);
          }
        },
        _scroll: function _scroll(event) {
          var scrollTop = event.target.scrollTop;
          this.currentScrollPos = scrollTop;
          options.eventBus.trigger('canvas:scroll', scrollTop);
        },
        _debouncedScroll: _.debounce(function (event) {
          this._scroll(event);
        }, debounce),
        onResize: function onResize() {
          var $el = $(this.$el),
              elHeight = $el.height(),
              elWidth = $el.width();

          if (elHeight && elHeight !== this.getHeight()) {
            this.setHeight(elHeight);
            options.eventBus.trigger('window:resize', elHeight, elWidth);
          }
        },
        setHeight: function setHeight(height) {
          if (height) {
            localState.height = height;
          }
        },
        getHeight: function getHeight() {
          return localState.height || options.defaultHeight;
        }
      },
      created: function created() {
        $window.on('resize', this.onResize);
      },
      mounted: function mounted() {
        this.onResize();
      },
      updated: function updated() {
        if (!localState.height) {
          this.onResize();
        }

        var isScrollPosDefined = !_.isUndefined(this.scrollPos),
            isScrollPosChanged = this.scrollPos !== this.currentScrollPos;

        if (isScrollPosDefined && isScrollPosChanged) {
          this.$el.scrollTop = this.scrollPos;
        }
      },
      destroyed: function destroyed() {
        $window.off('resize', this.onResize);
      }
    };
  }
};

});