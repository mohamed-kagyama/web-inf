/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var s=e("underscore"),t=e("bundle!DomainDesignerBundle"),o=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),a=o.create(t),d=function(e){s.bindAll(this,"fn"),this.domainSchemaSpecification=e.domainSchemaSpecification};s.extend(d.prototype,{fn:function(e,n){if(n&&!this.domainSchemaSpecification.canUsePresentationItemName({name:n,id:e}))return a("domain.designer.presentationDesigner.validation.item.exists")}}),i.exports=d});