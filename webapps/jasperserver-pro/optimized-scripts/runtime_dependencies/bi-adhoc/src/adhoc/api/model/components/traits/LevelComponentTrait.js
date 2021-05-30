/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,i){i.exports={level:function(){var e=this,t=function(t){return e.get("reference")===t.get("id")},i=function(t){return e.get("reference")===t.get("hierarchicalName")};return this.adHocModel.dataSet.query.cols.axis.find(t)||this.adHocModel.dataSet.query.rows.axis.find(t)||this.adHocModel.dataSet.query.cols.axis.find(i)||this.adHocModel.dataSet.query.rows.axis.find(i)},label:function(e){return this.has("label")?this.get("label"):this.level().label(e)}}});