/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum"],function(e,n,t){var i=e("underscore"),r=e("./enum/validationStateNameEnum"),_=function(e){this.initialize(e)};i.extend(_.prototype,{initialize:function(e){},enter:function(e,n){e.domainUri?n.enter(r.INITIALIZE_DOMAIN_DESIGNER_BY_DOMAIN_URI_STATE,e):e.dataSourceUri?n.enter(r.INITIALIZE_DOMAIN_DESIGNER_BY_DATA_SOURCE_URI_STATE,e):n.enter(r.SELECT_DATA_SOURCE_STATE,e)}}),t.exports=_});