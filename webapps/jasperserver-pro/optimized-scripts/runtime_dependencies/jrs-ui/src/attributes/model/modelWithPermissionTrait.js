/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../attributes/enum/roleEnum"],function(e,i,s){var t=e("underscore"),n=e("../../attributes/enum/roleEnum");s.exports={computeds:{permissionEmbedded:{deps:["_embedded","permissionMask"],get:function(e,i){var s=this.getPermission(e);return s?s.mask:i},set:function(e){var i=t.cloneDeep(this.get("_embedded")),s=this.getPermission(i);return s?s.mask=e:i.permission.push({mask:e,recipient:n.ROLE_ADMINISTRATOR}),{_embedded:i}}}},_initModelWithPermissionDefaults:function(){this.defaults=t.extend({},this.defaults,{_embedded:{permission:[{recipient:n.ROLE_ADMINISTRATOR,mask:"1"}]}})},getPermission:function(e){if(e=e||this.get("_embedded"))return t.find(e.permission,function(e){return e.recipient===n.ROLE_ADMINISTRATOR})}}});