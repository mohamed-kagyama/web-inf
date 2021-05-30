/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var r=e("underscore"),n=function(e){this.initialize(e)};r.extend(n.prototype,{initialize:function(e){r.bindAll(this,"getData"),this.filtersDesignerViewStateModelService=e.filtersDesignerViewStateModelService,this.request=e.request},getData:function(e){e=e||{};var t=this.filtersDesignerViewStateModelService.getDraftFilterState();return e=r.extend({},e,{draftFilter:t}),this.request(e)}}),i.exports=n});