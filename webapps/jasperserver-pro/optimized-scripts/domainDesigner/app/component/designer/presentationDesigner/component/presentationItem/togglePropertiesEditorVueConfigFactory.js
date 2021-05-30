/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/togglePropertiesEditor.htm"],function(e,t,r){var o=(e("underscore"),e("text!./template/togglePropertiesEditor.htm"));r.exports={create:function(e){return{template:o,props:["item","eventName"],components:{cell:e.cell},methods:{onTogglePropertiesEditor:function(){e.presentationDesignerEventBus.trigger("toggle:"+this.eventName+"PropertiesEditor",this.item)}}}}}});