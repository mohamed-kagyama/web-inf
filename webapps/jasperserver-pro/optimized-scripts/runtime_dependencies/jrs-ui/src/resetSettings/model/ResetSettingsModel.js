/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.epoxy"],function(e,i,t){var n=e("backbone.epoxy"),o=n.Model.extend({defaults:{id:void 0,name:void 0,value:"",description:""},initialize:function(){this.get("id")||this.setId()},url:function(){var e=encodeURIComponent(this.id).replace("'","%27");return e=e.replace("'","%27"),this.collection.url(this.isNew()?"":e)},setId:function(){var e=this.get("name");e!==this.get("id")&&this.set("id",e)}});t.exports=o});