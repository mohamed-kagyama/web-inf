/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../collection/DashboardWiringConsumerCollection"],function(s,t,e){var o=s("backbone"),i=s("../collection/DashboardWiringConsumerCollection");e.exports=o.Model.extend({idAttribute:"producer",initialize:function(s,t){t||(t={}),this.component=t.component,this.consumers=t.consumers&&t.consumers instanceof i?t.consumers:new i(t.consumers||[]),this.listenTo(this.component,this.get("name"),function(s){this.value=s},this),this.listenTo(this.consumers,"add",function(s,t,e){this.trigger("add:consumers",this,s,t,e)},this),this.listenTo(this.consumers,"remove",function(s,t,e){this.trigger("remove:consumers",this,s,t,e)},this),this.listenTo(this.consumers,"reset",function(s,t){this.trigger("reset:consumers",this,s,t)},this)},toJSON:function(){var s=o.Model.prototype.toJSON.apply(this,arguments);return s.consumers=this.consumers.toJSON(),s}})});