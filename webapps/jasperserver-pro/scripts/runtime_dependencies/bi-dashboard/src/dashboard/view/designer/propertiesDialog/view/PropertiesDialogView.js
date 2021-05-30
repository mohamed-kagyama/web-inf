define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var epoxyViewMixin = require("runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin");

var _ = require('underscore');

var $ = require('jquery');

var Panel = require("runtime_dependencies/js-sdk/src/common/component/panel/Panel");

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

var scaleStrategies = require("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies");

var dashboardComponentTypes = require('../../../../enum/dashboardComponentTypes');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var propertiesDialogTabsFactory = require('../../../../factory/propertiesDialogTabsFactory');

var propertiesPanelTemplate = require("text!../../../../template/properties/propertiesPanelTemplate.htm");

var propertiesPanelTabButtonTemplate = require("text!../../../../template/properties/propertiesPanelTabButtonTemplate.htm");

var availableParametersTemplate = require("text!../../../../template/properties/controls/availableParametersTemplate.htm");

var sidebarTreeLeafTooltipTemplate = require("text!../../../../template/tooltip/sideBarTreeLeafTooltipTemplate.htm");

var tabbedPanelTrait = require("runtime_dependencies/js-sdk/src/common/component/panel/trait/tabbedPanelTrait");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var parameterExpressionAutocompletionMixin = require('../../../../view/mixin/parameterExpressionAutocompletionMixin');

var HyperlinkParametersSectionView = require('../../../../hyperlink/parameters/view/HyperlinkParametersSectionView');

var RepositoryChooserDialogFactory = require("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory");

var settings = require("settings!treeComponent");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function splitByDelimeters(string, index, dStart, dEnd, acc) {
  var begin = string.indexOf(dStart, index);

  if (begin < 0) {
    acc.push(string.substr(index));
  } else {
    acc.push(string.substring(index, begin));
    acc.push(dStart);
    splitByDelimeters(string, dStart.length + begin, dEnd, dStart, acc);
  }

  return acc;
}

function replacePropertyValues(parts, params, from, to) {
  var exprParts, done;

  for (var i = 2; i < parts.length; i += 4) {
    exprParts = smartSplit(parts[i]);
    done = false;

    for (var j = 0; !done && j < params.length; j++) {
      for (var k = 0; !done && k < exprParts.length; k++) {
        if ($.trim(exprParts[k]) === params[j][from]) {
          exprParts[k] = exprParts[k].replace(params[j][from], params[j][to]);
          done = true;
        }
      }
    }

    parts[i] = exprParts.join('');
  }

  return parts.join('');
}

function smartSplit(expression) {
  var exprParts = [],
      acc = [],
      isInLiteral = false;

  for (var i = 0; i < expression.length; i++) {
    if (expression[i] === '"' && (!expression[i - 1] || expression[i - 1] !== '\\')) {
      isInLiteral = !isInLiteral;
    }

    if (!isInLiteral && (expression[i] === ',' || expression[i] === '?')) {
      exprParts.push(acc.join(''));
      exprParts.push(expression[i]);
      acc = [];
    } else {
      acc.push(expression[i]);
    }
  }

  exprParts.push(acc.join(''));
  return exprParts;
} //show hyperlinks tab only for AdHoc, Text and Image dashlet types.


var updateDialogAppearance = function updateDialogAppearance() {
  if (_.size(this.tabs) > 1) {
    this.$contentContainer.addClass('bordered');
    this.$('> .header').show();
  } else {
    this.$contentContainer.removeClass('bordered');
    this.$('> .header').hide();
  }
};

