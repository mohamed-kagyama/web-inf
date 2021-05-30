/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(t,e){"use strict";"object"==typeof module&&module.exports?module.exports=t(require("highcharts")):"function"==typeof define&&define.amd?define(["highcharts"],t):t(e.Highcharts)}(function(t){"use strict";function e(t){return JSON.parse(JSON.stringify(t))}function i(t,i){return this.userOptions=e(t),this.name=t.name!==h&&null!==t.name?t.name:t,this.parent=i,this}function s(t){for(var e=t.length,i=0;e--;)i+=t[e];return i}function r(t,e,s){for(t.unshift(new i(e,s));s;)s.leaves=s.leaves?s.leaves+1:1,s=s.parent}function a(t,e,i,s,o){var n,l=t.length;for(o=o||0,i.depth=i.depth?i.depth:0;l--;)n=t[l],n.categories?(s&&(n.parent=s),a(n.categories,e,i,n,o+1)):r(e,n,s);i.depth=d(i.depth,o)}function o(t,e,i){e[0]===e[2]&&(e[0]=e[2]=p(e[0])-i%2/2),e[1]===e[3]&&(e[1]=e[3]=p(e[1])+i%2/2),t.push("M",e[0],e[1],"L",e[2],e[3])}function n(t,e){return t.getPosition(t.axis.horiz,e,t.axis.tickmarkOffset)}function l(t,e,i){for(var s,r=t.length;r--;)s=t[r][e],s&&l(s,e,i),i(t[r])}var h=void 0,p=Math.round,c=Math.min,d=Math.max,u=t.merge,g=t.pick,f=t.each,b=window.HighchartsAdapter&&window.HighchartsAdapter.inArray||t.inArray,x=t.Axis.prototype,y=t.Tick.prototype,v=x.init,k=x.render,G=x.setCategories,m=y.getLabelSize,z=y.addLabel,S=y.destroy,L=y.render;return i.prototype.toString=function(){for(var t=[],e=this;e;)t.push(e.name),e=e.parent;return t.join(", ")},x.init=function(t,e){v.call(this,t,e),"object"==typeof e&&e.categories&&this.setupGroups(e)},x.setupGroups=function(t){var i=e(t.categories),s=[],r={},o=this.options.labels,n=o.groupedOptions,l=o.style;a(i,s,r),this.categoriesTree=i,this.categories=s,this.isGrouped=0!==r.depth,this.labelsDepth=r.depth,this.labelsSizes=[],this.labelsGridPath=[],this.tickLength=t.tickLength||this.tickLength||null,this.tickWidth=g(t.tickWidth,this.isXAxis?1:0),this.directionFactor=[-1,1,1,-1][this.side],this.options.lineWidth=g(t.lineWidth,1),this.groupFontHeights=[];for(var h=0;h<=r.depth;h++){var p=n&&n[h-1],c=p&&n[h-1].style?u(l,n[h-1].style):l;this.groupFontHeights[h]=Math.round(.3*this.chart.renderer.fontMetrics(c?c.fontSize:0).b)}},x.render=function(){if(this.isGrouped&&(this.labelsGridPath=[]),this.originalTickLength===h&&(this.originalTickLength=this.options.tickLength),this.options.tickLength=this.isGrouped?.001:this.originalTickLength,k.call(this),!this.isGrouped)return this.labelsGrid&&this.labelsGrid.attr({visibility:"hidden"}),!1;var t,e=this,i=e.options,s=e.top,r=e.left,a=r+e.width,n=s+e.height,p=e.hasVisibleSeries||e.hasData,c=e.labelsDepth,d=e.labelsGrid,u=e.horiz,g=e.labelsGridPath,f=!1===i.drawHorizontalBorders?c+1:0,b=e.opposite?u?s:a:u?n:r,x=e.tickWidth;for(e.userTickLength&&(c-=1),d||(d=e.labelsGrid=e.chart.renderer.path().attr({strokeWidth:x,"stroke-width":x,stroke:i.tickColor||""}).add(e.axisGroup),i.tickColor||d.addClass("highcharts-tick"));f<=c;)b+=e.groupSize(f),t=u?[r,b,a,b]:[b,s,b,n],o(g,t,x),f++;return d.attr({d:g,visibility:p?"visible":"hidden"}),e.labelGroup.attr({visibility:p?"visible":"hidden"}),l(e.categoriesTree,"categories",function(t){var i=t.tick;return!!i&&(i.startAt+i.leaves-1<e.min||i.startAt>e.max?(i.label.hide(),i.destroyed=0):i.label.attr({visibility:p?"visible":"hidden"}),!0)}),!0},x.setCategories=function(t,e){this.categories&&this.cleanGroups(),this.setupGroups({categories:t}),this.categories=this.userOptions.categories=t,G.call(this,this.categories,e)},x.cleanGroups=function(){var t,e=this.ticks;for(t in e)e[t].parent&&delete e[t].parent;l(this.categoriesTree,"categories",function(t){var e=t.tick;return!!e&&(e.label.destroy(),f(e,function(t,i){delete e[i]}),delete t.tick,!0)}),this.labelsGrid=null},x.groupSize=function(t,e){var i=this.labelsSizes,r=this.directionFactor,a=!!this.options.labels.groupedOptions&&this.options.labels.groupedOptions[t-1],o=0;return a&&(o=-1===r?a.x?a.x:0:a.y?a.y:0),e!==h&&(i[t]=d(i[t]||0,e+10+Math.abs(o))),!0===t?s(i)*r:i[t]?i[t]*r:0},y.addLabel=function(){var t,e=this,i=e.axis;return z.call(e),!(!i.categories||!(t=i.categories[e.pos]))&&(e.label&&e.label.attr("text",e.axis.labelFormatter.call({axis:i,chart:i.chart,isFirst:e.isFirst,isLast:e.isLast,value:t.name,pos:e.pos})),i.isGrouped&&i.options.labels.enabled&&e.addGroupedLabels(t),!0)},y.addGroupedLabels=function(t){for(var e,i=this,s=this.axis,r=s.chart,a=s.options.labels,o=a.useHTML,n=a.style,l=a.groupedOptions,h={align:"center",x:0,y:0},p=s.horiz?"height":"width",c=0;i;){if(c>0&&!t.tick){this.value=t.name;var d=a.formatter?a.formatter.call(this,t):t.name,g=l&&l[c-1],f=g?u(h,l[c-1]):h,b=g&&l[c-1].style?u(n,l[c-1].style):n;delete f.style,e=r.renderer.text(d,0,0,o).attr(f).css(b).add(s.labelGroup),i.startAt=this.pos,i.childCount=t.categories.length,i.leaves=t.leaves,i.visible=this.childCount,i.label=e,i.labelOffsets={x:f.x,y:f.y},t.tick=i}i&&s.groupSize(c,i.label.getBBox()[p]),t=t.parent,i=t?i.parent=t.tick||{}:null,c++}},y.render=function(t,e,i){L.call(this,t,e,i);var s=this.axis.categories[this.pos];if(this.axis.isGrouped&&s&&!(this.pos>this.axis.max)){var r,a,l,h,p,u,g=this,f=g,x=g.axis,y=g.pos,v=g.isFirst,k=x.max,G=x.min,m=x.horiz,z=x.labelsGridPath,S=x.groupSize(0),A=x.tickWidth,O=n(g,y),w=m?O.y:O.x,F=x.chart.renderer.fontMetrics(x.options.labels.style?x.options.labels.style.fontSize:0).b,M=1,T=m&&O.x===x.pos+x.len||!m&&O.y===x.pos?-1:0;for(v&&(r=m?[x.left,O.y,x.left,O.y+x.groupSize(!0)]:x.isXAxis?[O.x,x.top,O.x+x.groupSize(!0),x.top]:[O.x,x.top+x.len,O.x+x.groupSize(!0),x.top+x.len],o(z,r,A)),m&&x.left<O.x?o(z,[O.x-T,O.y,O.x-T,O.y+S],A):!m&&x.top<=O.y&&o(z,[O.x,O.y+T,O.x+S,O.y+T],A),S=w+S;f.parent;){f=f.parent;var H=function(t){var e=0;return v?(e=b(t.name,t.parent.categories),e=e<0?0:e):e}(s),C=f.labelOffsets.x,W=f.labelOffsets.y;l=n(g,d(f.startAt-1,G-1)),h=n(g,c(f.startAt+f.leaves-1-H,k)),u=f.label.getBBox(!0),a=x.groupSize(M),T=m&&h.x===x.pos+x.len||!m&&h.y===x.pos?-1:0,p=m?{x:(l.x+h.x)/2+C,y:S+x.groupFontHeights[M]+a/2+W/2}:{x:S+a/2+C,y:(l.y+h.y-u.height)/2+F+W},isNaN(p.x)||isNaN(p.y)||(f.label.attr(p),z&&(m&&x.left<h.x?o(z,[h.x-T,S,h.x-T,S+a],A):!m&&x.top<=h.y&&o(z,[S,h.y+T,S+a,h.y+T],A))),S+=a,M++}}},y.destroy=function(){for(var t=this.parent;t;)t.destroyed=t.destroyed?t.destroyed+1:1,t=t.parent;S.call(this)},y.getLabelSize=function(){if(!0===this.axis.isGrouped){var t=m.call(this)+10;return this.axis.labelsSizes[0]<t&&(this.axis.labelsSizes[0]=t),s(this.axis.labelsSizes)}return m.call(this)},t},this);