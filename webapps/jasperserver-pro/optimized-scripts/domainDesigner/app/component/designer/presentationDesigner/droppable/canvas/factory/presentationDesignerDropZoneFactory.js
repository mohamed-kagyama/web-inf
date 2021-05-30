/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,r){r.exports={create:function(e){var n=e.index,r=e.which;return{ownerId:e.ownerId,parentId:e.parentId,which:r,index:n,accepts:e.accepts,isDropZone:!0,isVisible:!1}}}});