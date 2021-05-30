define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ConfirmationDialogView = require('../../../component/dialog/confirmation/view/ConfirmationDialogView');

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var ForeignKeyMetadataConverter = require("../../../component/designer/joinsDesigner/converter/ForeignKeyMetadataConverter");

var ForeignKeyDiscoveryService = require("../../../component/designer/joinsDesigner/service/ForeignKeyDiscoveryService");

var JoinsGenerationController = require("../../../component/designer/joinsDesigner/controller/JoinsGenerationController");

var i18n = require("bundle!DomainDesignerBundle");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createJoinsGenerationViews(context, options) {
  context.register('foreignKeyMetadataConverter', new ForeignKeyMetadataConverter({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientDomainSchemaMetadataService: context.get('clientDomainSchemaMetadataService'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  }));
  context.register('foreignKeyDiscoveryService', new ForeignKeyDiscoveryService({
    metadataService: context.get('metadataServiceWrappedWithNotificationForForeignKeyDiscoveryService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    foreignKeyMetadataConverter: context.get('foreignKeyMetadataConverter'),
    schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec: context.get('schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec')
  }));
  context.register('joinGenerationConfirmationDialog', new ConfirmationDialogView({
    text: i18n['domain.designer.joinsDesigner.generate.dialog.message'],
    title: i18n2['warning.title'],
    yesLabel: i18n['domain.designer.joinsDesigner.generate.dialog.yes'],
    noLabel: i18n['domain.designer.joinsDesigner.generate.dialog.no']
  }));
  context.register('joinsGenerationAlertDialog', new AlertDialog({
    title: i18n2['warning.title']
  }));
}

function createJoinsGenerationControllers(context, options) {
  context.register('joinsGenerationController', new JoinsGenerationController({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    joinsDesignerEventBus: context.get('joinsDesignerEventBus'),
    foreignKeyDiscoveryService: context.get('foreignKeyDiscoveryService'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    confirmationDialog: context.get('joinGenerationConfirmationDialog'),
    alertDialog: context.get('joinsGenerationAlertDialog'),
    clientDomainSchemaJoinsDesignerService: context.get('clientDomainSchemaJoinsDesignerService')
  }));
}

module.exports = function (context, options) {
  createJoinsGenerationViews(context, options);
  createJoinsGenerationControllers(context, options);
};

});