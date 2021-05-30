/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/schema/util/entityUtil","../../model/enum/defaultSchemaNameEnum"],function(e,m,t){function u(e){var m=n.isDataSourceGroup(e),t=e.name===a.DEFAULT_SCHEMA;return!m||!t||e.children.size()>0}var n=e("../../../model/schema/util/entityUtil"),a=e("../../model/enum/defaultSchemaNameEnum");t.exports=u});