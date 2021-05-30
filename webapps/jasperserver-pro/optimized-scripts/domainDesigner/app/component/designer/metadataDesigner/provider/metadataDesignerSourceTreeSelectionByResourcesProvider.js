/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/util/profileAttributeUtil","../../../../util/getResourceSourceNameOrNameUtil","../../../../model/enum/defaultSchemaNameEnum"],function(e,t,r){function u(e){return i.filter(e,function(e){var t=m(e);return!o.containsProfileAttribute(t)&&e.name!==l.DEFAULT_SCHEMA})}function n(e){return e=u(e),e.map(function(e){return e.sourceName||e.name})}var i=e("underscore"),o=e("../../../../../model/util/profileAttributeUtil"),m=e("../../../../util/getResourceSourceNameOrNameUtil"),l=e("../../../../model/enum/defaultSchemaNameEnum");r.exports={getSelection:n}});