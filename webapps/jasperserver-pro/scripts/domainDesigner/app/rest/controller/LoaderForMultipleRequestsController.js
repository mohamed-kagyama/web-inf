define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var Backbone = require('backbone');

var requestCanceledEnum = require("../enum/requestCanceledEnum");

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var LoaderForMultipleRequestsController = function LoaderForMultipleRequestsController(options) {
  this.initialize(options);
};

_.extend(LoaderForMultipleRequestsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    options = options || {};

    _.bindAll(this, '_showLoader', '_closeLoader');

    this.isLoaderVisible = false;
    this.showLoaderDeferred = null;
    this.closeLoaderDeferred = null;
    this.loadingDelay = options.loadingDelay;
    this.loadingMinDuration = options.loadingMinDuration;
    this.loaderEventBus = options.loaderEventBus;
    this.closedImmediately = false;
    this.deferreds = {};

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.loaderEventBus, 'cancel', this._onCancel);
  },
  wrapWithLoader: function wrapWithLoader(promise, cancelFunc) {
    this._showLoaderAfterDelay();

    var deferred = this._getCancelableDeferred(cancelFunc);

    promise.done(deferred.resolve.bind(deferred)).fail(deferred.reject.bind(deferred));
    return deferred.promise();
  },
  _onStopLoaderIfNoDeferredsLeft: function _onStopLoaderIfNoDeferredsLeft() {
    var noPendingDeferredsLeft = Object.keys(this.deferreds).length === 0;

    if (noPendingDeferredsLeft) {
      if (this._isPendingPromise(this.showLoaderDeferred)) {
        this.showLoaderDeferred.reject();
      } else if (!this.closedImmediately) {
        this._stopLoaderAfterDelay();
      }
    }
  },
  _isPendingPromise: function _isPendingPromise(promise) {
    return promise && promise.state() === 'pending';
  },
  _showLoaderAfterDelay: function _showLoaderAfterDelay() {
    this.closedImmediately = false; // Discard closing loader dialog if it's already visible and is going to close
    // Discard closing loader dialog if it's already visible and is going to close

    var isDialogGoingToBeClosed = this._isPendingPromise(this.closeLoaderDeferred);

    var isDialogGoingToBeOpened = this._isPendingPromise(this.showLoaderDeferred);

    if (this.isLoaderVisible && isDialogGoingToBeClosed) {
      this.closeLoaderDeferred.reject();
    } else if (!this.isLoaderVisible && !isDialogGoingToBeOpened) {
      var showLoaderAfterDelayDeferred = new $.Deferred();

      _.delay(showLoaderAfterDelayDeferred.resolve, this.loadingDelay);

      showLoaderAfterDelayDeferred.then(this._showLoader);
      this.showLoaderDeferred = showLoaderAfterDelayDeferred;
    }
  },
  _stopLoaderAfterDelay: function _stopLoaderAfterDelay() {
    var closeLoaderDelayDeferred = new $.Deferred();

    _.delay(closeLoaderDelayDeferred.resolve, this.loadingMinDuration);

    closeLoaderDelayDeferred.then(this._closeLoader);
    this.closeLoaderDeferred = closeLoaderDelayDeferred;
  },
  _stopLoaderImmediately: function _stopLoaderImmediately() {
    this.closedImmediately = true;

    this._closeLoader();
  },
  _showLoader: function _showLoader() {
    this.isLoaderVisible = true;
    this.loaderEventBus.trigger('show');
  },
  _closeLoader: function _closeLoader() {
    this.isLoaderVisible = false;
    this.loaderEventBus.trigger('hide');
  },
  _getCancelableDeferred: function _getCancelableDeferred(cancelFunc) {
    var deferred = new $.Deferred(),
        id = _.uniqueId() + '_' + String(Date.now()),
        self = this;
    deferred.fail(function () {
      _.isFunction(cancelFunc) && cancelFunc();
    }).always(function () {
      self._removeDeferred(id);
    });
    this.deferreds[id] = deferred;
    return deferred;
  },
  _removeDeferred: function _removeDeferred(id) {
    delete this.deferreds[id];

    this._onStopLoaderIfNoDeferredsLeft();
  },
  _onCancel: function _onCancel() {
    var self = this;

    this._stopLoaderImmediately();

    Object.keys(this.deferreds).forEach(function (id) {
      var deferred = self.deferreds[id];

      if (self._isPendingPromise(deferred)) {
        deferred.reject(requestCanceledEnum.CANCELED);
      }
    });
  }
});

module.exports = LoaderForMultipleRequestsController;

});