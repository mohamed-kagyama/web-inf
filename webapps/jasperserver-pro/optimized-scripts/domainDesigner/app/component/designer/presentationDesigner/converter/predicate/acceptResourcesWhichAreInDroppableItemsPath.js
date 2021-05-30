/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,n){n.exports=function(e){var r=e.path,n=r.length,t=e.resource.id,o=e.nestingLevel,s=e.resourceIdsInItemsPaths,i=1===o,u=o>=n,d=n>o;return!!i||(u?s[t]:!!d||void 0)}});