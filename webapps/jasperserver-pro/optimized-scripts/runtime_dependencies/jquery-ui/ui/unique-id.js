/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(i){"function"==typeof define&&define.amd?define(["jquery","./version"],i):i(jQuery)}(function(i){return i.fn.extend({uniqueId:function(){var i=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++i)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&i(this).removeAttr("id")})}})});