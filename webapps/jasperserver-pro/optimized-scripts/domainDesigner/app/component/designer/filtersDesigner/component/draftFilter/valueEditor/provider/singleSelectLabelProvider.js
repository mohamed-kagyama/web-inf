/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../../model/schema/enum/genericTypesEnum","settings!domainSettings"],function(e,n,t){var i=e("../../../../../../../../model/schema/enum/genericTypesEnum"),s=e("settings!domainSettings");t.exports={getLabel:function(e,n){var t=n;return""===n&&e!==i.STRING&&(t=s.nullLabel),t}}});