/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(i,n,e){var t=function(i){this.config=i,this._init()};t.prototype={_init:function(){var n=this,e=[],t={paths:{}},s=document.getElementById(n.config.id);if(s){var c=s.getElementsByTagName("svg");c.length>0&&s.removeChild(c[0])}t.paths[n.config.renderer]=n.config.instanceData.script_uri+"?noext",e.push(n.config.renderer),n.config.instanceData.css_uri&&(t.paths[n.config.id+"_css"]=n.config.instanceData.css_uri+"?noext",e.push("csslink!"+n.config.id+"_css")),requirejs.config(t),i(e,function(i){i(n.config.instanceData)})}},e.exports=t});