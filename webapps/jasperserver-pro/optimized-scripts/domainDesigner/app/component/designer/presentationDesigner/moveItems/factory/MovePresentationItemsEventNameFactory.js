/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/actionToDataIslandsEventMap","../enum/actionToPresentationItemsEventMap"],function(e,t,n){function a(e){this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService}var i=e("underscore"),o=e("../enum/actionToDataIslandsEventMap"),r=e("../enum/actionToPresentationItemsEventMap");i.extend(a.prototype,{create:function(e){var t=this.presentationDesignerViewStateModelService.getPresentationCanvasSelectionParentId();return(this._isDataIsland(t)?o:r)[e]},_isDataIsland:function(e){return!e}}),n.exports=a});