/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/enum/draftStateTypesEnum"],function(e,u,d){var o=e("underscore"),r=e("../../../model/enum/draftStateTypesEnum"),a=o.values(r);d.exports={save:a,saveAs:a,uploadSchema:a,undo:a,"undo:all":a,redo:a}});