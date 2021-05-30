/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../util/pathUtil","underscore"],function(e,r,t){var i=e("../../../../util/pathUtil"),l=e("underscore");t.exports={parse:function(e){var r=i.split(e,"\\",".");return{alias:l.first(r),field:l.last(r)}}}});