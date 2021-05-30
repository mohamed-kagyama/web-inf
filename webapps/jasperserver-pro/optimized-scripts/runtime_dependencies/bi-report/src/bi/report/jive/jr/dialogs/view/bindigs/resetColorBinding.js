/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(t,e,i){function n(){return{el:{},onClick:function(t){},init:function(t,e,i){var n=t.data("model-attr");this.el=t.get(0),t.attr("disabled","disabled"),this.onClick=function(e){e.stopPropagation(),i[n](null),t.attr("disabled","disabled")},this.el.addEventListener("click",this.onClick)},set:function(t,e){e&&(t.removeAttr("disabled"),t.prop("checked",!0))},clean:function(){this.el.removeEventListener("click",this.onClick)}}}i.exports=n});