/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore","../../model/filterManager/WiringConsumerViewModel"],function(e,i,r){var n=e("backbone"),o=e("underscore"),t=e("../../model/filterManager/WiringConsumerViewModel");r.exports=n.Collection.extend({model:t,comparator:"parameterLabel",initialize:function(){this.on("change:parameterLabel",this.sort)},isValid:function(e){return o.every(this.invoke("isValid",e),o.identity)}})});