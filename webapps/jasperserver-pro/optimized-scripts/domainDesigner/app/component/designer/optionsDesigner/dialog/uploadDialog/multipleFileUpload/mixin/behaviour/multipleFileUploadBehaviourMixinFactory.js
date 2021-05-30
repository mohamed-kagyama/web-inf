/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,o,t){function i(e){var o=e.multipleFileUploadActions,t=e.multipleFileUploadStateMutations;return{methods:{addFiles:function(e){o.loadFilesWithContent(e).then(function(e){t.addFiles(e)})},replaceFiles:function(e){o.loadFilesWithContent(e).then(function(e){t.replaceFiles(e)})},removeFile:function(e){t.removeFile(e)},closeErrorPopover:function(){t.clearPopoverErrorMessage()}}}}t.exports={create:i}});