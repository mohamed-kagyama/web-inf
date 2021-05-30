/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/service/JoinsDesignerViewStateModelService"],function(e,i,t){var o=e("../../../model/service/JoinsDesignerViewStateModelService");t.exports=function(e,i){e.register("joinsDesignerViewStateModelService",new o({viewStateModel:e.get("viewStateModelReadOnlyFacade")}))}});