var PropertiesDialogView = Panel.extend({
  events: {
    'click button.showGoToFilterManagerConfirmationDialog': 'showGoToFilterManagerConfirmationDialog',
    'click button.showRepositoryChooserDialog': 'showRepositoryChooserDialog',
    'click button.showRepositoryChooserFileDialog': 'showRepositoryChooserFileDialog'
  },
  bindingFilters: {
    scaleStrategy: function scaleStrategy(rawValue) {
      var val = Number(rawValue); // if scale strategy is scaling factor represented by number - convert it to Number
      // if scale strategy is scaling factor represented by number - convert it to Number

      return isNaN(val) ? rawValue : val;
    }
  },
  computeds: {
    fitToDashlet: {
      deps: ['scaleToFit'],
      get: function get(scaleToFit) {
        return _.contains(_.values(scaleStrategies), scaleToFit);
      }
    },
    parameters: {
      deps: ['dashletHyperlinkUrl'],
      get: function get(dashletHyperlinkUrl) {
        if (!_.isUndefined(dashletHyperlinkUrl)) {
          var parts = splitByDelimeters(dashletHyperlinkUrl, 0, '$P{', '}', []);
          return replacePropertyValues(parts, this.getBinding('outputParameters') || [], 'id', 'label');
        }

        return '';
      },
      set: function set(value) {
        var parts,
            setValueObj = {},
            model = this.model;

        if (_.isUndefined(value)) {
          setValueObj['dashletHyperlinkUrl'] = value;
        } else {
          parts = splitByDelimeters(value, 0, '$P{', '}', []);
          setValueObj['dashletHyperlinkUrl'] = replacePropertyValues(parts, this.getBinding('outputParameters') || [], 'label', 'id');
        }

        this.setBinding('dashletHyperlinkUrl', setValueObj);
        model.validate && model.validate(setValueObj);
      }
    },
    dashletHyperlinkUrlVisible: {
      deps: ['exposeOutputsToFilterManager', 'dashletHyperlinkTarget'],
      get: function get(exposeOutputsToFilterManager, dashletHyperlinkTarget) {
        var dashletHyperlinkUrlVisible = exposeOutputsToFilterManager && dashletHyperlinkTarget !== '';
        dashletHyperlinkUrlVisible && this.model.validate({
          'dashletHyperlinkUrl': this.model.get('dashletHyperlinkUrl')
        });
        return dashletHyperlinkUrlVisible;
      }
    },
    adHocView: {
      get: function get() {
        return _.contains([dashboardComponentTypes.ADHOC_VIEW, dashboardComponentTypes.CHART, dashboardComponentTypes.TABLE, dashboardComponentTypes.CROSSTAB], this.model.get('type'));
      }
    }
  },

  /**
   * @constructor PropertiesDialogView
   * @extends Panel
   * @classdesc PropertiesDialogView - view with rivets and model state saving.
   */
  constructor: function constructor(options) {
    options || (options = {});
    Panel.call(this, _.extend({}, options, {
      traits: [tabbedPanelTrait],
      template: propertiesPanelTemplate,
      optionTemplate: propertiesPanelTabButtonTemplate,
      tabHeaderContainerSelector: '> .header > .tabSet',
      toggleClass: 'selected',
      tabs: propertiesDialogTabsFactory(options.model)
    }));
  },

  /**
   * @description initializes properties dialog view. Sets original, model, originalState properties. Listens to original model change event.
   * @param options - options which will be passed to ViewWithEpoxy
   * @param {string} options.template - template for your view.
   * @param {Backbone.Model} options.model - Backbone.Model instance.
   * @param {object} [options.i18n={}] - i18n object.
   */
  initialize: function initialize(options) {
    this.original = this.model;
    this.model = this.original.clone();
    this.originalState = this.model.clone();
    this.epoxifyView();
    Panel.prototype.initialize.apply(this, arguments);
    this.listenTo(this.original, 'change', this._onOriginalModelChange);
    this.listenTo(this.model, 'change:outputParameters', this.renderAvailableParameters);
    this.renderAvailableParameters();
    updateDialogAppearance.call(this);
    this.applyParameterExpressionAutocompletionMixin();
  },

  /**
   * @description on original model change handler. Sets model to original and validates it.
   * @access protected
   */
  _onOriginalModelChange: function _onOriginalModelChange() {
    var changedAttrs = this.original.changedAttributes();

    if (!changedAttrs) {
      return;
    }

    this.model.set(changedAttrs);
    this.model.validate(changedAttrs);

    if ('isAdhocChart' in changedAttrs) {
      updateDialogAppearance.call(this);
    }
  },
  open: function open() {
    Panel.prototype.open.apply(this, arguments);
    this.applyEpoxyBindings();
  },
  renderAvailableParameters: function renderAvailableParameters() {
    var self = this,
        type = this.model.get('type');

    if (type === dashboardComponentTypes.FREE_TEXT || type === dashboardComponentTypes.IMAGE) {
      if (!this.hyperlinkParametersSectionView) {
        this.hyperlinkParametersSectionView = new HyperlinkParametersSectionView();
        this.$('.hyperlinkParametersContainer').html(this.hyperlinkParametersSectionView.render().$el);
        this.listenTo(this.hyperlinkParametersSectionView.collection, 'add change remove', function () {
          self.model.set('outputParameters', self.hyperlinkParametersSectionView.toJSON(), {
            silent: true
          });
        });
      }

      this.hyperlinkParametersSectionView.reset(this.model.get('outputParameters'));
    } else {
      this.$('.availableParametersList').html(_.template(availableParametersTemplate, {
        outputParameters: this.model.get('outputParameters')
      }));
    }
  },
  showGoToFilterManagerConfirmationDialog: function showGoToFilterManagerConfirmationDialog() {
    if (!this._goToFilterManagerConfirmationDialog) {
      this._goToFilterManagerConfirmationDialog = new ConfirmationDialog({
        text: i18n['dashboard.component.dialog.properties.hyperlinks.go.to.filter.manager.confirmation']
      });
      this.listenTo(this._goToFilterManagerConfirmationDialog, 'button:yes', function () {
        this.trigger('saveAndGoToFilterManager', this);
      }, this);
    }

    this._goToFilterManagerConfirmationDialog.open();
  },
  showRepositoryChooserDialog: function showRepositoryChooserDialog() {
    var RepositoryChooserDialog;

    if (!this.repositoryChooserDialog) {
      RepositoryChooserDialog = RepositoryChooserDialogFactory.getDialog('item');
      this.repositoryChooserDialog = new RepositoryChooserDialog({
        treeBufferSize: parseInt(settings.treeLevelLimit, 10),
        title: i18n['dashboard.dialog.properties.repository.chooser.title'],
        resourcesTypeToSelect: [repositoryResourceTypes.DASHBOARD, repositoryResourceTypes.REPORT_UNIT, repositoryResourceTypes.ADHOC_DATA_VIEW],
        tooltipTemplate: sidebarTreeLeafTooltipTemplate,
        tooltipi18n: i18n2,
        cssClassItemProcessor: function cssClassItemProcessor(item) {
          switch (item.value.resourceType) {
            case repositoryResourceTypes.REPORT_UNIT:
              item.cssClass = 'dashboard-existingContent-report';
              break;

            case repositoryResourceTypes.ADHOC_DATA_VIEW:
              item.cssClass = 'dashboard-existingContent-adhoc-wide';
              break;

            case repositoryResourceTypes.DASHBOARD:
              item.cssClass = 'dashboard-existingContent-dashboard';
              break;
          }

          return item;
        }
      });
      this.listenTo(this.repositoryChooserDialog, 'close', function () {
        if (this.repositoryChooserDialog.selectedResource && this.repositoryChooserDialog.selectedResource.resourceUri) {
          var val = {
            dashletHyperlinkUrl: 'repo:' + this.repositoryChooserDialog.selectedResource.resourceUri
          };
          this.model.set(val);
          this.model.validate(val);
        }
      }, this);
    }

    this.repositoryChooserDialog.open();
  },
  showRepositoryChooserFileDialog: function showRepositoryChooserFileDialog() {
    if (!this.repositoryChooserFileDialog) {
      var RepositoryChooserDialog = RepositoryChooserDialogFactory.getDialog('item'),
          extensions = ['.pdf', '.docx', '.html', '.ods', '.odt', '.csv', '.pptx', '.rtf', '.xls', '.xlsx', '.svg', '.xml', '.jar', '.jrxml', '.cur', '.jrtx', '.properties', '.css', '.eot', '.ttf', '.woff'];
      this.repositoryChooserFileDialog = new RepositoryChooserDialog({
        title: i18n['dashboard.dialog.properties.repository.chooser.title'],
        treeBufferSize: parseInt(settings.treeLevelLimit, 10),
        resourcesTypeToSelect: ['img'],
        resourcesTypeToSelectTree: ['file'],
        tooltipTemplate: sidebarTreeLeafTooltipTemplate,
        tooltipi18n: i18n2,
        cssClassItemProcessor: function cssClassItemProcessor(item) {
          if (item.value.resourceType === repositoryResourceTypes.FILE && !_.find(extensions, function (ext) {
            return item.value.label.toLowerCase().endsWith(ext);
          })) {
            item.cssClass = 'dashboard-newContent-image';
          }

          return item;
        }
      });
      this.listenTo(this.repositoryChooserFileDialog, 'close', function () {
        if (this.repositoryChooserFileDialog.selectedResource && this.repositoryChooserFileDialog.selectedResource.resourceUri) {
          var val = {
            url: 'repo:' + this.repositoryChooserFileDialog.selectedResource.resourceUri
          };
          this.model.set(val);
          this.model.validate(val);
        }
      }, this);
    }

    this.repositoryChooserFileDialog.open();
  },
  remove: function remove() {
    this.removeEpoxyBindings();
    this._goToFilterManagerConfirmationDialog && this._goToFilterManagerConfirmationDialog.remove();
    this.repositoryChooserDialog && this.repositoryChooserDialog.remove();
    this.repositoryChooserFileDialog && this.repositoryChooserFileDialog.remove();
    Panel.prototype.remove.apply(this, arguments);
  }
});

_.extend(PropertiesDialogView.prototype, epoxyViewMixin, parameterExpressionAutocompletionMixin);

module.exports = PropertiesDialogView;

});