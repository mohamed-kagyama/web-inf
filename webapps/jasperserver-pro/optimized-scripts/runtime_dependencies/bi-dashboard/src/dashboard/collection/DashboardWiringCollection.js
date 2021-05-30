/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","backbone","../enum/dashboardWiringStandardIds","./autowiring/CascadeInputControlsAutowiringStrategy","./autowiring/OwnControlsAutowiringStrategy","./autowiring/RunReportAutowiringStrategy","./autowiring/AdhocDashletLinksAutowiringStrategy","../model/DashboardWiringModel"],function(n,t,e){function i(n,t){var e=n+":";this.remove(this.filter(function(n){return 0===n.get("producer").indexOf(e)&&(!t||s.indexOf(t,n.get("producer"))<0)}))}function r(n,t){var e=this;t||(t=[]),this.each(function(i){var r=i.consumers.filter(function(e){var i=e.get("consumer").split(":");return i[0]==n&&s.indexOf(t,i[1])<0});s.each(r,function(n){i.consumers.remove(n),delete e.handlers[n.get("consumer")]})})}var o=n("jquery"),s=n("underscore"),a=n("backbone"),u=n("../enum/dashboardWiringStandardIds"),d=n("./autowiring/CascadeInputControlsAutowiringStrategy"),c=n("./autowiring/OwnControlsAutowiringStrategy"),h=n("./autowiring/RunReportAutowiringStrategy"),g=n("./autowiring/AdhocDashletLinksAutowiringStrategy"),l=n("../model/DashboardWiringModel"),f=s.reduce(s.values(u),function(n,t){return n[t]=!0,n},{});e.exports=a.Collection.extend({model:l,initialize:function(){var n=this;s.bindAll(this,"register","unregister"),this.handlers={},this.on("add",function(n){n.consumers.each(s.bind(this.attachHandler,this,n))}),this.on("remove",function(n){n.consumers.set([])}),this.on("reset",function(t,e){s.each(e.previousModels,function(n){n.consumers.set([])}),this.each(function(t){t.consumers.each(s.bind(n.attachHandler,n,t))})}),this.on("add:consumers",this.attachHandler),this.on("remove:consumers",this.detachHandler),this.on("reset:consumers",function(t,e,i){s.each(i.previousModels,s.bind(n.detachHandler,n,t)),e.each(s.bind(n.attachHandler,n,t))}),this.autowiring=[],this.autowiring.push(new c),this.autowiring.push(new d),this.autowiring.push(new h),this.autowiring.push(new g)},register:function(n,t){i.call(this,n.get("id"),s.map(t.signals,function(t){return n.get("id")+":"+t})),r.call(this,n.get("id"),s.keys(t.slots));var e=this.add(s.map(t.signals,function(t){return{name:t,producer:n.get("id")+":"+t,component:n.get("id")}}),{silent:!0,component:n,consumers:[]});for(var a in t.slots){var u=n.get("id")+":"+a;this.handlers[u]||(this.handlers[u]=new o.Deferred),this.handlers[u].resolve(t.slots[a])}this.autowiringEnabled&&s.invoke(this.autowiring,"autowire",this,n,t);for(var d=0,c=e.length;d<c;d++)(n=e[d]).trigger("add",n,this)},unregister:function(n){i.call(this,n.get("id")),r.call(this,n.get("id")),s.invoke(this.autowiring,"unwire",n)},enableAutowiring:function(){this.autowiringEnabled=!0},disableAutowiring:function(){this.autowiringEnabled=!1},askForHandler:function(n){return this.handlers[n]||(this.handlers[n]=new o.Deferred),this.handlers[n].promise()},attachHandler:function(n,t){this.askForHandler(t.get("consumer")).done(function(t){n.listenTo(n.component,n.get("name"),t),n.value&&t(n.value,n.component)})},detachHandler:function(n,t){this.askForHandler(t.get("consumer")).done(function(t){n.stopListening(n.component,n.get("name"),t),n.value&&t(void 0,n.component)})},hasUserWiring:function(){return!!this.find(function(n){return!f[n.get("name")]&&n.consumers.find(function(n){var t=n.get("consumer").split(":");return!f[t[t.length-1]]})})}})});