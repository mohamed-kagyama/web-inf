/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,n,i){var t=e("underscore"),r=e("../../../../../model/schema/enum/schemaEntitiesEnum"),u=[r.JOIN,r.JOIN_ALIAS,r.JOIN_EXPRESSION,r.CONSTANT_JOIN_EXPRESSION,r.COMPLEX_JOIN],o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(){t.bindAll(this,"reduce")},reduce:function(e,n){return-1===t.indexOf(u,n.targetEntityType)?e:[]}}),i.exports=o});