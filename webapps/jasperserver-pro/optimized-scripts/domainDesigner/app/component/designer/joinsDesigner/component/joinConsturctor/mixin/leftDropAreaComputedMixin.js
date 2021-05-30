/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,n,i){var t=e("bundle!DomainDesignerBundle"),s=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=s.create(t);i.exports={computed:{isResourceDropped:function(){return this.state.tableReferenceId&&this.state.fieldId},label:function(){return this.state.tableReferenceLabel&&this.state.fieldLabel?this.state.tableReferenceLabel+":"+this.state.fieldLabel:""},isLabelVisible:function(){return this.isResourceDropped},placeholder:function(){return r("domain.designer.joinsDesigner.dropArea.dragField")}}}});