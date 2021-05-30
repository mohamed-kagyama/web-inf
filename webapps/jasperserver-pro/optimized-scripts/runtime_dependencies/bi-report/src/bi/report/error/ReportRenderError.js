/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError","underscore","runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes","runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages"],function(e,r,n){var o=e("runtime_dependencies/js-sdk/src/common/bi/error/BiComponentError"),s=e("underscore"),t=e("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorCodes"),i=e("runtime_dependencies/js-sdk/src/common/bi/error/enum/biComponentErrorMessages");n.exports=o.extend({constructor:function(e){var r=t.REPORT_RENDER_ERROR,n=i[r];s.extend(this,e),"wrongContainerSize"===e.type&&(r=t.WRONG_CONTAINER_SIZE_ERROR,n=e.data.error+" "+e.data.message),"highchartsInternalError"===e.type&&(r=t.REPORT_RENDER_HIGHCHARTS_ERROR,n=e.data.error+" "+e.data.message),o.prototype.constructor.call(this,r,n)}})});