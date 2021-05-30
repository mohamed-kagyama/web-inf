define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var EntityCollection = require("../../../model/util/collection/EntityCollection");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var EntityFactory = require("../../../model/schema/factory/EntityFactory");

var CalcFieldsParser = require("../../model/converter/util/CalcFieldsParser");

var FiltersParser = require("../../model/converter/util/FiltersParser");

var JoinParser = require("../../model/converter/util/JoinParser");

var ServerSchemaModelParser = require("../../model/converter/ServerSchemaModelParser");

var ServerSchemaModelParserWithPostProcessing = require("../../model/converter/ServerSchemaModelParserWithPostProcessing");

var presentationItemsSorter = require("../../model/converter/sorter/presentationItemsSorter");

var ServerSchemaModelSerializer = require("../../model/converter/ServerSchemaModelSerializer");

var FilterExpressionsSerializer = require("../../model/converter/FilterExpressionsSerializer");

var filterSerializer = require("../../model/expression/filterExpressionSerializer/filterConverter/filterSerializer");

var complexFilterToObjectSerializer = require("../../model/expression/filterExpressionSerializer/filterConverter/complexFilterToObjectSerializer");

var complexFilterToStringSerializer = require("../../model/expression/filterExpressionSerializer/filterConverter/complexFilterToStringSerializer");

var filtersStringConcatenator = require("../../model/expression/filterExpressionSerializer/concatenator/filtersStringConcatenator");

var filtersConcatenator = require("../../model/expression/filterExpressionSerializer/concatenator/filtersConcatenator");

var filterExpressionObjectAdapter = require("../../model/expression/filterExpressionSerializer/adapter/filterExpressionObjectAdapter");

var filterExpressionStringAdapter = require("../../model/expression/filterExpressionSerializer/adapter/filterExpressionStringAdapter");

var calcFieldWithStringExpressionSerializer = require("../../model/converter/calcFieldWithStringExpressionSerializer");

var ServerResourcePropertiesModelParser = require("../../model/converter/ServerResourcePropertiesModelParser");

var ServerResourcePropertiesModelSerializer = require("../../model/converter/ServerResourcePropertiesModelSerializer");

var ClientSchemaDataStoreDataAdapter = require("../../model/util/ClientSchemaDataStoreDataAdapter");

var domainSchemaCollectionsFactory = require("../../../model/schema/factory/domainSchemaCollectionsFactory");

var DataStore = require("../../../model/util/dataStore/DataStore");

var ResourceIdentifierGenerator = require("../../common/util/ResourceIdentifierGenerator");

var constantDataIslandNameGenerator = require("text!../../model/service/template/constantDataIslandNameGenerator.htm");

var DomainSchemaDAO = require("../../../model/schema/dao/DomainSchemaDAO");

var DomainSchemaGranularSpecs = require("../../../model/schema/specification/DomainSchemaGranularSpecs");

var DomainSchemaSpecification = require("../../../model/schema/specification/DomainSchemaSpecification");

var DomainSchemaService = require("../../../model/schema/service/DomainSchemaService");

var newCalcFieldNameTemplate = require("text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm");

var ResourceProperties = require("../../../model/resource/model/ResourceProperties");

var ResourcePropertiesService = require("../../../model/resource/service/ResourcePropertiesService");

var SchemaModelConverter = require("../../../model/schema/converter/SchemaModelConverter");

var HistoryModel = require("../../model/HistoryModel");

var ListWithCursor = require("../../../util/ListWithCursor");

var copyMethodAndEventsUtil = require('../../../util/methodProxy/copyMethodAndEventsUtil');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var copyReadOnlyMethodsAndEvents = copyMethodAndEventsUtil.copyReadOnlyMethodsAndEvents;

function createEntityFactory(context, options) {
  context.register('entityFactory', new EntityFactory({
    idGenerator: new SequenceGenerator(),
    Collection: EntityCollection
  }));
}

function createModels(context, options) {
  createSchemaModel(context, options);
  createResourcePropertiesModel(context, options);
  createHistoryModel(context, options);
}

function createHistoryModel(context, options) {
  context.register('historyModelList', new ListWithCursor());
  var historyModel = new HistoryModel({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    list: context.get('historyModelList')
  });
  context.register('historyModel', historyModel);
}

