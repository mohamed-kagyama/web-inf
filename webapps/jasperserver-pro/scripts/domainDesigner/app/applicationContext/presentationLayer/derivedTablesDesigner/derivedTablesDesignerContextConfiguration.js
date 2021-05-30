define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var derivedTablesDesignerVueConfigFactory = require("../../../component/designer/derivedTablesDesigner/component/main/derivedTablesDesignerVueConfigFactory");

var DerivedTablesDesignerStore = require("../../../component/designer/derivedTablesDesigner/store/DerivedTablesDesignerStore");

var compositeAndValidationRuleFactory = require("../../../common/factory/compositeAndValidationRuleFactory");

var virtualDataVueConfigFactory = require("../../../common/component/virtualData/virtualDataVueConfigFactory");

var SequenceGenerator = require("../../../../model/util/SequenceGenerator");

var ResourceIdentifierGenerator = require("../../../common/util/ResourceIdentifierGenerator");

var DerivedTablesDesignerQueryResultConverter = require("../../../component/designer/derivedTablesDesigner/converter/DerivedTablesDesignerQueryResultConverter");

var DerivedTablesDesignerQueryResultController = require("../../../component/designer/derivedTablesDesigner/controller/DerivedTablesDesignerQueryResultController");

var DerivedTablesDesignerQueryRunController = require("../../../component/designer/derivedTablesDesigner/controller/DerivedTablesDesignerQueryRunController");

var DerivedTablesDesignerStoreQueryResultDataProvider = require("../../../component/designer/derivedTablesDesigner/provider/DerivedTablesDesignerStoreQueryResultDataProvider");

var DerivedTablesDesignerConnectionService = require("../../../component/designer/derivedTablesDesigner/service/DerivedTablesDesignerConnectionService");

var DerivedTablesDesignerController = require("../../../component/designer/derivedTablesDesigner/controller/DerivedTablesDesignerController");

var DerivedTablesDesignerDerivedTableValidator = require("../../../component/designer/derivedTablesDesigner/validator/DerivedTablesDesignerDerivedTableValidator");

var DerivedTablesDesignerAvailableFieldsValidator = require("../../../component/designer/derivedTablesDesigner/validator/DerivedTablesDesignerAvailableFieldsValidator");

var validateAvailableFieldForNotSupportedTypes = require("../../../component/designer/derivedTablesDesigner/validator/validationRules/validateAvailableFieldForNotSupportedTypes");

var validateAvailableFieldForEmptyName = require("../../../component/designer/derivedTablesDesigner/validator/validationRules/validateAvailableFieldForEmptyName");

var eventBusFactory = require("../../../../util/eventBusFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDerivedTablesDesigner(context, options) {
  var derivedTablesDesignerEventBus = eventBusFactory.create();
  context.register('derivedTablesDesignerEventBus', derivedTablesDesignerEventBus);
  context.register('derivedTablesDesignerDerivedTableValidator', new DerivedTablesDesignerDerivedTableValidator({
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    domainSchemaGranularSpecs: context.get("domainSchemaGranularSpecs")
  }));
  context.register('derivedTablesDesignerAvailableFieldsValidator', new DerivedTablesDesignerAvailableFieldsValidator({
    validator: compositeAndValidationRuleFactory.create([validateAvailableFieldForNotSupportedTypes, validateAvailableFieldForEmptyName])
  }));
  context.register('derivedTablesDesignerStore', new DerivedTablesDesignerStore());
  var VirtualData = Vue.extend(virtualDataVueConfigFactory.create({
    eventBus: derivedTablesDesignerEventBus,
    defaultHeight: options.derivedTablesDesigner.height.queryResultSetHeight
  }));
  var derivedTablesDesignerVueConfig = derivedTablesDesignerVueConfigFactory.create({
    VirtualData: VirtualData
  });
  var derivedTablesDesignerVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: derivedTablesDesignerVueConfig,
    dataNames: automationDataNameAttributesEnum.derivedTablesDesigner.main
  });
  var DerivedTablesDesignerView = Vue.extend(derivedTablesDesignerVueConfigWithDataNameAttribute);
  context.register('derivedTablesDesignerView', new DerivedTablesDesignerView({
    derivedTablesDesignerEventBus: derivedTablesDesignerEventBus,
    data: context.get('derivedTablesDesignerStore').attributes
  }));
  context.register('derivedTablesDialog', new Dialog({
    el: context.get('derivedTablesDesignerView').$mount().$el
  }));
  context.register('derivedTablesDesignerConnectionService', new DerivedTablesDesignerConnectionService({
    derivedTableMetadataService: context.get('derivedTableMetadataServiceWrappedWithDoNotHandle400ErrorsNotification'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService')
  }));
  context.register('derivedTablesDesignerQueryResultConverter', new DerivedTablesDesignerQueryResultConverter({
    fieldHeight: options.derivedTablesDesigner.height.fieldHeight
  }));
  context.register('derivedTablesDesignerQueryResultController', new DerivedTablesDesignerQueryResultController({
    dialog: context.get('derivedTablesDialog'),
    derivedTablesDesignerStore: context.get('derivedTablesDesignerStore'),
    derivedTablesDesignerEventBus: derivedTablesDesignerEventBus,
    derivedTablesDesignerQueryResultConverter: context.get('derivedTablesDesignerQueryResultConverter')
  }));
  var derivedTablesDesignerStoreQueryResultDataProvider = new DerivedTablesDesignerStoreQueryResultDataProvider({
    derivedTablesDesignerQueryResultConverter: context.get('derivedTablesDesignerQueryResultConverter'),
    derivedTablesDesignerStore: context.get('derivedTablesDesignerStore')
  });
  var derivedTablesDesignerQueryRunController = new DerivedTablesDesignerQueryRunController({
    derivedTablesDesignerConnectionService: context.get('derivedTablesDesignerConnectionService'),
    derivedTablesDesignerStore: context.get('derivedTablesDesignerStore'),
    derivedTablesDesignerDerivedTableValidator: context.get('derivedTablesDesignerDerivedTableValidator'),
    derivedTablesDesignerAvailableFieldsValidator: context.get('derivedTablesDesignerAvailableFieldsValidator'),
    derivedTablesDesignerStoreQueryResultDataProvider: derivedTablesDesignerStoreQueryResultDataProvider
  });
  context.register('derivedTablesDesignerController', new DerivedTablesDesignerController({
    dialog: context.get('derivedTablesDialog'),
    derivedTablesDesignerStore: context.get('derivedTablesDesignerStore'),
    derivedTablesDesignerEventBus: context.get('derivedTablesDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    derivedTableLoaderDialogEventBus: context.get('derivedTableLoaderDialogEventBus'),
    derivedTablesDesignerDerivedTableValidator: context.get('derivedTablesDesignerDerivedTableValidator'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    expressionBulkUpdateService: context.get('expressionBulkUpdateService'),
    initialQueryResultSetHeight: options.derivedTablesDesigner.height.queryResultSetHeight,
    derivedTablesDesignerStoreQueryResultDataProvider: derivedTablesDesignerStoreQueryResultDataProvider,
    derivedTablesDesignerQueryRunController: derivedTablesDesignerQueryRunController,
    fieldNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator()
    })
  }));
}

module.exports = createDerivedTablesDesigner;

});