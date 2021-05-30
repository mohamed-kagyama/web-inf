define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var InputControlModel = require('../model/InputControlModel');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("InputControlCollection");
module.exports = Backbone.Collection.extend({
  model: InputControlModel,
  _slaveICs: [],
  url: function url() {
    var resourceUri = this.stateModel.get('resource'),
        contextPath = this.stateModel.get('server');

    if (!resourceUri) {
      throw new Error('Resource URI is not specified.');
    }

    var url = contextPath ? contextPath[contextPath.length - 1] === '/' ? contextPath : contextPath + '/' : '';
    url += 'rest_v2/reports';
    url += resourceUri[0] === '/' ? resourceUri : '/' + resourceUri;
    url += resourceUri[resourceUri.length - 1] === '/' ? 'inputControls' : '/inputControls';
    return url;
  },
  initialize: function initialize(models, options) {
    options || (options = {});
    this.stateModel = options.stateModel;
    this.on('all', localLogger.debug, localLogger);
    this.on('changeState', this.onControlChange, this);
  },
  onControlChange: function onControlChange(control) {
    var options = {
      params: {}
    };
    var controlInCascade = !!control.get('slaveDependencies').length;

    if (controlInCascade) {
      //optimize changes in cascade
      var slaveControlIds = this._getAllSlaveControlIds(control.get('id')); // disable slave input controls while the parent is updating
      // disable slave input controls while the parent is updating


      this._slaveICs = slaveControlIds;

      this._disableSlaveICs();

      var parentControlIds = this._getParentControlIds(slaveControlIds);

      var controlsIds = _.union(slaveControlIds, parentControlIds);

      this.each(function (control) {
        if (_.contains(controlsIds, control.get('id')) && control.changed) {
          options.params[control.get('id')] = control.getData();
        }
      }); // TODO context ??
      // TODO context ??

      slaveControlIds = _.union(slaveControlIds, control.get('id'));
      this.updateState(options, slaveControlIds);
    } else {
      this.callCustomerChangeCallback();
    }
  },

  /**
       * Calls the custom 'change' callback each time the input controls changed their values
       */
  callCustomerChangeCallback: function callCustomerChangeCallback() {
    var events = this.stateModel.get('events'),
        data = {};

    if (_.isUndefined(events) || !_.isFunction(events['change'])) {
      return;
    }

    events['change'](this.getState(), this.validate());
  },

  /**
       * Returns ids of all immediate and transitive slave controls for given control
       * @param controlId id of given master control
       */
  _getAllSlaveControlIds: function _getAllSlaveControlIds(controlId) {
    var controlIds = [];
    var control = this.get(controlId);

    _.each(control.get('slaveDependencies'), function (slaveControlId) {
      controlIds.push(slaveControlId);
      controlIds.push.apply(controlIds, this._getAllSlaveControlIds(slaveControlId));
    }, this);

    return _.uniq(controlIds);
  },

  /**
       * Returns ids of parent controls for given control ids
       * @param controlIds
       */
  _getParentControlIds: function _getParentControlIds(controlIds) {
    var parentControlIds = [];

    _.each(controlIds, function (controlId) {
      var control = this.get(controlId);
      parentControlIds.push.apply(parentControlIds, control.get('masterDependencies'));
    }, this);

    return _.uniq(parentControlIds);
  },
  parse: function parse(response) {
    if (response) {
      if (response.inputControl && _.isArray(response.inputControl)) {
        return response.inputControl;
      }
    } else {
      return [];
    } // TODO check and revert (remove it)

    /*
        if (response && response.inputControlState && _.isArray(response.inputControlState)) {
            return _.map(response.inputControlState, function(state) {
                return {
                    id: state.id,
                    state: state
                };
            });
        }
    */
    // TODO check and revert (remove it)

    /*
        if (response && response.inputControlState && _.isArray(response.inputControlState)) {
            return _.map(response.inputControlState, function(state) {
                return {
                    id: state.id,
                    state: state
                };
            });
        }
    */


    throw new Error('Unable to parse response from server.');
  },
  fetch: function fetch(options) {
    options || (options = {});

    _.extend(options, {
      url: this.url(),
      reset: true
    });

    if (options.excludeState) {
      options.url += '?exclude=state';
    }

    return Backbone.Collection.prototype.fetch.call(this, options);
  },
  update: function update(options) {
    options || (options = {});

    if (_.isEmpty(options.params)) {
      throw new Error('Cannot update input controls without passed params');
    }

    _.extend(options, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(options.params),
      reset: true
    });

    return Backbone.Collection.prototype.fetch.call(this, options);
  },
  updateState: function updateState(options, controlIds) {
    options || (options = {});
    controlIds = controlIds || _.keys(options.params);
    options.url = this.url() + '/' + controlIds.join(';') + '/values';

    _.extend(options, {
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(options.params),
      reset: false,
      success: _.bind(this.parseUpdateState, this),
      error: _.bind(this._enableSlaveICs, this) // the only thing we are doing in the case of error is enabling disabled ICs

    });

    return Backbone.sync.call(this, 'read', this, options);
  },
  parseUpdateState: function parseUpdateState(response) {
    if (!response || !response.inputControlState || !_.isArray(response.inputControlState)) {
      throw new Error('Unable to parse response from server.');
    }

    _.each(response.inputControlState, this._parseState, this);

    this._enableSlaveICs();

    this.callCustomerChangeCallback();
  },
  getState: function getState() {
    var state = {};
    this.forEach(function (control) {
      state[control.get('id')] = control.getData();
    });
    return state;
  },
  validate: function validate() {
    var result = {};
    this.forEach(function (control) {
      if (control.state.get('error')) {
        result[control.get('id')] = control.state.get('error');
      }
    });
    return _.size(result) ? result : false;
  },
  _disableSlaveICs: function _disableSlaveICs() {
    this.trigger('disableICs', this._slaveICs);
  },
  _enableSlaveICs: function _enableSlaveICs() {
    this.trigger('enableICs', this._slaveICs);
  },
  _parseState: function _parseState(state) {
    var model = this.get(state.id);
    model && model.set('state', state);
  }
});

});