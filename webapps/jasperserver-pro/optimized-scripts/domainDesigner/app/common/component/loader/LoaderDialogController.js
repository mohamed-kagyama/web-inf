/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,t,o){var n=e("underscore"),s=e("backbone"),i=function(e){this.loader=e.loader,this.loaderEventBus=e.loaderEventBus,this._initEvents()};n.extend(i.prototype,s.Events,{_initEvents:function(){this.listenTo(this.loaderEventBus,"show",this._show),this.listenTo(this.loaderEventBus,"hide",this._hide)},_show:function(){this.loader.open()},_hide:function(){this.loader.close()}}),o.exports=i});