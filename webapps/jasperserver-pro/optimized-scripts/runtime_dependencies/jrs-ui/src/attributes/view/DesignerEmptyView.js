/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone.marionette","../../attributes/enum/attributesTypesEnum","../../attributes/factory/rowTemplatesFactory"],function(e,t,r){var a=e("underscore"),i=e("backbone.marionette"),s=e("../../attributes/enum/attributesTypesEnum"),n=e("../../attributes/factory/rowTemplatesFactory"),o=i.ItemView.extend({className:"table-row",templateHelpers:function(){return{type:this.type,types:s}},initialize:function(e){e=e||{},this.type=e.type,this.template=a.template(n({empty:!0}))}});r.exports=o});