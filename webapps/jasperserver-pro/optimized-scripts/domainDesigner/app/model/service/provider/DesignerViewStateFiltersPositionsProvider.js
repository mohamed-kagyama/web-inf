/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var r=e("underscore"),i=function(e){this.initialize(e)};r.extend(i.prototype,{initialize:function(e){this.sequenceGenerator=e.sequenceGenerator},getFiltersPositionsByFilters:function(e){var t=this;return this.sequenceGenerator.reset(),e.reduce(function(e,n){return e[n.id]=t.sequenceGenerator.next(),e},{})},getNextFilterPosition:function(){return this.sequenceGenerator.next()}}),n.exports=i});