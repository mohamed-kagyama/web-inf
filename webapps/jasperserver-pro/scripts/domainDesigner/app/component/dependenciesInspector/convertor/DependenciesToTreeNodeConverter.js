define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var placementsEnum = require("../../../common/component/enum/placementsEnum");

var iconNameToItemTypeMapping = require("../../enum/iconNameToTreeItemMapping");

var artificialTreeResourceTypesEnum = require("../../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

var entityTypeToI18nKeyEnum = require("../enum/entityTypeToI18nKeyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_GROUP_LEVEL = 1;
var DEFAULT_ITEM_LEVEL = 2;

function DependenciesToTreeNodeConverter(options) {
  options = options || {};
  this.itemHeight = options.itemHeight;
  this.dependencySourcePathGenerator = options.dependencySourcePathGenerator;

  _.bindAll(this, 'convert', '_convert');
}

function isDependencyGroup(dependency) {
  return Boolean(dependency.entities);
}

function getDependencyLabel(dependency) {
  if (isDependencyGroup(dependency)) {
    return entityTypeToI18nKeyEnum[dependency.name];
  } else {
    return dependency.name;
  }
}

function getDependencyIcon(dependency) {
  var type = null;

  if (isDependencyGroup(dependency)) {
    type = artificialTreeResourceTypesEnum.DEPENDENCY_DIALOG_GROUP;
  } else {
    type = dependency.entityType;
  }

  return iconNameToItemTypeMapping[type];
}

function getDependencyLevel(dependency) {
  if (isDependencyGroup(dependency)) {
    return DEFAULT_GROUP_LEVEL;
  } else {
    return DEFAULT_ITEM_LEVEL;
  }
}

_.extend(DependenciesToTreeNodeConverter.prototype, {
  convert: function convert(dependencies) {
    this._counter = 0;
    return dependencies.map(this._convert);
  },
  _convert: function _convert(dependency) {
    var treeNode = {
      id: this._counter,
      label: getDependencyLabel(dependency),
      icon: getDependencyIcon(dependency),
      invalid: false,
      visible: true,
      isSelectable: false,
      level: getDependencyLevel(dependency),
      properties: {},
      tooltip: {},
      height: this.itemHeight,
      group: isDependencyGroup(dependency)
    };
    this._counter = this._counter + 1;

    if (isDependencyGroup(dependency)) {
      _.extend(treeNode, {
        open: true,
        children: []
      });
    } else {
      var path = this.dependencySourcePathGenerator.generate(dependency);

      if (path) {
        treeNode.tooltip = {
          placement: placementsEnum.BOTTOM_LEFT,
          content: {
            text: path
          }
        };
      }
    }

    return treeNode;
  }
});

module.exports = DependenciesToTreeNodeConverter;

});