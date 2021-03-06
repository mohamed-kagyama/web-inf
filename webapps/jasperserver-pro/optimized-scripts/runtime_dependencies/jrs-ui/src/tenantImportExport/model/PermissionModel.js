/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(i,e,s){var n=i("backbone"),r=n.Model.extend({initialize:function(i){this.isInherited=!!i.isInherited,i.permission&&(this.permission=i.permission),i.inheritedPermission&&(this.inheritedPermission=i.inheritedPermission),this.isDisabled=!!i.isDisabled},getResolvedPermission:function(){return this.isInherited?this.inheritedPermission:this.permission},toJSON:function(){return{permission:this.permission,isInherited:this.isInherited,inheritedPermission:this.inheritedPermission,newPermission:this.newPermission}},toData:function(){return{permission:this.permission,isInherited:this.isInherited,inheritedPermission:this.inheritedPermission,newPermission:this.newPermission}}});s.exports=r});