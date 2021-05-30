/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(i,e,t){var n=i("underscore"),l=i("../../../../../model/schema/util/entityUtil"),c=function(i){this.initialize(i)};n.extend(c.prototype,{initialize:function(i){this.clientDomainSchemaCalcFieldsService=i.clientDomainSchemaCalcFieldsService},isSatisfiedBy:function(i){var e=i.id,t=i.type;return l.isCalcField(t)?!this.clientDomainSchemaCalcFieldsService.isConstantCalcField(e):l.isField(t)}}),t.exports=c});