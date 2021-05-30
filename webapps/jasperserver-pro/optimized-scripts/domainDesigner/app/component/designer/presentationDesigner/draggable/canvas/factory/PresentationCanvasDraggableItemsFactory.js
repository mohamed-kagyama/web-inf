/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../enum/draggableOriginEnum"],function(e,n,i){var r=e("underscore"),t=e("../../enum/draggableOriginEnum"),u=function(e){this.initialize(e)};r.extend(u.prototype,{initialize:function(){},create:function(e){return e=r.isArray(e)?e:[e],this._getItems(e)},_getItems:function(e){return r.map(e,function(e){return r.extend({origin:t.CANVAS},e)})}}),i.exports=u});