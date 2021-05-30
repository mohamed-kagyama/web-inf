/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./expressionsEnum","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(n,e,s){var o=n("underscore"),t=n("./expressionsEnum"),i=n("bundle!DomainDesignerBundle"),r=n("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=r.create(i);s.exports={castFunctions:t.castFunctions,functions:o.extend({notContains:{name:"notContains"},notStartsWith:{name:"notStartsWith"},notEndsWith:{name:"notEndsWith"}},t.functions),operators:o.extend({notIn:{label:a("domain.designer.expression.operator.notIn"),name:"notIn"}},o.omit(t.operators,t.operators.or.name))}});