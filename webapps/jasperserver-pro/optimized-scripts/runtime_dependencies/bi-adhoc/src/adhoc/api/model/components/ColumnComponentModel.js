/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel"],function(e,t,i){var a=e("./BaseComponentModel"),l=/^_spacer/;i.exports=a.extend({defaults:{reference:"_artificial",detailFieldReference:"_artificial",aggregatedFieldReferences:["_artificial"],width:125,horizontalAlign:"Left",showSummary:!1},initialize:function(e,t){null===this.get("label")&&this.set({label:this.get("detailFieldReference")},{silent:!0}),this.has("label")||"_artificial"!==this.get("reference")&&!l.test(this.get("reference"))||this.set({label:""},{silent:!0})},hasSummary:function(){return this.attributes.showSummary}})});