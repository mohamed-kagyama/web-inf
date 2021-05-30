/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","runtime_dependencies/js-sdk/src/components/dialog/Dialog","text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm","../../model/service/ClientDomainSchemaService","../../../model/util/SequenceGenerator","../../common/util/ResourceIdentifierGenerator","../../../model/schema/service/DomainSchemaService","../../../model/schema/dao/DomainSchemaDAO","../../../model/schema/specification/DomainSchemaGranularSpecs","../../../model/schema/specification/DomainSchemaSpecification","../../../model/schema/factory/domainSchemaCollectionsFactory","../../../model/util/dataStore/DataStore","../../model/util/ClientSchemaDataStoreDataAdapter","../../component/validation/service/ClientDomainValidationService","../../component/validation/schemaMapping/model/SchemaMappingModel","../../component/validation/schemaMapping/component/SchemaMappingComponent","../../component/validation/schemaMapping/service/DomainSchemaMappingService","../../common/factory/addAutomationDataNameAttributeMixinFactory","../../common/enum/automationDataNameAttributesEnum"],function(e,a,i){function o(e,a){e.register("schemaMappingModel",new M({}));var i=C.create({config:f,dataNames:A.validation.schemaMapping}),o=t.extend(i);e.register("schemaMappingComponent",new o({domainValidationEventBus:e.get("domainValidationEventBus"),data:e.get("schemaMappingModel").attributes})),e.register("schemaMappingDialog",new m({el:e.get("schemaMappingComponent").$mount().$el}))}function n(e,a){var i=new u({createCollectionsFactory:v,dataAdapter:new g({schemaModelConverter:e.get("schemaModelConverter")})}),o=new p({dataStore:i,schemaModelConverter:e.get("schemaModelConverter")}),n=new S({dataStore:i}),t=new h({domainSchemaGranularSpecs:n}),m=new s({calcFieldNameGenerator:new d({sequenceGenerator:new l,template:c}),domainSchemaDAO:o,dataStore:i,domainSchemaSpecification:t,domainSchemaGranularSpecs:n}),M=new r({domainSchemaService:m,constantDataIslandNameGenerator:e.get("constantDataIslandNameGenerator"),serverSchemaModelSerializer:e.get("serverSchemaModelSerializer"),dataStore:i}),f=new D({dataStore:i,clientDomainSchemaService:M,clientResourcePropertiesService:e.get("clientResourcePropertiesServiceForDomainSchemaValidationService"),viewStateModel:e.get("viewStateModelServiceForDomainSchemaValidationService"),schemaResourcesNamesAreEqualSpecification:e.get("schemaResourcesNamesAreEqualSpecification"),designerViewStateByDomainProvider:e.get("designerViewStateByDomainProvider")});e.register("domainSchemaMappingService",new w({domainSchemaService:m,clientDomainValidationService:f}))}var t=e("vue"),m=e("runtime_dependencies/js-sdk/src/components/dialog/Dialog"),c=e("text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm"),r=e("../../model/service/ClientDomainSchemaService"),l=e("../../../model/util/SequenceGenerator"),d=e("../../common/util/ResourceIdentifierGenerator"),s=e("../../../model/schema/service/DomainSchemaService"),p=e("../../../model/schema/dao/DomainSchemaDAO"),S=e("../../../model/schema/specification/DomainSchemaGranularSpecs"),h=e("../../../model/schema/specification/DomainSchemaSpecification"),v=e("../../../model/schema/factory/domainSchemaCollectionsFactory"),u=e("../../../model/util/dataStore/DataStore"),g=e("../../model/util/ClientSchemaDataStoreDataAdapter"),D=e("../../component/validation/service/ClientDomainValidationService"),M=e("../../component/validation/schemaMapping/model/SchemaMappingModel"),f=e("../../component/validation/schemaMapping/component/SchemaMappingComponent"),w=e("../../component/validation/schemaMapping/service/DomainSchemaMappingService"),C=e("../../common/factory/addAutomationDataNameAttributeMixinFactory"),A=e("../../common/enum/automationDataNameAttributesEnum");i.exports=function(e,a){o(e,a),n(e,a)}});