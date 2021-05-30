/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(t){"function"==typeof define&&define.amd?define(["jquery","../keycode","../position","../unique-id","../version","../widget"],t):t(jQuery)}(function(t){return t.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){var i=t(this).attr("title")||"";return t("<a>").text(i).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,close:null,open:null},_addDescribedBy:function(i,e){var o=(i.attr("aria-describedby")||"").split(/\s+/);o.push(e),i.data("ui-tooltip-id",e).attr("aria-describedby",t.trim(o.join(" ")))},_removeDescribedBy:function(i){var e=i.data("ui-tooltip-id"),o=(i.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(e,o);-1!==n&&o.splice(n,1),i.removeData("ui-tooltip-id"),o=t.trim(o.join(" ")),o?i.attr("aria-describedby",o):i.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.liveRegion=t("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=t([])},_setOption:function(i,e){var o=this;this._super(i,e),"content"===i&&t.each(this.tooltips,function(t,i){o._updateContent(i.element)})},_setOptionDisabled:function(t){this[t?"_disable":"_enable"]()},_disable:function(){var i=this;t.each(this.tooltips,function(e,o){var n=t.Event("blur");n.target=n.currentTarget=o.element[0],i.close(n,!0)}),this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var i=t(this);if(i.is("[title]"))return i.data("ui-tooltip-title",i.attr("title")).removeAttr("title")}))},_enable:function(){this.disabledTitles.each(function(){var i=t(this);i.data("ui-tooltip-title")&&i.attr("title",i.data("ui-tooltip-title"))}),this.disabledTitles=t([])},open:function(i){var e=this,o=t(i?i.target:this.element).closest(this.options.items);o.length&&!o.data("ui-tooltip-id")&&(o.attr("title")&&o.data("ui-tooltip-title",o.attr("title")),o.data("ui-tooltip-open",!0),i&&"mouseover"===i.type&&o.parents().each(function(){var i,o=t(this);o.data("ui-tooltip-open")&&(i=t.Event("blur"),i.target=i.currentTarget=this,e.close(i,!0)),o.attr("title")&&(o.uniqueId(),e.parents[this.id]={element:this,title:o.attr("title")},o.attr("title",""))}),this._registerCloseHandlers(i,o),this._updateContent(o,i))},_updateContent:function(t,i){var e,o=this.options.content,n=this,s=i?i.type:null;if("string"==typeof o||o.nodeType||o.jquery)return this._open(i,t,o);(e=o.call(t[0],function(e){n._delay(function(){t.data("ui-tooltip-open")&&(i&&(i.type=s),this._open(i,t,e))})}))&&this._open(i,t,e)},_open:function(i,e,o){function n(t){d.of=t,l.is(":hidden")||l.position(d)}var s,l,a,r,d=t.extend({},this.options.position);if(o){if(s=this._find(e))return void s.tooltip.find(".ui-tooltip-content").html(o);e.is("[title]")&&(i&&"mouseover"===i.type?e.attr("title",""):e.removeAttr("title")),s=this._tooltip(e),l=s.tooltip,this._addDescribedBy(e,l.attr("id")),l.find(".ui-tooltip-content").html(o),this.liveRegion.children().hide(),r=t("<div>").html(l.find(".ui-tooltip-content").html()),r.removeAttr("name").find("[name]").removeAttr("name"),r.removeAttr("id").find("[id]").removeAttr("id"),r.appendTo(this.liveRegion),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:n}),n(i)):l.position(t.extend({of:e},this.options.position)),l.hide(),this._show(l,this.options.show),this.options.track&&this.options.show&&this.options.show.delay&&(a=this.delayedShow=setInterval(function(){l.is(":visible")&&(n(d.of),clearInterval(a))},t.fx.interval)),this._trigger("open",i,{tooltip:l})}},_registerCloseHandlers:function(i,e){var o={keyup:function(i){if(i.keyCode===t.ui.keyCode.ESCAPE){var o=t.Event(i);o.currentTarget=e[0],this.close(o,!0)}}};e[0]!==this.element[0]&&(o.remove=function(){this._removeTooltip(this._find(e).tooltip)}),i&&"mouseover"!==i.type||(o.mouseleave="close"),i&&"focusin"!==i.type||(o.focusout="close"),this._on(!0,e,o)},close:function(i){var e,o=this,n=t(i?i.currentTarget:this.element),s=this._find(n);if(!s)return void n.removeData("ui-tooltip-open");e=s.tooltip,s.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),s.hiding=!0,e.stop(!0),this._hide(e,this.options.hide,function(){o._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),i&&"mouseleave"===i.type&&t.each(this.parents,function(i,e){t(e.element).attr("title",e.title),delete o.parents[i]}),s.closing=!0,this._trigger("close",i,{tooltip:e}),s.hiding||(s.closing=!1))},_tooltip:function(i){var e=t("<div>").attr("role","tooltip"),o=t("<div>").appendTo(e),n=e.uniqueId().attr("id");return this._addClass(o,"ui-tooltip-content"),this._addClass(e,"ui-tooltip","ui-widget ui-widget-content"),e.appendTo(this._appendTo(i)),this.tooltips[n]={element:i,tooltip:e}},_find:function(t){var i=t.data("ui-tooltip-id");return i?this.tooltips[i]:null},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_appendTo:function(t){var i=t.closest(".ui-front, dialog");return i.length||(i=this.document[0].body),i},_destroy:function(){var i=this;t.each(this.tooltips,function(e,o){var n=t.Event("blur"),s=o.element;n.target=n.currentTarget=s[0],i.close(n,!0),t("#"+e).remove(),s.data("ui-tooltip-title")&&(s.attr("title")||s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),!1!==t.uiBackCompat&&t.widget("ui.tooltip",t.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var t=this._superApply(arguments);return this.options.tooltipClass&&t.tooltip.addClass(this.options.tooltipClass),t}}),t.ui.tooltip});