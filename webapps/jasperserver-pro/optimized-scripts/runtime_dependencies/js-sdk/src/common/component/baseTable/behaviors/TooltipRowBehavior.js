/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.marionette"],function(e,o,t){var i=e("backbone.marionette");t.exports=i.Behavior.extend({events:{mouseover:"_onMouseOver",mouseout:"_onMouseOut"},_onMouseOver:function(e){this.view.trigger("mouseover",this.view.model,e)},_onMouseOut:function(e){this.view.trigger("mouseout",this.view.model,e)}})});