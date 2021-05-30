define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!AdHocBundle");

var Backbone = require('backbone');

var AdHocModel = require('./model/AdHocModel');

var Validation = require('./model/validators/Validation');

var ChartView = require('./chart/ChartView');

var TableView = require('./table/TableView');

var CrosstabView = require('./crosstab/CrosstabView');

var Overlay = require("runtime_dependencies/js-sdk/src/components/overlay/Overlay");

var Message = require("runtime_dependencies/js-sdk/src/components/message/Message");

var messageTypes = require("runtime_dependencies/js-sdk/src/components/message/enums/messageTypes");

var VisualChooserDialog = require('./visualChooser/VisualChooserDialog');

var template = require("text!./template/generalLayout.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ADHOC_CONTAINER_HEIGHT = 400;
var types = {
  table: TableView,
  chart: ChartView,
  crosstab: CrosstabView
};
var Facade = Backbone.View.extend({
  el: function el() {
    return $(template)[0];
  },
  events: {
    'click .jr-jAdhocLauncher': '_onVisualizationSwitcherClick',
    'mouseenter .jr-jAdhocLauncherButton': '_onMouseEnterVisualizationButton',
    'mouseleave .jr-jAdhocLauncherButton': '_onMouseLeaveVisualizationButton'
  },
  initialize: function initialize(instanceData, options) {
    _.bindAll(this, 'resize');

    this.instanceData = instanceData;
    this.options = instanceData.properties;
    this.stateModel = options.stateModel;
    this.container = this.options.container;
    this.$container = $(this.container);
    this.dataComponents = {}; // cleanup container before getting height
    // cleanup container before getting height

    this.$container.empty();
    this.$el.height(this.$container.height() ? '100%' : ADHOC_CONTAINER_HEIGHT);
    this.$el.children('.jr-jAdhocVizualization').height(this.$container.height() ? '100%' : ADHOC_CONTAINER_HEIGHT);
    this.$container[0] && this.$container.append(this.el);
    this.model = new AdHocModel({
      uri: this.options.resource
    }, {
      server: this.options.server
    });

    this._initalizeMainOverlay();

    this._initializeMessage();

    this.optionsValidators = Validation(this.model);
    this.$canvas = this.$('.jr-jAdhocVisualizationContainer');
    this.$title = this.$('.jr-jAdhocVisualizationTitle');
    this.$titleText = this.$('.jr-jAdhocVisualizationTitleText');
    this.$visualizationLauncher = this.$('.jr-jAdhocLauncher');
    this.$visualizationLauncherIcon = this.$('.jr-jAdhocLauncherIcon');
    this.$el.css({
      position: 'relative'
    });
    this.listenTo(this.model.dataSet, 'change:dataset', this._updateDisabledVisualizationTypes, this);
    this.listenTo(this.model.dataSet, 'error:dataset', this._showError, this);
    this.listenTo(this.model, 'data:available', function (componentId, componentModel) {
      this.dataComponents[componentId] = componentModel;
      this.instanceData.data = _.extend(this.instanceData.data, componentModel.toDataComponent());
    }, this);
    this.listenTo(this.model, 'component:error', this._showError, this);
  },
  visualChooserDialog: function visualChooserDialog() {
    if (!this._visualChooserDialog) {
      this._visualChooserDialog = new VisualChooserDialog();

      this._visualChooserDialog.on('visualizationTypeChange', this._onVisalizationTypeChange, this);
    }

    return this._visualChooserDialog;
  },
  _initalizeMainOverlay: function _initalizeMainOverlay() {
    this.loadingOverlay = new Overlay({
      el: this.$('.jr-jOverlay')
    });
    this.listenTo(this.stateModel, 'change:loadingOverlay', function () {
      if (this.stateModel.get('loadingOverlay')) {
        this.loadingOverlay.show();
      } else {
        this.loadingOverlay.hide();
      }
    }, this);
    this.listenTo(this.model, 'component:busy', function (show) {
      if (show) {
        this.loadingOverlay.show(200);
      } else {
        this.loadingOverlay.hide();
      }
    });
    this.stateModel.trigger('change:loadingOverlay');
  },
  _initializeMessage: function _initializeMessage() {
    this.message = new Message({
      title: null,
      text: null,
      type: messageTypes.Type.Error,
      visible: false
    });
    this.$('.jr-jAdhocMessage').append(this.message.el);
  },
  _onMouseEnterVisualizationButton: function _onMouseEnterVisualizationButton(event) {
    this.$(event.currentTarget).addClass('jr-isHovered');
  },
  _onMouseLeaveVisualizationButton: function _onMouseLeaveVisualizationButton(event) {
    this.$(event.currentTarget).removeClass('jr-isHovered');
  },
  _initComponentListeners: function _initComponentListeners() {
    var rootComponent = this.model.component;
    this.listenTo(rootComponent, 'change:showTitle', this._updateTitleVisibility, this);
    this.listenTo(rootComponent, 'change:title', this._updateTitleText, this);
    this.listenTo(rootComponent, 'change:visualizationType', this._onVisualizationTypeChanged, this);
  },
  _onVisualizationSwitcherClick: function _onVisualizationSwitcherClick() {
    this.visualChooserDialog().open();
  },
  _onVisalizationTypeChange: function _onVisalizationTypeChange(newType) {
    this.stateModel.set({
      loadingOverlay: true
    });

    this._hideError();

    this._manageComponentType(newType.type);

    this.options.canvas = {
      type: newType.type
    };
    this.component.render(this.$canvas).always(_.bind(this.stateModel.set, this.stateModel, {
      loadingOverlay: false
    }));
  },
  _updateTitleVisibility: function _updateTitleVisibility() {
    if (this.model.component.get('showTitle')) {
      this.$title.removeClass('jr-isHidden');
      this.$visualizationLauncher.removeClass('jr-isMinimized');
      this.$visualizationLauncherIcon.removeClass('jr-meatball');
      this.$visualizationLauncherIcon.addClass('jr-chartColumn');
    } else {
      this.$title.addClass('jr-isHidden');
      this.$visualizationLauncher.addClass('jr-isMinimized');
      this.$visualizationLauncherIcon.addClass('jr-meatball');
      this.$visualizationLauncherIcon.removeClass('jr-chartColumn');
    }

    this._updateCanvasHeight();
  },
  _updateTitleText: function _updateTitleText() {
    this.$titleText.text(this.model.component.has('title') ? this.model.component.get('title') : '');

    this._updateCanvasHeight();
  },
  _updateCanvasHeight: function _updateCanvasHeight() {
    var height = (this.$container.height() || ADHOC_CONTAINER_HEIGHT) - parseFloat(this.$canvas.css('marginBottom'));

    if (this.model.component && this.model.component.get('showTitle')) {
      height -= this.$title.height() + parseFloat(this.$title.css('marginTop')) + parseFloat(this.$title.css('marginBottom'));
    }

    this.$canvas.height(height);
  },
  _applyProperties: function _applyProperties() {
    this.visualChooserDialog().setSelectedType(this.model.component.get('visualizationType'));

    this._updateDisabledVisualizationTypes();

    this.options.hasOwnProperty('showTitle') && this.model.component.set('showTitle', this.options.showTitle);
  },
  _onVisualizationTypeChanged: function _onVisualizationTypeChanged() {
    this.visualChooserDialog().setSelectedType(this.model.component.get('visualizationType'));
  },
  _updateDisabledVisualizationTypes: function _updateDisabledVisualizationTypes() {
    var disabledList = this.model.dataSet.query.getDisabledTypesList();
    this.visualChooserDialog().setDisabledTypes(disabledList);
  },
  _showError: function _showError(err) {
    var message = err && err.errorCode && i18n['adhoc.error.' + err.errorCode] ? format(i18n['adhoc.error.' + err.errorCode], err.parameters) : i18n['adhoc.error.unexpected.error'];
    this.$('.jr-jAdhocVizualization').addClass('jr-isHidden');
    this.$visualizationLauncher.addClass('jr-isHidden');
    this.message.model.set({
      text: message,
      visible: true
    });
    this.stateModel.set({
      loadingOverlay: false
    });
  },
  _hideError: function _hideError() {
    this.$('.jr-jAdhocVizualization').removeClass('jr-isHidden');
    this.$visualizationLauncher.removeClass('jr-isHidden');
    this.message.model.set({
      visible: false
    });
  },
  _fetchModels: function _fetchModels(options, model) {
    var self = this,
        dfd = $.Deferred(),
        resolve = _.bind(dfd.resolve, dfd),
        reject = _.bind(dfd.reject, dfd);

    model.metadata().fail(function (err) {
      self._showError(err);

      reject.apply(this, arguments);
    }).done(function () {
      var error = self.optionsValidators.validate(options);

      if (error) {
        self.component || self._showError(error);
        reject(error);
      } else {
        options.params && model.dataSet.query.parameters.set(options.params);
        resolve();
      }
    });
    return dfd.promise();
  },
  _manageComponentType: function _manageComponentType(type) {
    var newComponent;

    if (this.component) {
      // check if current component can handle new visualization type
      // if not, then we have to create a new component
      if (this.component.isAcceptable(type)) {
        this.model.component.set({
          visualizationType: type
        });
      } else {
        newComponent = createComponent.call(this, type);
        this.component.remove();
        this.component = newComponent;
        this.model.component.set({
          visualizationType: type
        });
      }
    } else {
      this.component = createComponent.call(this);
      this.model.component.set({
        visualizationType: type
      });
    }
  },
  _checkAutoresize: function _checkAutoresize() {
    var fn = this.stateModel.get('autoresize') ? 'on' : 'off';
    $(window)[fn]('resize', this.resize);
  },
  ////////////////////////////////////////////
  //                API Methods
  //////////////////////////////////////////// s

  /**
       * Perform main action for bi component
       * Callbacks will be attached to  deferred object.
       *
       * @param {Deferred} dfd - optional. Deferred to be controlled by view
       * @return {Deferred} dfd
       */
  run: function run(extDfd) {
    var self = this,
        dfd = extDfd || new $.Deferred();
    dfd.fail(function () {
      self.stateModel.set('loadingOverlay', false);
    });
    this.stateModel.set('loadingOverlay', true);

    this._hideError();

    this._checkAutoresize();

    this._fetchModels(this.options, this.model).done(function () {
      self.render().done(function () {
        dfd.resolve({
          metadata: self.instanceData.data.metadata,
          _dataset_internal_: self.model.dataSet.toDataComponent()._dataset_internal_
        });
      }).fail(_.bind(dfd.reject, dfd));
    }).fail(_.bind(dfd.reject, dfd));

    return dfd.promise();
  },

  /**
       * Render AdHocView to container, previously specified in property.
       * @return {Deferred} dfd
       */
  render: function render(extDfd) {
    var self = this,
        type;
    extDfd || (extDfd = new $.Deferred());

    this._initComponentListeners();

    this._updateTitleText();

    this._updateTitleVisibility();

    this.model.metadata().done(function () {
      if (self.options.container) {
        //fail rendering if bundle loading failed
        self.model.bundles.bundle().fail(_.bind(extDfd.reject, extDfd));

        if (self.options.canvas && self.options.canvas.type) {
          self._manageComponentType(self.options.canvas.type);
        }

        if (!self.component) {
          self.component = createComponent.call(self);
        }

        self.component.render(self.$canvas).done(_.bind(extDfd.resolve, extDfd)).fail(_.bind(extDfd.reject, extDfd));

        self._applyProperties();
      } else {
        if (self.component) {
          self.component.remove();
          delete self.component;
        }

        self.model.dataSet.data().done(_.bind(extDfd.resolve, extDfd)).fail(_.bind(extDfd.reject, extDfd));
      }
    });
    return extDfd.promise();
  },

  /**
       * Cancel all execution, destroy AdHocView representation if any, leave only
       * properties
       */
  destroy: function destroy(dfd) {
    this.remove();

    if (this.model.dataSet.isNew()) {
      dfd.resolve();
    } else {
      this.model.dataSet.destroy({
        success: _.bind(dfd.resolve, dfd),
        error: _.bind(dfd.reject, dfd)
      });
    }
  },
  refresh: function refresh(extDfd) {
    var dfd = extDfd || new $.Deferred();

    if (this.component && !this.component.options.params) {
      this._hideError();

      this.component.refresh(dfd);
    } else {
      this.run(dfd);
    }

    return dfd.promise();
  },
  resize: function resize() {
    this._updateCanvasHeight();

    this.component && this.component.resize();
  },
  remove: function remove() {
    this.loadingOverlay.remove();
    this.component || this.component.remove();
    return Backbone.View.prototype.remove.apply(this, arguments);
  }
});
module.exports = Facade;

function format(result, params) {
  params && _.each(params, function (value, idx) {
    result = result.replace('{' + idx + '}', value);
  });
  return result;
}

function createComponent(desiredType) {
  var type, component;
  desiredType || (desiredType = this.options.canvas && this.options.canvas.type);

  if (desiredType) {
    type = types[desiredType.toLowerCase()] || ChartView;
  } else {
    type = this.model.component.components.reduce(function (memo, component) {
      return memo || component.componentType && types[component.componentType];
    }, false);
  }

  component = new type({
    dataModel: this.model,
    options: this.options
  });
  return component;
}

});