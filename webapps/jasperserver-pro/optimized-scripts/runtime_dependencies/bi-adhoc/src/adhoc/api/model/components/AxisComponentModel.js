/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseComponentModel"],function(e,n,o){var t=e("./BaseComponentModel");o.exports=t.extend({initialize:function(e,n){},hasMeasures:function(){return this.components.find(function(e){return"Measures"===e.get("reference")})}})});