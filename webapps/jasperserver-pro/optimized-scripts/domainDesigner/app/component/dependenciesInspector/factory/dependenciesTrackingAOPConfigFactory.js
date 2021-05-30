/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,r){r.exports={create:function(e){e=e||{};var n=e.methods||[],r=e.actions||[];return n.reduce(function(e,n){return r.length>0&&(e[n]={around:r}),e},{})}}});