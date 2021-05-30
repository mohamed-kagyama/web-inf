/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","text!../template/uploadDialogTabsVueTemplate.htm","../mixin/computed/uploadDialogTabsComputedMixin","../../enum/uploadDialogTabEnum","../../../../../../../common/vue/computed/i18nComputed"],function(e,o,t){var i=e("underscore"),u=e("text!../template/uploadDialogTabsVueTemplate.htm"),a=e("../mixin/computed/uploadDialogTabsComputedMixin"),m=e("../../enum/uploadDialogTabEnum"),n=e("../../../../../../../common/vue/computed/i18nComputed");t.exports={create:function(){return{template:u,mixins:[a],props:{currentTab:{type:String,default:m.REPOSITORY}},computed:i.extend({},n),methods:{onRepositoryTabClick:function(){this.$emit("repositoryTabClick")},onLocalFileTabClick:function(){this.$emit("localFileTabClick")}}}}}});