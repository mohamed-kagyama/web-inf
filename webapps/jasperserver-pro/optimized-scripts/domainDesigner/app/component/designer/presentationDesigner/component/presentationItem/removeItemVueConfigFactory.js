/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!./template/removeItem.htm"],function(e,t,n){var r=(e("underscore"),e("text!./template/removeItem.htm"));n.exports={create:function(e){return{template:r,props:["item","eventName"],components:{cell:e.cell},methods:{onRemovePresentationItem:function(){e.presentationDesignerEventBus.trigger("remove:"+this.eventName,this.item)}}}}}});