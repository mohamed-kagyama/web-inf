/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../util/indexFileReferencesUtil","../util/mergeValidationErrorsUtil"],function(e,i,t){var n=e("underscore"),r=e("../util/indexFileReferencesUtil"),l=e("../util/mergeValidationErrorsUtil"),a=function(e){this.initialize(e)};n.extend(a.prototype,{initialize:function(e){this.validationRules=e.validationRules||[]},validate:function(e){e=r.indexFileReferences(e);var i=n.map(this.validationRules,function(i){return i.validate(e)}),t=l.mergeErrors(i);if(t.invalidFiles.length)return t}}),t.exports=a});