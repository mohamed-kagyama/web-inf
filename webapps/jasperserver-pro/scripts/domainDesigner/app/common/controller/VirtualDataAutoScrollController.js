define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var scrollDirectionEnum = {
  UP: 'up',
  DOWN: 'down'
};

var VirtualDataAutoScrollController = function VirtualDataAutoScrollController(options) {
  this.initialize(options);
};

_.extend(VirtualDataAutoScrollController.prototype, {
  initialize: function initialize(options) {
    this.body = options.body || $('body');
    this.autoScrollAreaTopOffset = options.autoScrollAreaTopOffset;
    this.autoScrollAreaBottomOffset = options.autoScrollAreaBottomOffset;
    this.autoScrollStep = options.autoScrollStep;
    this.autoScrollTimeout = options.autoScrollTimeout;
    this.autoScrollIntervalID = null;
    this.store = options.store;
    this._scroll = getScrollingFn(options.autoScrollThrottle);
    this.eventBus = options.eventBus;
    this.dragEvent = options.dragEvent;
    this.dragStopEvent = options.dragStopEvent;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.eventBus, this.dragEvent, this._onCanvasDrag);
    this.listenTo(this.eventBus, this.dragStopEvent, this._onCanvasDragStop);
  },
  _onCanvasDrag: function _onCanvasDrag(event) {
    var clientY = event.clientY;
    var self = this,
        bodyHeight = this.body.height(),
        shouldAutoScroll,
        scrollDirection;

    if (clientY < this.autoScrollAreaTopOffset) {
      shouldAutoScroll = true;
      scrollDirection = scrollDirectionEnum.UP;
    } else if (clientY > bodyHeight - this.autoScrollAreaBottomOffset) {
      shouldAutoScroll = true;
      scrollDirection = scrollDirectionEnum.DOWN;
    }

    if (shouldAutoScroll) {
      if (!this.autoScrollIntervalID) {
        this.autoScrollIntervalID = setInterval(function () {
          self._scroll(scrollDirection);
        }, this.autoScrollTimeout);
      }
    } else {
      this._clearInterval();
    }
  },
  _onCanvasDragStop: function _onCanvasDragStop() {
    this._clearInterval();
  },
  _clearInterval: function _clearInterval() {
    this.autoScrollIntervalID && clearInterval(this.autoScrollIntervalID);
    this.autoScrollIntervalID = null;
  }
}, Backbone.Events);

function getScrollingFn(throttle) {
  return _.throttle(function (scrollDirection) {
    var scrollPos = this.store.get('scrollPos');
    var newScrollPos,
        maxScrollPos = this.store.get('height') - this.store.get('canvasHeight');

    if (scrollDirection === scrollDirectionEnum.UP) {
      newScrollPos = scrollPos - this.autoScrollStep;

      if (newScrollPos < 0) {
        newScrollPos = 0;
      }

      this.store.set('scrollPos', newScrollPos);
    }

    if (scrollDirection === scrollDirectionEnum.DOWN) {
      newScrollPos = scrollPos + this.autoScrollStep;

      if (newScrollPos > maxScrollPos) {
        newScrollPos = maxScrollPos;
      }

      this.store.set('scrollPos', newScrollPos);
    }
  }, throttle);
}

module.exports = VirtualDataAutoScrollController;

});