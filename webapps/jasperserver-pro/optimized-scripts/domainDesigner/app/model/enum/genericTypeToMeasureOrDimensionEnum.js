/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/schema/enum/genericTypesEnum","../../../model/schema/enum/measureOrDimensionEnum"],function(e,m,E){var n=e("../../../model/schema/enum/genericTypesEnum"),I=e("../../../model/schema/enum/measureOrDimensionEnum"),u={};u[n.DECIMAL]=I.MEASURE,u[n.INTEGER]=I.MEASURE,u[n.STRING]=I.DIMENSION,u[n.BOOLEAN]=I.DIMENSION,u[n.DATE]=I.DIMENSION,u[n.TIMESTAMP]=I.DIMENSION,u[n.TIME]=I.DIMENSION,E.exports=u});