function createSchemaModel(context, options) {
  context.register('filterExpressionsSerializer', new FilterExpressionsSerializer({
    filterSerializer: filterSerializer,
    complexFilterSerializer: complexFilterToObjectSerializer,
    filtersConcatenator: filtersConcatenator,
    filterExpressionAdapter: filterExpressionObjectAdapter
  }));
  var serverSchemaModelParser = new ServerSchemaModelParser({
    schemaNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator()
    }),
    entityFactory: context.get('entityFactory'),
    calcFieldsParser: new CalcFieldsParser({
      entityFactory: context.get('entityFactory')
    }),
    filtersParser: new FiltersParser({
      entityFactory: context.get('entityFactory')
    }),
    joinParser: new JoinParser({
      entityFactory: context.get('entityFactory')
    })
  });
  var serverSchemaModelParserWithPostProcessing = new ServerSchemaModelParserWithPostProcessing({
    parser: serverSchemaModelParser,
    postProcess: presentationItemsSorter.sort
  });
  var serverSchemaModelSerializer = new ServerSchemaModelSerializer({
    calcFieldSerializer: calcFieldWithStringExpressionSerializer,
    filterExpressionsSerializer: context.get('filterExpressionsSerializer')
  });
  context.register('serverSchemaModelSerializerWithStringDOMElExpressions', new ServerSchemaModelSerializer({
    calcFieldSerializer: calcFieldWithStringExpressionSerializer,
    filterExpressionsSerializer: new FilterExpressionsSerializer({
      filterSerializer: filterSerializer,
      complexFilterSerializer: complexFilterToStringSerializer,
      filtersConcatenator: filtersStringConcatenator,
      filterExpressionAdapter: filterExpressionStringAdapter
    })
  }));
  var schemaModelConverter = new SchemaModelConverter({
    entityFactory: context.get('entityFactory')
  });
  var dataStore = new DataStore({
    createCollectionsFactory: domainSchemaCollectionsFactory,
    dataAdapter: new ClientSchemaDataStoreDataAdapter({
      schemaModelConverter: schemaModelConverter
    })
  });
  var domainSchemaDAO = new DomainSchemaDAO({
    dataStore: dataStore,
    schemaModelConverter: schemaModelConverter
  });
  context.register('constantDataIslandNameGenerator', new ResourceIdentifierGenerator({
    sequenceGenerator: new SequenceGenerator(0),
    template: constantDataIslandNameGenerator
  }));
  context.register('calcFieldNameGenerator', new ResourceIdentifierGenerator({
    sequenceGenerator: new SequenceGenerator(0),
    template: newCalcFieldNameTemplate
  }));
  context.register('domainSchemaGranularSpecs', new DomainSchemaGranularSpecs({
    dataStore: dataStore
  }));
  context.register('domainSchemaSpecification', new DomainSchemaSpecification({
    domainSchemaGranularSpecs: context.get('domainSchemaGranularSpecs')
  }));
  var domainSchemaService = new DomainSchemaService({
    calcFieldNameGenerator: context.get('calcFieldNameGenerator'),
    domainSchemaDAO: domainSchemaDAO,
    dataStore: dataStore,
    domainSchemaSpecification: context.get('domainSchemaSpecification'),
    domainSchemaGranularSpecs: context.get('domainSchemaGranularSpecs')
  });
  context.register('dataStoreReadWrite', dataStore);
  context.register('domainSchemaService', domainSchemaService);
  context.register('domainSchemaServiceReadOnlyFacade', copyReadOnlyMethodsAndEvents(domainSchemaService));
  context.register('serverSchemaModelParser', serverSchemaModelParserWithPostProcessing);
  context.register('schemaModelConverter', schemaModelConverter);
  context.register('schemaDataStore', dataStore);
  context.register('serverSchemaModelSerializer', serverSchemaModelSerializer);
}

function createResourcePropertiesModel(context, options) {
  var resourceProperties = new ResourceProperties();
  var resourcePropertiesReadOnlyFacade = copyReadOnlyMethodsAndEvents(resourceProperties);
  var resourcePropertiesService = new ResourcePropertiesService({
    resourceProperties: resourceProperties
  });
  context.register('serverResourcePropertiesModelSerializer', new ServerResourcePropertiesModelSerializer());
  context.register('serverResourcePropertiesModelParser', new ServerResourcePropertiesModelParser());
  context.register('resourcePropertiesReadOnlyFacade', resourcePropertiesReadOnlyFacade);
  context.register('resourcePropertiesService', resourcePropertiesService);
}

module.exports = function (context, options) {
  createEntityFactory(context, options);
  createModels(context, options);
};

});