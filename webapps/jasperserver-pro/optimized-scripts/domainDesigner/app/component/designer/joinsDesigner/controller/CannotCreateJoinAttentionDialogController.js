/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(t,i,n){var e=t("underscore"),o=t("backbone"),s=function(t){this.initialize(t)};e.extend(s.prototype,{initialize:function(t){this.attentionDialog=t.attentionDialog,this.joinsDesignerEventBus=t.joinsDesignerEventBus,this._initEvents()},_initEvents:function(){this.listenTo(this.joinsDesignerEventBus,"attentionDialog:close",this._closeAttentionDialog)},_closeAttentionDialog:function(){this.attentionDialog.close()}},o.Events),n.exports=s});