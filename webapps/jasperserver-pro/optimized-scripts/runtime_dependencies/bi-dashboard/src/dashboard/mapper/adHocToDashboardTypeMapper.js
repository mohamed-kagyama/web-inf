/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/dashboardComponentTypes"],function(e,o,r){var a=e("../enum/dashboardComponentTypes"),n={olap_ichart:a.CHART,olap_crosstab:a.CROSSTAB,ichart:a.CHART,crosstab:a.CROSSTAB,table:a.TABLE};r.exports=function(e){return n[e]}});