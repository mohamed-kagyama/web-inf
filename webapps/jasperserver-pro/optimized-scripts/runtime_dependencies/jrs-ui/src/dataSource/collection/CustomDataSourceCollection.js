/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,n,r){var s=e("backbone"),i=e("underscore"),o=e("runtime_dependencies/js-sdk/src/jrs.configs");r.exports=s.Collection.extend({url:o.contextPath+"/rest_v2/customDataSources",parse:function(e){var n=[];return e.definition&&i.each(e.definition,function(e){n.push({id:e})}),n}})});