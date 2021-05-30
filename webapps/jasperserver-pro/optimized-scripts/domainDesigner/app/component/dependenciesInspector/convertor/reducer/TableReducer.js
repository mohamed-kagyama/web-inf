/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,n,t){function r(){u.bindAll(this,"reduce")}var u=e("underscore"),o=e("../../../../../model/schema/enum/schemaEntitiesEnum");u.extend(r.prototype,{reduce:function(e){return u.omit(e,[o.TABLE])}}),t.exports=r});