/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){this.joinsDesignerViewStateModelService=e.joinsDesignerViewStateModelService},isSatisfied:function(){var e=this.joinsDesignerViewStateModelService.getDraftJoinTree(),i=this.joinsDesignerViewStateModelService.getJoinConstructor();return Boolean(e||i)}}),t.exports=o});