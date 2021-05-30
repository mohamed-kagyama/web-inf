define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _s = require('underscore.string');

var _ = require('underscore');

var DashboardComponentModel = require('./DashboardComponentModel');

var dashboardSettings = require('../../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = DashboardComponentModel.extend({
  defaults: _.extend({}, DashboardComponentModel.prototype.defaults, {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    maximized: false
  }),
  toJSON: function toJSON() {
    var data = DashboardComponentModel.prototype.toJSON.apply(this, arguments);
    delete data.x;
    delete data.y;
    delete data.width;
    delete data.height;
    delete data.maximized;
    delete data.showPaginationControl;
    delete data.isAdhocChart;
    return data;
  },
  toDashboardComponentObject: function toDashboardComponentObject() {
    var component = DashboardComponentModel.prototype.toDashboardComponentObject.apply(this, arguments);
    component.maximized = this.get('maximized');
    component.position = this.pick('x', 'y', 'width', 'height');

    if (this.has('showTitleBar')) {
      component.toolbar = this.get('showTitleBar') === false ? false : {
        maximize: this.get('showMaximizeButton'),
        refresh: this.get('showRefreshButton')
      };
    }

    if (this.has('showPaginationControl')) {
      component.pagination = this.get('showPaginationControl');
    }

    return component;
  },
  updateFromDashboardComponentObject: function updateFromDashboardComponentObject(obj) {
    var attrs = _.omit(obj, 'id', 'name', 'type', 'position', 'resource');

    if (this.has('showTitleBar') && attrs.hasOwnProperty('toolbar') && attrs.toolbar !== null) {
      if (_.isObject(attrs.toolbar)) {
        attrs.showTitleBar = true;
        attrs.showMaximizeButton = attrs.toolbar.maximize;
        attrs.showRefreshButton = attrs.toolbar.refresh;
      } else {
        attrs.showTitleBar = attrs.toolbar;
      }
    }

    if (this.has('showPaginationControl') && attrs.hasOwnProperty('pagination') && attrs.pagination !== null) {
      attrs.showPaginationControl = attrs.pagination;
    }

    if (attrs.maximized === null) {
      delete attrs.maximized;
    }

    delete attrs.pagination;
    delete attrs.toolbar;
    this.set(attrs, {
      validate: true
    });
  },
  toHTML: function toHTML(calculatePosition) {
    var result = _s.sprintf(dashboardSettings.DASHLET_TEMPLATE.replace(/\(\\d\+\)/g, '%d').replace(/\(\[\\w\\d\]\+\)/g, '%s'), this.get('id'), this.get('x') || 0, this.get('y') || 0, this.get('width') || 0, this.get('height') || 0);

    if (calculatePosition === true) {
      result = $(result).css(this.getCssPosition())[0].outerHTML; // eslint-disable-line xss/htmlOutputRule
    }

    return result;
  },
  getCssPosition: function getCssPosition() {
    return {
      left: 100 * this.get('x') / dashboardSettings.GRID_WIDTH + '%',
      top: 100 * this.get('y') / dashboardSettings.GRID_HEIGHT + '%',
      width: 100 * this.get('width') / dashboardSettings.GRID_WIDTH + '%',
      height: 100 * this.get('height') / dashboardSettings.GRID_HEIGHT + '%'
    };
  },
  getPositionObject: function getPositionObject() {
    return {
      x: this.get('x'),
      y: this.get('y'),
      width: this.get('width'),
      height: this.get('height')
    };
  }
}, {
  htmlToPositionObject: function htmlToPositionObject(html) {
    var $el = $(html),
        props = {};
    props.id = $el.attr(dashboardSettings.COMPONENT_ID_ATTRIBUTE);
    props.x = $el.attr('data-x') * 1;
    props.y = $el.attr('data-y') * 1;
    props.width = $el.attr('data-width') * 1;
    props.height = $el.attr('data-height') * 1;
    return props;
  }
});

});