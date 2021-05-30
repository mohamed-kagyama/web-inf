/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./DashletModel","../../enum/dashboardComponentTypes","../../enum/dashboardWiringStandardIds","bundle!DashboardBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","./extension/DashletHyperlinkComponentExtension","../../dashboardSettings","runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies","underscore"],function(e,o,n){function r(e){var o=this.get("parameters"),n={},r=this;o&&o.length&&c.each([i.REFRESH_SLOT,i.APPLY_SLOT].concat(c.pluck(o,"id")),function(e){n[e]=function(e){return function(o,n){(r.lastPayload||(r.lastPayload={}))[e]=o,(r.lastSender||(r.lastSender={}))[e]=n,r.trigger("signal",{name:e,value:o},n)}}(e)}),e.register(this,{signals:this.has("outputParameters")?c.pluck(this.get("outputParameters"),"id"):[],slots:n})}var t=e("./DashletModel"),a=e("../../enum/dashboardComponentTypes"),i=e("../../enum/dashboardWiringStandardIds"),s=e("bundle!DashboardBundle"),d=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),l=e("./extension/DashletHyperlinkComponentExtension"),p=e("../../dashboardSettings"),m=e("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies"),c=e("underscore"),u=d.extend({bundle:s});n.exports=t.extend(l.mixin).extend({componentName:s["dashboard.component.text.view.component.name"],defaults:c.extend({},l.defaults,t.prototype.defaults,{type:a.FREE_TEXT,alignment:p.DASHLET_TEXT_ALIGNMENT,verticalAlignment:p.DASHLET_TEXT_VERTICAL_ALIGNMENT,bold:p.DASHLET_TEXT_BOLD,text:void 0,italic:p.DASHLET_TEXT_ITALIC,underline:p.DASHLET_TEXT_UNDERLINE,font:p.DASHLET_TEXT_FONT,size:p.DASHLET_TEXT_SIZE,color:p.DASHLET_TEXT_COLOR,backgroundColor:p.DASHLET_TEXT_BACKGROUND_COLOR,scaleToFit:p.DASHLET_TEXT_SCALE_TO_FIT,showDashletBorders:p.DASHLET_BORDER,borderColor:p.DASHLET_BORDER_COLOR,maximized:null,toolbar:null}),validation:c.extend({},l.validation,t.prototype.validation,{maximized:function(e){if(null!==e)return s["dashboard.component.error.property.unsupported"].replace("{0}","maximized")},toolbar:function(e){if(null!==e)return s["dashboard.component.error.property.unsupported"].replace("{0}","toolbar")},alignment:[{required:!0,msg:new u("dashboard.component.error.alignment.required")},{oneOf:["left","center","right"],msg:new u("dashboard.component.error.alignment.oneOf",s["dashboard.component.dialog.properties.alignment.left"],s["dashboard.component.dialog.properties.alignment.center"],s["dashboard.component.dialog.properties.alignment.right"])}],font:[{required:!0,msg:new u("dashboard.component.error.font.required")},{doesNotContainSymbols:'~!#\\$%^|`@&*()\\+={}\\[\\];""\\<\\>,?\\|\\\\',msg:new u("dashboard.component.error.font.forbidden.chars")}],size:[{required:!0,msg:new u("dashboard.component.error.font.size.required")},{integerNumber:!0,msg:new u("dashboard.component.error.font.size.integer")},{min:p.DASHLET_MIN_FONT_SIZE,msg:new u("dashboard.component.error.font.size.min",p.DASHLET_MIN_FONT_SIZE)}],scaleToFit:[{required:!0,msg:new u("dashboard.component.error.scale.to.fit.required")},{oneOf:[1,m.HEIGHT,m.WIDTH,m.CONTAINER],msg:new u("dashboard.component.error.scale.to.fit.oneOf",s["dashboard.component.dialog.properties.scale.to.fit.no"],s["dashboard.component.dialog.properties.scale.to.fit.width"],s["dashboard.component.dialog.properties.scale.to.fit.height"],s["dashboard.component.dialog.properties.scale.to.fit.page"])}]}),acceptWiringVisitor:function(e){this.on("parameters:set",c.bind(r,this,e)),r.call(this,e)}})});