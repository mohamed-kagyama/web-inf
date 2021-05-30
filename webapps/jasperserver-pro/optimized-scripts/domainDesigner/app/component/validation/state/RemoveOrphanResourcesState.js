/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone","../../../../model/schema/enum/schemaEntitiesEnum","./enum/validationStateNameEnum"],function(e,t,n){var i=e("underscore"),o=e("backbone"),a=e("../../../../model/schema/enum/schemaEntitiesEnum"),c=e("./enum/validationStateNameEnum"),s=function(e){this.initialize(e)};i.extend(s.prototype,o.Events,{initialize:function(e){this.entityCollector=e.entityCollector,this.dependenciesConverter=e.dependenciesConverter,this.domainValidationMutations=e.domainValidationMutations,this.dependenciesInspectorApplication=e.dependenciesInspectorApplication,this.clientDomainValidationService=e.clientDomainValidationService},enter:function(e,t){var n=e.orphanResources,i={schemaPairs:e.schemaPairs,dataSource:this.clientDomainValidationService.getDataSource(),orphanResources:n},o=this.entityCollector.collectAffectedEntities("replaceDataSource",i);o?this._openDependenciesInspector({entities:o,context:e,stateFactory:t,replaceDataSourceActionOptions:i}):this._replaceDataSourceAndLoadNewFieldsForTables({context:e,stateFactory:t,replaceDataSourceActionOptions:i})},_openDependenciesInspector:function(e){var t=e.entities,n=e.context,o=e.stateFactory,c=e.replaceDataSourceActionOptions,s=this.dependenciesConverter.convert(t,{targetEntityType:a.DATA_SOURCE,targetEntitiesIds:[],isReplaceDataSource:!0})||{};i.isEmpty(s.leftGroup)&&i.isEmpty(s.rightGroup)?this._replaceDataSourceAndLoadNewFieldsForTables({context:n,stateFactory:o,replaceDataSourceActionOptions:c}):(this.listenTo(this.dependenciesInspectorApplication,"confirm",i.bind(this._onChangeConfirmed,this,{context:n,stateFactory:o,replaceDataSourceActionOptions:c})),this.listenTo(this.dependenciesInspectorApplication,"reject",i.bind(this._closeDependenciesInspector,this,{context:n,stateFactory:o})),this.dependenciesInspectorApplication.open(s))},_onChangeConfirmed:function(e){this.stopListening(this.dependenciesInspectorApplication),this.dependenciesInspectorApplication.close(),this._replaceDataSourceAndLoadNewFieldsForTables(e)},_closeDependenciesInspector:function(e){this.stopListening(this.dependenciesInspectorApplication),this.dependenciesInspectorApplication.close(),e.stateFactory.enter(c.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE,e.context)},_replaceDataSourceAndLoadNewFieldsForTables:function(e){var t=e.context,n=e.stateFactory;this.domainValidationMutations.replaceDataSource(e.replaceDataSourceActionOptions),n.enter(c.LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE,t)}}),n.exports=s});