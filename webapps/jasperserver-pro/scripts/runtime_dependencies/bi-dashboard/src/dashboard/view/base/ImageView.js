define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Backbone = require('backbone');

var settings = require('../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function attributesToCss(model) {
  var scaleStrategy = model.get('scaleToFit');
  return {
    height: scaleStrategy === 'height' || scaleStrategy === 'container' ? '100%' : undefined,
    width: scaleStrategy === 'width' || scaleStrategy === 'container' ? '100%' : undefined
  };
}

function containerAttributesToCss(model) {
  var scaleStrategy = model.get('scaleToFit');
  return {
    'overflow-x': scaleStrategy === 'width' || scaleStrategy === 'container' ? 'hidden' : undefined,
    'overflow-y': scaleStrategy === 'height' || scaleStrategy === 'container' ? 'hidden' : undefined
  };
}

module.exports = Backbone.View.extend({
  REST_RESOURCE_URI: '/rest_v2/resources',
  initialize: function initialize() {},

  /**
   * Toggles special css class to get cursor corresponding style
   */
  toggleHyperlinkCssClass: function toggleHyperlinkCssClass() {
    this.$el.toggleClass('hyperlink', this.model.get('exposeOutputsToFilterManager'));
  },
  buildViewElement: function buildViewElement(uri) {
    var imgElement = $('<img/>'),
        repoUrl = '';

    if (uri.substr(0, 6) === 'repo:/') {
      repoUrl = settings.CONTEXT_PATH + this.REST_RESOURCE_URI + uri.substr(uri.indexOf('/'));
    } else {
      repoUrl = uri;
    } // By suffixing the date, we will avoid requesting a cached image
    // which is necessary for refreshing dynamic content from a link when using Refresh button in toolbar
    // By suffixing the date, we will avoid requesting a cached image
    // which is necessary for refreshing dynamic content from a link when using Refresh button in toolbar


    return imgElement.attr('src', repoUrl + '?' + Date.now());
  },
  render: function render(uri) {
    var viewElement;
    uri = _.isUndefined(uri) ? this.model.get('url') : uri;

    if (uri === '' || _.isUndefined(uri)) {
      return this;
    } else {
      viewElement = this.buildViewElement(uri);
    }

    this.$el.html(viewElement.css(attributesToCss(this.model))).css(containerAttributesToCss(this.model));
    this.toggleHyperlinkCssClass();
    return this;
  }
});

});