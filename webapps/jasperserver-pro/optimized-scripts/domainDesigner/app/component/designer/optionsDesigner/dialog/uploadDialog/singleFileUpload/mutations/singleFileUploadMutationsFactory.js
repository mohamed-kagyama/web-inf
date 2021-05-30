/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,o){function s(e){var r=e.store;return{selectFile:function(e){r.file=e},setErrorMessage:function(e){r.errorMessage=e},clearErrorMessage:function(){r.errorMessage=""}}}o.exports={create:s}});