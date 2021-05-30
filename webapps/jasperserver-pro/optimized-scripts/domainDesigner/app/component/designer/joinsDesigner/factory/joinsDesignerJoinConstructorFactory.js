/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,n){function l(e){return{fieldId:e.resource.id,fieldLabel:e.label,joinTreeId:e.resource.parentJoinTreeId,tableReferenceId:e.resource.parentTableReferenceId,tableReferenceLabel:e.resource.parentTableReferenceName,isDropAreaEnabled:!1}}function i(){return{fieldId:null,fieldLabel:"",joinTreeId:null,tableReferenceId:null,tableReferenceLabel:"",isDropAreaEnabled:!1}}n.exports={create:function(e){var r=e.item;return{joinTreeId:e.joinTreeId,leftSide:l(r),rightSide:i()}}}});