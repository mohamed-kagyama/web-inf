/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var o=e("underscore"),r=function(e){this.initialize(e)};o.extend(r.prototype,{initialize:function(e){this.presentationDesignerDropZoneFactory=e.presentationDesignerDropZoneFactory},convert:function(e){var t=e.models;return o.extend({},e,{models:this._insertDropZones(t)})},_insertDropZones:function(e){return o.reduce(e,function(e,t){var n,r,i,s,p,u=t.dropZoneActivators;return u?(n=u.ownerId,u.top&&(r=o.extend({ownerId:n},u.top),s=this.presentationDesignerDropZoneFactory.create(r),e.push(s)),e.push(t),u.bottom&&(i=o.extend({ownerId:n},u.bottom),p=this.presentationDesignerDropZoneFactory.create(i),e.push(p))):e.push(t),e},[],this)}}),n.exports=r});