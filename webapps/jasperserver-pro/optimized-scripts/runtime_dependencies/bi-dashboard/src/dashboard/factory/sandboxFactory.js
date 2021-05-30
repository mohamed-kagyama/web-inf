/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../Sandbox","underscore"],function(e,n,r){var o=e("../Sandbox"),u=e("underscore");r.exports={get:u.memoize(function(e){return e?new o:null})}});