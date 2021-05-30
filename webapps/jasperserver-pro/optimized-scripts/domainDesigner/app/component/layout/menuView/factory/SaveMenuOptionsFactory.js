/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,i,n){var s=e("underscore"),r=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=t.create(r),a=function(e){this.initialize(e)};s.extend(a.prototype,{initialize:function(e){s.bindAll(this,"_isSaved"),this.clientResourcePropertiesService=e.clientResourcePropertiesService},create:function(){return[{label:o("domain.designer.menu.save"),triggerEvent:"save",action:"save"},{label:o("domain.designer.menu.saveAs"),action:"saveAs",triggerEvent:"saveAs",test:this._isSaved}]},_isSaved:function(){return this.clientResourcePropertiesService.isDomainSaved()}}),n.exports=a});