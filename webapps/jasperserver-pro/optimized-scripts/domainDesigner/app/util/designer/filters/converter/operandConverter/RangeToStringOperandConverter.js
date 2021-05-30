/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var r=e("underscore"),t=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),o=s.create(t),d=r.template("{{ print(start.value) }} "+o("domain.designer.filters.expression.operand.and")+" {{ print(end.value) }}"),u=function(e){this.initialize(e)};r.extend(u.prototype,{initialize:function(e){this.converter=e.converter},convert:function(e){return e=this.converter.convert(e),d(e)}}),i.exports=u});