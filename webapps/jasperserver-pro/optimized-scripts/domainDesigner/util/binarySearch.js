/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(r,e,n){n.exports=function(r,e){var n=-1;if(r&&r.length>0)for(var o=r.length,t=0,f=o-1;t<=f;){var i=Math.floor((f+t)/2),a=r[i],u=e(a);if(0===u){n=i;break}u>0?t=i+1:u<0&&(f=i-1)}return n}});