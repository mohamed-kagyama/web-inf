/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/reportStatuses","underscore"],function(t,e,s){var i=t("../enum/reportStatuses"),n=t("underscore");s.exports={isCompleted:function(){return!n.isUndefined(this.get("status"))&&(this.isFailed()||this.isReady()||this.isCancelled())},isFailed:function(){return this.get("status")===i.FAILED},isCancelled:function(){return this.get("status")===i.CANCELLED},isReady:function(){return this.get("status")===i.READY},isQueued:function(){return this.get("status")===i.QUEUED},isExecuting:function(){return this.get("status")===i.EXECUTION}}});