/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","../enum/mimeTypesEnum"],function(e,t,n){var r=e("underscore"),u=e("jquery"),i=e("../enum/mimeTypesEnum"),o=function(e){this.initialize(e)};r.extend(o.prototype,{initialize:function(e){this.contextExecutor=e.contextExecutor},executeAdhocQuery:function(e){var t=e.adhocQuery,n=e.domain,r=e.queryParams||{},o=u.param(r),c={contentType:i.ADHOC_MULTILEVEL_QUERY,accept:i.ADHOC_MULTILEVEL_QUERY,data:JSON.stringify({dataSource:{domain:n},query:t})},a={url:"/data"+(o?"?"+o:""),type:"GET",accept:i.ADHOC_MULTILEVEL_DATA};return this.contextExecutor.execute(c,a)}}),n.exports=o});