/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/loggingLevels"],function(e,t,n){function r(e,t){this.level=e,this.name=t.toUpperCase()}var o=e("../enum/loggingLevels");r.prototype.isGreaterOrEqual=function(e){var t=(e instanceof r?e:r.getLevel(e)).level;return this.level>=t},r.prototype.toString=function(){return this.name},r.getLevel=function(e){return r[e.toUpperCase()]};for(var i in o)o.hasOwnProperty(i)&&(r[i]=new r(o[i],i));n.exports=r});