/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","./BaseJiveComponentView","fusioncharts"],function(e,t,n){var i=e("underscore"),s=e("jquery"),o=e("./BaseJiveComponentView"),r=e("fusioncharts"),a=function(e){this.config=e,this.parent=null,this.loader=null,this.fusionInstance=null,this._init()};a.prototype={_init:function(){var e,t=this,n=this.config.instanceData;document.getElementById(n.id)||("function"==typeof window.printRequest&&window.printRequest(),e={id:n.id,type:n.type,width:n.width,height:n.height,renderAt:n.renderAt,dataFormat:n.dataFormat,dataSource:n.dataSource},r.items[e.id]&&r.items[e.id].dispose(),this.fusionInstance=new r(e),this.fusionInstance.addEventListener("BeforeRender",function(e,t){"javascript"===t.renderer&&e.sender.setChartAttribute("exportEnabled","0")}),this.fusionInstance.addEventListener("JR_Hyperlink_Interception",function(e,n){var i;t.config.linksOptions.events&&(i=t.config.linksOptions.events.click),i&&i.call(this,e,n)}),this.fusionInstance.setTransparent(n.transparent),this.fusionInstance.render())},remove:function(){this.fusionInstance&&this.fusionInstance.dispose()}},n.exports=o.extend({render:function(e){var t=new s.Deferred,n=this.model.collection?this.model.collection.linkOptions:null,o=i.extend(this.model.toJSON(),{chart:i.clone(this.stateModel.get("chart"))});return n&&(o.linkOptions=n),this.fusionElement=new a(o),t.resolve(),t},remove:function(){this.fusionElement&&this.fusionElement.remove(),o.prototype.remove.apply(this,arguments)}})});