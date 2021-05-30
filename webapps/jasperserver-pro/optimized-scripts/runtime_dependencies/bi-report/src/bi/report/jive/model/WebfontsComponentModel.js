/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel","../enum/jiveTypes","underscore"],function(e,n,t){var i=e("./BaseComponentModel"),o=e("../enum/jiveTypes"),s=e("underscore");t.exports=i.extend({defaults:function(){return{id:null,server:"",type:o.WEBFONTS,webfonts:[]}},initialize:function(e){e&&e.webfonts&&this._handleWebfonts(e.webfonts),i.prototype.initialize.apply(this,arguments)},_handleWebfonts:function(n){var t=this.get("server"),i=s.map(n,function(e){return"csslink!"+t+e.path});s.isEmpty(i)||e(i,function(){})}})});