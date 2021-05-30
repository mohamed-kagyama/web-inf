/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,t){function n(e,r){var t=e.designerName,n=e.state,s=e.viewState,i=e.storeChangeEventBus;s.get&&s.get.withArgs("currentTab").returns(r.currentTab),s.getCurrentDesigner&&s.getCurrentDesigner.returns(r.currentDesigner),s.getCurrentResource&&s.getCurrentResource.withArgs(t).returns(r.currentResource),s.getSearchKeyword&&s.getSearchKeyword.withArgs(t).returns(r.searchKeyword),i.trigger("change:viewState",n)}function s(e,r){e.get.withArgs("isVisible").returns(r.isVisible)}var i=e("underscore");t.exports=function(e){var r=e.designerName,t=e.state,u=e.model,a=e.storeChangeEventBus,g=e.viewState;return{setupViewState:i.partial(n,{designerName:r,viewState:g,state:t,storeChangeEventBus:a}),setupViewModel:i.partial(s,u)}}});