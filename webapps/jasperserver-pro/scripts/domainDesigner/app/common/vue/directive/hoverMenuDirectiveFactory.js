define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var registry = null;

function removeHoverMenu(el) {
  var hoverMenu = el._hoverMenu,
      hoverMenuInstance;

  if (hoverMenu) {
    if (hoverMenu.index) {
      hoverMenuInstance = registry.map[hoverMenu.index];
      hoverMenuInstance.remove();
      delete registry.map[hoverMenu.index];
    }

    el.removeEventListener('mouseenter', hoverMenu.onMouseEnter);
  }

  delete el._hoverMenu;
}

module.exports = {
  create: function create(Constr, options) {
    options = options || {};

    if (!registry) {
      if (options.registry) {
        registry = options.registry;
      } else {
        registry = {
          index: 1,
          map: {}
        };
      }
    }

    options = _.omit(options, 'registry');
    var HoverMenu = Constr;

    function createHoverMenu(el, value) {
      el._hoverMenu = {};
      var isValueDefined = value && !_.isEmpty(value);

      var onMouseEnter = function onMouseEnter() {
        var isHoverMenuAbsent = !el._hoverMenu.index;

        if (isHoverMenuAbsent) {
          var hoverMenuInstance = new HoverMenu(_.extend({}, options, {
            el: el,
            menuOptions: value
          }));
          hoverMenuInstance.show();
          registry.map[registry.index] = hoverMenuInstance;
          el._hoverMenu.index = registry.index;
          registry.index = registry.index + 1;
        }

        _.each(registry.map, function (menu) {
          if (menu !== registry.map[el._hoverMenu.index]) {
            menu.hide();
          }
        });
      };

      if (isValueDefined) {
        el._hoverMenu.onMouseEnter = onMouseEnter;
        el.addEventListener('mouseenter', onMouseEnter);
      }
    }

    return {
      bind: function bind(el, binding) {
        var value = binding.value;
        createHoverMenu(el, value);
      },
      componentUpdated: function componentUpdated(el, binding) {
        var value = binding.value;
        removeHoverMenu(el);
        createHoverMenu(el, value);
      },
      unbind: function unbind(el) {
        removeHoverMenu(el);
      }
    };
  }
};

});