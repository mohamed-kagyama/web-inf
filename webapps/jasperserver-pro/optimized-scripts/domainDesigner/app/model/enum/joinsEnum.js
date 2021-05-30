/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./expressionsEnum","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,r){var i=e("underscore"),s=e("./expressionsEnum"),o=e("bundle!DomainDesignerBundle"),l=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=s.operators,a=l.create(o);r.exports={joinOperators:i.pick(u,["equals","notEqual","greater","less","greaterOrEqual","lessOrEqual"]),joinTypes:{inner:{name:"inner",label:a("domain.designer.joinsDesigner.joinType.inner")},leftOuter:{name:"leftOuter",label:a("domain.designer.joinsDesigner.joinType.left")},rightOuter:{name:"rightOuter",label:a("domain.designer.joinsDesigner.joinType.right")},fullOuter:{name:"fullOuter",label:a("domain.designer.joinsDesigner.joinType.full")}}}});