/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,r){function n(e,i){return l.filter(e,function(e){return!l.find(i,function(i){return i.index===e.index})})}var l=e("underscore");r.exports={mergeErrors:function(e){var i=l.reduce(e,function(e,i){if(!i)return e;var r=n(i.validFiles,e.validFiles);e.validFiles=e.validFiles.concat(r);var l=n(i.invalidFiles,e.invalidFiles);return e.invalidFiles=e.invalidFiles.concat(l),e.errorMessage=e.errorMessage.concat(i.errorMessage),e},{invalidFiles:[],validFiles:[],errorMessage:[]},this);return l.extend({},i,{validFiles:n(i.validFiles,i.invalidFiles)})}}});