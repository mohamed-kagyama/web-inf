define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var biComponentErrorFactory = require("runtime_dependencies/js-sdk/src/common/bi/error/biComponentErrorFactory");

var AdHocQueryModel = require('./query/AdHocQueryModel');

var Backbone = require('backbone');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register('AdHocDataSetModel');
var AdHocDataSetModel = Backbone.Model.extend({
  defaults: {
    dataSourceUri: '',
    'params': {
      'offset': [0, 0],
      'pageSize': [50, 50]
    }
  },
  url: function url() {
    var url;

    if (this.isNew()) {
      url = this.contextPath + '/rest_v2/queryExecutions';
    } else {
      url = this.dataUrl + '?' + _.map(this.get('params').offset, function (off) {
        return 'offset=' + off;
      }).concat(_.map(this.get('params').pageSize, function (off) {
        return 'pageSize=' + off;
      })).join('&');
    }

    return url;
  },
  initialize: function initialize(attributes, options) {
    this.adHocModel = options.adHocModel;
    this.contextPath = options.server;
    this._lastData = _.cloneDeep(this.defaults);
    this._data = {};
    this.query = new AdHocQueryModel({}, options);
    this.on('change:params', this.clearDataset, this);
    this.on('change:dataSourceUri', this.resetDataset, this);
    this.listenTo(this.query, 'query:changed', this.resetDataset, this);

    this._scheduleDataUpdate();
  },
  sync: function sync(method, model, options) {
    if (method == 'read') {
      if (this.isNew()) {
        options.data = JSON.stringify(this.toJSON());
        options.type = 'POST';
        options.processData = false;
      }

      options.headers = this.query.headers();
    }

    if (method == 'delete' && !this.isNew()) {
      options.url = this.dataUrl.split('/data')[0];
    }

    return Backbone.Model.prototype.sync.call(this, method, model, options);
  },
  parse: function parse(resp) {
    if (this.get('params')) {
      var serverOffset = resp.params.offset,
          localOffset = this.get('params').offset;

      for (var i = 0; i < serverOffset.length; i++) {
        for (var j = 0; j < serverOffset[i].length; j++) {
          if (serverOffset[i][j] !== localOffset[i][j]) {
            log.info('offsets does not match!');
          }
        }
      }

      delete resp.params;
    }

    if (resp && resp.dataset && !resp.dataset.data && !resp.dataset.levels) {
      resp.dataset.counts = generateEmptyCounts(this.query);
      resp.dataset.data = generateEmptyDataset(resp.dataset.counts);
      resp.dataset.axes = [generateEmptyAxis(this.query.cols), generateEmptyAxis(this.query.rows)];
      resp.dataset.empty = true;
    }

    return resp;
  },
  isNew: function isNew() {
    return !this.dataUrl;
  },
  data: function data() {
    var datasetType = this.query.type();

    if (!this._data[datasetType]) {
      this._data[datasetType] = new $.Deferred();
      this.fetch().done(_.bind(onDataFetched, this)).fail(_.bind(function (xhr) {
        var err = biComponentErrorFactory.requestError(xhr);

        if (this._data[datasetType]) {
          this._data[datasetType].reject(err);

          this.trigger("error:dataset", err);
        }
      }, this));
    }

    return this._data[datasetType].promise();
  },
  toJSON: function toJSON() {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);

    if (!json.dataSource) {
      json.dataSource = {
        reference: this.get('dataSourceUri')
      };
    }

    json.dataSourceUri = undefined;

    if (this.query.type() !== AdHocQueryModel.type.PROVIDED) {
      json.query = this.query.toJSON(true);
    }

    if (this.query.type() === AdHocQueryModel.type.MULTILEVEL) {
      json.params = {
        offset: [json.params.offset[0]],
        pageSize: [json.params.pageSize[0]]
      };
    }

    return json;
  },
  toDataComponent: function toDataComponent() {
    var res = {
      _dataset_internal_: _.cloneDeep(this.get('dataset'))
    };

    if (this.query.type() === AdHocQueryModel.type.MULTILEVEL) {
      res._dataset_internal_.params = {
        offset: [this.get('params').offset[0]],
        pageSize: [this.get('params').pageSize[0]]
      };
    } else {
      res._dataset_internal_.params = _.cloneDeep(this.get('params'));
    }

    res._dataset_internal_.totalCounts = _.isArray(this.get('totalCounts')) ? _.cloneDeep(this.get('totalCounts')) : [this.get('totalCounts')];
    this.get('truncated') && (res._dataset_internal_.truncated = true);

    this._cleanupDatasetFromTemporaryProperties(res._dataset_internal_);

    return res;
  },
  _cleanupDatasetFromTemporaryProperties: function _cleanupDatasetFromTemporaryProperties(dataset) {
    delete dataset.empty;
  },
  updateFromDataComponent: function updateFromDataComponent(dataComponent) {
    var res, i;

    if (dataComponent.params) {
      if (dataComponent.params.offset) {
        for (i = 0; i < dataComponent.params.offset.length; i++) {
          if (dataComponent.params.offset[i] < 0 || this._lastData._dataset_internal_ && this._lastData._dataset_internal_.totalCounts && this._lastData._dataset_internal_.totalCounts[i] && dataComponent.params.offset[i] >= this._lastData._dataset_internal_.totalCounts[i]) {
            res = new $.Deferred().reject({
              'message': 'Invalid offset specified. Offset should be bounded by [0, 0] and [' + this._lastData._dataset_internal_.totalCounts.join() + ']',
              'errorCode': 'paging.offset.out.of.range',
              'parameters': [[0, 0], this._lastData._dataset_internal_.totalCounts.slice()]
            });
          }
        }
      }

      if (dataComponent.params.pageSize) {
        for (i = 0; i < dataComponent.params.pageSize.length; i++) {
          if (dataComponent.params.pageSize[i] <= 0) res = new $.Deferred().reject({
            errorCode: 'page.size.out.of.boundaries',
            message: 'The pageSize parameter value must be greater than 0',
            parameters: [i, 0]
          });
        }
      }

      this._lastData.params = _.defaults(dataComponent.params, this._lastData.params);
      this.set('params', this._lastData.params);
    }

    if (!res) {
      this._scheduleDataUpdate();

      res = this.data();
    }

    return res;
  },
  resetDataset: function resetDataset() {
    this.clearDataset();
    this.destroy();
    this.dataUrl = undefined;
    this.unset('totalCounts', {
      silent: true
    });
    this.adHocModel.trigger('dataset:reset');
  },
  clearDataset: function clearDataset() {
    this.unset('dataset', {
      silent: true
    });
    this._data = {};
    this.adHocModel.trigger('dataset:clear');
  },
  _scheduleDataUpdate: function _scheduleDataUpdate() {
    this.once('change:dataset', function () {
      this._lastData._dataset_internal_ = {
        totalCounts: _.isArray(this.get('totalCounts')) ? _.cloneDeep(this.get('totalCounts')) : [this.get('totalCounts')]
      };
      this.adHocModel.trigger('data:available', '_dataset_internal_', this);
    }, this);
  }
});
module.exports = AdHocDataSetModel;

