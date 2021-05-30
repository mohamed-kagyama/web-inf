/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../util/indexLocalFilesUtil","../util/mergeValidationErrorsUtil"],function(i,e,t){var l=i("underscore"),n=i("../util/indexLocalFilesUtil"),r=i("../util/mergeValidationErrorsUtil"),o=function(i){this.initialize(i)};l.extend(o.prototype,{initialize:function(i){this.validationRules=i.validationRules||[]},validate:function(i,e){if(i.length){i=n.indexFiles(i);var t=l.map(this.validationRules,function(t){return t.validate(i,e)}),o=r.mergeErrors(t);return o.invalidFiles.length?o:void 0}}}),t.exports=o});