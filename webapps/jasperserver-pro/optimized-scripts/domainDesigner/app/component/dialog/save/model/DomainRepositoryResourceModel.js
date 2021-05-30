/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel"],function(e,r,t){var o=e("underscore"),i=e("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");t.exports=i.extend({_getSaveUrlOptions:function(e){var r=e.skipDataBaseMetadataCheck;return e=i.prototype._getSaveUrlOptions.call(this,e),e=o.omit(e,"skipDataBaseMetadataCheck"),e=o.extend({},e,{url:e.url+"&skipDataBaseMetadataCheck="+(!0===r)})}})});