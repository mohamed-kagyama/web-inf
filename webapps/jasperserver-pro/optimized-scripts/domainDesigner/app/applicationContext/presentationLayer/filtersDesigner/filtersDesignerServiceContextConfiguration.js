/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/service/FiltersDesignerViewStateModelService"],function(e,i,t){var r=e("../../../model/service/FiltersDesignerViewStateModelService");t.exports=function(e,i){e.register("filtersDesignerViewStateModelService",new r({viewStateModel:e.get("viewStateModelReadOnlyFacade")}))}});