/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","../../component/layout/canvasView/store/CanvasViewStore","../../component/layout/canvasView/controller/CanvasViewController","../../component/layout/canvasView/component/factory/canvasVueConfigFactory","../../model/enum/canvasViewDesignersEnum","../../component/designer/calculatedFieldsDesigner/factory/CalcFieldContextFactory","./derivedTablesDesigner/derivedTablesDesignerContextConfiguration","./calcFieldsDesigner/calculatedFieldsDesignerContextConfiguration","./optionsDesigner/optionsDesignerContextConfiguration","./securityDesigner/securityDesignerContextConfiguration","../../common/component/search/strategy/onChangeStateSearchStrategy","../../component/layout/sidebarView/strategy/onChangeStateSidebarSearchStrategy","./metadataDesigner/metadataDesignerContextConfiguration","./metadataDesigner/metadataDesignerEventBusContextConfiguration","./metadataDesigner/metadataDesignerServiceContextConfiguration","./metadataDesigner/metadataDesignerSidebarContextConfiguration","./metadataDesigner/metadataDesignerViewModelContextConfiguration","./joinsDesigner/joinsDesignerContextConfiguration","./joinsDesigner/joinsDesignerServiceContextConfiguration","./joinsDesigner/joinsDesignerEventBusContextConfiguration","./joinsDesigner/joinsDesignerViewModelContextConfiguration","./joinsDesigner/joinsDesignerSidebarContextConfiguration","./filtersDesigner/filtersDesignerContextConfiguration","./filtersDesigner/filtersDesignerEventBusContextConfiguration","./filtersDesigner/filtersDesignerServiceContextConfiguration","./filtersDesigner/filtersDesignerSidebarContextConfiguration","./filtersDesigner/filtersDesignerViewModelContextConfiguration","./presentationDesigner/presentationDesignerContextConfiguration","./presentationDesigner/presentationDesignerEventBusContextConfiguration","./presentationDesigner/presentationDesignerServiceContextConfiguration","./presentationDesigner/presentationDesignerSidebarContextConfiguration","./presentationDesigner/presentationDesignerViewModelContextConfiguration","./sidebar/sidebarViewContextConfiguration","./sidebar/sidebarViewContextMenuOptionsContextConfiguration","../../common/predicate/showDefaultSchemaPredicate","../../component/layout/sidebarView/predicate/showDefaultSchemaInSidebarPredicateAdapter","../../component/layout/sidebarView/tree/factory/sidebarTreeFactory","../../component/layout/sidebarView/tree/sidebarTreeDataProviderPromiseWrapper","../../component/layout/sidebarView/tree/tooltip/SidebarTooltipOptionsFactory","../../common/comparator/CompareByProperty","../../common/comparator/CompositeComparator","../../component/layout/sidebarView/comparator/calcFieldsLastComparator","../../component/layout/sidebarView/converter/GenericMapBasedConverter","../../component/layout/sidebarView/converter/converterMap/resourceConverterMap","../../component/layout/sidebarView/converter/converterMap/constantGroupConverterMap","../../component/layout/sidebarView/converter/converterMap/joinTreeConverterMap","../../component/layout/sidebarView/converter/converterMap/baseResourceWithoutChildrenConverterMap","../../component/layout/sidebarView/converter/processor/TreeItemIsDerivedTableProcessor","../../component/layout/sidebarView/converter/CompositeResourceConverter","../../component/layout/sidebarView/converter/treeItemCSSConverter","../../component/layout/sidebarView/converter/processor/treeItemIsNodeProcessor","../../component/layout/sidebarView/converter/processor/TreeItemLabelProcessor"],function(e,r,t){function n(){var e={};return e[f.METADATA_DESIGNER]="jr-mDomain-modeManage",e[f.JOINS_DESIGNER]="jr-mDomain-modeJoins",e[f.PRESENTATION_DESIGNER]="jr-mDomain-modePresentation",e[f.OPTIONS_DESIGNER]="jr-mDomain-modeOptions",e[f.SECURITY_DESIGNER]="jr-mDomain-modeSecurity",e[f.FILTERS_DESIGNER]="jr-mDomain-modePrefilters",e}function o(e,r){e.register("sidebarTreeFactory",Q),e.register("sidebarTreeDataProviderPromiseWrapper",X),e.register("sidebarTooltipOptionsFactory",new Z({clientDomainSchemaService:e.get("clientDomainSchemaService"),clientResourcePropertiesService:e.get("clientResourcePropertiesService")})),e.register("onChangeStateSearchStrategy",x),e.register("onChangeStateSidebarSearchStrategy",M);var t=new de({clientDataSourceGroupService:e.get("clientDataSourceGroupService")});e.register("treeItemLabelProcessor",t),e.register("js-sdk/src/commonSidebarTreeNodeConverter",new ce([ge,Ce]).convert),e.register("comparatorByLabel",new $({property:"label"}).compare),e.register("comparatorByName",new $({property:"name"}).compare),e.register("constantGroupMapBasedConverter",new te({converterMap:oe})),e.register("resourceMapBasedConverter",new te({converterMap:ne})),e.register("joinTreesMapBasedConverter",new te({converterMap:ie})),e.register("dataSourceComparator",new ee({comparators:[re,e.get("comparatorByLabel")]}).compare),e.register("baseTreeResourceConverter",new te({converterMap:ae}).convert),e.register("treeItemIsDerivedTableProcessor",new se({domainSchemaService:e.get("domainSchemaServiceReadOnlyFacade")})),e.register("showDefaultSchemaInSidebarPredicate",K(H)),e.register("calcFieldContextFactory",new S({clientDomainSchemaCalcFieldsService:e.get("clientDomainSchemaCalcFieldsService")}))}function i(e,r){T(e,r),B(e,r),O(e,r),J(e,r)}function a(e,r){j(e,r),F(e,r),L(e,r),k(e,r)}function s(e,r){I(e,r),R(e,r),_(e,r),U(e,r)}function c(e,r){z(e,r),E(e,r),N(e,r),A(e,r),q(e,r),Y(e,r)}function g(e,r){h(e,r),P(e,r),G(e,r),W(e,r)}function C(e,r){b(e,r),y(e,r)}function d(e,r){w(e,r),V(e,r)}function u(e,r){i(e,r),a(e,r),s(e,r),c(e,r),g(e,r)}function m(e,r){e.register("canvasViewStore",new l),e.register("canvasViewController",new D({store:e.get("canvasViewStore"),designerToClassNameMap:n(),storeChangeEventBus:e.get("storeChangeEventBus")})),e.register("canvasVueConfig",v.create({data:e.get("canvasViewStore").attributes,metadataDesigner:p.extend(e.get("metadataDesignerVueConfig")),joinsDesigner:p.extend(e.get("joinsDesignerVueConfig")),filtersDesigner:p.extend(e.get("filtersDesignerVueConfig")),presentationDesigner:p.extend(e.get("presentationDesignerVueConfig")),optionsDesigner:p.extend(e.get("optionsDesignerVueConfig")),securityDesigner:p.extend(e.get("securityDesignerVueConfig"))}))}var p=e("vue"),l=e("../../component/layout/canvasView/store/CanvasViewStore"),D=e("../../component/layout/canvasView/controller/CanvasViewController"),v=e("../../component/layout/canvasView/component/factory/canvasVueConfigFactory"),f=e("../../model/enum/canvasViewDesignersEnum"),S=e("../../component/designer/calculatedFieldsDesigner/factory/CalcFieldContextFactory"),y=e("./derivedTablesDesigner/derivedTablesDesignerContextConfiguration"),b=e("./calcFieldsDesigner/calculatedFieldsDesignerContextConfiguration"),w=e("./optionsDesigner/optionsDesignerContextConfiguration"),V=e("./securityDesigner/securityDesignerContextConfiguration"),x=e("../../common/component/search/strategy/onChangeStateSearchStrategy"),M=e("../../component/layout/sidebarView/strategy/onChangeStateSidebarSearchStrategy"),h=e("./metadataDesigner/metadataDesignerContextConfiguration"),T=e("./metadataDesigner/metadataDesignerEventBusContextConfiguration"),j=e("./metadataDesigner/metadataDesignerServiceContextConfiguration"),E=e("./metadataDesigner/metadataDesignerSidebarContextConfiguration"),I=e("./metadataDesigner/metadataDesignerViewModelContextConfiguration"),P=e("./joinsDesigner/joinsDesignerContextConfiguration"),F=e("./joinsDesigner/joinsDesignerServiceContextConfiguration"),B=e("./joinsDesigner/joinsDesignerEventBusContextConfiguration"),R=e("./joinsDesigner/joinsDesignerViewModelContextConfiguration"),N=e("./joinsDesigner/joinsDesignerSidebarContextConfiguration"),G=e("./filtersDesigner/filtersDesignerContextConfiguration"),O=e("./filtersDesigner/filtersDesignerEventBusContextConfiguration"),L=e("./filtersDesigner/filtersDesignerServiceContextConfiguration"),A=e("./filtersDesigner/filtersDesignerSidebarContextConfiguration"),_=e("./filtersDesigner/filtersDesignerViewModelContextConfiguration"),W=e("./presentationDesigner/presentationDesignerContextConfiguration"),J=e("./presentationDesigner/presentationDesignerEventBusContextConfiguration"),k=e("./presentationDesigner/presentationDesignerServiceContextConfiguration"),q=e("./presentationDesigner/presentationDesignerSidebarContextConfiguration"),U=e("./presentationDesigner/presentationDesignerViewModelContextConfiguration"),Y=e("./sidebar/sidebarViewContextConfiguration"),z=e("./sidebar/sidebarViewContextMenuOptionsContextConfiguration"),H=e("../../common/predicate/showDefaultSchemaPredicate"),K=e("../../component/layout/sidebarView/predicate/showDefaultSchemaInSidebarPredicateAdapter"),Q=e("../../component/layout/sidebarView/tree/factory/sidebarTreeFactory"),X=e("../../component/layout/sidebarView/tree/sidebarTreeDataProviderPromiseWrapper"),Z=e("../../component/layout/sidebarView/tree/tooltip/SidebarTooltipOptionsFactory"),$=e("../../common/comparator/CompareByProperty"),ee=e("../../common/comparator/CompositeComparator"),re=e("../../component/layout/sidebarView/comparator/calcFieldsLastComparator"),te=e("../../component/layout/sidebarView/converter/GenericMapBasedConverter"),ne=e("../../component/layout/sidebarView/converter/converterMap/resourceConverterMap"),oe=e("../../component/layout/sidebarView/converter/converterMap/constantGroupConverterMap"),ie=e("../../component/layout/sidebarView/converter/converterMap/joinTreeConverterMap"),ae=e("../../component/layout/sidebarView/converter/converterMap/baseResourceWithoutChildrenConverterMap"),se=e("../../component/layout/sidebarView/converter/processor/TreeItemIsDerivedTableProcessor"),ce=e("../../component/layout/sidebarView/converter/CompositeResourceConverter"),ge=e("../../component/layout/sidebarView/converter/treeItemCSSConverter"),Ce=e("../../component/layout/sidebarView/converter/processor/treeItemIsNodeProcessor"),de=e("../../component/layout/sidebarView/converter/processor/TreeItemLabelProcessor");t.exports=function(e,r){o(e,r),u(e,r),C(e,r),d(e,r),m(e,r)}});