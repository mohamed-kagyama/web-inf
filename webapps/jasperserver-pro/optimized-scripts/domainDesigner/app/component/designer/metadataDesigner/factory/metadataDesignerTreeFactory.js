/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/components/scalableList/view/ListWithSelection","runtime_dependencies/js-sdk/src/components/scalableList/trait/nativeMultiSelectionTrait","../../../layout/sidebarView/tree/trait/setValueWithoutRerenderTrait","../../../../common/util/initializeTreePluginsUtil"],function(e,i,t){var n=e("runtime_dependencies/js-sdk/src/components/scalableList/view/ListWithSelection"),s=e("runtime_dependencies/js-sdk/src/components/scalableList/trait/nativeMultiSelectionTrait"),r=e("../../../layout/sidebarView/tree/trait/setValueWithoutRerenderTrait"),a=e("../../../../common/util/initializeTreePluginsUtil"),l=n.extend(s).extend(r);t.exports={create:function(e){var i=new l(e);return a.initTreePlugins(i,e.plugins),i}}});