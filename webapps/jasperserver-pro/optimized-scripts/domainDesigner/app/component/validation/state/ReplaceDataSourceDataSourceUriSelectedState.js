/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./enum/validationStateNameEnum","./util/validationStateContextUtil"],function(t,e,i){var n=t("underscore"),a=t("./enum/validationStateNameEnum"),o=t("./util/validationStateContextUtil"),u=function(t){this.initialize(t)};n.extend(u.prototype,{initialize:function(t){},enter:function(t,e){o.setDataSource(t,t.dataSourceUri),e.enter(a.REPLACE_DATA_SOURCE_STATE,t)}}),i.exports=u});