/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.presentationDesignerViewStateModelService=e.presentationDesignerViewStateModelService},get:function(){var e=this.presentationDesignerViewStateModelService.getPresentationSidebarSelectedItems();return n.map(e,function(e){return e.id})}}),i.exports=r});