/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,r){r.exports={convert:function(e,n){var r=n.joinTree,t=r.getId(),o=n.path,i=o.length,u=n.nestingLevel,c=i===u+1,d=1===u;return(i===u||d&&c)&&(e.sourceJoinTreeId=t),e}}});