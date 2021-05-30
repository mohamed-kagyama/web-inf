define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = getBinding;

function getBinding() {
  return {
    el: {},
    onClick: function onClick(e) {},
    init: function init($element, value, bindings) {
      var modelBinding = $element.data('model-attr');
      this.el = $element.get(0);
      $element.attr('disabled', 'disabled');

      this.onClick = function (event) {
        event.stopPropagation();
        bindings[modelBinding](null);
        $element.attr('disabled', 'disabled');
      };

      this.el.addEventListener('click', this.onClick);
    },
    set: function set($element, value) {
      if (value) {
        $element.removeAttr('disabled');
        $element.prop('checked', true);
      }
    },
    clean: function clean() {
      this.el.removeEventListener('click', this.onClick);
    }
  };
}

});