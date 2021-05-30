/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,t){var r=e("underscore");t.exports={getPositionsOfSelectedItems:function(e){return r.map(e,function(e){return e.index})},getIdsOfSelectedItems:function(e){return r.map(e,function(e){return e.id})}}});