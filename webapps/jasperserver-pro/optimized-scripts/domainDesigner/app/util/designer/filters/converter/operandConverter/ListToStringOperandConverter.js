/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,t,n){var i=e("underscore"),r=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=s.create(r),m=i.template("{{= value }}"),l=i.template(o("domain.designer.filters.expression.operand.isAnyValue")),u=function(e){this.initialize(e)};i.extend(u.prototype,{initialize:function(e){this.maxStringWidth=e.maxStringWidth||50,this.listItemsConverter=e.listItemsConverter},convert:function(e){return(e.isAll?l:m)({value:this._formatItems(e.items)})},_formatItems:function(e){var t="",n=0;for(e=this.listItemsConverter.convert(e);t.length<this.maxStringWidth&&n<e.length;)n>0&&(t+=", "),t+=e[n],n+=1;return t}}),n.exports=u});