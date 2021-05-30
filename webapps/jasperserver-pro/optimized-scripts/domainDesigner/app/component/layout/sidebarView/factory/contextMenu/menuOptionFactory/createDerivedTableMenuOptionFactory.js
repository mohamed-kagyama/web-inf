/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../../../../../model/schema/util/entityUtil","../enum/menuOptionsEventsEnum"],function(e,n,t){var i=e("bundle!DomainDesignerBundle"),r=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),s=e("../../../../../../../model/schema/util/entityUtil"),u=e("../enum/menuOptionsEventsEnum"),a=r.create(i);t.exports={create:function(){return function(e){return{label:a("domain.designer.derivedTables.createDerivedTables"),action:u.CREATE_DERIVED_TABLE.event,value:!1,triggerEvent:"sidebar:createDerivedTable",test:function(){return s.isDataSource(e.resource.type)}}}}}});