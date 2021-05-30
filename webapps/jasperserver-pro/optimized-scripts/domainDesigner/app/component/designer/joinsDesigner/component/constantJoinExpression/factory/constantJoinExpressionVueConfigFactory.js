/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../template/constantJoinExpressionVueTemplate.htm","../../../enum/constantJoinExpressionOperatorsEnum","../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum","../../../enum/availableOperatorsByOperator"],function(e,n,o){var t=e("underscore"),s=e("text!../template/constantJoinExpressionVueTemplate.htm"),r=e("../../../enum/constantJoinExpressionOperatorsEnum"),i=e("../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum"),a=e("../../../enum/availableOperatorsByOperator");o.exports={create:function(e){var n=e.joinsDesignerEventBus,o=e.hoverMenuDirective,p=e.constantJoinExpressionMenuOptionsFactory;return{template:s,props:["constantJoinExpression"],directives:{hoverMenu:o},computed:{operatorOptions:function(){var e,n=this.constantJoinExpression.fieldType,o=this.constantJoinExpression.operator;if(!n||!o)return[];var s=i[n],p=t.keys(a[o]),c=r[s];return e=t.filter(c,function(e){return t.indexOf(p,e.name)>-1}),t.map(e,function(e){return{label:e.label,value:e.name}})},constantJoinExpressionMenuOptions:function(){return p.create({constantJoinExpression:t.cloneDeep(this.constantJoinExpression)})}},methods:{selectOperator:function(e){n.trigger("update:constantJoinExpression",{id:this.constantJoinExpression.id,joinId:this.constantJoinExpression.joinId,joinTreeId:this.constantJoinExpression.joinTreeId},{operator:e})},remove:function(){n.trigger("remove:constantJoinExpression",{id:this.constantJoinExpression.id,joinTreeId:this.constantJoinExpression.joinTreeId})},isOperatorSelected:function(e){return this.constantJoinExpression.operator===e}}}}}});