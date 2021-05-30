define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  update: function update(el, binding) {
    var elScrollPos = el.scrollTop,
        elClientHeight = el.clientHeight,
        scrollPos = binding.value,
        oldScrollPos = binding.oldValue;

    if (scrollPos !== oldScrollPos && scrollPos > elClientHeight + elScrollPos) {
      el.scrollTop = scrollPos;
    }
  }
};

});