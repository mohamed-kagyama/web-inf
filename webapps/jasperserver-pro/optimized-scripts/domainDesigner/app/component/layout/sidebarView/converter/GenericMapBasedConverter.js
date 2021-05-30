/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,t,r){var n=e("underscore"),o=e("../../../../../model/schema/util/entityUtil"),i=function(e){n.bindAll(this,"convert"),this.converterMap=e.converterMap};n.extend(i.prototype,{convert:function(e,t){var r=o.getEntityName(e)||e.type;return this.converterMap[r](e,t)}}),r.exports=i});