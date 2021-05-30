/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../base/componentViewTrait/imageTrait"],function(e,r,n){var t=e("underscore"),i=e("../../base/componentViewTrait/imageTrait");n.exports=t.extend({},i,{_renderComponent:function(){var e=this.model.get("uri");this.component.render(e),this.trigger("componentRendered",this)}})});