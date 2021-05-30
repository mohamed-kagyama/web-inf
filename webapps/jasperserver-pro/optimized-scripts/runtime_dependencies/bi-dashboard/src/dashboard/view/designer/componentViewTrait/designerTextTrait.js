/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../base/componentViewTrait/textTrait"],function(e,t,n){var o=e("underscore"),r=e("../../base/componentViewTrait/textTrait");n.exports=o.extend({},r,{_renderComponent:function(){var e=this.model.get("text");this.component.render(e),this.trigger("componentRendered",this)},resize:function(){this.component.applyFontSize()}})});