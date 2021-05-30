/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!CommonBundle","./TreePlugin","text!../template/noResourcesFoundMessageTemplate.htm"],function(e,t,o){var s=e("underscore"),n=e("bundle!CommonBundle"),u=e("./TreePlugin"),r=e("text!../template/noResourcesFoundMessageTemplate.htm"),i=function(e){!e.list.totalItems&&e.list.$el.html(this.noResourcesFoundMessage)};o.exports=u.extend({},{treeInitialized:function(e){this.noResourcesFoundMessage=s.template(r,{msg:n["no.resources.found"]}),this.listenTo(this.rootLevel,"ready",i)},treeRemoved:function(){this.stopListening(this.rootLevel,"ready",i)}})});