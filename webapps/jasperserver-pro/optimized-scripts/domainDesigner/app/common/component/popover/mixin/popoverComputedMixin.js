/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,r){var i=e("underscore");r.exports={computed:{isVisible:function(){return this.isTextArray?Boolean(this.text.length):Boolean(this.text)},isTextArray:function(){return i.isArray(this.text)}}}});