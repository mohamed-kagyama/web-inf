define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!./template/template.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function setSelectionRange(el, selectionRange) {
  try {
    el.setSelectionRange(selectionRange.start, selectionRange.end);
  } catch (e) {} // if an element is invisible, firefox throws an error

}

module.exports = {
  template: template,
  directives: {
    rangeSelection: {
      bind: function bind(el, binding) {
        setSelectionRange(el, {
          start: binding.value.start,
          end: binding.value.end
        });
      },
      update: function update(el, binding) {
        var newValue = binding.value,
            oldValue = binding.oldValue;
        var rangeStartIsDifferent = newValue.selectionRange.start !== oldValue.selectionRange.start,
            rangeEndIsDifferent = newValue.selectionRange.end !== oldValue.selectionRange.end;

        if (rangeStartIsDifferent || rangeEndIsDifferent) {
          setSelectionRange(el, {
            start: newValue.selectionRange.start,
            end: newValue.selectionRange.end
          });
        }

        el.focus();
      }
    }
  },
  props: ['value', 'selectionRange'],
  methods: {
    onChange: function onChange(event) {
      var target = event.target,
          value = target.value,
          selectionStart = target.selectionStart,
          selectionEnd = target.selectionEnd;
      this.$emit('change', {
        value: value,
        selectionRange: {
          start: selectionStart,
          end: selectionEnd
        }
      });
    }
  }
};

});