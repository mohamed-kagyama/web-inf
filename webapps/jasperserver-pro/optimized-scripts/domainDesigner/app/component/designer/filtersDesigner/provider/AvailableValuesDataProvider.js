/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/genericTypesEnum"],function(e,a,i){var t=e("underscore"),r=e("../../../../../model/schema/enum/genericTypesEnum"),l=function(e){this.initialize(e)};t.extend(l.prototype,{initialize:function(e){t.bindAll(this,"getData"),this.booleanAvailableValuesDataProvider=e.booleanAvailableValuesDataProvider,this.queryExecutionAvailableValuesDataProvider=e.queryExecutionAvailableValuesDataProvider,this.filtersDesignerViewStateModelService=e.filtersDesignerViewStateModelService},getData:function(e){return this.filtersDesignerViewStateModelService.getDraftFilterState().dataType===r.BOOLEAN?this.booleanAvailableValuesDataProvider.getData(e):this.queryExecutionAvailableValuesDataProvider.getData(e)}}),i.exports=l});