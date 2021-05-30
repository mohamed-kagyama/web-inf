/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./QueryVariableTypes"],function(e,r,T){var E=e("./QueryVariableTypes"),u={};u[E.BYTE]="number",u[E.SHORT]="number",u[E.INTEGER]="number",u[E.BIG_INTEGER]="number",u[E.LONG]="number",u[E.DOUBLE]="number",u[E.DECIMAL]="number",u[E.FLOAT]="number",u[E.BIG_DECIMAL]="number",u[E.DATE]=E.DATE,u[E.TIME]=E.TIME,u[E.TIMESTAMP]=E.TIMESTAMP,u[E.STRING]=E.STRING,u[E.BOOLEAN]=E.BOOLEAN,T.exports=u});