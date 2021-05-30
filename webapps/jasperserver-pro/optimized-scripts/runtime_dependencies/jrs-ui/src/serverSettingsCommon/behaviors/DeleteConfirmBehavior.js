/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.marionette","../enum/confirmDialogTypesEnum"],function(e,i,n){var o=e("backbone.marionette"),t=e("../enum/confirmDialogTypesEnum");n.exports=o.Behavior.extend({events:{"click .delete":"_onDeleteClick"},_onDeleteClick:function(e){this.view.trigger("open:confirm",t.DELETE_CONFIRM,this.view,this.view.model)}})});