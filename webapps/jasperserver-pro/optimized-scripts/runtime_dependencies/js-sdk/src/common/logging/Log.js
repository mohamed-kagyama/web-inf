/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./Level","./LogItem"],function(e,r,t){function o(e){return function(){return this._prepareLogItem({level:n.getLevel(e),args:arguments})}}function i(e,r){this._id=e.id,this._callback=r}var n=e("./Level"),a=e("./LogItem");i.prototype._prepareLogItem=function(e){e.id=this._id,e.args=Array.prototype.slice.call(e.args,0),e.time=new Date;var r=(new Error).stack;if(r){var t=r.split("\n")[2],o=t.match(/\/(\w+\.\w+):(\d+)/i);o&&(e.file=o[1],e.line=o[2])}return e.file||(e.file="unknown",e.line="0"),e=new a(e),this._callback(e),e},i.prototype.debug=o("debug"),i.prototype.info=o("info"),i.prototype.warn=o("warn"),i.prototype.error=o("error"),t.exports=i});