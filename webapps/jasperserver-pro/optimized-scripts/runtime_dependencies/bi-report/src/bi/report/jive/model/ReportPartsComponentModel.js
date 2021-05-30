/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseComponentModel","../enum/jiveTypes"],function(e,r,n){var t=e("underscore"),o=e("./BaseComponentModel"),s=e("../enum/jiveTypes");n.exports=o.extend({defaults:function(){return{reportParts:[],id:void 0,type:s.REPORTPARTS}},constructor:function(e,r){r||(r={}),r.parse||(r=t.extend({},r,{parse:!0})),o.call(this,e,r)},parse:function(e){var r={id:e.id};return r.reportParts=this._processParts(e.parts),r},_processParts:function(e){return e?t.map(e,function(e){return{name:e.name,page:e.idx+1}}):null}})});