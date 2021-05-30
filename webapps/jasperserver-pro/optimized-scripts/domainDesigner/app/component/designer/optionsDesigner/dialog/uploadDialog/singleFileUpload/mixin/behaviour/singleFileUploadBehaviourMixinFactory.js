/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,r){function n(e){var t=e.singleFileUploadActions,r=e.singleFileUploadStateMutations;return{methods:{selectFile:function(e){t.loadFileWithContent(e).then(function(e){r.selectFile(e)})},setErrorMessage:function(e){r.setErrorMessage(e)},clearErrorMessage:function(){r.clearErrorMessage()}}}}r.exports={create:n}});