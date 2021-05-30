/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var n=e("underscore"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){var t=e.template||"{{= originalName + '_' + sequenceNumber}}";this.template=n.isString(t)?n.template(t):t,this.sequenceGenerator=e.sequenceGenerator,this.exists=e.exists||function(){return!1}},generate:function(e,t){var i=e||this._getIdentifier();for(t=t||this.exists;t(i);)i=this._getIdentifier(e);return i},reset:function(){this.sequenceGenerator.reset&&this.sequenceGenerator.reset()},_getIdentifier:function(e){return this.template({originalName:e||"",sequenceNumber:this.sequenceGenerator.next()})}}),i.exports=r});