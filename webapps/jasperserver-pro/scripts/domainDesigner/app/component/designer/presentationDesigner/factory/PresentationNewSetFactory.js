define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var invert = require("../../../../../util/predicate/invert");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationNewSetFactory = function PresentationNewSetFactory(options) {
  this.initialize(options);
};

_.extend(PresentationNewSetFactory.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_presentationSetWithGivenNameAlreadyExists');

    this.sequenceGenerator = options.sequenceGenerator;
    this.domainSchemaSpecification = options.domainSchemaSpecification;
    this.resourceIdentifierGenerator = options.resourceIdentifierGenerator;
  },
  _presentationSetWithGivenNameAlreadyExists: function _presentationSetWithGivenNameAlreadyExists(name) {
    var predicate = invert(this.domainSchemaSpecification.canUsePresentationItemName);
    return predicate({
      name: name
    });
  },
  create: function create(options) {
    this.sequenceGenerator.reset();
    var parentId = options.parentId,
        name = this.resourceIdentifierGenerator.generate(null, this._presentationSetWithGivenNameAlreadyExists);
    return {
      name: name,
      label: name,
      parentId: parentId,
      entityType: schemaEntitiesEnum.PRESENTATION_SET
    };
  }
});

module.exports = PresentationNewSetFactory;

});