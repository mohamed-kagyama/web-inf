define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

var template = require("text!../template/joinsDesignerVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var JoinTree = options.JoinTree,
        DraftJoinTree = options.DraftJoinTree,
        JoinTreePlaceholder = options.JoinTreePlaceholder,
        JoinsDesignerSearch = options.JoinsDesignerSearch,
        VirtualData = options.VirtualData,
        InitialDropZone = options.InitialDropZone;
    return {
      template: template,
      computed: _.extend({
        isVisible: function isVisible() {
          return this.currentDesigner === this.ownDesigner;
        },
        isAnyModelsPresent: function isAnyModelsPresent() {
          return Boolean(this.models.length);
        }
      }, i18nComputed),
      data: function data() {
        return options.data;
      },
      components: {
        joinTree: JoinTree,
        draftJoinTree: DraftJoinTree,
        joinTreePlaceholder: JoinTreePlaceholder,
        joinsDesignerSearch: JoinsDesignerSearch,
        virtualData: VirtualData,
        initialDropZone: InitialDropZone
      },
      methods: {
        isJoinTree: function isJoinTree(modelType) {
          return entityUtil.isJoinTree(modelType);
        },
        isDraftJoinTree: function isDraftJoinTree(model) {
          return model.isDraftJoinTree;
        },
        isJoinTreePlaceholder: function isJoinTreePlaceholder(model) {
          return model.isJoinTreePlaceholder;
        }
      }
    };
  }
};

});