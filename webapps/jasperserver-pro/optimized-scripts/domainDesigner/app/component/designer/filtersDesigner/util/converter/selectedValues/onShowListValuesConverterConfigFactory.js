/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../model/schema/enum/genericTypesEnum"],function(e,n,r){function u(e){var n={},r=[e.onShowListValuesConverter];return n[o.INTEGER]=r,n[o.DECIMAL]=r,n[o.BOOLEAN]=r,n[o.DATE]=r,n[o.TIME]=r,n[o.TIMESTAMP]=r,n}var o=e("../../../../../../../model/schema/enum/genericTypesEnum");r.exports={create:function(e){return e=e||{},u(e)}}});