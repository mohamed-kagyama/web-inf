/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../expression/joinParserUtil/joinParserUtil","../../expression/joinExpressionUtil","../../../../model/schema/enum/schemaEntitiesEnum","../../../../model/schema/util/entityUtil","../../../../model/schema/util/schemaModelUtil"],function(e,i,t){function n(e){this.entityFactory=e.entityFactory}var o=e("underscore"),s=e("../../expression/joinParserUtil/joinParserUtil"),r=e("../../expression/joinExpressionUtil"),l=e("../../../../model/schema/enum/schemaEntitiesEnum"),a=e("../../../../model/schema/util/entityUtil"),c=e("../../../../model/schema/util/schemaModelUtil");o.extend(n.prototype,{parseJoin:function(e){var i,t,n=e.joinJson,r=e.joinTree,a=e.collections,c=r.getJoinAliases().by({name:n.left}),d=r.getJoinAliases().by({name:n.right}),g=l.JOIN;try{i=s.parseJoin(n.expression.object),o.each(i,function(e){this._checkJoinExpression({leftJoinAlias:c,rightJoinAlias:d,expressionJson:e})},this)}catch(e){g=l.COMPLEX_JOIN}return t=g===l.JOIN?this._createJoin({joinTree:r,joinJson:n,leftJoinAlias:c,rightJoinAlias:d,expressions:i,collections:a}):this._createComplexJoin({joinTree:r,joinJson:n,leftJoinAlias:c,rightJoinAlias:d,collections:a}),a.joins.add(t),t},_createJoin:function(e){var i=e.joinTree,t=e.joinJson,n=e.leftJoinAlias,s=e.rightJoinAlias,r=e.expressions,l=e.collections,a=this.entityFactory.createJoin({joinTreeId:i.getId(),weight:t.weight,type:t.type,leftJoinAliasId:n.getId(),rightJoinAliasId:s.getId()}),c=o.map(r,function(e){return this._isConstantJoinExpression(e)?this._parseConstantJoinExpression({join:a,leftJoinAlias:n,rightJoinAlias:s,expression:e,collections:l}):this._parseJoinExpression({join:a,leftJoinAlias:n,rightJoinAlias:s,expression:e,collections:l})},this);return a.setJoinExpressions(c),a},_createComplexJoin:function(e){var i=e.joinTree,t=e.joinJson,n=e.leftJoinAlias,s=e.rightJoinAlias,l=e.collections,d=this,g=r.collectJoinVariables(t.expression.object),f=o.reduce(g,function(e,t,n){var s=i.getJoinAliases().byField("name",n),r=l.constantGroups.byField("name",n),g=[];if(s){var f=c.getTableReferenceByJoinAlias(s,l),p=c.getTableByTableReference(f,l),J=o.indexBy(c.getAllTableFields(p).concat(f.getCalcFields().toArray()),"name");g=o.map(t,function(e){var i=J[e];return d.entityFactory.createFieldReference({sourceId:s.getId(),sourceType:a.getEntityName(s),fieldId:i.getId(),fieldType:a.getEntityName(i)})})}else{if(!r)throw new Error("Unknown join alias: "+n);g=o.map(t,function(e){var i=r.getCalcFields().byField("name",e);return d.entityFactory.createFieldReference({sourceId:r.getId(),sourceType:a.getEntityName(r),fieldId:i.getId(),fieldType:a.getEntityName(i)})})}return e.concat(g)},[]);return this.entityFactory.createComplexJoin({joinTreeId:i.getId(),weight:t.weight,type:t.type,leftJoinAliasId:n.getId(),rightJoinAliasId:s.getId(),expression:t.expression,fieldReferences:f})},_parseConstantJoinExpression:function(e){var i,t=e.join,n=e.expression,s=e.collections,r=e.leftJoinAlias,l=e.rightJoinAlias,a=n.leftAlias,d=n.leftField,g=n.rightValue,f=n.operator;r.getName()===a?i=r:l.getName()===a&&(i=l);var p=s.tableReferences.byId(i.getTableReferenceId()),J=s.tables.byId(p.getTableId()),h=c.getAllTableFields(J,s).concat(p.getCalcFields().toArray()),I=o.findWhere(h,{name:d}),y=this.entityFactory.createConstantJoinExpression({joinId:t.getId(),fieldId:I.getId(),joinAliasId:i.getId(),value:g,operator:f});return s.joinExpressions.add(y),y},_parseJoinExpression:function(e){var i=e.join,t=e.leftJoinAlias,n=e.rightJoinAlias,s=e.expression,r=e.collections,l=t;t.getName()!==s.leftAlias&&(t=n,n=l);var a=r.tableReferences.byId(t.getTableReferenceId()),d=r.tableReferences.byId(n.getTableReferenceId()),g=r.tables.byId(a.getTableId()),f=r.tables.byId(d.getTableId()),p=c.getAllTableFields(g).concat(a.getCalcFields().toArray()),J=c.getAllTableFields(f).concat(d.getCalcFields().toArray()),h=o.findWhere(p,{name:s.leftField}),I=o.findWhere(J,{name:s.rightField}),y=this.entityFactory.createJoinExpression({joinId:i.getId(),operator:s.operator,leftJoinAliasId:t.getId(),rightJoinAliasId:n.getId(),leftFieldId:h.getId(),rightFieldId:I.getId()});return r.joinExpressions.add(y),y},_checkJoinExpression:function(e){var i=e.leftJoinAlias,t=e.rightJoinAlias,n=e.expressionJson;if(this._isConstantJoinExpression(n)){if(i.getName()!==n.leftAlias&&t.getName()!==n.leftAlias)throw new Error("Invalid join expression")}else{var o=i;if(i.getName()!==n.leftAlias&&(i=t,t=o),i.getName()!==n.leftAlias||t.getName()!==n.rightAlias)throw new Error("Invalid join expression")}},_isConstantJoinExpression:function(e){return!o.isUndefined(e.rightValue)}}),t.exports=n});