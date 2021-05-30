/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,n){var i=e("underscore");n.exports={getSelectedFieldsAsArray:function(e){var r=e.fields,n=e.selection;return r?r.filter(function(e){return!i.isUndefined(n.fields[e.name])}):[]}}});