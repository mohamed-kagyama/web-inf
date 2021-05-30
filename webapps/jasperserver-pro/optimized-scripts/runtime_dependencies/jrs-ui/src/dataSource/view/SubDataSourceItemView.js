/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","jquery","../../core/core.layout","../../components/list.base","text!../template/subDataSourceItemTemplate.htm","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"],function(e,t,i){var n=e("backbone"),a=e("jquery"),s=e("../../core/core.layout"),o=e("../../components/list.base"),r=o.dynamicList,d=e("text!../template/subDataSourceItemTemplate.htm"),l=e("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");i.exports=n.View.extend({events:{"keyup input[type='text']":"updateDataSourceId","change input[type='text']":"updateDataSourceId"},initialize:function(e){var t=this.model.toJSON();this._listItem=new r.UnderscoreTemplatedListItem({template:d,cssClassName:s.LEAF_CLASS,value:t,tooltipText:this.model.get("uri")}),l.bind(this,{valid:this.fieldIsValid,invalid:this.fieldIsInvalid,forceUpdate:!0})},updateDataSourceId:function(e){var t=this.$("input[type='text']"),i={};i.id=a.trim(t.val()),this.model.set(i),this.model.validate(i),this._listItem.setValue(this.model.toJSON())},getListItem:function(){return this._listItem},setRootElement:function(){this.setElement(this._listItem._getElement())},fieldIsValid:function(e,t,i){var n=e.$("input[type='text']").parent();n.removeClass("error"),n.find(".validatorMessageContainer").removeClass("error"),n.find(".message.warning").text("")},fieldIsInvalid:function(e,t,i,n){var a=e.$("input[type='text']").parent();a.addClass("error"),a.find(".validatorMessageContainer").addClass("error"),a.find(".message.warning").text(i)}})});