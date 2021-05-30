/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/util/SimpleModel"],function(e,t,l){var r=e("underscore"),d=e("../../../../model/util/SimpleModel");l.exports=d.extend({defaults:function(){return{collapsedItems:{},allItems:[]}},reset:function(){var e=this.defaults();r.extend(this.attributes,e)}})});