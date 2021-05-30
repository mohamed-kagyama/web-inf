/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./BaseAutowiringStrategy","../../enum/dashboardComponentTypes"],function(e,r,n){function o(e,r,n,o){var t=n.collection.filter(function(e){return e.getOwnerUri&&e.getOwnerUri()==n.getOwnerUri()&&u.contains(e.get("masterDependencies")||[],n.getOwnerParameterName())}),c=r.find(function(e){return e.component.resource&&e.component.resource.id===n.resource.id});u.each(t,function(e){c.consumers.add({consumer:e.id+":"+n.getOwnerParameterName()})})}function t(e,r,n,o){u.each(u.keys(o.slots),function(e){var o=r.find(function(r){return r.get("name")==e&&r.component.get("ownerResourceId")==n.get("ownerResourceId")});o&&o.consumers.add({consumer:n.id+":"+e})})}var u=e("underscore"),c=e("./BaseAutowiringStrategy"),s=e("../../enum/dashboardComponentTypes");n.exports=c.extend({autowire:function(e,r,n){r.resource&&r.resource.resource&&r.resource.resource.type===s.INPUT_CONTROL&&(o(this,e,r,n),t(this,e,r,n))}})});