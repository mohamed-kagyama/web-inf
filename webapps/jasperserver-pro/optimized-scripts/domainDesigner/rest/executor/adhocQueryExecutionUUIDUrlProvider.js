/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/endpointsEnum"],function(e,n,u){var o=e("../enum/endpointsEnum");u.exports={get:function(e){return o.QUERY_EXECUTIONS_SERVICE+"/"+e.responseJSON.id}}});