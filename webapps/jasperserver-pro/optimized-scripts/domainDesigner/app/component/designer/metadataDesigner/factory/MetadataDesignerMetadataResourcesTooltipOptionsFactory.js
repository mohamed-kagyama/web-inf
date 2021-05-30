/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../model/enum/dataSourceTypeEnum"],function(e,t,a){var i=e("underscore"),r=e("../../../../../model/schema/util/entityUtil"),n=e("bundle!DomainDesignerBundle"),o=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../../../model/enum/dataSourceTypeEnum"),d=o.create(n),l=function(e){this.initialize(e)};i.extend(l.prototype,{initialize:function(e){i.bindAll(this,"create"),this.metadataDesignerViewStateModelService=e.metadataDesignerViewStateModelService,this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider=e.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider},create:function(e,t){var a={text:e.label},i=this.metadataDesignerViewStateModelService.getCurrentSidebarResource(),n=this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider.getDataSourceType(i);return r.isDataSource(i.type)?n===s.DATA_SOURCE_WITH_SCHEMAS?a.label=d("domain.designer.metadataDesignerView.manage.schemas.tooltip.label"):n===s.DATA_SOURCE_WITHOUT_SCHEMAS&&(a.label=d("domain.designer.metadataDesignerView.manage.tables.tooltip.label")):r.isDataSourceGroup(i.type)&&(a.label=d("domain.designer.metadataDesignerView.manage.tables.tooltip.label")),{content:a,target:t.querySelector(".jr-jTooltipTarget"),type:""}}}),a.exports=l});