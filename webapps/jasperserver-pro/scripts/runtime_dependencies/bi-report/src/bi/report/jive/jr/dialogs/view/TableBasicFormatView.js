define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jiveDataConverter = require('../../../util/jiveDataConverter');

var Epoxy = require('backbone.epoxy');

var Backbone = require('backbone');

var TableCommonFormatView = require('./TableCommonFormatView');

var FormatModelCache = require('../util/FormatModelCache');

var tableFormatTemplate = require("text!../template/tableBasicFormatTemplate.htm");

var basicOptionTemplate = require("text!../template/basicOptionTemplate.htm");

var groupOptionTemplate = require("text!../template/groupOptionTemplate.htm");

var currencyMenuTemplate = require("text!../template/currencyMenuTemplate.htm");

var currencyOptionTemplate = require("text!../template/currencyOptionTemplate.htm");

var TableFormatModel = require('../model/TableFormatModel');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

var NumberFormatPatternUtil = require('../util/NumberFormatPatternUtil');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var currencyMap = {
  'LOCALE_SPECIFIC': '\xA4',
  'USD': '$',
  'GBP': '\xA3',
  'EUR': "\u20AC",
  'YEN': '\xA5'
};

function onApplyToChange() {
  var viewModel = this.viewModel,
      cache = this.cache,
      currentApplyTo = viewModel.get('applyTo'),
      previousApplyTo = viewModel.previous('applyTo'),
      columnComponentModel = this.columnComponentModel,
      key,
      columnGroup,
      obj;

  if (currentApplyTo == null) {
    return;
  }

  if (previousApplyTo) {
    if (previousApplyTo === 'heading' || previousApplyTo === 'detailrows') {
      key = cache.createKey(previousApplyTo, columnComponentModel);
    } else {
      key = cache.createKey(previousApplyTo, columnComponentModel.parent.columnGroups.findWhere({
        id: previousApplyTo
      }), true);
    }

    cache.set(key, this.model.toJSON());
  }

  if (currentApplyTo === 'heading') {
    key = cache.createKey(currentApplyTo, columnComponentModel);

    if (cache.get(key) === null) {
      obj = columnComponentModel.headingFormat.toJSON();
      obj.columnLabel = columnComponentModel.get('columnLabel');
      cache.set(key, obj);
    }

    this.viewModel.set('dataType', 'text');
  } else if (currentApplyTo === 'detailrows') {
    key = cache.createKey(currentApplyTo, columnComponentModel);

    if (cache.get(key) === null) {
      obj = columnComponentModel.detailsRowFormat.toJSON();
      obj.pattern = columnComponentModel.detailsRowFormat.toJiveFormat();
      cache.set(key, obj);
    }

    this.viewModel.set('dataType', columnComponentModel.get('dataType').toLowerCase());
  } else {
    columnGroup = columnComponentModel.parent.columnGroups.findWhere({
      id: currentApplyTo
    });
    key = cache.createKey(currentApplyTo, columnGroup, true);

    if (cache.get(key) === null) {
      obj = columnGroup.format.toJSON();
      obj.pattern = columnGroup.format.toJiveFormat();
      cache.set(key, obj);
    }

    this.viewModel.set('dataType', columnGroup.get('dataType').toLowerCase());
  }

  this.model.reset().set(cache.get(key));
}

function onDataTypeChange() {
  var columnModel = this.columnComponentModel,
      defaults = this.viewModel.defaults(),
      dataType = this.viewModel.get('dataType');

  if (!columnModel) {
    return;
  }

  this.viewModel.set('patterns', columnModel.parent.config.genericProperties.patterns[dataType] || []);
  this.viewModel.set('hasPercentage', defaults.hasPercentage);
  this.viewModel.set('hasComma', defaults.hasComma);
  this.viewModel.set('currencySymbol', defaults.currencySymbol);
}

