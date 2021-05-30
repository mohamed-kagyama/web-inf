/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../export/model/ExportStateModel"],function(e,t,o){var r=e("../../export/model/ExportStateModel");o.exports=r.extend({url:function(){return"rest_v2/import/"+this.id+"/state"}})});