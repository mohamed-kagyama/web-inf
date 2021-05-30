/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery"],function(e,r,n){var t=e("underscore"),i=e("jquery"),o=function(e){this.initialize(e)};t.extend(o.prototype,{initialize:function(e){e=e||{},this.FileReaderConstructor=e.FileReader||FileReader},loadFilesWithContent:function(e){e=t.isArray(e)?e:[e];var r=t.map(e,function(e){var r=new this.FileReaderConstructor,n=new i.Deferred;return r.onload=function(){n.resolve({name:e.name,content:r.result})},r.readAsText(e),n},this);return i.when.apply(i,r).then(function(){return Array.prototype.slice.call(arguments,0)})}}),n.exports=o});