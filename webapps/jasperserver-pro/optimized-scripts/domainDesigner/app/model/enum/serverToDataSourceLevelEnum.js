/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./dataSourceLevelEnum","./serverLevelEnum"],function(e,r,u){var A=e("./dataSourceLevelEnum"),E=e("./serverLevelEnum"),L={};L[E.SCHEMA]=A.DATA_SOURCE_GROUP,L[E.DATA_ISLAND]=A.TABLE,L[E.TABLE]=A.TABLE,u.exports=L});