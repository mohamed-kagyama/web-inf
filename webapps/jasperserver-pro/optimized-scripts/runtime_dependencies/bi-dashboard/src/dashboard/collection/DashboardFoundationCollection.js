/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../dashboardSettings","../model/DashboardFoundationModel"],function(o,e,n){var t=o("backbone"),d=o("../dashboardSettings"),a=o("../model/DashboardFoundationModel");n.exports=t.Collection.extend({model:a,addDefaultFoundation:function(){return this.add(new a({id:d.DEFAULT_FOUNDATION_ID,components:d.DEFAULT_FOUNDATION_COMPONENTS_ID,layout:d.DEFAULT_FOUNDATION_LAYOUT_ID,wiring:d.DEFAULT_FOUNDATION_WIRING_ID}))},getDefaultFoundation:function(){return this.get(d.DEFAULT_FOUNDATION_ID)}})});