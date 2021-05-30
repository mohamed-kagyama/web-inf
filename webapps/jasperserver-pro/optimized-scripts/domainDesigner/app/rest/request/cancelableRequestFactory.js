/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(r,e,n){var o=r("underscore");n.exports={create:function(r){var e=r.request,n=r.loaderController,u=r.cancelFunc;return function(r){var t=u?o.bind(u,u,r):null;return n.wrapWithLoader(e(r),t)}}}});