/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../model/enum/emptyDataSourceEnum"],function(e,r,o){var u=e("../../../../model/enum/emptyDataSourceEnum");o.exports={isSatisfiedBy:function(e){return e.errorCode===u.DATA_SOURCE_IS_EMPTY}}});