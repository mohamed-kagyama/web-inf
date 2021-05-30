/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,a,t){var l=e("underscore"),r=function(e){this.initialize(e)};l.extend(r.prototype,{initialize:function(e){l.bindAll(this,"_memberToAvailableItemEntryMapper"),this.availableValuesLabelConverter=e.availableValuesLabelConverter,this.availableValuesValueConverter=e.availableValuesValueConverter},convert:function(e,a){var t=l.partial(this._memberToAvailableItemEntryMapper,a);return{data:(e.dataset.levels[0].group.members||[]).map(t),total:e.totalCounts}},_memberToAvailableItemEntryMapper:function(e,a){return{label:this.availableValuesLabelConverter.convert(a,e),value:this.availableValuesValueConverter.convert(a,e)}}}),t.exports=r});