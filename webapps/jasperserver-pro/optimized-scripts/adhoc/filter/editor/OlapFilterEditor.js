/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./FilterEditor","underscore","text!./template/olapFilterEditorTemplate.htm"],function(t,e,i){var r=t("./FilterEditor"),l=t("underscore"),o=t("text!./template/olapFilterEditorTemplate.htm");i.exports=r.extend({template:l.template(o),isOlap:!0,initialize:function(){r.prototype.initialize.apply(this,arguments),this.stopListening(this.model,"change:filterLetter",this.redrawFilterTitle)}})});