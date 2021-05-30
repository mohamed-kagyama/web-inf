/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.epoxy","underscore","bundle!DashboardBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","./WiringConsumerViewModel","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension","../../enum/dashboardComponentTypes","../../collection/filterManager/WiringConsumerViewModelCollection"],function(e,n,o){var t=e("backbone.epoxy"),r=e("underscore"),i=e("bundle!DashboardBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),d=e("./WiringConsumerViewModel"),s=e("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"),m=e("../../enum/dashboardComponentTypes"),c=e("../../collection/filterManager/WiringConsumerViewModelCollection"),l=a.extend({bundle:i}),u=t.Model.extend(r.extend({},s.mixin,{defaults:{id:void 0,name:void 0,parameter:void 0,parameterPublicName:void 0,label:void 0},validation:{name:[{required:!0,msg:new l("dashboard.filterManager.error.parameter.name.required")},{fn:function(e,n,o){if(r.isUndefined(o.id))return this.collection.find(function(n){return n.get("name")==e&&n.get("id")!==o.id})},msg:new l("dashboard.filterManager.error.parameter.name.duplication")}]},initialize:function(e,n){n||(n={}),this.consumers=n.consumers||new c([]),this.component=n.component},isValid:function(e){return s.mixin.isValid.call(this,e)&&this.consumers.isValid(e)},setGroupRelatedProperties:function(){this.set({isFirstItemInGroup:this.collection.findWhere({group:this.get("group")})===this,itemsInGroup:this.collection.where({group:this.get("group")}).length})}}),{createFromDashboardWiringModel:function(e,n){var o,t=new c,a=e.get("producer"),s=e.get("producer"),l=e.component.get("outputParameters");if(l&&r.isArray(l)){var p=r.findWhere(l,{id:e.get("name")});r.isUndefined(p)||(a=p.label)}else e.component.get("type")===m.VALUE?(a=e.component.id,s=e.component.id):e.component.get("type")===m.INPUT_CONTROL&&(a=e.component.get("name"),s=e.component.id);return t.add(e.consumers.map(function(e){var o=e.get("consumer").split(":"),r=n.get(o[0]);return new d({id:o[0],parameter:o[1],name:r.get("name")},{component:r,collection:t})})),o=e.component.get("type")===m.INPUT_CONTROL?e.component.getParent()?e.component.getParent().get("name"):i["dashboard.component.filter.group.component.name"]||"Filter Group":e.component.get("type")===m.VALUE?i["dashboard.filter.manager.manually.created.filters"]||"Manually Created Filters":e.component.get("name"),new u({id:e.get("producer"),name:e.get("producer"),parameter:e.get("name"),parameterPublicName:s,label:a,group:o},{component:e.component,consumers:t})}});o.exports=u});