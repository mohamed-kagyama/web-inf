/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../enum/artificialTreeResourceTypesEnum"],function(e,r,n){function u(e){return e.type===t.DERIVED_TABLE_GROUP}function i(e){return e.type===t.CONSTANT_GROUP}var t=e("../enum/artificialTreeResourceTypesEnum");n.exports={isDerivedTableGroup:u,isConstantGroup:i}});