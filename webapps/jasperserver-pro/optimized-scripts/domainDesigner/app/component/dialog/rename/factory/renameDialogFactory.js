/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","../RenameDialog","./renameDialogVueConfigFactory","../../../../common/factory/addAutomationDataNameAttributeMixinFactory"],function(e,a,t){var o=e("vue"),n=e("../RenameDialog"),r=e("./renameDialogVueConfigFactory"),i=e("../../../../common/factory/addAutomationDataNameAttributeMixinFactory");t.exports={create:function(e){var a=e.store,t=e.dataNameAttrs,m=i.create({config:r.create({store:a,components:e.components}),dataNames:t}),c=o.extend(m),u=new c;new n({renameDialog:u});return u}}});