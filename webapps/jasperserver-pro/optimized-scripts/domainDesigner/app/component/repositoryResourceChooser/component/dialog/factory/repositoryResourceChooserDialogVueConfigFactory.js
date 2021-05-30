/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../common/vue/computed/i18nComputed","text!../template/repositoryResourceChooserDialogTemplate.htm","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,o,t){var n=e("underscore"),r=e("../../../../../common/vue/computed/i18nComputed"),s=e("text!../template/repositoryResourceChooserDialogTemplate.htm"),i=e("bundle!DomainDesignerBundle"),u=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage");u.create(i);t.exports={create:function(e){var o=e.store;return{components:{repositoryResourceChooser:e.RepositoryResourceChooser},mixins:e.mixins,template:s,computed:n.extend({isConfirmationActive:function(){return!this.isRepositoryChooserSelectionEmptyInCurrentMode&&!this.isSelectionShouldBeIgnored&&!this.isAnyInvalidRepositoryChooserResourcesInCurrentMode}},r),data:function(){return o.attributes}}}}});