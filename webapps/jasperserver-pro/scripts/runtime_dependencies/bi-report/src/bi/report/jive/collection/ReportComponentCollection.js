define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var jiveTypes = require('../enum/jiveTypes');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var localLogger = logger.register("ReportComponentCollection");

function processLinkOptions(collection, linkOptions) {
  var processed = _.clone(linkOptions);

  if (linkOptions.events) {
    var newEvents = {};

    _.each(_.keys(linkOptions.events), function (key) {
      newEvents[key] = function (handler, collection) {
        return function (id, event) {
          handler.call(this, event, _.isObject(id) ? id : _.findWhere(collection.getLinks(), {
            id: id
          }));
        };
      }(linkOptions.events[key], collection);
    });

    processed.events = newEvents;
  }

  return processed;
}

module.exports = Backbone.Collection.extend({
  initialize: function initialize(models, options) {
    var self = this;
    this._rootParts = {};
    this.stateModel = options.stateModel;
    this.report = options.report;
    this.pageComponentsMeta = options.pageComponentsMeta;
    this.reportComponentsMeta = options.reportComponentsMeta;
    this.stateModel.get('linkOptions') && (this.linkOptions = processLinkOptions(this, this.stateModel.get('linkOptions')));
    this.listenTo(this.stateModel, 'change:linkOptions', function (model, value) {
      self.linkOptions = processLinkOptions(self, value);
    }); // very dirty hack for JIVE code

    this.on('change add reset remove', function () {
      _.each(jiveTypes, function (value) {
        self[value] = [];
      });

      self.forEach(function (componentModel) {
        self[componentModel.get('type')] && _.isArray(self[componentModel.get('type')]) && self[componentModel.get('type')].push(componentModel);
      });
    });
    this.on("reset add", function () {
      self.forEach(function (model) {
        if (model && model.get("type")) {
          if (model.get("type") === "bookmarks") {
            self.trigger("bookmarksReady", model.get("bookmarks"));
          }

          if (model.get("type") === "reportparts") {
            self.trigger("reportPartsReady", model.get("reportParts"));
          }
        }
      });
    });
  },
  registerPart: function registerPart(part) {
    if (part) {
      var parentId = part.get("parentId");

      if (parentId) {
        var parent = this._rootParts[parentId];

        if (parent && parent.registerPart) {
          localLogger.debug("Registering ".concat(part.get("type"), "(").concat(part.get("id"), ") to parent ").concat(parent.get("type"), "(").concat(parentId, ")!"));
          parent.registerPart(part);
        } else {
          localLogger.warn("Unable to register ".concat(part.get("type"), "(").concat(part.get("id"), ") to parent ").concat(parent.get("type"), "(").concat(parentId, ")!"));
        }
      } else if (part.has("id")) {
        localLogger.debug("Part ".concat(part.get("type"), "(").concat(part.get("id"), ") has no parent!"));
        this._rootParts[part.get("id")] = part;
      }
    }
  },
  fetch: function fetch() {
    var self = this,
        modules = [],
        metaModels = [],
        models = [],
        dfd = new $.Deferred();
    this.pageComponentsMeta.forEach(function (model) {
      if (!model.get('type')) {
        return;
      } // these modules could be paths in the components JSON or requirejs module mappings inside require.config.js


      model.get('type') === 'table' && modules.push('../model/TableComponentModel');
      model.get('type') === 'column' && modules.push('../model/ColumnComponentModel');
      model.get('type') === 'chart' && modules.push('runtime_dependencies/bi-chart/src/jr/jive/highcharts/model/ChartComponentModel');
      (model.get('type') === 'fusionChart' || model.get('type') === 'fusionMap' || model.get('type') === 'fusionWidget') && modules.push('../model/FusionComponentModel');
      model.get('type') === 'googlemap' && modules.push('../model/GooglemapComponentModel');
      model.get('type') === 'tibco-maps' && modules.push('../model/TibcomapComponentModel');
      model.get('type') === 'crosstab' && modules.push('../model/CrosstabComponentModel');
      model.get('type') === 'webfonts' && modules.push('../model/WebfontsComponentModel');
      model.get('type') === 'hyperlinks' && modules.push('../model/HyperlinksComponentModel');
      model.get('type') === 'bookmarks' && modules.push('../model/BookmarksComponentModel');
      model.get('type') === 'reportparts' && modules.push('../model/ReportPartsComponentModel');
      model.get('type') === 'CVComponent' && modules.push('../model/CustomComponentModel');
      metaModels.push(model.attributes);
    });

    require(modules, function () {
      var args = _.toArray(arguments),
          options = {
        parent: self.report,
        linkOptions: self.linkOptions,
        collection: self,
        parse: true
      };

      _.each(args, function (Module, index) {
        var instance = new Module(metaModels[index], options);
        models.push(instance);
        self.registerPart(instance);
      });

      self.reset(models);
      dfd.resolve();
    }, dfd.reject);

    return dfd;
  },
  fetchReportComponents: function fetchReportComponents() {
    var self = this,
        modules = [],
        metaModels = [],
        models = [],
        dfd = new $.Deferred();
    this.reportComponentsMeta.forEach(function (model) {
      // these modules could be paths in the components JSON or requirejs module mappings inside require.config.js
      model.get("type") && model.get("type") === "bookmarks" && modules.push("../model/BookmarksComponentModel");
      model.get("type") && model.get("type") === "reportparts" && modules.push("../model/ReportPartsComponentModel");
      model.get("type") && metaModels.push(model.attributes);
    });

    require(modules, function () {
      var args = _.toArray(arguments),
          options = {
        parent: self.report,
        linkOptions: self.linkOptions,
        collection: self,
        parse: true
      };

      _.each(args, function (Module, index) {
        var instance = new Module(metaModels[index], options);
        models.push(instance);
        self.registerPart(instance);
      });

      self.add(models, {
        merge: true
      });
      dfd.resolve();
    }, dfd.reject);

    return dfd;
  },
  add: function add(models, options) {
    var allowedModels = [];

    if (this.stateModel.get('isolateDom')) {
      _.each(models, function (model, index, models) {
        if (model.get('type') && (model.get('type').indexOf('fusion') !== -1 || model.get('type').indexOf('tibco-maps') !== -1)) {
          if (model.get('type').indexOf('fusion') !== -1) {
            localLogger.info('Fusion components usage deprecated when isolateDom option enabled for report');
          }

          if (model.get('type').indexOf('tibco-maps') !== -1) {
            localLogger.info('Tibco maps components usage deprecated when isolateDom option enabled for report');
          }
        } else {
          allowedModels.push(models[index]);
        }
      });

      models = allowedModels;
    }

    return Backbone.Collection.prototype.add.call(this, models, options);
  },
  getComponents: function getComponents() {
    var comps = this.reduce(function (memo, model) {
      if (model.toReportComponentObject) {
        var obj = model.toReportComponentObject();

        if (!obj) {
          return memo;
        }

        if (_.isArray(obj)) {
          memo = memo.concat(obj);
        } else {
          memo.push(obj);
        }
      }

      return memo;
    }, []);

    _.forEach(comps, function (component) {
      if (component.name === undefined) {
        delete component.name;
      }
    });

    return comps;
  },
  getLinks: function getLinks() {
    return this.reduce(function (memo, model) {
      return memo.concat(model.get('hyperlinks') || []);
    }, []);
  },
  getBookmarks: function getBookmarks() {
    return this.reduce(function (memo, model) {
      return memo.concat(model.get('bookmarks') || []);
    }, []);
  },
  getReportParts: function getReportParts() {
    return this.reduce(function (memo, model) {
      return memo.concat(model.get('reportParts') || []);
    }, []);
  },
  // hackish way to get changes to components
  updateComponents: function updateComponents(reportComponents) {
    var self = this,
        actions = [],
        collection = new Backbone.Collection(this.map(function (model) {
      var newModel = new Backbone.Model(model.attributes);

      _.extend(newModel, {
        updateFromReportComponentObject: model.updateFromReportComponentObject,
        actions: model.actions,
        parent: model.parent,
        headingFormat: model.headingFormat,
        detailsRowFormat: model.detailsRowFormat,
        conditions: model.conditions
      });

      if (model.attachEvents) {
        model.attachEvents.call(newModel);
      }

      return newModel;
    }));
    collection.forEach(function (model) {
      _.each(model.actions, function (func, action) {
        self.listenToOnce(model, action, function (model, property, obj) {
          actions.push(model.actions[action].call(model, obj));
        });
      });
    });

    _.each(reportComponents, function (component) {
      var model = collection.get(component.id.split('/')[0]);

      if (model) {
        model.updateFromReportComponentObject(component);
      }
    });

    return actions;
  }
});

});