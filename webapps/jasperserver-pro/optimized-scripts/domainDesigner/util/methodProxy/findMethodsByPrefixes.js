/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(n,r,e){function u(n,r){return i.find(r,function(r){return 0===n.indexOf(r)})}var i=n("underscore");e.exports=function(n,r,e){e=e||[];var o,t=[];for(o in n)i.isFunction(n[o])&&u(o,r)&&!i.contains(e,o)&&t.push(o);return t}});