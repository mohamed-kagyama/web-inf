/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,o){o.exports={encode:function(e){return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g,function(e,n){return String.fromCharCode("0x"+n)}))},decode:function(e){return decodeURIComponent(atob(e).split("").map(function(e){return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""))}}});