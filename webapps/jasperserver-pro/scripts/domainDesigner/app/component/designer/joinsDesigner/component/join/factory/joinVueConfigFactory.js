define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/joinVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var joinMenuOptionsFactory = options.joinMenuOptionsFactory,
        clickMenuDirective = options.clickMenuDirective,
        mixins = options.mixins;
    return {
      template: template,
      directives: {
        clickMenu: clickMenuDirective
      },
      computed: {
        isAnyJoinMenuOptions: function isAnyJoinMenuOptions() {
          return Boolean(this.joinMenuOptions.length);
        },
        joinMenuOptions: function joinMenuOptions() {
          return joinMenuOptionsFactory.create({
            id: this.join.id
          });
        }
      },
      props: ['join'],
      mixins: mixins
    };
  }
};

});