function updateApplyToOptions() {
  var self = this,
      columnModel = this.columnComponentModel,
      columnIndex = columnModel.get('columnIndex'),
      columnGroups = columnModel.parent.columnGroups,
      options = [],
      groupHeadingOptions = [],
      groupSubTotalsOptions = [],
      totalsOptions = [];
  columnModel.get('canFormatHeading') && options.push({
    value: 'heading',
    label: this.i18n['net.sf.jasperreports.components.headertoolbar.applyto.option.headings']
  });
  columnGroups.each(function (group) {
    if (_.indexOf(group.get('forColumns'), columnIndex) != -1) {
      if (group.get('groupType') === 'groupheading') {
        groupHeadingOptions.push({
          value: group.get('id'),
          label: group.get('groupName') + ' ' + self.i18n['net.sf.jasperreports.components.headertoolbar.groupheading.prefix']
        });
      } else if (group.get('groupType') === 'groupsubtotal') {
        groupSubTotalsOptions.push({
          value: group.get('id'),
          label: group.get('groupName') + ' ' + self.i18n['net.sf.jasperreports.components.headertoolbar.groupsubtotal.prefix']
        });
      } else if (group.get('groupType') === 'tabletotal') {
        totalsOptions.push({
          value: group.get('id'),
          label: self.i18n['net.sf.jasperreports.components.headertoolbar.applyto.option.tabletotal']
        });
      }
    }
  });
  options.push.apply(options, groupHeadingOptions);
  options.push({
    value: 'detailrows',
    label: this.i18n['net.sf.jasperreports.components.headertoolbar.applyto.option.detailrows']
  });
  options.push.apply(options, groupSubTotalsOptions);
  options.push.apply(options, totalsOptions);
  this.viewModel.set('applyToOptions', options); // try to keep the same applyTo across columns
  // try to keep the same applyTo across columns

  var previousApplyTo = this.viewModel.previous('applyTo');

  if (previousApplyTo) {
    this.viewModel.set('applyTo', null, {
      silent: true
    });

    if (_.findWhere(options, {
      value: previousApplyTo
    })) {
      this.viewModel.set('applyTo', previousApplyTo);
    } else {
      this.viewModel.set('applyTo', options[0].value === 'heading' ? 'heading' : 'detailrows');
    }
  } else {
    this.viewModel.set('applyTo', options[0].value === 'heading' ? 'heading' : 'detailrows');
  }
}

function cacheCurrentModel() {
  var applyTo = this.viewModel.get('applyTo'),
      key;

  if (applyTo === 'heading' || applyTo === 'detailrows') {
    key = this.cache.createKey(applyTo, this.columnComponentModel);
  } else {
    key = this.cache.createKey(applyTo, this.columnComponentModel.parent.columnGroups.findWhere({
      id: applyTo
    }), true);
  }

  this.cache.set(key, this.model.toJSON());
}

