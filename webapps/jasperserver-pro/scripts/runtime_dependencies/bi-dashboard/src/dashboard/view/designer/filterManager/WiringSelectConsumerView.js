define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var ViewWithEpoxy = require("runtime_dependencies/js-sdk/src/common/view/ViewWithEpoxy");

var i18n = require("bundle!DashboardBundle");

var i18n2 = require("bundle!CommonBundle");

var wiringSelectConsumerTemplate = require("text!../../../template/filterManager/wiringSelectConsumerTemplate.htm");

var wiringConsumerOptionTemplate = require("text!../../../template/filterManager/wiringConsumerOptionTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function buildConsumerOptions() {
  var template = _.template(wiringConsumerOptionTemplate),
      options = '';

  if (_.isUndefined(this.model.get('id'))) {
    options += template({
      label: i18n['dashboard.filter.manager.select.dashlet'],
      value: undefined,
      title: undefined
    });
  }

  _.each(this.consumers, function (consumer) {
    options += template({
      label: consumer.name,
      value: consumer.id,
      title: undefined
    });
  });

  return options;
}

function buildParameterOptions() {
  var selectedConsumer = _.findWhere(this.consumers, {
    id: this.model.get('id')
  }),
      template = _.template(wiringConsumerOptionTemplate),
      options = '',
      self = this,
      usedPairs = [];

  this.model.collection.each(function (consumerModel) {
    if (consumerModel !== self.model && !_.isUndefined(consumerModel.get('id')) && !_.isUndefined(consumerModel.get('parameter'))) {
      usedPairs.push(consumerModel.get('id') + ':' + consumerModel.get('parameter'));
    }
  });

  if (_.isUndefined(this.model.get('parameter')) || selectedConsumer && !_.contains(_.pluck(selectedConsumer.parameters, 'id'), this.model.get('parameter'))) {
    options += template({
      label: i18n['dashboard.filter.manager.select.parameter'],
      value: undefined,
      title: i18n['dashboard.filter.manager.select.parameter']
    });
  }

  if (selectedConsumer) {
    _.each(selectedConsumer.parameters, function (param) {
      if (_.indexOf(usedPairs, self.model.get('id') + ':' + param.id) === -1) {
        options += template({
          label: param.label,
          value: param.id,
          title: i18n2['tooltip.parameter'] + ' ' + param.id
        });
      }
    });
  }

  return options;
}

module.exports = ViewWithEpoxy.extend({
  el: _.template(wiringSelectConsumerTemplate, {
    i18n: _.extend(i18n2, i18n)
  }),
  constructor: function constructor(options) {
    options || (options = {});
    this.consumers = options.consumers;
    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    this.listenTo(this.model, 'change:parameter', this.setParameterLabel);
    this.setParameterLabel();
    ViewWithEpoxy.prototype.initialize.apply(this, arguments);
  },
  render: function render() {
    this.$('select[name=\'id\']').html(buildConsumerOptions.call(this));
    this.$('select[name=\'parameter\']').html(buildParameterOptions.call(this));
    return ViewWithEpoxy.prototype.render.apply(this, arguments);
  },
  setParameterLabel: function setParameterLabel() {
    var selectedConsumer = _.findWhere(this.consumers, {
      id: this.model.get('id')
    }),
        selectedParameter;

    if (selectedConsumer) {
      selectedParameter = _.findWhere(selectedConsumer.parameters, {
        id: this.model.get('parameter')
      });

      if (selectedParameter) {
        this.model.set('parameterLabel', selectedParameter.label);
      }
    }
  }
});

});