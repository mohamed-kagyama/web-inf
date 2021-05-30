define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var PopoverVueWrapper = require("./wrapper/PopoverVueWrapper");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function update(el, binding) {
  el._popoverVueWrapper.setState(binding.value);
}

module.exports = {
  bind: function bind(el, binding) {
    el._popoverVueWrapper = new PopoverVueWrapper({
      directiveEl: el
    });
    document.body.appendChild(el._popoverVueWrapper.$mount().$el);
    update(el, binding);
  },
  update: update,
  unbind: function unbind(el) {
    el._popoverVueWrapper.remove();

    delete el._popoverVueWrapper;
  }
};

});