/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,a,i){var t=e("underscore");i.exports={validate:function(e,a,i){if(a.canvas&&a.canvas.type){var n=e.dataSet.query.getAllowedTypesList();if(!t.contains(n,a.canvas.type))return{message:"The specified visualization type is invalid.",errorCode:"visualization.type.invalid",parameters:[a.canvas.type]}}}}});