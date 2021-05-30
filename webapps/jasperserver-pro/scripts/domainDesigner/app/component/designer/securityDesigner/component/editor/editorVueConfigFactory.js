define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _i18n = require("bundle!DomainDesignerBundle");

var React = require('react');

var _reactDom = require('react-dom');

var render = _reactDom.render;

var RSecurityEditor = require('./RSecurityEditor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: '<div/>',
      props: ['securityFile'],
      computed: {
        i18n: function i18n() {
          return _i18n;
        }
      },
      methods: {},
      mounted: function mounted() {
        var reactElement = React.createElement(RSecurityEditor, {
          options: options,
          message: '' // options.message

        }); // In test environment we don't have the $parent, so we mount the react component
        // on the parent only if it is actually defined

        var wrapperElement = this.$el;

        if (typeof this.$parent !== 'undefined') {
          wrapperElement = this.$parent.$el;
        }

        render(reactElement, wrapperElement);
      }
    };
  }
};

});