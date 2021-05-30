/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("../../../../../model/schema/util/entityUtil");t.exports=function(e){var i=e.resource,t=e.table,l=r.isDerivedTable(i),n=t&&r.isDerivedTable(t);return!!l||n}});