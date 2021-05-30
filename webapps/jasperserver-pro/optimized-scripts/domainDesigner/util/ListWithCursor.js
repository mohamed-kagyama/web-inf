/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,i,s){var r=t("underscore"),n=["find","findWhere","each","map","filter","where","indexOf","last","size"],e=function(t){t=t||{},this.setList(t.items,t.position)};r.each(n,function(t){e.prototype[t]=function(){var i=[this._list].concat(Array.prototype.slice.call(arguments,0));return r[t].apply(r,i)}}),r.extend(e.prototype,{get:function(t){return t=this._getPositionOrCurrent(t),this._list[t]},add:function(t,i){return i=this._getPositionOrNext(i),this._list.splice(i,0,t),this.setPosition(i)},replace:function(t,i){return i=this._getPositionOrNext(i),this._list[i]=t,this.setPosition(i)},removeAt:function(t){var i=this._getPositionOrCurrent();if(this._list.splice(t,1),t<i)return this.setPosition(this._cursor-1)},removeAfter:function(t){if(t=this._getPositionOrCurrent(t),this._list.splice(t+1),t>=0)return this.setPosition(Math.min(this._list.length-1,this._cursor))},getList:function(){return r.clone(this._list)},setList:function(t,i){this._list=t||[];var s=this.size();r.isUndefined(i)?this._cursor=s>0?s-1:-1:this._cursor=s>0?Math.max(0,Math.min(s-1,i)):-1},getPosition:function(){return this._cursor},setPosition:function(t){if(!(t>=0&&t<this._list.length))throw new Error("Invalid cursor position "+t);return this._cursor=t,this},forward:function(){var t=Math.max(0,this._list.length-1);return this.setPosition(t)},rewind:function(){return this.setPosition(0)},next:function(){return this._cursor<this._list.length-1&&this.setPosition(this._cursor+1),this},previous:function(){return this._cursor>0&&this.setPosition(this._cursor-1),this},findLastIndex:function(t){var i=r.clone(this._list).reverse(),s=this.size(),n=-1;return r.find(i,function(i,r){if(t(i,s-(r+1)))return n=r,!0}),n>-1?s-(n+1):n},_getPositionOrCurrent:function(t){return void 0!==t?t:this._cursor},_getPositionOrNext:function(t){return void 0!==t?t:this._cursor+1}}),s.exports=e});