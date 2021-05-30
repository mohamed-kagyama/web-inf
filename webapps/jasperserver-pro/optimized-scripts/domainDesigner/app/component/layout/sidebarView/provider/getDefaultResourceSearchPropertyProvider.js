/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var o=e("underscore");n.exports=function(e,r){var n={};return e.tableReferenceId&&(n=r.tableReferenceToTableMap[e.tableReferenceId]||{}),o.reduce([e.name,n.name,e.sourceName],function(e,r){return r&&e.push(r.toLowerCase()),e},[])}});