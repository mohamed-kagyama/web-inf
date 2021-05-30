/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,t){t.exports={execute:function(e){var r=e.store;r.set({isVisible:r.get("ownDesigner")===e.state.viewState.getCurrentDesigner(),searchKeyword:e.searchKeyword})}}});