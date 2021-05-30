/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../collection/ChartTypeCollection"],function(e,t,o){var i=e("backbone"),n=e("../collection/ChartTypeCollection");o.exports=i.Model.extend({defaults:{id:void 0,name:void 0,bundleName:void 0,chartTypes:[]},initialize:function(){this.chartTypesCollection=new n(this.get("chartTypes"))},toJSON:function(){var e=i.Model.prototype.toJSON.call(this);return e.chartTypes=this.chartTypesCollection.toJSON(),e}})});