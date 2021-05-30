/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./FilterEditor","underscore","text!./template/readOnlyFilterTemplate.htm"],function(e,t,r){var i=e("./FilterEditor"),l=e("underscore"),n=e("text!./template/readOnlyFilterTemplate.htm");r.exports=i.extend({template:l.template(n),resizeTitle:function(){},render:function(){return this}})});