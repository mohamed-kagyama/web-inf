/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","settings!dateTimeSettings","../../../model/schema/enum/dataSourceMetadataTypesEnum"],function(e,t,i){var n=e("settings!dateTimeSettings"),m=e("../../../model/schema/enum/dataSourceMetadataTypesEnum");i.exports={isTimezoneFormattingShouldBeAppliedForDate:function(){return n.timezoneFormatting[m.Date]},isTimezoneFormattingShouldBeAppliedForTime:function(){return n.timezoneFormatting[m.Time]},isTimezoneFormattingShouldBeAppliedForTimestamp:function(){return n.timezoneFormatting[m.Timestamp]}}});