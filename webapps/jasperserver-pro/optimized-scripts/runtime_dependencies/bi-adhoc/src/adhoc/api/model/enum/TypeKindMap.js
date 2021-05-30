/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./QueryVariableTypes"],function(e,t,r){var i=e("./QueryVariableTypes"),a={};a[i.BYTE]="integer",a[i.SHORT]="integer",a[i.INTEGER]="integer",a[i.BIG_INTEGER]="integer",a[i.LONG]="integer",a[i.DOUBLE]="float",a[i.DECIMAL]="float",a[i.FLOAT]="float",a[i.BIG_DECIMAL]="float",a[i.DATE]="date",a[i.TIME]="time",a[i.TIMESTAMP]="timestamp",a[i.STRING]="string",a[i.BOOLEAN]="boolean",r.exports=a});