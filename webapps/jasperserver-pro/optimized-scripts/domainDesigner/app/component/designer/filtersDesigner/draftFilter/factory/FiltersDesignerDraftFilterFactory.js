/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/draftFilterStateEnum","jquery"],function(e,t,r){var n=e("underscore"),o=e("../enum/draftFilterStateEnum"),u=e("jquery"),a=function(e){this.stateFactory=e.stateFactory};n.extend(a.prototype,{create:function(e,t){var r=u.Deferred();return this.stateFactory.enter(o.INITIAL_STATE,{currentFilter:e,newFilterOptions:t,deferred:r}),r.promise()}}),r.exports=a});