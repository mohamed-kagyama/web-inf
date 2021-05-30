/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,t,o){var n=e("backbone");o.exports=n.Model.extend({constructor:function(e,t){t||(t={}),t.parse=!0,n.Model.prototype.constructor.apply(this,[e,t])},initialize:function(e,t){},parse:function(e){return this.componentType=e.componentType,e.properties},toJSON:function(){return{properties:n.Model.prototype.toJSON.call(this),components:this.components.toJSON(),componentType:this.componentType}},getProperties:function(){return n.Model.prototype.toJSON.call(this)},where:function(e){return this.components.where(e)},findWhere:function(e){return this.components.findWhere(e)}})});