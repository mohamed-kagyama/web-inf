define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var VisualizationTypesController = require('../VisualizationTypesController');

var template = require("text!../template/bodyTemplate.htm");

var i18n = require("bundle!AdHocBundle");

var chartSelectorRules = require("text!../template/chartSelectorRules.htm");

var messageMapping = require('../enum/messageMapping');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  className: 'jr-mVisualchooser-body jr',
  template: _.template(template),
  events: {
    'click li.jr-mVisualchooser-menu-item': '_onClickItem',
    'mouseover .jr-mVisualchooser-menu-item-wrapper': '_hoverOnItem',
    'mouseleave .jr-mVisualchooser-menu-item-wrapper': '_leaveOnItem'
  },
  constructor: function constructor(options) {
    this.options = _.defaults(options || {}, this.defaults);
    this.typesManager = this.options.typesManager;

    if (!this.typesManager) {
      this.typesManager = new VisualizationTypesController();
    }

    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    this.i18n = i18n;
    this.isDesignView = window.isDesignView;
    this._selectedType = null;
    this.disabledTypes = [];
    this.showDisabledIcons = true;
    this.on('change:groupSelected', _.bind(this._onTabChange, this));
  },
  render: function render() {
    var chartType;
    this.$el.html(this.template({
      types: this.typesManager.getAllTypes(),
      designView: this.isDesignView,
      i18n: this.i18n
    }));
    this.$typeElements = this.$('li.jr-mVisualchooser-menu-item');
    chartType = this.getChartType(this.$typeElements);
    this.isDesignView && chartType && this.showMessages(chartType, true);
    return this;
  },
  getChartType: function getChartType(element) {
    var typeName = element.data('chartType');
    return this.typesManager.getTypeByName(typeName);
  },
  _onClickItem: function _onClickItem(click) {
    var $itemEl = this.$(click.currentTarget);
    var visualChooserRule = $('.jr-mVisualchooser-rule');

    if (!$itemEl.hasClass('jr-isDisabled') && !$itemEl.hasClass('jr-isSelected')) {
      var typeName = $itemEl.data('chartType');
      var type = this.getChartType($itemEl);

      if (this.isDesignView) {
        this.showMessages(type, false);
        visualChooserRule.addClass('jr-isSelected');
        visualChooserRule.removeClass('jr-isHovered');
      }

      this.setSelectedType(typeName);
      this.trigger('change:visualizationType', {
        type: typeName,
        legacyAdhocType: type.legacyAdhoc
      });
    }
  },
  _hoverOnItem: function _hoverOnItem(hover) {
    if (this.isDesignView) {
      var $itemEl = this.$(hover.currentTarget),
          toggleHoverSelected = $itemEl.hasClass('jr-isSelected') || $itemEl.parent().hasClass('jr-isSelected'),
          visualChooserRule = $('.jr-mVisualchooser-rule');
      visualChooserRule.removeClass('jr-isSelected');
      toggleHoverSelected ? visualChooserRule.addClass('jr-isSelected') : visualChooserRule.addClass('jr-isHovered');
      var chartType = this.getChartType($itemEl.parent());
      this.showMessages(chartType, false);
    }
  },
  _leaveOnItem: function _leaveOnItem(leave) {
    var $itemEl = this.$(leave.currentTarget);
    !$itemEl.hasClass('jr-isSelected') && $('.jr-mVisualchooser-rule').removeClass('jr-isHovered');
  },
  setSelectedType: function setSelectedType(typeName) {
    this._selectedType = typeName;
    this.$typeElements.filter('.jr-isSelected').removeClass('jr-isSelected');
    this.$typeElements.filter(function (index, element) {
      return $(element).data('chartType') === typeName;
    }).addClass('jr-isSelected');
  },
  getSelectedType: function getSelectedType() {
    return this._selectedType;
  },
  setDisabledTypes: function setDisabledTypes(types) {
    this.disabledTypes = types;

    this._setDisabledTypes();
  },
  getScrollPosition: function getScrollPosition() {
    return this.$el.find('ul').first().scrollTop();
  },
  setScrollPosition: function setScrollPosition(position) {
    this.$el.find('ul').first().scrollTop(position);
  },
  _setDisabledTypes: function _setDisabledTypes() {
    var self = this;

    if (!this.$typeElements) {
      return;
    }

    this.$typeElements.each(function () {
      var $el = $(this);

      if (self.showDisabledIcons && _.contains(self.disabledTypes, $el.data('chartType'))) {
        $el.addClass('jr-isDisabled');
      } else {
        $el.removeClass('jr-isDisabled');
      }
    });
  },
  setShowDisabledIcons: function setShowDisabledIcons(status) {
    this.showDisabledIcons = status;

    this._setDisabledTypes();
  },
  _onTabChange: function _onTabChange(groupType) {
    if (groupType === 'all') {
      this.$typeElements.removeClass('jr-isHidden');
    } else {
      var selectedTypesArray = _.pluck(this.typesManager.getAllTypesInGroup(groupType), 'name');

      this.$typeElements.each(function () {
        var $el = $(this);

        if (_.contains(selectedTypesArray, $el.data('chartType'))) {
          $el.removeClass('jr-isHidden');
        } else {
          $el.addClass('jr-isHidden');
        }
      });
    }
  },
  showMessages: function showMessages(type, firstRender) {
    var chartType = type.legacyAdhoc,
        chartRules = messageMapping[chartType],
        chartIconClass = chartRules['cssClass'],
        noOfRules = Object.keys(chartRules),
        first,
        second,
        third,
        fourth,
        fifth,
        template,
        rulesLabel,
        twoSpan;
    $('.jr-mVisualchooser-rule').find('.jr-mList-item').not(':first').remove();
    var self = this;

    for (var i = 0; i < noOfRules.length - 1; i++) {
      var rulesMapping = chartRules[noOfRules[i]];
      template = "";
      first = rulesMapping.first;
      second = rulesMapping.second && rulesMapping.second.msg ? rulesMapping.second.msg : rulesMapping.second;
      third = rulesMapping.third;
      fourth = rulesMapping.fourth && rulesMapping.fourth.msg ? rulesMapping.fourth.msg : rulesMapping.fourth;
      fifth = rulesMapping.fifth ? rulesMapping.fifth : '';
      twoSpan = rulesMapping.type && rulesMapping.type === 'twospan' ? true : false;
      template = _.template(chartSelectorRules, {
        firstM: first,
        secondM: second,
        thirdM: third,
        fourthM: fourth,
        fifthM: fifth,
        twoSpanRule: twoSpan
      });
      template = $(template);
      this.setFieldMeasureClass(rulesMapping, template);
      firstRender ? self.$el.find('.jr-mList').append(template) : $('.jr-mVisualchooser-rule').find('.jr-mList').append(template);
    }

    rulesLabel = firstRender ? this.$el.find('.jr-mVisualchooser-rule-text-label') : $('.jr-mVisualchooser-rule-text-label');
    this.addChartIconClass(rulesLabel, chartIconClass);
    this.addtextToRuleSpan(rulesLabel[0], type);
  },
  addtextToRuleSpan: function addtextToRuleSpan(rulesLabel, type) {
    var rulesLabelSibling = rulesLabel.nextSibling;
    rulesLabelSibling && rulesLabelSibling.parentNode.removeChild(rulesLabelSibling);
    rulesLabel.insertAdjacentText('afterend', i18n[type.bundleName]);
  },
  addChartIconClass: function addChartIconClass(element, chartIconClass) {
    var ruleIcon = element.parents().find('.jr-mVisualchooser-rule #ruleIcon');
    ruleIcon[0].className = "";
    ruleIcon[0].className = "jr-mVisualchooser-rule-icon " + chartIconClass + " jr";
  },
  setFieldMeasureClass: function setFieldMeasureClass(rulesMapping, template) {
    var FMSpan = template.find('.jr-uSemibold');

    if (rulesMapping.second && rulesMapping.second['typeF/M']) {
      if (rulesMapping.second['typeF/M'] === 'field') {
        FMSpan.first().addClass('jr-uColorField').removeClass('jr-uColorMeasure');
      } else {
        FMSpan.first().addClass('jr-uColorMeasure').removeClass('jr-uColorField');
      }
    }
  }
});

});