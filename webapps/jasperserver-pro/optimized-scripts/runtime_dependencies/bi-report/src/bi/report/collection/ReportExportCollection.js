/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../model/ReportExportModel"],function(e,o,r){var t=e("backbone"),n=e("../model/ReportExportModel");r.exports=t.Collection.extend({model:function(e,o){return new n(e,{report:o.collection.report})},initialize:function(e,o){this.report=o.report}})});