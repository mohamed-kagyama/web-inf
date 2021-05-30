define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!./template/fieldValueEditorTemplate.htm");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var droppableViewMixin = require("../../../../../../common/mixin/droppable/droppableViewMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18Message = i18nMessageUtil.create(i18n);

var fieldLabelTemplate = _.template('{{-sourceName}}:{{-fieldName}}');

var dropTemplate = _.template('draftFilter:{{-which}}:drop');

var overTemplate = _.template('draftFilter:{{-which}}:over');

var outTemplate = _.template('draftFilter:{{-which}}:out');

var removeTemplate = _.template('draftFilter:{{-which}}:removeField');

module.exports = {
  create: function create(options) {
    var store = options.store,
        filtersDesignerEventBus = options.filtersDesignerEventBus;
    return {
      template: template,
      props: ['filter', 'operand'],
      components: {},
      computed: {
        label: function label() {
          if (this.isFieldAvailable) {
            return fieldLabelTemplate({
              sourceName: this.operand.sourceName,
              fieldName: this.operand.fieldName
            });
          } else {
            return i18Message('domain.designer.filters.draftState.dropZone.emptyMessage');
          }
        },
        isFieldAvailable: function isFieldAvailable() {
          return Boolean(this.operand.fieldId);
        },
        isOver: function isOver() {
          return store.get('runtime')[this.which].over;
        },
        which: function which() {
          return this.operand.which;
        },
        isLeft: function isLeft() {
          return this.which === 'left';
        }
      },
      methods: _.extend({
        initializeDroppableArea: function initializeDroppableArea() {
          this._initializeDroppable && this._initializeDroppable({
            el: '.jr-jDropZone',
            drop: 'drop',
            over: 'over',
            out: 'out'
          });
        },
        destroyDroppableArea: function destroyDroppableArea() {
          this._destroyDroppable && this._destroyDroppable();
        },
        drop: function drop(e, resource) {
          filtersDesignerEventBus.trigger(dropTemplate({
            which: this.which
          }), resource);
        },
        over: function over() {
          filtersDesignerEventBus.trigger(overTemplate({
            which: this.which
          }));
        },
        out: function out() {
          filtersDesignerEventBus.trigger(outTemplate({
            which: this.which
          }));
        },
        removeField: function removeField() {
          filtersDesignerEventBus.trigger(removeTemplate({
            which: this.which
          }));
        }
      }, droppableViewMixin),
      mounted: function mounted() {
        this.initializeDroppableArea();
      },
      updated: function updated() {
        var shouldDropZoneBeActive = this.operand.shouldDropZoneBeActive;

        if (shouldDropZoneBeActive) {
          this.initializeDroppableArea();
        } else {
          this.destroyDroppableArea();
        }
      },
      destroyed: function destroyed() {
        this.destroyDroppableArea();
      }
    };
  }
};

});