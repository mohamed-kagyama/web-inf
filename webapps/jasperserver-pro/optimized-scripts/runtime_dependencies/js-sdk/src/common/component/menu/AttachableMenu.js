/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./Menu","../base/AttachableComponent"],function(t,e,o){var n=t("./Menu"),p=t("../base/AttachableComponent");o.exports=n.extend(p.extend({constructor:function(t,e,o,s){this.padding=o||{top:0,left:0},p.call(this,e,this.padding),n.call(this,t,s)},show:function(){return p.prototype.show.apply(this,arguments),n.prototype.show.apply(this,arguments)}}).prototype)});