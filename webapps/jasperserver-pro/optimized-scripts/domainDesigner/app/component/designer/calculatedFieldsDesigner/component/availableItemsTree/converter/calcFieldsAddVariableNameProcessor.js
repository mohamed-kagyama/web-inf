/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../util/converterUtil","../../../../../../../model/schema/util/entityUtil"],function(e,t,r){function i(e,t){return e.name.length-t.name.length}function n(e,t){if(o.isField(e.type)){var r=t.calcFieldsContext,n=a.getContextKey(e.resourceId,t),u=r.availableVariables[n];if(u){var c=l.clone(u).sort(i);e.variableName=l.first(c).name}}return e}var l=e("underscore"),a=e("../util/converterUtil"),o=e("../../../../../../../model/schema/util/entityUtil");r.exports=n});