var TableFormatViewModel = Epoxy.Model.extend({
  defaults: function defaults() {
    return {
      dataType: 'text',
      fontSizes: [],
      fontNames: [],
      patterns: [],
      applyToOptions: [],
      applyTo: null,
      hasPercentage: false,
      hasComma: false,
      currencySymbol: 'LOCALE_SPECIFIC'
    };
  },
  computeds: {
    //getNumericTypeVisibility: function() {
    //    return this.get("dataType") === "numeric" ? "visible" : "hidden";
    //},
    hasPattern: function hasPattern() {
      var dataType = this.get('dataType');
      return dataType === 'numeric' || dataType === 'date' || dataType === 'time';
    },
    hasHeading: function hasHeading() {
      return this.get('applyTo') === 'heading';
    }
  },
  reset: function reset() {
    this.clear({
      silent: true
    }).set(this.defaults());
    return this;
  },
  remove: function remove() {}
});
module.exports = TableCommonFormatView.extend({
  events: {
    'click .jive_inputbutton[name=\'increaseDecimalsBtn\']': '_addDecimal',
    'click .jive_inputbutton[name=\'decreaseDecimalsBtn\']': '_removeDecimal',
    'click .jive_inputbutton[name=\'currencyBtn\']': '_showCurrencyMenu'
  },
  el: function el() {
    return _.template(tableFormatTemplate, {
      i18n: this.i18n
    });
  },
  initialize: function initialize() {
    this.model = new TableFormatModel();
    this.viewModel = new TableFormatViewModel();
    this.cache = new FormatModelCache();
    this.listenTo(this.viewModel, 'change:applyTo', _.bind(onApplyToChange, this));
    this.listenTo(this.viewModel, 'change:hasPercentage', this._togglePercentageFormat);
    this.listenTo(this.viewModel, 'change:hasComma', this._toggleCommaFormat);
    this.listenTo(this.viewModel, 'change:dataType', _.bind(onDataTypeChange, this));
    this.on('tabSwitched', function () {
      cacheCurrentModel.call(this);
    });
    Epoxy.View.prototype.initialize.apply(this, arguments);

    this._initCurrencyContextMenu();
  },
  bindingHandlers: _.extend({
    transformedPatterns: function transformedPatterns($element, patterns) {
      var html = '';

      _.each(patterns, function (pattern) {
        html += _.template(basicOptionTemplate, {
          value: pattern.key,
          text: pattern.val
        });
      });

      $element.html(html);
    },
    groupedOptions: function groupedOptions($element, allFonts) {
      var self = this,
          html = '';

      if (allFonts.extension) {
        _.each(allFonts.extension, function (element, index, list) {
          html += _.template(groupOptionTemplate, {
            start: index === 0,
            end: index == list.length - 1,
            label: self.view.i18n['net.sf.jasperreports.components.headertoolbar.label.extfonts'],
            value: element,
            text: element
          });
        });
      }

      if (allFonts.system) {
        _.each(allFonts.system, function (element, index, list) {
          html += _.template(groupOptionTemplate, {
            start: index === 0,
            end: index == list.length - 1,
            label: self.view.i18n['net.sf.jasperreports.components.headertoolbar.label.sysfonts'],
            value: element,
            text: element
          });
        });
      }

      $element.html(html);
    },
    nonGroupedOptions: function nonGroupedOptions($element, allSizes) {
      var html = "";

      if (allSizes) {
        _.each(allSizes, function (element, index, list) {
          html += _.template(basicOptionTemplate, {
            value: element,
            text: element
          });
        });
      }

      $element.html(html);
    }
  }, TableCommonFormatView.prototype.bindingHandlers),
  bindingFilters: {
    customDecimal: {
      get: function get(value) {
        var ret = parseFloat(value);
        return !_.isNaN(ret) ? ret : null;
      },
      set: function set(value) {
        var ret = parseFloat(value);
        return !_.isNaN(ret) ? ret : null;
      }
    }
  },
  computeds: {
    isDuration: function isDuration() {
      return jiveDataConverter.DURATION_PATTERN === this.getBinding('pattern');
    },
    getNumericTypeVisibility: function getNumericTypeVisibility() {
      var isNumeric = this.getBinding('dataType') === 'numeric',
          isDuration = jiveDataConverter.DURATION_PATTERN === this.getBinding('pattern');
      return isNumeric && !isDuration ? 'visible' : 'hidden';
    }
  },
  setColumnComponentModel: function setColumnComponentModel(columnComponentModel, isUpdate) {
    var viewModel = this.viewModel;

    if (isUpdate) {
      cacheCurrentModel.call(this);
    } else {
      this.cache.clear();
      viewModel.reset();
      viewModel.set('fontSizes', columnComponentModel.parent.config.genericProperties.fontSizes);
      viewModel.set('fontNames', columnComponentModel.parent.config.genericProperties.fonts);
    }

    this.columnComponentModel = columnComponentModel;
    updateApplyToOptions.call(this);
    this.removeBindings();
    this.applyBindings();
  },
  getActions: function getActions() {
    var cache = this.cache,
        actions = [],
        obj;
    cacheCurrentModel.call(this);

    _.each(cache.map, function (cacheEntry, key) {
      var testModel = new Backbone.Model(cacheEntry.original),
          keyInfo;
      testModel.set(cacheEntry.current);

      if (testModel.hasChanged()) {
        keyInfo = cache.keyInfo[key];

        if (keyInfo.applyTo === 'heading') {
          keyInfo.model.updateFromReportComponentObject({
            label: cacheEntry.current.columnLabel,
            headingFormat: cacheEntry.current
          });
          actions.push(keyInfo.model.actions['change:headingFormat'].call(keyInfo.model));
        } else if (keyInfo.applyTo === 'detailrows') {
          obj = cacheEntry.current;
          obj.pattern = NumberFormatPatternUtil.jivePatternToSchemaPattern(obj.pattern, keyInfo.model.get('dataType').toLowerCase());
          keyInfo.model.updateFromReportComponentObject({
            detailsRowFormat: obj
          });
          actions.push(keyInfo.model.actions['change:detailsRowFormat'].call(keyInfo.model));
        } else {
          obj = cacheEntry.current;
          obj.pattern = NumberFormatPatternUtil.jivePatternToSchemaPattern(obj.pattern, keyInfo.model.get('dataType').toLowerCase());
          keyInfo.model.updateFromReportComponentObject({
            format: obj
          });
          actions.push(keyInfo.model.actions['change:format'].call(keyInfo.model));
        }
      }
    });

    return actions;
  },
  _initCurrencyContextMenu: function _initCurrencyContextMenu() {
    var self = this,
        options = [{
      label: this.i18n['net.sf.jasperreports.components.headertoolbar.label.currency.none'],
      action: 'none',
      symbol: null
    }, {
      label: this.i18n['net.sf.jasperreports.components.headertoolbar.label.localespecific'],
      action: 'localeSpecific',
      symbol: 'LOCALE_SPECIFIC'
    }, {
      label: currencyMap['USD'] + ' - USD',
      action: 'usd',
      symbol: 'USD'
    }, {
      label: currencyMap['EUR'] + ' - EUR',
      action: 'eur',
      symbol: 'EUR'
    }, {
      label: currencyMap['GBP'] + ' - GBP',
      action: 'gbp',
      symbol: 'GBP'
    }, {
      label: currencyMap['YEN'] + ' - YEN',
      action: 'yen',
      symbol: 'YEN'
    }];
    this.currencyMenu = new ContextMenu(options, {
      menuContainerTemplate: currencyMenuTemplate,
      menuOptionTemplate: currencyOptionTemplate
    });

    _.each(options, function (option) {
      self.listenTo(self.currencyMenu, 'option:' + option.action, self._applyCurrencyFormat);
    });
  },
  _togglePercentageFormat: function _togglePercentageFormat(evt) {
    var patterns = this.getBinding('patterns'),
        hasPercentage = this.getBinding('hasPercentage'),
        transformedPatterns = [];

    if (patterns.length) {
      _.each(patterns, function (pattern) {
        // skip processing of duration pattern
        if (jiveDataConverter.DURATION_PATTERN === pattern.key) {
          transformedPatterns.push({
            key: pattern.key,
            val: pattern.val
          });
        } else {
          transformedPatterns.push({
            key: NumberFormatPatternUtil.addRemovePercentage(pattern.key, hasPercentage),
            val: NumberFormatPatternUtil.addRemovePercentageForNumber(pattern.val, hasPercentage)
          });
        }
      });

      this.setBinding('patterns', transformedPatterns);
    }
  },
  _toggleCommaFormat: function _toggleCommaFormat(evt) {
    var patterns = this.getBinding('patterns'),
        hasComma = this.getBinding('hasComma'),
        transformedPatterns = [];

    if (patterns.length) {
      _.each(patterns, function (pattern) {
        // skip processing of duration pattern
        if (jiveDataConverter.DURATION_PATTERN === pattern.key) {
          transformedPatterns.push({
            key: pattern.key,
            val: pattern.val
          });
        } else {
          transformedPatterns.push({
            key: NumberFormatPatternUtil.addRemoveThousandsSeparator(pattern.key, hasComma),
            val: NumberFormatPatternUtil.addRemoveThousandsSeparator(pattern.val, hasComma)
          });
        }
      });

      this.setBinding('patterns', transformedPatterns);
    }
  },
  _addDecimal: function _addDecimal(evt) {
    var patterns = this.getBinding('patterns'),
        transformedPatterns = [];

    if (patterns.length) {
      _.each(patterns, function (pattern) {
        // skip processing of duration pattern
        if (jiveDataConverter.DURATION_PATTERN === pattern.key) {
          transformedPatterns.push({
            key: pattern.key,
            val: pattern.val
          });
        } else {
          transformedPatterns.push({
            key: NumberFormatPatternUtil.addRemoveDecimalPlace(pattern.key, true),
            val: NumberFormatPatternUtil.addRemoveDecimalPlace(pattern.val, true)
          });
        }
      });

      this.setBinding('patterns', transformedPatterns);
    }
  },
  _removeDecimal: function _removeDecimal(evt) {
    var patterns = this.getBinding('patterns'),
        transformedPatterns = [];

    if (patterns.length) {
      _.each(patterns, function (pattern) {
        // skip processing of duration pattern
        if (jiveDataConverter.DURATION_PATTERN === pattern.key) {
          transformedPatterns.push({
            key: pattern.key,
            val: pattern.val
          });
        } else {
          transformedPatterns.push({
            key: NumberFormatPatternUtil.addRemoveDecimalPlace(pattern.key, false),
            val: NumberFormatPatternUtil.addRemoveDecimalPlace(pattern.val, false)
          });
        }
      });

      this.setBinding('patterns', transformedPatterns);
    }
  },
  _applyCurrencyFormat: function _applyCurrencyFormat(view, model) {
    var previousSymbol = this.getBinding('currencySymbol'),
        currentSymbol = model.get('symbol'),
        patterns = this.getBinding('patterns'),
        transformedPatterns = [];

    if (patterns.length) {
      _.each(patterns, function (pattern) {
        // skip processing of duration pattern
        if (jiveDataConverter.DURATION_PATTERN === pattern.key) {
          transformedPatterns.push({
            key: pattern.key,
            val: pattern.val
          });
        } else {
          if (previousSymbol) {
            pattern.key = NumberFormatPatternUtil.addRemoveCurrencySymbol(pattern.key, false, currencyMap[previousSymbol]);
            pattern.val = NumberFormatPatternUtil.addRemoveCurrencySymbol(pattern.val, false, currencyMap[previousSymbol]);
          }

          if (currentSymbol) {
            transformedPatterns.push({
              key: NumberFormatPatternUtil.addRemoveCurrencySymbol(pattern.key, true, currencyMap[currentSymbol]),
              val: NumberFormatPatternUtil.addRemoveCurrencySymbol(pattern.val, true, currencyMap[currentSymbol])
            });
          } else if (previousSymbol) {
            transformedPatterns.push(pattern);
          }
        }
      });

      if (transformedPatterns.length) {
        this.setBinding('patterns', []);
        this.setBinding('patterns', transformedPatterns);
      }
    }

    this.setBinding('currencySymbol', currentSymbol);
  },
  _showCurrencyMenu: function _showCurrencyMenu(evt) {
    var target = this.$(evt.currentTarget),
        offset = target.offset();
    evt.preventDefault();
    evt.stopPropagation();
    this.currencyMenu.show({
      top: offset.top + target.height(),
      left: offset.left
    });
  },
  clear: function clear() {
    this.cache.clear();
  },
  remove: function remove() {
    Epoxy.View.prototype.remove.apply(this, arguments);
    this.model && this.model.remove();
    this.cache && this.cache.remove();
    this.viewModel && this.viewModel.remove();
    this.currencyMenu && this.currencyMenu.remove();
  }
});

});