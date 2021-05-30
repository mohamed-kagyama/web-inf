/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../layout/sidebarView/enum/artificialTreeResourceTypesEnum","../../../../model/schema/enum/schemaEntitiesEnum"],function(e,i,r){var u=e("underscore"),m=e("../../layout/sidebarView/enum/artificialTreeResourceTypesEnum"),n=e("../../../../model/schema/enum/schemaEntitiesEnum"),s=u.omit(n,[n.FILTER_EXPRESSION,n.COMPLEX_FILTER]),a=u.pick(m,m.PRE_FILTER);r.exports=u.extend({},a,s)});