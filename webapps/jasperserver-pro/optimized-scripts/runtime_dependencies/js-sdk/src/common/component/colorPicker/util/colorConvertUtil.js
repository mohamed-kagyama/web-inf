/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(t,r,n){var e=/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;n.exports={rgba2NoAlphaHex:function(t){var r=t.match(e)||[];return[r[1],r[2],r[3]].reduce(function(t,r){return t+"0".concat(parseInt(r,10).toString(16)).slice(-2)},"#").toUpperCase()},isRgbTransparent:function(t){return-1!==t.replace(/\s/g,"").indexOf("0,0,0,0")},isRgba:function(t){return e.test(t)},isColorDark:function(t){var r,n,a,c;return/^rgb/.test(t)?(r=t.match(e)||[],n=parseInt(r[1],10),a=parseInt(r[2],10),c=parseInt(r[3],10)):(r=t.substr(1),n=parseInt("".concat(r[0]).concat(r[1]),16),a=parseInt("".concat(r[2]).concat(r[3]),16),c=parseInt("".concat(r[4]).concat(r[5]),16)),Math.sqrt(n*n*.299+a*a*.587+c*c*.114)<127.5}}});