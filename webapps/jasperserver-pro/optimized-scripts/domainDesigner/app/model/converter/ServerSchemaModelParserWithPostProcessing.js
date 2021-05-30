/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,s){var t=e("underscore"),i=function(e){this.initialize(e)};t.extend(i.prototype,{initialize:function(e){this.parser=e.parser,this.postProcess=e.postProcess},parse:function(e){var r=this.parser.parse(e);return this.postProcess(r)}}),s.exports=i});