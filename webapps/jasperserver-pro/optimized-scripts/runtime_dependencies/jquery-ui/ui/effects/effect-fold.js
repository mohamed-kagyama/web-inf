/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","../version","../effect"],e):e(jQuery)}(function(e){return e.effects.define("fold","hide",function(i,t){var n=e(this),c=i.mode,f="show"===c,o="hide"===c,s=i.size||15,a=/([0-9]+)%/.exec(s),l=!!i.horizFirst,u=l?["right","bottom"]:["bottom","right"],p=i.duration/2,r=e.effects.createPlaceholder(n),d=n.cssClip(),h={clip:e.extend({},d)},m={clip:e.extend({},d)},g=[d[u[0]],d[u[1]]],x=n.queue().length;a&&(s=parseInt(a[1],10)/100*g[o?0:1]),h.clip[u[0]]=s,m.clip[u[0]]=s,m.clip[u[1]]=0,f&&(n.cssClip(m.clip),r&&r.css(e.effects.clipToBox(m)),m.clip=d),n.queue(function(t){r&&r.animate(e.effects.clipToBox(h),p,i.easing).animate(e.effects.clipToBox(m),p,i.easing),t()}).animate(h,p,i.easing).animate(m,p,i.easing).queue(t),e.effects.unshift(n,x,4)})});