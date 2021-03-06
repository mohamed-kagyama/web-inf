/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,o,t){function r(e){this.scope=e}r.prototype.getPropertiesCount=function(){return this.getPropertiesNames().length},r.prototype.getPropertiesNames=function(){return Object.keys(this.scope)},r.prototype.compareProperties=function(e,o){if(!e)throw"Properties for scope 1 not specified";o||(o=this.getPropertiesNames());var t,r,d={added:[],removed:[],madeUndefined:[],pollution:[]};for(t=0;t<e.length;t++)for(d.removed.push(e[t]),r=0;r<o.length;r++)if(e[t]===o[r]){d.removed.pop();break}for(t=0;t<o.length;t++)for(d.added.push(o[t]),r=0;r<e.length;r++)if(o[t]===e[r]){d.added.pop();break}for(t=0;t<d.added.length;t++)void 0===this.scope[d.added[t]]?d.madeUndefined.push(d.added[t]):d.pollution.push(d.added[t]);return d},t.exports=r});