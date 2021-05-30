/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,o){function s(e){var r=e.store;return{addFiles:function(e){e=r.files.concat(e),r.files=e},replaceFiles:function(e){r.files=e},removeFile:function(e){r.files.splice(e,1)},setPopoverErrorMessage:function(e){r.popover.errorMessage=e},clearPopoverErrorMessage:function(){r.popover.errorMessage=""}}}o.exports={create:s}});