/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","underscore"],function(e,n,i){function a(e){var n=this.get("defaultJiveUi"),i="floating"+e+"HeadersEnabled",a=!1;return!d.isUndefined(n)&&!d.isUndefined(n[i])&&(a=n[i]),a}var t=e("backbone"),d=e("underscore"),r=t.Model.extend({defaults:{pages:1,autoresize:!0,chart:{},loadingOverlay:!0},isDefaultJiveUiEnabled:function(){var e=this.get("defaultJiveUi");return d.isUndefined(e)||d.isUndefined(e.enabled)||e.enabled},isFloatingTableHeaderEnabled:function(){return a.call(this,"Table")},isFloatingCrosstabHeaderEnabled:function(){return a.call(this,"Crosstab")}});i.exports=r});