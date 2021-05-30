/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryFileModel","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryFileTypes","underscore"],function(e,r,i){var o=e("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryFileModel"),t=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryFileTypes"),s=e("underscore");i.exports=o.extend({stringifyContent:!1,defaults:function(){return s.extend({},o.prototype.defaults,{type:t.HTML})}()})});