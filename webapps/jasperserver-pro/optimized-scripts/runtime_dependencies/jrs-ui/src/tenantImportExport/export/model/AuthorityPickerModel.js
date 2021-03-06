/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../../../components/components.templateengine","underscore"],function(e,t,r){var n=e("backbone"),o=e("../../../components/components.templateengine"),s=e("underscore");r.exports=n.Model.extend({defaults:{items:[]},url:function(){return o.renderUrl(this.urlTemplate,this.context,!0)},parse:function(e){return{items:e?e.role?e.role:e.user:[]}},defaultErrorHandler:function(e,t){var r;try{r=JSON.parse(t.responseText)}catch(e){r=null}this.trigger("error:server",t.status,r,e)},setContext:function(e){this.context=s.extend(this.context||{searchString:"",excludeSubOrgs:!1},e),this.fetch({error:s.bind(this.defaultErrorHandler,this)})}},{instance:function(e,t){var r=new this;return r.urlTemplate=e,t&&r.setContext(t),r}})});