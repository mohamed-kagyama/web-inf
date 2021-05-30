define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var registry = null;

function removeClickMenu(el) {
  var clickMenu = el._clickMenu,
      clickMenuInstance;

  if (clickMenu) {
    if (clickMenu.index) {
      clickMenuInstance = registry.map[clickMenu.index];
      clickMenuInstance.remove();
      delete registry.map[clickMenu.index];
    }

    el.removeEventListener('click', clickMenu.onClick);
  }

  delete el._clickMenu;
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
    var ClickMenu = Constr;

    function createClickMenu(el, value) {
      el._clickMenu = {};
      var isValueDefined = value && !_.isEmpty(value);

      var onClick = function onClick() {
        var isClickMenuAbsent = !el._clickMenu.index;

        if (isClickMenuAbsent) {
          var clickMenuInstance = new ClickMenu(_.extend({}, options, {
            el: el,
            menuOptions: value
          }));
          clickMenuInstance.show();
          registry.map[registry.index] = clickMenuInstance;
          el._clickMenu.index = registry.index;
          registry.index = registry.index + 1;
        }

        _.each(registry.map, function (menu) {
          if (menu !== registry.map[el._clickMenu.index]) {
            menu.hide();
          }
        });
      };

      if (isValueDefined) {
        el._clickMenu.onClick = onClick;
        el.addEventListener('click', onClick);
      }
    }

    return {
      bind: function bind(el, binding) {
        var value = binding.value;
        createClickMenu(el, value);
      },
      componentUpdated: function componentUpdated(el, binding) {
        var value = binding.value;
        removeClickMenu(el);
        createClickMenu(el, value);
      },
      unbind: function unbind(el) {
        removeClickMenu(el);
      }
    };
  }
};

});