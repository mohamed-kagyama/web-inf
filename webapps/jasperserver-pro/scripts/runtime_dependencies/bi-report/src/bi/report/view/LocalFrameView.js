define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  initialize: function initialize($reportElement) {
    this.setElement($('<iframe></iframe>', {
      scrolling: 'no'
    }).css({
      border: 'none',
      width: '100%'
    }));
    this.frameLoaded = new $.Deferred();
    this.$el.on('load', _.bind(this.onLoad, this, $reportElement));
  },
  onLoad: function onLoad($reportElement) {
    if (this.el.contentWindow || this.el.contentDocument) {
      this.frameDoc = (this.el.contentWindow || this.el.contentDocument).document;
      this.$frameBody = $(this.frameDoc.getElementsByTagName('body')[0]);
      this.$frameBody.css({
        position: 'relative',
        margin: 0
      }).html($reportElement);
      this.frameLoaded.resolve();
    } else {
      setTimeout(function () {
        _.bind(this.onLoad, this);
      }, 1000);
    }
  },
  remove: function remove() {
    this.$el.off('load');
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

});