define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function DependencySourcePathGenerator(options) {
  _.bindAll(this, 'generate');

  this.schemaPathGenerationService = options.schemaPathGenerationService;
}

_.extend(DependencySourcePathGenerator.prototype, {
  generate: function generate(entity) {
    return this._generatePath(entity);
  },
  _generatePath: function _generatePath(entity) {
    var path;

    if (this._isSatisfiedBy(entity)) {
      var entityId = entity.id;

      if (entity.entityType === schemaEntitiesEnum.TABLE_REFERENCE) {
        path = this._getEntityPath({
          id: entity.tableId,
          entityType: schemaEntitiesEnum.TABLE
        });
      } else {
        path = this._getEntityParentPath({
          id: entityId,
          entityType: entity.entityType
        });
      }
    }

    return path;
  },
  _getEntityPath: function _getEntityPath(options) {
    return this.schemaPathGenerationService.getEntityPath(options);
  },
  _getEntityParentPath: function _getEntityParentPath(options) {
    return this.schemaPathGenerationService.getEntityParentPath(options);
  },
  _isSatisfiedBy: function _isSatisfiedBy(entity) {
    return entity.entityType === schemaEntitiesEnum.TABLE_REFERENCE || entity.entityType === schemaEntitiesEnum.PRESENTATION_FIELD;
  }
});

module.exports = DependencySourcePathGenerator;

});