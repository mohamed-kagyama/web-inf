/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../enum/invalidSecurityFileErrorsEnum"],function(e,i,r){var n=e("underscore"),t=e("../enum/invalidSecurityFileErrorsEnum"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){},isSatisfiedBy:function(e){return e=n.isArray(e)?e:[e],!n.some(e,function(e){return!t[e.errorCode]})}}),r.exports=o});