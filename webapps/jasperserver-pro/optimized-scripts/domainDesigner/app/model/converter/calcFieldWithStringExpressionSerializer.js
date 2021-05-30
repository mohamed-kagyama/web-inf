/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,n,r){r.exports={serialize:function(e){return{element:{name:e.name,type:e.type,expression:{string:e.expression.string}}}}}});