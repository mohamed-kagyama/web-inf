/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,e,o){var t=n("underscore");o.exports={getColumnsComponent:function(n){return t.find(this.components.findComponentDeep("axis"),function(n){return"columns"===n.get("name")})},getRowsComponent:function(){return t.find(this.components.findComponentDeep("axis"),function(n){return"rows"===n.get("name")})},getMeasuresComponent:function(){return this.components.findComponentDeep("measures")[0]}}});