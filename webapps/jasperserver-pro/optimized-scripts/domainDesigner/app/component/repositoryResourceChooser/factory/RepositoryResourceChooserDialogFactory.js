/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){function n(e){e=e||e,o.bindAll(this,"create"),this.Dialog=e.Dialog}var o=e("underscore");o.extend(n.prototype,{create:function(e){return new(0,this.Dialog)(e)}}),t.exports=n});