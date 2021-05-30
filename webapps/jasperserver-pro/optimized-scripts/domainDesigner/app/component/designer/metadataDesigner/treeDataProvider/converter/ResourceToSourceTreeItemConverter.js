/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/util/serverSchemaResourceTypeUtil","../../../../enum/iconNameToTreeItemMapping"],function(e,t,o){var i=e("underscore"),r=e("../../../../../model/util/serverSchemaResourceTypeUtil"),n=e("../../../../enum/iconNameToTreeItemMapping"),a=function(e){this.initialize(e)};i.extend(a.prototype,{initialize:function(e){i.bindAll(this,"convert"),this.treeViewNodeFactory=e.treeViewNodeFactory},convert:function(e,t){t=t||{};var o=t.selection||{},i=e.group,r=i.name,a=this._getMetadataResourceType(e),c=o[r];return this.treeViewNodeFactory.create({label:r,value:r,addToSelection:Boolean(c),iconName:n[a],isInvalid:Boolean(c&&t.highlightInvalidResources)})},_getMetadataResourceType:function(e){return r.getMetadataResourceType(e)}}),o.exports=a});