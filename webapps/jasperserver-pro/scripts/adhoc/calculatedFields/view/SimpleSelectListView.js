define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Backbone = require('backbone');

var templateContent = require("text!../template/SimpleSelectListTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(templateContent),
  events: {
    'mousedown': 'clickHandler',
    'dblclick': 'dblClickHandler'
  },
  render: function render(list) {
    this.$el.empty();
    var viewData = {};
    viewData.items = list;
    this.$el.html(this.template(viewData));
    return this;
  },
  clickHandler: function clickHandler(evt) {
    this.triggerEvent(evt, 'item:click');
  },
  dblClickHandler: function dblClickHandler(evt) {
    this.triggerEvent(evt, 'item:dblClick');
  },
  triggerEvent: function triggerEvent(evt, customEvt) {
    var node = $(evt.target).is('.pickList li') ? evt.target : $(evt.target).parents('.pickList li')[0];

    if (node) {
      this.clearSelection();
      $(node).addClass('selected');
      this.trigger(customEvt, $(node).attr('itemId'));
    }
  },
  clearSelection: function clearSelection() {
    this.$el.find('li.selected').removeClass('selected');
  }
});

});