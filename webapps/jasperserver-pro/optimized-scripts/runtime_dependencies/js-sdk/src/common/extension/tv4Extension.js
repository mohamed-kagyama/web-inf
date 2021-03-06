/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","tv4","../util/parse/time","../util/parse/date"],function(e,t,i){var s=e("tv4"),r=e("../util/parse/time"),m=e("../util/parse/date");s.addFormat({"date-time":function(e){return m.isIso8601Timestamp(e)?null:"A valid ISO 8601 date-time string (YYYY-MM-DDThh:mm:ss) is expected"},time:function(e){return r.isIso8601Time(e)?null:"A valid ISO 8601 time string (hh:mm:ss) is expected"}}),i.exports=s});