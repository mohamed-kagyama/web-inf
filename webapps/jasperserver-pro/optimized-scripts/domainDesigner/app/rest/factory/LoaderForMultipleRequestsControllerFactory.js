/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,o,n){var r=e("underscore"),t=function(e){this.LoaderForMultipleRequestsController=e.LoaderForMultipleRequestsController,this.loadingDelay=e.loadingDelay,this.loadingMinDuration=e.loadingMinDuration};r.extend(t.prototype,{create:function(e){var o=e.loaderEventBus;return new this.LoaderForMultipleRequestsController({loadingDelay:this.loadingDelay,loadingMinDuration:this.loadingMinDuration,loaderEventBus:o})}}),n.exports=t});