define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var moveEnum = require("../../moveItems/enum/movePresentationItemsPositionEnum");

var template = require("text!./template/controlsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['moveButtonsStatus', 'isAddSetButtonActive', 'searchKeyword'],
      components: {
        search: options.search
      },
      computed: i18nComputed,
      methods: {
        onAddSet: function onAddSet() {
          options.presentationDesignerEventBus.trigger('addSet');
        },
        onMoveToTop: function onMoveToTop() {
          options.presentationDesignerEventBus.trigger('movePresentationSetClick', moveEnum.MOVE_TOP);
        },
        onMoveUp: function onMoveUp() {
          options.presentationDesignerEventBus.trigger('movePresentationSetClick', moveEnum.MOVE_UP);
        },
        onMoveDown: function onMoveDown() {
          options.presentationDesignerEventBus.trigger('movePresentationSetClick', moveEnum.MOVE_DOWN);
        },
        onMoveToBottom: function onMoveToBottom() {
          options.presentationDesignerEventBus.trigger('movePresentationSetClick', moveEnum.MOVE_BOTTOM);
        }
      }
    };
  }
};

});