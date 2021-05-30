/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,o){function i(e){r.isFunction(e.remove)?e.remove():r.isFunction(e.stopListening)&&e.stopListening()}function t(e){r.each(e.getNames(),function(n){e.remove(n,i)})}var r=e("underscore");o.exports={cleanup:t}});