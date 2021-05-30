/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,r){function o(e,n){return!n||(t.isArray(e)?Boolean(t.find(e,function(e){return o(e,n)})):e.toLowerCase().indexOf(n.toLowerCase())>=0)}function i(e){return Boolean(t.find(e,function(e){return e.isVisible}))}var t=e("underscore");r.exports={matchSearchKeyword:o,isOneOfTheNodesVisible:i}});