/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,t){t.exports=function(e){var n=e.path,t=n.length,r=e.nestingLevel,i=1===r,o=t<r,u=t>r,f=t===r;return!o&&((!i||!f)&&(i||u||f))}});