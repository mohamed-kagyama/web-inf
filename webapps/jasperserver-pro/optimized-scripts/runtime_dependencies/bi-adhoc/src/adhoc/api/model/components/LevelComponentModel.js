/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel"],function(e,t,n){var i=e("./BaseComponentModel");n.exports=i.extend({defaults:{includeAll:!0},initialize:function(e,t){this.unset("label",{silent:!0})},isMeasure:function(){return"Measures"===this.get("reference")},hasSummary:function(){return this.attributes.includeAll},prevLevel:function(){for(var e=1;e<this.collection.length;e++)if(this.collection.models[e]===this)return this.collection.models[e-1]},nextLevel:function(){for(var e=0;e<this.collection.length-1;e++)if(this.collection.models[e]===this)return this.collection.models[e+1]}})});