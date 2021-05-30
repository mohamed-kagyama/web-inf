/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../model/SubDataSourceModel"],function(e,o,n){var t=e("backbone"),r=e("../model/SubDataSourceModel");n.exports=t.Collection.extend({model:r,hasNonReadOnlyItems:function(){return this.some(function(e){return!e.get("readOnly")})}})});