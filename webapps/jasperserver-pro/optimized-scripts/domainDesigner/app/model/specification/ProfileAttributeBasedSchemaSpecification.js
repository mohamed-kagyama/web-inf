/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/util/profileAttributeUtil"],function(e,i,t){var r=e("underscore"),o=e("../../../model/util/profileAttributeUtil"),n=function(e){this.initialize(e)};r.extend(n.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},isSatisfiedBy:function(e){var i=this.clientDomainSchemaService.getDataSourceGroupByName(e);return i&&i.sourceName&&o.containsProfileAttribute(i.sourceName)}}),t.exports=n});