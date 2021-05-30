/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/util/entityUtil"],function(e,t,i){var n=e("../../../../../model/schema/util/entityUtil");i.exports=function(e){var t=e.resource,i=e.schema;return!n.isTableReference(t)||!i.joinAliases.find(function(e){return e.getTableReferenceId()===t.getId()})}});