/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,t,r){var i=e("underscore"),n=e("../../../../../model/schema/util/entityUtil"),o=function(e){this.initialize(e)};i.extend(o.prototype,{initialize:function(e){i.bindAll(this,"convert"),this.resourceConverter=e.resourceConverter},convert:function(e,t){return n.isDataSource(e)?t.properties.elements:this.resourceConverter.convert(e,t)}}),r.exports=o});