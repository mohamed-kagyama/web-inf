/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/artificialTreeResourceTypesEnum","../../../../../util/predicate/CompositePredicate","./baseSidebarTreeConverter","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,o){var t=e("underscore"),c=e("../enum/artificialTreeResourceTypesEnum"),n=e("../../../../../util/predicate/CompositePredicate"),s=e("./baseSidebarTreeConverter"),i=e("bundle!DomainDesignerBundle"),a=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=a.create(i),h={id:c.CONSTANT_GROUP,name:u("domain.designer.calcFields.sidebar.constantGroup"),type:c.CONSTANT_GROUP},d=function(e){this.initialize(e)};t.extend(d.prototype,{initialize:function(e){e=e||{},this.resourceMatch=e.resourceMatch,this.resourceOrChildrenMatch=e.resourceOrChildrenMatch,this.resourceJsonMatch=e.resourceJsonMatch,this.convertResource=e.convertResource,this.convertResourceNoChildren=e.convertResourceNoChildren,this.convertChildrenMatch=e.convertChildrenMatch,this.childrenProperty=e.childrenProperty,this.doNotSkipResourceConversion=e.doNotSkipResourceConversion,this.postProcess=e.postProcess,this.comparator=e.comparator},convert:function(e){var r=e.schema,o=r.constantGroups.reduce(function(e,r){return e.concat(r.getCalcFields().toArray())},[]),c=this._createConstantGroupResource(o);return s.convertResources([c],t.extend({},{parentMatchResult:!1,resourceMatch:this.resourceMatch,resourceOrChildrenMatch:this.resourceOrChildrenMatch,resourceJsonMatch:new n([this.resourceJsonMatch,Boolean(o.length)]).match,convertResource:this.convertResource.convert,convertResourceNoChildren:this.convertResourceNoChildren.convert,doNotSkipResourceConversion:this.doNotSkipResourceConversion,convertChildrenMatch:this.convertChildrenMatch,childrenProperty:this.childrenProperty,postProcess:this.postProcess,comparator:this.comparator},e))},_createConstantGroupResource:function(e){return t.extend({},h,{children:e})}}),o.exports=d});