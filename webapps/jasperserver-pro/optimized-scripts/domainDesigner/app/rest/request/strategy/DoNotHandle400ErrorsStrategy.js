/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,t){var n=r("underscore"),o=function(r){this.delegatingErrorHandlerStrategy=r.delegatingErrorHandlerStrategy};n.extend(o.prototype,{handleError:function(r){var e=r.status;(e<400||e>=500)&&this.delegatingErrorHandlerStrategy.handleError(r)}}),t.exports=o});