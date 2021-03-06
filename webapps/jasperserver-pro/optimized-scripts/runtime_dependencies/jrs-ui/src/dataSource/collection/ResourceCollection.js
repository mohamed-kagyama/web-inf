/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","../model/JdbcDriverModel"],function(e,t,i){var r=e("backbone"),n=e("underscore"),o=e("../model/JdbcDriverModel");i.exports=r.Collection.extend({model:o,initialize:function(e,t){this.options=t},getDefaultDriver:function(){var e=this.find(function(e){return!n.isUndefined(e.get("default"))&&!1!==e.get("default")});return e||this.first()},set:function(e,t){return void 0===t&&(t={}),n.extend(t,this.options),r.Collection.prototype.set.call(this,e,t)},getDriverByClass:function(e){var t=this.findWhere({jdbcDriverClass:e});return t||this.findWhere({jdbcDriverClass:o.OTHER_DRIVER})},getAllPossibleCustomAttributes:function(){return n.keys(o.VALIDATION_PATTERNS)}})});