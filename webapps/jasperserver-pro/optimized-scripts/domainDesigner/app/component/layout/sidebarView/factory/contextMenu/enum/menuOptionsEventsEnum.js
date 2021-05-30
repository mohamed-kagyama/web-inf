/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,E,n){var r=e("underscore"),t={};t.COPY_TABLE_REFERENCE={event:"copyTableReference"},t.COPY_DERIVED_TABLE={event:"copyDerivedTable"},t.CREATE_DERIVED_TABLE={event:"createDerivedTable"},t.RENAME_TABLE_REFERENCE={event:"renameTableReference"},t.EDIT_DERIVED_TABLE={event:"editDerivedTable"},t.REMOVE_TABLE_REFERENCE={event:"removeTableReference"},t.REMOVE_DERIVED_TABLE={event:"removeDerivedTable"},t.ALWAYS_INCLUDE_TABLE={event:"alwaysIncludeTable"},t.GENERATE_JOINS={event:"generateJoins"},t.CREATE_CALC_FIELD={event:"createCalcField"},t.EDIT_CALC_FIELD={event:"editCalcField"},t.REMOVE_CALC_FIELD={event:"removeCalcField"},n.exports=r.reduce(t,function(e,E,n){return e[n]=r.extend({},E,{eventWithPrefix:"option:"+E.event}),e},{})});