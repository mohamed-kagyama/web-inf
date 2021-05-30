/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/util/entityUtil"],function(e,r,t){var i=e("underscore"),s=e("../../../../../model/schema/util/entityUtil");t.exports=function(e){var r=e.resource,t=e.resourceJson,o=e.isResourceMatch;return s.isField(r)?o:!!o||i.size(t.elements)>0}});