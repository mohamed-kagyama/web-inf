/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,i){i.exports={create:function(e){var r=e.event,i=e.presentationDesignerEventBus;return{directives:{resizer:e.resizerDirective},computed:{resizerConfig:function(){return{resize:this.resize}}},methods:{resize:function(e){i.trigger(r,e)}}}}}});