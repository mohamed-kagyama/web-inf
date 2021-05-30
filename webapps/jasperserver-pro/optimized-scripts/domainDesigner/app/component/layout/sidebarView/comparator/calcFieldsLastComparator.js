/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("../../../../../model/schema/util/entityUtil");t.exports=function(e,i){e=e.resource,i=i.resource;var t=r.isCalcField(e.type),l=r.isCalcField(i.type),o=t&&l;return!t&&!l||o?0:t?1:l?-1:void 0}});