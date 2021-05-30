/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var n=e("underscore"),o=function(e){this.initialize(e)};n.extend(o.prototype,{initialize:function(e){},isSatisfiedBy:function(e){var r=e.filter,i=e.sidebarCurrentResource,n=r.expression.left,o=r.expression.right,t=n.fieldId,s=n.sourceId,d=o.fieldId,u=o.sourceId,c=i.resourceId,f=i.sourceId,l=c===t||c===d,a=f===s||f===u;return l&&a}}),i.exports=o});