/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/util/SimpleModel"],function(e,t,o){var i=e("underscore"),l=e("../../../../model/util/SimpleModel");o.exports=l.extend({defaults:function(e){return{collection:[],top:0,scrollPos:0,height:0,canvasHeight:0}},reset:function(){var e=this.defaults();i.extend(this.attributes,e)}})});