/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/enum/resourceTypeEnum"],function(e,r,u){var n=e("../../../../../model/enum/resourceTypeEnum");u.exports=function(e){return(e[n.resources.groups.GROUP].elements||[]).length>0}});