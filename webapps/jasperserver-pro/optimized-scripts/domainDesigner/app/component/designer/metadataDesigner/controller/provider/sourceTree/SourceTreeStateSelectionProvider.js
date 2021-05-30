/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/enum/canvasViewDesignersEnum"],function(e,i,n){var t=e("underscore"),r=e("../../../../../../model/enum/canvasViewDesignersEnum"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){this.model=e.model},get:function(e){var i=this.model.get("currentMetadataResourceId");return e.viewState.getDesignerSpecificProperty(r.METADATA_DESIGNER,"selection").sourceTree[i]||[]}}),n.exports=o});