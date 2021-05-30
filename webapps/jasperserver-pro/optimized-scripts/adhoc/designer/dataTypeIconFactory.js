/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/dataTypeIconEnum"],function(n,e,r){function u(n){var e=n;return o.findKey(t,function(n){return o.contains(n,e)})||""}var o=n("underscore"),t=n("../enum/dataTypeIconEnum");r.exports={getIconClassByType:u}});