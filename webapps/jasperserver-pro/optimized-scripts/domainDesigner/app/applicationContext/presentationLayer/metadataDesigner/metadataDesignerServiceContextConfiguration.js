/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/service/MetadataDesignerViewStateModelService"],function(e,t,a){var i=e("../../../model/service/MetadataDesignerViewStateModelService");a.exports=function(e,t){e.register("metadataDesignerViewStateModelService",new i({viewStateModel:e.get("viewStateModelReadOnlyFacade")}))}});