/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,o){var s=r("underscore"),n=function(r){s.bindAll(this,"process"),this.processors=r?s.isArray(r)?r:[r]:[]};s.extend(n.prototype,{process:function(r){var e=Array.prototype.slice.call(arguments,1);return s.reduce(this.processors,function(r,o){return o.apply(null,[r].concat(e))},r)}}),o.exports=n});