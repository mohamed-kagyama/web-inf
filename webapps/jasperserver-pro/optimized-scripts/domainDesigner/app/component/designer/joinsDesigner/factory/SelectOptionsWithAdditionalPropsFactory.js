/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,a){var i=e("underscore"),n=function(e){this.initialize(e)};i.extend(n.prototype,{initialize:function(e){this.className=e.className},create:function(e){var t=e.operators;return i.map(t,function(e){return{label:e.label,value:e.name,className:this.className}},this)}}),a.exports=n});