/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","settings!domainSettings","../../../../util/designer/filters/enum/booleanStringEquivalentEnum"],function(e,t,n){var i=e("jquery"),l=e("underscore"),r=e("settings!domainSettings"),a=e("../../../../util/designer/filters/enum/booleanStringEquivalentEnum"),u=function(e){this.initialize(e)};l.extend(u.prototype,{initialize:function(){l.bindAll(this,"getData")},getData:function(e){e=e||{};var t=e.criteria,n=new i.Deferred,l=[{label:r.nullLabel,value:r.nullLabel},{label:a.TRUE,value:a.TRUE},{label:a.FALSE,value:a.FALSE}];return t&&(l=l.filter(function(e){return e.label.toLowerCase().indexOf(t.toLowerCase())>-1})),n.resolve({data:l,total:l.length}),n}}),n.exports=u});