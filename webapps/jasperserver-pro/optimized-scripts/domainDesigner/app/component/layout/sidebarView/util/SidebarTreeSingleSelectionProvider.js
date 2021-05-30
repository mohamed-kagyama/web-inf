/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var n=e("underscore"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.clientViewStateModelService=e.clientViewStateModelService},get:function(){return this.clientViewStateModelService.getSidebarSelectionPath()}}),t.exports=r});