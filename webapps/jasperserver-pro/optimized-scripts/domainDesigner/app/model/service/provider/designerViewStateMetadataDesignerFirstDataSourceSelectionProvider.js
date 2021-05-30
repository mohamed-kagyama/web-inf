/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../util/uriUtil","../../../../model/schema/enum/schemaEntitiesEnum"],function(e,i,t){var r=e("../../../util/uriUtil"),u=e("../../../../model/schema/enum/schemaEntitiesEnum");t.exports={getSidebarSelectedResource:function(e){var i=e.first();return{resourceId:i.id,type:u.DATA_SOURCE,id:r.getAbsoluteUri(i.id)}}}});