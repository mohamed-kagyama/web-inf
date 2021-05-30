/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/components/dialog/Dialog"],function(o,i,n){var t=o("underscore"),e=o("runtime_dependencies/js-sdk/src/components/dialog/Dialog");n.exports=e.extend({constructor:function(o){this.validationErrorDialog=o.validationErrorDialog,e.prototype.constructor.call(this,{el:this.validationErrorDialog.$mount().$el})},initialize:function(o){t.bindAll(this,"_onShow"),e.prototype.initialize.apply(this,arguments),this.validationErrorDialog.$on("show",this._onShow)},_onShow:function(o){o?this.open():this.close()}})});