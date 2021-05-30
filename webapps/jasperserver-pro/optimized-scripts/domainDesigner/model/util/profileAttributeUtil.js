/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","xregexp","settings!profileAttributes","../../app/model/enum/clientExpressionsEnum"],function(t,e,r){function n(t){return t&&Boolean(t.match(m))}function i(t){return t&&Boolean(t.match(g))}function o(t){return t&&Boolean(t.match(d))}function u(t){return t&&t.match(b)}function a(t){return t&&t.match(A)}function c(t){return x.attribute.name+"("+f.map(t,function(t){return"'"+t+"'"}).join(",")+")"}function l(t){var e=t.match(m),r=[];return e&&(r.push(e[1]),e[2]&&r.push(e[3])),r}function s(t){return c(l(t))}var f=t("underscore"),P=t("xregexp"),p=t("settings!profileAttributes"),h=t("../../app/model/enum/clientExpressionsEnum"),m=new P(p.attributeFunctionPattern),b=new P(p.attributeFunctionPattern,"g"),d=new P(p.attributePlaceholderGroupingPattern),g=new P("^"+p.attributePlaceholderGroupingPattern+"$"),A=/({)/g,x=h.functions;r.exports={containsProfileAttribute:n,containsProfileAttributeWithPlaceholders:o,containsProfileAttributeWithPlaceholdersOnly:i,removeProfileAttributePlaceholders:s,getProfileAttributes:u,getProfileAttributePlaceHolders:a,createProfileAttributeFunctionWithArgs:c,extractProfileAttributeArgs:l}});