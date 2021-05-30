/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/common/logging/logger","underscore"],function(e,n,o){var r=e("runtime_dependencies/js-sdk/src/common/logging/logger"),i=e("underscore"),s=r.register("DomainDesigner"),g=function(e){i.bindAll(this,"log"),this.name=e.name};g.prototype.log=function(e,n){s.debug(this.name,n,e)},o.exports=g});