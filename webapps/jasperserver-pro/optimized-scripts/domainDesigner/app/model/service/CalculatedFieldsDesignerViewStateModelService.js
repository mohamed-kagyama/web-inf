/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/canvasViewDesignersEnum"],function(e,i,t){var n=e("underscore"),r=e("../enum/canvasViewDesignersEnum"),o=r.CALCULATED_FIELDS_DESIGNER,s=function(e){this.initialize(e)};n.extend(s.prototype,{initialize:function(e){this.viewStateModel=e.viewStateModel},isDesignerVisible:function(){return this.viewStateModel.getDesignerSpecificRuntimeProperty(o,"visible")},getContext:function(){var e=this.viewStateModel.getDesignerSpecificRuntimeProperty(o,"context");return n.cloneDeep(e)}}),t.exports=s});