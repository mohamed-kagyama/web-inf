/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../model/enum/canvasViewDesignersEnum","../../../common/component/search/store/SearchStore","../../../component/designer/filtersDesigner/store/FiltersDesignerStore","../../../component/layout/sidebarView/component/store/SidebarLayoutStore"],function(e,r,n){var o=e("underscore"),t=e("../../../model/enum/canvasViewDesignersEnum"),s=e("../../../common/component/search/store/SearchStore"),i=e("../../../component/designer/filtersDesigner/store/FiltersDesignerStore"),a=e("../../../component/layout/sidebarView/component/store/SidebarLayoutStore");n.exports=function(e,r){var n={ownDesigner:t.FILTERS_DESIGNER};e.register("filtersDesignerSidebarSearchStore",new s(n)),e.register("filtersDesignerSidebarStore",new a(n)),e.register("filtersDesignerStore",new i(o.extend(n,{canvasHeight:r.filtersDesigner.height.canvas})))}});