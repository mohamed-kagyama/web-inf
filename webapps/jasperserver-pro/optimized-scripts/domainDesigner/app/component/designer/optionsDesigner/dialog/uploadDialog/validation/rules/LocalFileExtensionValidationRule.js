/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,i,n){var s=e("underscore"),r=e("bundle!DomainDesignerBundle"),t=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=t.create(r),a=function(e){this.initialize(e)};s.extend(a.prototype,{initialize:function(e){this.store=e.store,this.errorMessage=e.errorMessage},validate:function(e){var i=this.store.accept,n=s.reduce(e,function(e,n){var s=n.name,r="."+s.split(".").pop();return this._matchExtension(r,i)?e.validFiles.push(n):e.invalidFiles.push(n),e},{invalidFiles:[],validFiles:[],errorMessage:o(this.errorMessage,i)},this);if(n.invalidFiles.length)return n},_matchExtension:function(e,i){return String(i).indexOf(e.toLowerCase())>=0}}),n.exports=a});