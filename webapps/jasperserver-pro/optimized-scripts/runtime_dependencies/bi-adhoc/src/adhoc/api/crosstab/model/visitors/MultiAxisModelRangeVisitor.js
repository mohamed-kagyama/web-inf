/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./MultiAxisModelVisitor"],function(t,i,s){function e(t,i){this.startIndex=t,this.endIndex=i,this.index=0,this.missingIndex=-1,this.line=[],this.result=[],this.resultPixels=[],this.top=0,this.bottom=0,this.addBottom=!0,this.terminated=!1}function n(t,i,s){for(var e,n,h,l=0;l<t[0].length-1;l++){e=t[0][l];for(var r=0;r<t.length;r++)if(t[r][l]!==e&&(e=t[r][l],n=t[r][l+1])){if(!(n.childFirst||!e.isExpanded&&n.isTotal))return i+r-1;if((h=t[r-1][l+1])&&!h.childLast)return i+r-1}}if(t.length&&t.length<s-i){for(var d=t[t.length-1],o=!0,u=0;u<d.length;u++)o&=d[u].childLast;if(!o)return i+t.length-1}return-1}var h=t("underscore"),l=t("./MultiAxisModelVisitor");h.extend(e.prototype,l),e.prototype.preVisit=function(t,i){i>0&&(this.line[i-1]=t)},e.prototype.postVisit=function(t,i){if(!t.children.length){if(this.index<this.startIndex)void 0!==t.pixels&&-1!==this.top?this.top+=t.pixels:this.top=-1;else if(this.index<this.endIndex){this.result.push([].concat(this.line)),void 0!==t.pixels&&this.resultPixels?this.resultPixels.push(t.pixels):this.resultPixels=null;for(var s=0;s<this.line.length;s++)this.line[s].isExpanded&&!this.line[s].isEmpty&&1==this.line[s].children.length&&this.line[s].children[0].isTotal&&(this.terminated=!0,this.missingIndex=Math.max(this.index-1,0))}else void 0!==t.pixels&&this.addBottom?this.bottom+=t.pixels:this.addBottom=!1;this.index++}},e.prototype.getResult=function(){var t={missingIndex:this.missingIndex};if(-1===t.missingIndex)this.result.length?t.missingIndex=n(this.result,this.startIndex,this.endIndex):0===this.index&&(t.missingIndex=0);else if(this.result.length){var i=n(this.result,this.startIndex,this.endIndex);-1!==i&&(t.missingIndex=Math.min(t.missingIndex,i))}return-1===t.missingIndex&&(t.range=this.result.length&&this.result[0].length?this.result:[],t.loaded=this.index+1,t.top=this.top,t.bottom=this.bottom,t.resultPixels=this.resultPixels,this.result.length&&(t.hasFirst=h.reduce(this.result[0],function(t,i){return t&&i.childFirst},!0),t.hasLast=h.reduce(this.result[this.result.length-1],function(t,i){return t&&i.childLast},!0))),t},s.exports=e});