function onDataFetched(data, status, xhr) {
  this.dataUrl = xhr.getResponseHeader('Content-Location') ? this.contextPath + '/' + xhr.getResponseHeader('Content-Location') : this.dataUrl;
  this.adHocModel.trigger('data:available', 'query', this.query);
  var datasetType = resolveDatasetType(xhr, this.query);

  if (this._data[datasetType]) {
    this._data[datasetType].resolve(this.attributes).promise();
  }
}

function onDataError(xhr, status) {
  var err = biComponentErrorFactory.requestError(xhr);
  var datasetType = resolveDatasetType(xhr, this.query);

  if (this._data[datasetType]) {
    this._data[datasetType].reject(err);

    this.trigger('error:dataset', err);
  }
}

function resolveDatasetType(xhr, query) {
  var res;

  if (xhr.getResponseHeader && xhr.getResponseHeader('Content-Type') && !_.isEmpty(query.get('select'))) {
    res = xhr.getResponseHeader('Content-Type').replace('application/', '').replace('Data+json', '');
    res = res.indexOf('error') != -1 ? query.type() : res;
  } else {
    res = query.type();
  }

  return res;
}

function generateEmptyCounts(query) {
  var reducer = function reducer(memo, level) {
    return level.isMeasure() ? memo + 1 : memo;
  },
      rowsMeasures = query.rows.axis.reduce(reducer, 0),
      colsMeasures = query.cols.axis.reduce(reducer, 0);

  return [colsMeasures ? colsMeasures : 1, rowsMeasures ? rowsMeasures : 1];
}

function generateEmptyDataset(counts) {
  var row = counts[1] ? _.map(new Array(counts[1]), function () {
    return '';
  }) : '';
  return _.map(new Array(counts[0]), function () {
    return row;
  });
}

function generateEmptyAxis(axis) {
  var items = axis.axis.toQueryMultiaxisAxisItems(),
      levels = _.map(items, function (item) {
    var res = {};

    if (item.level) {
      res.level = {
        members: []
      };
    } else {
      res.aggregation = {
        fields: axis.axis.reduce(function (memo, model) {
          if (model.isMeasure()) {
            memo.push({
              reference: model.get('id')
            });
          }

          return memo;
        }, [])
      };
    }

    return res;
  }),
      axisNode = _.map(items, function (item) {
    return [{
      all: !!item.level
    }];
  });

  for (var i = 0; i < levels.length; i++) {
    if (levels[i].aggregation) {
      for (var j = 0; j < levels[i].aggregation.fields.length; j++) {
        if (!axisNode[i][j]) {
          axisNode[i].push(_.cloneDeep(axisNode[i][0]));
        }

        axisNode[i][j].memberIdx = j;
      }
    }
  }

  var combine = function combine(root, n) {
    if (levels[n]) {
      root.children = _.map(axisNode[n], function (node) {
        return combine(node, n + 1);
      });
    }

    return root;
  };

  return {
    levels: levels,
    axisNode: combine({
      all: true
    }, 0)
  };
}

});