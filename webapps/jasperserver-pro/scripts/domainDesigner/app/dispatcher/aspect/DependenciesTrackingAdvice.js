define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var dispatcherActionUtil = require("../../component/dependenciesInspector/convertor/util/dispatcherActionUtil");

var applicationStateEventsEnum = require("../enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DependenciesTrackingAdvice = function DependenciesTrackingAdvice(options) {
  this.initialize(options);
};

_.extend(DependenciesTrackingAdvice.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    options = options || {};

    _.bindAll(this, 'interceptDispatcherAction');

    this.entityCollector = options.entityCollector;
    this.dependenciesConverter = options.dependenciesConverter;
    this.dependenciesInspectorApplication = options.dependenciesInspectorApplication;
    this.applicationStateActionsEnum = options.applicationStateActionsEnum;
  },
  interceptDispatcherAction: function interceptDispatcherAction(dispatcherActionName, dispatcherActionFunctionToExecute) {
    var dispatcherActionPassedArguments = Array.prototype.slice.call(arguments, 2),
        dispatcherAction = _.extend({}, this.applicationStateActionsEnum[dispatcherActionName], {
      args: dispatcherActionPassedArguments,
      name: dispatcherActionName,
      func: dispatcherActionFunctionToExecute
    });

    var entities = this.entityCollector.collectAffectedEntities(dispatcherActionName, dispatcherActionPassedArguments);

    if (entities) {
      this._openDependenciesInspector({
        entities: entities,
        dispatcherAction: dispatcherAction
      });
    } else {
      this._executeAction(dispatcherAction);
    }
  },
  _executeAction: function _executeAction(dispatcherAction) {
    dispatcherAction.func.apply(null, dispatcherAction.args);
  },
  _openDependenciesInspector: function _openDependenciesInspector(options) {
    var dispatcherAction = options.dispatcherAction;
    var dependenciesGroups = this.dependenciesConverter.convert(options.entities, {
      targetEntityType: this._getTargetEntityType(dispatcherAction),
      targetEntitiesIds: this._getTargetEntitiesIds(dispatcherAction),
      isReplaceDataSource: applicationStateEventsEnum.REPLACE_DATA_SOURCE === dispatcherAction.event
    }) || {};

    var areBothGroupsEmpty = _.isEmpty(dependenciesGroups.leftGroup) && _.isEmpty(dependenciesGroups.rightGroup);

    if (areBothGroupsEmpty) {
      this._executeAction(dispatcherAction);
    } else {
      this.listenTo(this.dependenciesInspectorApplication, 'confirm', _.bind(this._onChangeConfirmed, this, dispatcherAction));
      this.listenTo(this.dependenciesInspectorApplication, 'reject', this._closeDependenciesInspector);
      this.dependenciesInspectorApplication.open(dependenciesGroups);
    }
  },
  _onChangeConfirmed: function _onChangeConfirmed(interceptedAction) {
    this._closeDependenciesInspector();

    this._executeAction(interceptedAction);
  },
  _closeDependenciesInspector: function _closeDependenciesInspector() {
    this.dependenciesInspectorApplication.close();
    this.stopListening(this.dependenciesInspectorApplication);
  },
  _getTargetEntityType: function _getTargetEntityType(dispatcherAction) {
    return dispatcherActionUtil.getTargetEntityType(dispatcherAction);
  },
  _getTargetEntitiesIds: function _getTargetEntitiesIds(dispatcherAction) {
    var targetEntitiesIds = dispatcherActionUtil.getTargetEntitiesIds(dispatcherAction);
    return _.reduce(targetEntitiesIds, function (memo, id) {
      memo[id] = true;
      return memo;
    }, {});
  }
});

module.exports = DependenciesTrackingAdvice;

});