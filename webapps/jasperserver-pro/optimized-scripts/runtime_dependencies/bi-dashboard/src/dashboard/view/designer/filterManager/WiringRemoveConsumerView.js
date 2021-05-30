/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","text!../../../template/filterManager/wiringRemoveConsumerTemplate.htm"],function(e,t,o){var m=e("backbone"),n=e("text!../../../template/filterManager/wiringRemoveConsumerTemplate.htm");o.exports=m.View.extend({events:{"click .removeConsumerColumn > .delete":"removeConsumer"},el:n,removeConsumer:function(e){e&&e.preventDefault(),this.model.collection.remove(this.model)}})});