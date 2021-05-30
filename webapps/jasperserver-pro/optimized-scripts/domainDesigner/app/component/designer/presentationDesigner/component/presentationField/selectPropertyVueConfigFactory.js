/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,n){n.exports={create:function(e){return{template:e.template,props:["items","id","propertyName","label","dataName"],components:e.components,methods:{onChange:function(t){var n={};n[this.propertyName]=t,e.presentationDesignerEventBus.trigger("update:presentationField",this.id,n)}}}}}});