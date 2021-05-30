/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../model/ReportParametersModel","backbone"],function(e,r,t){var o=e("../model/ReportParametersModel"),n=e("backbone"),a=n.Collection.extend({model:o,getReportParameters:function(e,r){return this.add({reportUri:e}).getReportParameters(r)},getReportControls:function(e,r){return this.add({reportUri:e}).getReportControls(r)},getInputControlAsParameter:function(e,r,t){return this.add({reportUri:e}).getInputControlAsParameter(r,t)}});a.instance=new a,t.exports=a});