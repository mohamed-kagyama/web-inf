/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"],function(e,r,o){var i=e("underscore"),s=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");o.exports=function(e,r){return i.some(r,function(r){if(e[r.id])return r.properties.resourceType===s.FOLDER})}});