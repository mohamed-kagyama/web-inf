/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(t,a,l){l.exports={showDetails:!0,showTotals:!0,showSummary:!0,columns:[{type:"spacer",width:200},{type:"string",label:"City",width:300,format:null,horizontalAlign:"left"},{type:"number",label:"Shipping charge",width:150,format:null,horizontalAlign:"left"}],rows:[{type:"group",data:["Argentina"]},{type:"detail",data:[null,"Buenos Aires",34]},{type:"detail",data:[null,"Buenos Aires",40]},{type:"group total",data:["Argentina Totals",2,74]},{type:"group",data:["Austria"]},{type:"detail",data:[null,"Salzburg",31]},{type:"detail",data:[null,"Salzburg",12]},{type:"group total",data:["Austria Totals",2,43]}],summary:[{type:"total",data:["Totals",4,117]}]}});