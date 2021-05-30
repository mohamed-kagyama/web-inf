define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require("jquery");

var featureDetection = require("runtime_dependencies/js-sdk/src/common/util/featureDetection");

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

var Backbone = require('backbone');

var filterOperatorLabelFactory = require('../factory/filterOperatorLabelFactory');

var valueEditorFactory = require('../factory/valueEditorFactory');

var possibleOperatorsFactory = require('../factory/possibleOperatorsFactory');

var i18n = require("bundle!AdHocFiltersBundle");

var filterEditorTemplate = require("text!./template/filterEditorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(filterEditorTemplate),
  isOlap: false,
  el: function el() {
    var viewData = this.model.toJSON();
    viewData.i18n = i18n;
    return this.template(viewData);
  },
  events: function () {
    var events = {
      'click .header .operator': 'showOperatorMenu',
      'click .header .button.disclosure': 'onToggleFilter',
      'click .header .mutton': 'showFilterMenu'
    };
    return events;
  }(),
  operators: {},
  initialize: function initialize() {
    var self = this;
    this.valueEditorUIChanged = false;

    _.bindAll(this, 'removeFilter', 'upFilter', 'downFilter', 'drawToggleFilter');

    this.operationsMenuActionModel = this.createOperationsMenuActionModel();
    this.filterMenuActionModel = this.createFilterMenuActionModel();
    this.listenTo(this.model, 'operationChange', this.render);
    this.listenTo(this.model, 'ready', this.render);
    this.listenTo(this.model, 'change:filterPodMinimized', this.drawToggleFilter);
    this.listenTo(this.model, 'change:filterLetter', this.redrawFilterTitle);
    this.listenTo(this.model, 'change:label', this.redrawFilterTitle);
    this.model.loadAdditionalServerData(true).done(function () {
      self.model.trigger('ready', self.model);
    });
    actionModel.MOUSE_OUT_PATTERNS.push("#filter-container .header .mutton");
  },
  redrawFilterTitle: function redrawFilterTitle() {
    this.$('.filterName span').text(this.model.get('filterLetter') + '.' + this.model.get('label'));
    this.$('.filterName span').attr('title', this.model.get('filterLetter') + '.' + this.model.get('label'));
  },
  resizeTitle: function resizeTitle() {
    var widthWithoutFilterName = this.$('.header .button.disclosure').width() + this.$('.header .button.operator div').width() + this.$('.header .button.operator .icon').width() + this.$('.header .button.mutton').width() + 15; // 10 is for some padding
    // 10 is for some padding

    var totalWidth = this.$('.header .title').width();
    var $filterNameEl = this.$('.header .filterName');
    $filterNameEl.css({
      overflow: 'visible',
      width: 'auto'
    });
    var filterNameWidth = $filterNameEl.find('span').width() + this.$('.header .button.disclosure').width() + 15;
    $filterNameEl.css('overflow', 'hidden');
    $filterNameEl.width(Math.min(totalWidth - widthWithoutFilterName, filterNameWidth));
  },
  render: function render() {
    var operatorName = this.model.get('operatorName'),
        factory = this.getValueEditorFactory();
    this.renderOperator(); // we don't need to re-create value editor in case if it stays the same
    // so we will try to "update" value editor if it supports such ability
    // we don't need to re-create value editor in case if it stays the same
    // so we will try to "update" value editor if it supports such ability

    if (!this.valueEditor || this.valueEditor.constructor != factory.constructor) {
      if (this.valueEditor) {
        this.stopListening(this.valueEditor, 'rendered', this.uiChanged);
        this.valueEditor.remove();
      } else {
        // for some very strange reason in IE10 .body container is not displayed
        // after we added filter by dragging it to the filters panel.
        // so here we firstly minimize the whole filter and then maximize it with timeout of 1 ms.
        this.$('.filter.panel').addClass('minimized');

        _.defer(_.bind(this.drawToggleFilter, this));
      }

      this.valueEditor = this.createValueEditor();
    }

    this.valueEditor.updateData();
    return this;
  },
  uiChanged: function uiChanged() {
    // notify all watchers that something in UI of filter editor was changed
    this.trigger('uiChange:filters', this);
  },
  createValueEditor: function createValueEditor() {
    var factory = this.getValueEditorFactory(),
        valueEditor = factory.createInstance(this.model); // Not all types of value editors have finally rendered HTML just after creation.
    // For example, SingleSelect and MultiSelect components have final HTML markup only after additional
    // data is fetched from server. That's why we have a custom "rendered" event.
    // Not all types of value editors have finally rendered HTML just after creation.
    // For example, SingleSelect and MultiSelect components have final HTML markup only after additional
    // data is fetched from server. That's why we have a custom "rendered" event.

    this.listenTo(valueEditor, 'rendered', this.uiChanged);
    this.$('.body').html(valueEditor.$el);
    return valueEditor;
  },
  renderOperator: function renderOperator() {
    this.$('.operator div').text(filterOperatorLabelFactory(this.model.get('operatorName'), this.model.get('filterDataType')));
    this.resizeTitle();
  },
  showOperatorMenu: function showOperatorMenu(event) {
    actionModel.showDynamicMenu('filterOperation_' + this.cid, event.originalEvent, 'menu vertical dropDown fitable', null, this.operationsMenuActionModel);
  },
  showFilterMenu: function showFilterMenu(event) {
    var target = $(event.target);
    var index = target.closest("li.leaf.filter").index();
    var $button = target.hasClass("button") ? target : target.closest(".button");

    if (actionModel.isMenuShowing() && actionModel.menuDom.hasClassName("openByFilter-" + index)) {
      actionModel.hideMenu();
      actionModel.menuDom.removeClassName("openByFilter-" + index);
    } else {
      actionModel.showDynamicMenu(this.cid, event.originalEvent, 'menu vertical dropDown fitable openByFilter-' + index, null, this.filterMenuActionModel);
    }

    var buttonPosition = $button.offset();
    $('#menu').offset({
      top: buttonPosition.top + $button.height(),
      left: buttonPosition.left - $('#menu').width() + $button.width()
    }); // do not propagate event further, as global event handler in buttonManager adds additional classes to button

    event.stopPropagation();
  },
  onToggleFilter: function onToggleFilter() {
    this.model.set('filterPodMinimized', !this.model.get('filterPodMinimized'));
    this.model.trigger('toggle', this.model);
  },
  drawToggleFilter: function drawToggleFilter() {
    this.$('.filter.panel')[this.model.get('filterPodMinimized') ? 'addClass' : 'removeClass']('minimized');
  },
  removeFilter: function removeFilter(options) {
    var force = options && options.force;

    if (this.model.get('used') && !force) {
      this.model.trigger('destroyConfirm', this.model, this.model.collection);
    } else {
      this.model.trigger('destroy', this.model, this.model.collection);
    }
  },
  upFilter: function upFilter() {
    this.model.trigger('move', this.model, {
      direction: -1
    });
  },
  downFilter: function downFilter() {
    this.model.trigger('move', this.model, {
      direction: 1
    });
  },
  getValueEditorFactory: function getValueEditorFactory() {
    var factory = valueEditorFactory(this.model.get('filterDataType'), this.model.get('operatorName'), this.isOlap);

    if (!factory) {
      throw 'Value editor for filter data type \'' + this.model.get('filterDataType') + '\' and operator \'' + this.model.get('operatorName') + '\' does not exist';
    }

    return factory;
  },
  createOperationsMenuActionModel: function createOperationsMenuActionModel() {
    var that = this;
    var menuModel = {};
    menuModel['filterOperation_' + this.cid] = _.map(possibleOperatorsFactory(this.model.get('filterDataType'), this.isOlap), function (op) {
      return actionModel.createMenuElement('optionAction', {
        text: filterOperatorLabelFactory(op, that.model.get('filterDataType')),
        action: function action(operator) {
          that.model.set('operatorName', operator);
        },
        actionArgs: [op],
        isSelectedTest: function isSelectedTest(op) {
          return that.model.get('operatorName') === op;
        },
        isSelectedTestArgs: [op]
      });
    });
    return menuModel;
  },
  createFilterMenuActionModel: function createFilterMenuActionModel() {
    var menuModel = {};
    menuModel[this.cid] = [actionModel.createMenuElement('simpleAction', {
      text: i18n.ADH_1217_DYNAMIC_FILTER_REMOVE_FILTER,
      action: this.removeFilter
    }), actionModel.createMenuElement('separator'), actionModel.createMenuElement('simpleAction', {
      text: i18n.ADH_084_MOVE_UP,
      action: this.upFilter
    }), actionModel.createMenuElement('simpleAction', {
      text: i18n.ADH_085_MOVE_DOWN,
      action: this.downFilter
    })];
    return menuModel;
  },
  remove: function remove() {
    this.valueEditor && this.valueEditor.remove();
    Backbone.View.prototype.remove.call(this);
    return this;
  }
});

});