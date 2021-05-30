define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/joinTreeVueTemplate.htm");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

var placementsEnum = require("../../../../../../common/component/enum/placementsEnum");

var messageTypesEnum = require("../../../../../../common/component/enum/messageTypesEnum");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var Join = options.Join,
        JoinExpression = options.JoinExpression,
        ConstantJoinExpression = options.ConstantJoinExpression,
        ComplexJoinHeader = options.ComplexJoinHeader,
        ComplexJoinExpression = options.ComplexJoinExpression,
        JoinAlias = options.JoinAlias,
        JoinConstructor = options.JoinConstructor,
        tooltipDirective = options.tooltipDirective,
        tooltipOffset = options.tooltipOffset,
        lazyDroppableDirective = options.lazyDroppableDirective,
        lazyDraggableDirective = options.lazyDraggableDirective,
        clickMenuDirective = options.clickMenuDirective,
        joinTreeMenuOptionsFactory = options.joinTreeMenuOptionsFactory;
    return {
      template: template,
      mixins: options.mixins,
      directives: {
        clickMenu: clickMenuDirective,
        tooltip: tooltipDirective,
        droppable: lazyDroppableDirective,
        draggable: lazyDraggableDirective
      },
      data: function data() {
        return {
          isHovered: false
        };
      },
      components: {
        join: Join,
        joinExpression: JoinExpression,
        constantJoinExpression: ConstantJoinExpression,
        complexJoinHeader: ComplexJoinHeader,
        complexJoinExpression: ComplexJoinExpression,
        joinAlias: JoinAlias,
        joinConstructor: JoinConstructor
      },
      computed: _.extend({
        models: function models() {
          return this.joinTree.children;
        },
        joinTreeMenuOptions: function joinTreeMenuOptions() {
          return joinTreeMenuOptionsFactory.create(this.joinTree);
        },
        tooltipOptions: function tooltipOptions() {
          var errorMessage = this.joinTree.isValid ? '' : this.i18n['domain.validation.joinTree.invalid.message'];
          return {
            content: {
              text: errorMessage,
              label: this.i18n['domain.validation.joinTree.invalid.title']
            },
            offset: {
              top: tooltipOffset
            },
            placement: placementsEnum.BOTTOM_LEFT,
            type: messageTypesEnum.ERROR
          };
        },
        droppableConfig: function droppableConfig() {
          return {
            drop: this.drop,
            over: this.over,
            out: this.out,
            tolerance: 'pointer',
            test: this.shouldBeDroppable
          };
        },
        draggableConfig: function draggableConfig() {
          return {
            getData: this.getDraggableData,
            tolerance: 'pointer',
            handle: '.jr-jJoinTreeDraggableHandle'
          };
        }
      }, i18nComputed),
      props: ['joinTree'],
      methods: {
        isJoin: function isJoin(modelType) {
          return entityUtil.isJoin(modelType);
        },
        isJoinExpression: function isJoinExpression(modelType) {
          return entityUtil.isJoinExpression(modelType);
        },
        isConstantJoinExpression: function isConstantJoinExpression(modelType) {
          return entityUtil.isConstantJoinExpression(modelType);
        },
        isComplexJoin: function isComplexJoin(modelType) {
          return entityUtil.isComplexJoin(modelType);
        },
        isJoinAlias: function isJoinAlias(modelType) {
          return entityUtil.isJoinAlias(modelType);
        },
        isJoinConstructor: function isJoinConstructor(model) {
          return model.isJoinConstructor;
        },
        getDraggableData: function getDraggableData() {
          return {
            label: this.joinTree.name,
            resource: {
              id: this.joinTree.id,
              index: this.joinTree.index,
              name: this.joinTree.name,
              type: this.joinTree.modelType,
              isDraftJoinTree: this.joinTree.isDraftJoinTree
            }
          };
        }
      }
    };
  }
};

});