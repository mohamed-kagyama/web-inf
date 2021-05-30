/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery","bundle!DashboardBundle","backbone","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"],function(e,n,o){var i=e("underscore"),r=e("jquery"),d=e("bundle!DashboardBundle"),t=e("backbone"),a=e("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"),s=t.Model.extend({idAttribute:"name",defaults:{name:"",value:""},validation:{name:function(e){if(!r.trim(e))return d["dashboard.component.dialog.properties.hyperlinks.required.field"]},value:function(e){if(!r.trim(e))return d["dashboard.component.dialog.properties.hyperlinks.required.field"]}}});i.extend(s.prototype,a.mixin),o.exports=s});