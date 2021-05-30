/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,t){var r=e("underscore"),n=function(e){this.initialize(e)};r.extend(n.prototype,{initialize:function(e){this.clientDataSourceGroupService=e.clientDataSourceGroupService},isSatisfied:function(e){return""===this.clientDataSourceGroupService.getName(e)}}),t.exports=n});