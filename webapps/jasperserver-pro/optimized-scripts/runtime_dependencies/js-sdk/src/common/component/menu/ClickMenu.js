/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./Menu","../base/ClickComponent"],function(t,e,o){function r(){return r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r])}return t},r.apply(this,arguments)}var p=t("./Menu"),n=t("../base/ClickComponent");o.exports=p.extend(n.extend({constructor:function(t,e,o){o||(o={});var i=r({toggleMode:o.menuToggleMode},o);n.call(this,e,o.padding,i);try{p.call(this,t,o)}catch(t){throw n.prototype.remove.apply(this,arguments),t}},show:function(){return n.prototype.show.apply(this,arguments),p.prototype.show.apply(this,arguments)},remove:function(){n.prototype.remove.apply(this,arguments),p.prototype.remove.apply(this,arguments)}}).prototype)});