/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var t=e("underscore");i.exports={create:function(e){var r=e.singleFileUploadActions,i=e.singleFileUploadStateMutations,a=e.validator;return{methods:{selectFile:function(e){var t=this;r.loadFileWithContent(e).then(function(e){var r=t._validateFile(e);r?(e=r.file,i.setErrorMessage(r.errorMessage)):i.clearErrorMessage(),i.selectFile(e)})},_validateFile:function(e){var r=a.validate([e],[]);if(r)return{file:t.first(r.invalidFiles),errorMessage:t.first(r.errorMessage)}}}}}}});