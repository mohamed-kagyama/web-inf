/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/enum/schemaEntitiesEnum","../../../../dispatcher/enum/applicationStateEventsEnum"],function(e,E,n){function t(e){return T[e].add}function A(e){return T[e].remove}var _=e("../../../../../model/schema/enum/schemaEntitiesEnum"),m=e("../../../../dispatcher/enum/applicationStateEventsEnum"),T={};T[_.DATA_SOURCE_GROUP]={add:m.METADATA_DESIGNER_ADD_DATA_SOURCE_GROUPS,remove:m.METADATA_DESIGNER_REMOVE_DATA_SOURCE_GROUPS},T[_.TABLE]={add:m.METADATA_DESIGNER_ADD_TABLES_WITH_TABLE_REFERENCES,remove:m.METADATA_DESIGNER_REMOVE_TABLES},n.exports={getAddEventByResourceType:t,getRemoveEventByResourceType:A}});