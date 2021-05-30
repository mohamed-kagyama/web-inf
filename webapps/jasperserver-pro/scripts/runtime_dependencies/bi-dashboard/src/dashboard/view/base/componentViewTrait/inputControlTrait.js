define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var InputControlCollection = require("runtime_dependencies/bi-control/src/bi/control/collection/InputControlCollection");

var InputControlCollectionView = require("runtime_dependencies/bi-control/src/bi/control/view/InputControlCollectionView");

var ReportsParametersCollection = require('../../../collection/ReportsParametersCollection');

var InputControlPropertiesModel = require("runtime_dependencies/bi-control/src/bi/control/model/InputControlPropertiesModel");

var inputControlWrapperTemplate = require("text!../../../template/inputControlWrapperTemplate.htm");

var dashboardSettings = require('../../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 *
 *
 * @author: Kostiantyn Tsaregradskyi
 * @version: $Id$
 */
var ParametersCache = ReportsParametersCollection.instance;

function extractValuesFromRawState(state) {
  return !state.options ? _.isArray(state.value) ? state.value.length <= 1 ? state.value[0] : [state.value] : state.value : _.reduce(state.options, function (memo, option) {
    option.selected && memo.push(option.value);
    return memo;
  }, []);
}

function updateRawState(state, value) {
  if (_.isUndefined(state.options)) {
    state.value = value;
  } else {
    value = _.isArray(value) ? value : [value];

    _.each(state.options, function (option) {
      option.selected = _.contains(value, option.value);
    });
  }
}

function areAllChangedParametersDirect(changed, direct) {
  return !_.find(changed, function (cnd) {
    return _.indexOf(direct, cnd) === -1;
  });
}

module.exports = {
  template: _.template(inputControlWrapperTemplate),
  _onViewInitialize: function _onViewInitialize() {
    this.$el.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE, this.model.get("id"));
    this.paramsModel = this.model.paramsModel;
    this.paramsModel.set(this.model.get("params"), {
      silent: true
    });

    _.bindAll(this, "notify");

    this.listenTo(this.model, "change:value", function () {
      if (!this._skipUISync) {
        var value = this.model.get("value"),
            control = this.inputControlCollection.at(0);
        control.changeState(control.state.isValue && !_.isUndefined(value) ? value[0] : value);
      }
    }, this);
    this.listenTo(this.model, "signal", function (payload) {
      if (_.isUndefined(payload.value)) {
        // components file content is updated before this, so its required to update it again.
        // "changedControlProperties" event will be triggered
        this.paramsModel.unset(payload.name, {
          trigger: true
        });
      } else {
        // the value should be unset to make sure that the event will be triggered anyway
        // handles case, when value is the same, for instance "~NOTHING~", but since it was updated it still requires cascade action
        this.paramsModel.unset(payload.name, {
          silent: true
        });
        this.paramsModel.set(payload.name, payload.value);
      }
    });
    this.listenTo(this.paramsModel, "change", function (model, options) {
      this.model.isCascadeEnabled && this._onInputParametersChange(model, options);
    });
  },
  _initComponent: function _initComponent() {
    this.inputControlPropertiesModel = new InputControlPropertiesModel({
      resource: this.model.getOwnerUri(),
      server: dashboardSettings.CONTEXT_PATH
    });
    this.inputControlCollection = new InputControlCollection([], {
      stateModel: this.inputControlPropertiesModel
    });
    this.component = new InputControlCollectionView({
      collection: this.inputControlCollection,
      stateModel: this.inputControlPropertiesModel
    });
    this.component.setContainer(this.$el);
    this.listenTo(this.inputControlCollection, "changeState change:state", this.notify); // Workaround for IC service to work correctly in case if some controls were not added

    var name = this.model.getOwnerParameterName();

    this.inputControlCollection._parseState = function (state) {
      if (state.id === name) {
        var model = this.get(state.id);

        if (model) {
          model.unset("state", {
            silent: true
          });
          model.set("state", state);
        }
      }
    };
  },
  _onInputParametersChange: function _onInputParametersChange(model, options) {
    var changedParameters,
        directParameters,
        ownerParameterName,
        params,
        parent,
        self = this;
    this.model.set("params", this.paramsModel.attributes);

    if (options && options.trigger) {
      this.model.collection.trigger("changedControlProperties", this.model);
    }

    changedParameters = _.keys(model.changed);
    directParameters = this.getDirectParameters();

    if (areAllChangedParametersDirect(changedParameters, directParameters)) {
      ownerParameterName = this.model.getOwnerParameterName();
      params = this.paramsModel.toJSON();
      parent = this.model.getParent();

      if (parent) {
        this.model.getParent().trigger("beforeChildUpdate", this);
      }

      var ownerParameterNameProp = {};
      ownerParameterNameProp[ownerParameterName] = this.model.get("value");
      params = _.extend({}, params, ownerParameterNameProp);
      this.inputControlCollection.updateState({
        params: params
      }).done(function () {
        self.model.applyDeferredValue();
      }).always(function () {
        self.model.getParent() && self.model.getParent().trigger("afterChildUpdate", self);
      });
    }
  },
  _resizeComponent: function _resizeComponent() {
    if (this.inputControlCollection.length > 0) {
      var controlId = this.inputControlCollection.at(0).id,
          controlView = this.component.controlViews[controlId] || {};
      controlView.resize && controlView.resize();
    }
  },
  _renderComponent: function _renderComponent() {
    this.reset();
  },
  _removeComponent: function _removeComponent() {
    this.component.remove();
  },
  reset: function reset() {
    var collection = this.inputControlCollection,
        self = this,
        inputControlComponentModel = this.model;
    ParametersCache.getInputControlAsParameter(this.model.getOwnerUri(), this.model.getOwnerParameterName(), {
      full: this.model.get("fullCollectionRequired")
    }).done(function (control) {
      var previousControl = collection.findWhere({
        id: control.id
      }),
          isModelSet = collection.models && collection.models.length > 0,
          isCurrentControlTypeSame = previousControl && control.type === previousControl.get("type");

      if (isModelSet && isCurrentControlTypeSame) {
        var model = collection.models[0];

        if (!(model.state.isValue = !control.state.options) && model.state.options.models && model.state.options.models.length !== control.state.options.length) {
          model.state.set("options", control.state.options);
        }

        var extractedValuesFromState = extractValuesFromRawState(control.state);
        model.changeState(extractedValuesFromState);
      } else {
        var preparedControl = _.extend({}, control, {
          label: inputControlComponentModel.get("label") || control.label,
          slaveDependencies: []
        });

        if (self.model.has("value")) {
          updateRawState(preparedControl.state, self.model.get("value"));
        }

        collection.reset([preparedControl]);
      }

      self.ready.resolve();
    }).fail(function () {
      self.ready.resolve();
    });
  },
  getDirectParameters: function getDirectParameters() {
    var result = [].concat(this.model.get("masterDependencies")),
        ownersUri = this.model.getOwnerUri(),
        ownersControls = this.model.collection.filter(function (component) {
      return component.getOwnerUri && !_.isUndefined(ownersUri) && component.getOwnerUri() === ownersUri;
    });

    _.each(this.model.get("masterDependencies"), function (id) {
      var parentControl = _.find(ownersControls, function (control) {
        return control.getOwnerParameterName() === id;
      });

      if (parentControl) {
        result = _.difference(result, parentControl.get("masterDependencies"));
      }
    });

    return result;
  },
  notify: function notify() {
    this._skipUISync = true;
    this.model.acceptControlState(this.inputControlCollection.models[0].state);
    this._skipUISync = false;
  },

  /**
   * @description Adds overlay for input control element.
   * @memberof inputControlTrait
   */
  addOverlay: function addOverlay() {
    if (!this.$overlay) {
      this.$overlay = $("<div></div>").addClass("overlay");
      this.$el.prepend(this.$overlay);
    }
  }
};

});