/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./sidebarBlocksConverter","./workflowsConverter"],function(e,r,o){var t=e("./sidebarBlocksConverter"),n=t.sidebarBlocksConverter,l=e("./workflowsConverter"),s=l.workflowsConverter,a=function(e,r){return function(o,t,n){return{sidebarBlocks:e(o,t),workflows:r(n)}}},i=a(n,s);r.createHalModelToStateConverter=a,r.halModelToStateConverter=i});