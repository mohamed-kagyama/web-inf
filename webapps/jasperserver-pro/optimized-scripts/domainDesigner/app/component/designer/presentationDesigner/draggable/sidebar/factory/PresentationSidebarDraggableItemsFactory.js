/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../enum/draggableOriginEnum"],function(e,r,n){var t=e("underscore"),i=e("../../enum/draggableOriginEnum"),u=function(e){};t.extend(u.prototype,{create:function(e){return e=t.isArray(e)?e:[e],this._getItems(e)},_getItems:function(e){return t.map(e,function(e){var r=e.resourceId;return e=t.omit(e,"resourceId"),t.extend({},e,{id:r,path:e.id,origin:i.SIDEBAR})},this)}}),n.exports=u});