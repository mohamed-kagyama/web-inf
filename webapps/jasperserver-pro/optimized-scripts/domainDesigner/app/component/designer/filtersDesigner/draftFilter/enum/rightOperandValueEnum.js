/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/util/profileAttributeUtil","../../../../../../model/schema/enum/genericTypesEnum","../../../../../../model/schema/enum/filterOperandTypesEnum","../../../../../util/designer/filters/enum/booleanStringEquivalentEnum","../../../../../model/enum/clientExpressionsEnum","../../util/filterOperandTypeUtil"],function(e,t,r){function i(e,t){var r=t.currentFilter.expression,i=t.currentFilter.dataType,a=t.newFilterOptions.availableValues,n=e;if(i){var s=a&&a.length>0,o=r.right&&!c.isVariable(r.right.type);if(s)n=a[0];else if(o)if(c.isLiteral(r.right.type)){var l=!f.isUndefined(r.right.value);l&&(n=r.right.value)}else if(c.isList(r.right.type)){var p=r.right.items,u=p&&p.length>0;u&&(n=p[0])}else if(c.isRange(r.right.type)){var m=r.right.start,g=!f.isUndefined(m.value);g&&(n=m.value)}}return{type:t.newFilterOptions.rightOperandType,value:n}}function a(e,t){var r=t.currentFilter.expression,i=e,a=e;if(r.right){var n=r.right.type;if(c.isLiteral(n))i=r.right.value,a=r.right.value;else if(c.isList(n)){var s=r.right.items;s&&s.length>0&&(i=s[0],a=s[s.length-1])}else c.isRange(n)&&(i=r.right.start.value,a=r.right.end.value)}return{type:t.newFilterOptions.rightOperandType,start:{value:i},end:{value:a}}}function n(e){var t=e.currentFilter.expression;return t.right&&c.isVariable(t.right.type)?t.right:{type:e.newFilterOptions.rightOperandType}}function s(e,t,r){var i=r.currentFilter.expression,a=i.right||{},n=e===i.operator,s=0===f.size(a.items),o=s&&Boolean(a.isAll)===t;return n&&o}function o(e,t,r){var i,a=r.currentFilter.expression,n=a.right||{},s=O,o={type:r.newFilterOptions.rightOperandType,items:[],isAll:e};if(a.right)if(c.isList(n.type))t(r)||(o=f.extend({},o,{items:n.items,isAll:n.isAll}));else if(c.isLiteral(n.type)&&(i=a.right.value)!==s){var l=[E.operators.equals.name,E.operators.notEqual.name];if(f.indexOf(l,a.operator)>-1){var p=g.containsProfileAttribute(i),u=r.newFilterOptions.availableValues;p||u&&0!==u.length&&i===u[0]||(o=f.extend({},o,{items:[i],isAll:!1}))}}return o}function l(e){var t=e.currentFilter.expression,r=e.currentFilter.dataType,i=e.newFilterOptions.availableValues,a=O;if(r){var n=i&&i.length>0,s=t.right&&!c.isVariable(t.right.type);if(n&&!e.newFilterOptions.isRawValueEditor)a=i[0];else if(s)if(c.isLiteral(t.right.type)){var o=[E.functions.contains.name,E.functions.notContains.name,E.functions.startsWith.name,E.functions.notStartsWith.name,E.functions.endsWith.name,E.functions.notEndsWith.name],l=[E.operators.equals.name,E.operators.notEqual.name],p=f.indexOf(o,t.operator)<0||f.indexOf(l,e.newFilterOptions.operator)<0;if(p){var u=!f.isUndefined(t.right.value);!u||n&&t.right.value===i[0]||(a=t.right.value)}}else if(c.isList(t.right.type)){var m=t.right.items,g=m&&m.length>0;g&&(a=m[0])}}return{type:e.newFilterOptions.rightOperandType,value:a}}function p(e,t,r){var i=r.currentFilter.expression,a=i.right||{},n={type:r.newFilterOptions.rightOperandType,items:[],isAll:e};return i.right&&c.isList(a.type)&&(t(r)||(n=f.extend({},n,{items:a.items,isAll:a.isAll}))),n}function u(e,t,r){var i,a=r.currentFilter.expression,n=a.right||{},s=y,o={type:r.newFilterOptions.rightOperandType,items:[],isAll:e};if(a.right)if(c.isList(n.type))t(r)||(o=f.extend({},o,{items:n.items,isAll:n.isAll}));else if(c.isLiteral(n.type)&&(i=a.right.value)!==s){var l=r.validatorConfig[v.LITERAL][h.BOOLEAN],p=l.validate(i),u=f.isUndefined(p);if(u){var m=g.containsProfileAttribute(i);m||(o=f.extend({},o,{items:[i],isAll:!1}))}}return o}function m(e){var t=e.currentFilter.expression,r=e.currentFilter.dataType,i=y;if(r){if(t.right&&!c.isVariable(t.right.type))if(c.isLiteral(t.right.type)){var a=!f.isUndefined(t.right.value),n=e.currentFilter.isRawValueEditor,s=e.newFilterOptions.isRawValueEditor;if(a)if(n&&s)i=t.right.value;else{var o=e.validatorConfig[v.LITERAL][h.BOOLEAN],l=o.validate(t.right.value),p=f.isUndefined(l);p&&(i=t.right.value)}}else if(c.isList(t.right.type)){var u=t.right.items,m=u&&u.length>0;m&&(i=u[0])}}return{type:e.newFilterOptions.rightOperandType,value:i}}var f=e("underscore"),g=e("../../../../../../model/util/profileAttributeUtil"),h=e("../../../../../../model/schema/enum/genericTypesEnum"),v=e("../../../../../../model/schema/enum/filterOperandTypesEnum"),d=e("../../../../../util/designer/filters/enum/booleanStringEquivalentEnum"),E=e("../../../../../model/enum/clientExpressionsEnum"),c=e("../../util/filterOperandTypeUtil"),O="",y=d.FALSE,A=f.partial(s,E.operators.notIn.name,!1),L=f.partial(s,E.operators.in.name,!0),T={};T[E.operators.in.name]=f.partial(o,!0,A),T[E.operators.notIn.name]=f.partial(o,!1,L);var q={};q[E.operators.equals.name]=l,q[E.operators.notEqual.name]=l,q[E.functions.contains.name]=l,q[E.functions.notContains.name]=l,q[E.functions.startsWith.name]=l,q[E.functions.notStartsWith.name]=l,q[E.functions.endsWith.name]=l,q[E.functions.notEndsWith.name]=l;var F={};F[E.operators.equals.name]=n,F[E.operators.notEqual.name]=n,F[E.functions.contains.name]=n,F[E.functions.notContains.name]=n,F[E.functions.startsWith.name]=n,F[E.functions.notStartsWith.name]=n,F[E.functions.endsWith.name]=n,F[E.functions.notEndsWith.name]=n;var I={};I[v.LIST]=T,I[v.LITERAL]=q,I[v.VARIABLE]=F;var x=f.partial(i,""),R=f.partial(a,""),w={};w[E.operators.in.name]=f.partial(p,!0,A),w[E.operators.notIn.name]=f.partial(p,!1,L);var V={};V[E.operators.in.name]=R,V[E.operators.notIn.name]=R;var b={};b[E.operators.equals.name]=x,b[E.operators.notEqual.name]=x,b[E.operators.greater.name]=x,b[E.operators.less.name]=x,b[E.operators.greaterOrEqual.name]=x,b[E.operators.lessOrEqual.name]=x;var W={};W[E.operators.equals.name]=n,W[E.operators.notEqual.name]=n,W[E.operators.greater.name]=n,W[E.operators.less.name]=n,W[E.operators.greaterOrEqual.name]=n,W[E.operators.lessOrEqual.name]=n;var S={};S[v.LIST]=w,S[v.RANGE]=V,S[v.LITERAL]=b,S[v.VARIABLE]=W;var U=f.partial(i,""),B=f.partial(a,""),N={};N[E.operators.in.name]=B,N[E.operators.notIn.name]=B;var C={};C[E.operators.equals.name]=U,C[E.operators.notEqual.name]=U,C[E.operators.greater.name]=U,C[E.operators.less.name]=U,C[E.operators.greaterOrEqual.name]=U,C[E.operators.lessOrEqual.name]=U;var G={};G[E.operators.equals.name]=n,G[E.operators.notEqual.name]=n,G[E.operators.greater.name]=n,G[E.operators.less.name]=n,G[E.operators.greaterOrEqual.name]=n,G[E.operators.lessOrEqual.name]=n;var M={};M[v.RANGE]=N,M[v.LITERAL]=C,M[v.VARIABLE]=G;var P={};P[E.operators.in.name]=f.partial(u,!0,A),P[E.operators.notIn.name]=f.partial(u,!1,L);var D={};D[E.operators.equals.name]=m,D[E.operators.notEqual.name]=m;var z={};z[E.operators.equals.name]=n,z[E.operators.notEqual.name]=n;var j={};j[v.LIST]=P,j[v.LITERAL]=D,j[v.VARIABLE]=z;var k={};k[h.STRING]=I,k[h.INTEGER]=S,k[h.DECIMAL]=S,k[h.DATE]=M,k[h.TIMESTAMP]=M,k[h.TIME]=M,k[h.BOOLEAN]=j,r.exports=k});