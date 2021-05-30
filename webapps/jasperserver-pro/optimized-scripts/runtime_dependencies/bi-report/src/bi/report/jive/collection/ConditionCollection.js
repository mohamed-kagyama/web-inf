/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","../model/ConditionModel"],function(e,o,i){var n=e("backbone"),d=e("../model/ConditionModel");i.exports=n.Collection.extend({model:d,initialize:function(e,o){o||(o={}),this.dataType=o.dataType}})});