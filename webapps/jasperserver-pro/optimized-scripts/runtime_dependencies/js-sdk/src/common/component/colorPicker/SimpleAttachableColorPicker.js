/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./SimpleColorPicker","../base/ClickComponent","jquery"],function(e,o,t){var i=e("./SimpleColorPicker"),p=e("../base/ClickComponent"),r=e("jquery");t.exports=i.extend(p.extend({constructor:function(e,o,t){p.call(this,e,o),i.call(this,t)},initialize:function(){i.prototype.initialize.apply(this),this.hide(),r("body").append(this.$el)},_selectColor:function(e){this.hide(),i.prototype._selectColor.apply(this,arguments)},remove:function(){p.prototype.remove.apply(this,arguments),i.prototype.remove.apply(this,arguments)}}).prototype)});