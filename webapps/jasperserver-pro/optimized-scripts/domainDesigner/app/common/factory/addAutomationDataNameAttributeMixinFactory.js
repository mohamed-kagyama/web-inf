/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function u(e){var n={};return i.each(e,function(e,r){n[r]=function(){return e}}),n}var i=e("underscore");r.exports={create:function(e){var n=e.config,r=e.dataNames;return n.mixins?n.mixins.push({computed:u(r)}):n.mixins=[{computed:u(r)}],n}}});