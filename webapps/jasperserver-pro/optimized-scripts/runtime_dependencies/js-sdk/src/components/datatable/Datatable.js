/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","./datatableTemplate.html","./DatatableModel","./datatableData"],function(e,t,a){var l=e("backbone"),n=e("underscore"),i=e("./datatableTemplate.html"),d=e("./DatatableModel"),o=e("./datatableData");a.exports=l.View.extend({template:n.template(i),initialize:function(){this.model=new d(o),this.render()},render:function(){return this.$el.html(this.template(this.model.toJSON())),this}})});