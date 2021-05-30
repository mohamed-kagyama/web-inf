/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","bundle!adhoc_messages","backbone","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"],function(e,n,o){var i=e("underscore"),t=e("jquery"),r=e("bundle!adhoc_messages"),s=e("backbone"),d=e("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"),a=s.Model.extend({idAttribute:"name",defaults:{name:"",value:null},validation:{name:function(e){if(!t.trim(e))return r.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_REQUIRED_FIELD},value:function(e){if(!t.trim(e))return r.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_REQUIRED_FIELD}}});i.extend(a.prototype,d.mixin),o.exports=a});