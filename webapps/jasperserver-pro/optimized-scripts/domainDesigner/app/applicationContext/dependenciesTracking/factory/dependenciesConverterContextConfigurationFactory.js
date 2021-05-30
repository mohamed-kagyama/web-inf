/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../component/dependenciesInspector/convertor/DependenciesConverter","../../../component/dependenciesInspector/convertor/reducer/TableReferencesReducer","../../../component/dependenciesInspector/convertor/reducer/TableReducer","../../../component/dependenciesInspector/convertor/reducer/FieldReducer","../../../component/dependenciesInspector/convertor/reducer/FilterExpressionAndComplexReducer","../../../component/dependenciesInspector/convertor/reducer/TargetEntitiesReducer","../../../component/dependenciesInspector/convertor/reducer/AffectedEntitiesReducer","../../../component/dependenciesInspector/convertor/reducer/OneSchemaToSchemalessReducer","../../../component/dependenciesInspector/convertor/reducer/GroupByTypeAndSortByNameReducer","../../../component/dependenciesInspector/convertor/generator/DependencySourcePathGenerator","../../../component/dependenciesInspector/convertor/DependenciesToTreeNodeConverter","../../../component/dependenciesInspector/enum/dependenciesSortSequenceEnum"],function(e,n,r){var c=e("../../../component/dependenciesInspector/convertor/DependenciesConverter"),o=e("../../../component/dependenciesInspector/convertor/reducer/TableReferencesReducer"),t=e("../../../component/dependenciesInspector/convertor/reducer/TableReducer"),d=e("../../../component/dependenciesInspector/convertor/reducer/FieldReducer"),p=e("../../../component/dependenciesInspector/convertor/reducer/FilterExpressionAndComplexReducer"),s=e("../../../component/dependenciesInspector/convertor/reducer/TargetEntitiesReducer"),i=e("../../../component/dependenciesInspector/convertor/reducer/AffectedEntitiesReducer"),u=e("../../../component/dependenciesInspector/convertor/reducer/OneSchemaToSchemalessReducer"),m=e("../../../component/dependenciesInspector/convertor/reducer/GroupByTypeAndSortByNameReducer"),a=e("../../../component/dependenciesInspector/convertor/generator/DependencySourcePathGenerator"),v=e("../../../component/dependenciesInspector/convertor/DependenciesToTreeNodeConverter"),R=e("../../../component/dependenciesInspector/enum/dependenciesSortSequenceEnum");r.exports={create:function(e){var n=new t({}),r=new d({}),S=new p({filterExpressionSerializer:e.filterExpressionSerializer}),l=new o({clientDomainSchemaService:e.clientDomainSchemaService}),I=new s({}),T=new i({}),h=new u,f=new m({dependenciesSortSequenceEnum:R}),E=new a({schemaPathGenerationService:e.schemaPathGenerationService}),y=new v({itemHeight:e.dependencyItemHeight,dependencySourcePathGenerator:E});return new c({tableReducer:n,fieldReducer:r,targetEntitiesReducer:I,affectedEntitiesReducer:T,tableReferencesReducer:l,oneSchemaToSchemalessReducer:h,filterExpressionAndComplexReducer:S,groupByTypeAndSortByNameReducer:f,dependenciesToTreeNodeConverter:y})}}});