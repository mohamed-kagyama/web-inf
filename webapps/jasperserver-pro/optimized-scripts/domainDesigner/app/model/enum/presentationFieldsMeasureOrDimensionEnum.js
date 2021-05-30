/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","../../../model/schema/enum/measureOrDimensionEnum"],function(e,n,i){var s=e("bundle!DomainDesignerBundle"),m=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),r=e("../../../model/schema/enum/measureOrDimensionEnum"),d=m.create(s),o={};o[r.MEASURE]=d("domain.designer.presentationDesigner.presentationField.measure"),o[r.DIMENSION]=d("domain.designer.presentationDesigner.presentationField.dimension"),i.exports=o});