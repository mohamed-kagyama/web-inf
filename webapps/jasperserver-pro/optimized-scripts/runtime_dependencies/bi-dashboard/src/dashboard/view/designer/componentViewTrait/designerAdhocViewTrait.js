/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../base/componentViewTrait/adhocTrait","../../../collection/ReportsParametersCollection"],function(e,t,r){function o(e,t){var r=n.filter(e,function(e){return!e.parametrizeProperty}),o=n.pluck(r,"id"),i=n.pluck(t,"id"),a=n.difference(o,i),l=n.difference(i,o);return a.length||l.length}var n=e("underscore"),i=e("../../base/componentViewTrait/adhocTrait"),a=e("../../../collection/ReportsParametersCollection"),l=a.instance,s=i._initComponent;r.exports=n.extend({},i,{_initComponent:function(){var e=this;return l.getReportParameters(this.model.resource.resource.get("uri")).done(function(t,r){if(o(e.model.get("parameters"),t)||o(e.model.get("outputParameters"),r))e.model.set({parameters:t,outputParameters:r});else{var i,a=e.model.get("outputParameters");if(a)for(i=0;i<r.length;i++)n.findWhere(a,{id:r[i].id}).label=r[i].label;if(a=e.model.get("parameters"))for(i=0;i<t.length;i++)n.findWhere(a,{id:t[i].id}).label=t[i].label}}),s.apply(this,arguments)}})});