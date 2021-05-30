/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,u){var n=e("underscore");u.exports={deepDefaults:function(e,r){return n.reduce(r,function(r,u,t){return r[t]=e[t]?n.defaults(e[t],u):u,r},{})}}});