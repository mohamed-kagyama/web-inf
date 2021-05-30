/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseAutowiringStrategy","../../enum/dashboardWiringStandardIds"],function(e,i,r){var a=e("./BaseAutowiringStrategy"),d=e("../../enum/dashboardWiringStandardIds");r.exports=a.extend({autowire:function(e,i,r){if(i.isVisualization()||i.isParametrized()){var a=i.collection,n=a.getDashboardPropertiesComponent();e.get(n.id+":"+d.INIT_SIGNAL).consumers.add({consumer:i.id+":"+d.REFRESH_SLOT}),e.get(n.id+":"+d.APPLY_SIGNAL).consumers.add({consumer:i.id+":"+d.APPLY_SLOT})}}})});