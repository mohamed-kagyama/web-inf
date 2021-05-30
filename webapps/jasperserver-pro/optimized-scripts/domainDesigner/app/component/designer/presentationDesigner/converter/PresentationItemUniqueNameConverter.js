/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var r=e("underscore"),o=function(e){this.initialize(e)};r.extend(o.prototype,{initialize:function(e){r.bindAll(this,"convert"),this.presentationItemDTOProcessor=e.presentationItemDTOProcessor,this.presentationItemDTONameGenerator=e.presentationItemDTONameGenerator},convert:function(e){this.presentationItemDTONameGenerator.resetNameSequenceNumber();var t=this.presentationItemDTONameGenerator.generate(e.name);return this.presentationItemDTOProcessor(e,t)}}),n.exports=o});