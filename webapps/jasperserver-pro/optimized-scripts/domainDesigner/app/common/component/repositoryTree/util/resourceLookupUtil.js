/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"],function(e,r,o){function i(e){return e.resourceType===s.FOLDER}function n(e){var r=e._links;return i(e)&&!r.content}var s=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");o.exports={isEmptyFolder:n,isFolder:i}});