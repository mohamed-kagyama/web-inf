/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/components/dialog/Dialog"],function(e,n,i){var o=e("underscore"),t=e("runtime_dependencies/js-sdk/src/components/dialog/Dialog");i.exports=t.extend({constructor:function(e){this.renameDialog=e.renameDialog,t.prototype.constructor.call(this,{el:this.renameDialog.$mount().$el})},initialize:function(e){o.bindAll(this,"_onShow"),this._initEvents(),t.prototype.initialize.apply(this,arguments)},_initEvents:function(){this.renameDialog.$on("show",this._onShow)},_onShow:function(e){e?this.open():this.close()}})});