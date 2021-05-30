/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","./multipleFileUploadVueConfigFactory","../actions/multipleFileUploadActionsFactory","../mutations/multipleFileUploadStateMutationsFactory","../mixin/behaviour/multipleFileUploadBehaviourMixinFactory","../../../../../../../common/factory/addAutomationDataNameAttributeMixinFactory","../../../../../../../common/enum/automationDataNameAttributesEnum"],function(t,e,a){var o=t("vue"),i=t("./multipleFileUploadVueConfigFactory"),l=t("../actions/multipleFileUploadActionsFactory"),n=t("../mutations/multipleFileUploadStateMutationsFactory"),u=t("../mixin/behaviour/multipleFileUploadBehaviourMixinFactory"),r=t("../../../../../../../common/factory/addAutomationDataNameAttributeMixinFactory"),m=t("../../../../../../../common/enum/automationDataNameAttributesEnum");a.exports={create:function(t){var e=t.store,a=t.fileLoader,c=l.create({fileLoader:a}),p=n.create({store:e}),d=u.create({multipleFileUploadActions:c,multipleFileUploadStateMutations:p}),s=r.create({config:i.create(),dataNames:m.optionsDesigner.multipleFileUpload});return{component:o.extend(s),actions:c,mutations:p,behaviour:d}}}});