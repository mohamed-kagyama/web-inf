/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,e,i){var r=n("underscore");i.exports=function(n){var e,i,o=n.config,t=n.name,u=n.context,s=n.options,c=r.result(o,t);return c&&(r.isString(c)?(i=u[c],r.isFunction(i)&&(e=s?r.bind(i,u,s):r.bind(i,u))):r.isFunction(c)&&(e=c)),e}});