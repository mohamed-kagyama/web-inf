/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","vue","../../../component/repositoryResourceChooser/component/dialog/wrapper/RepositoryResourceChooserDialogWrapper","../../../component/repositoryResourceChooser/component/chooser/factory/repositoryResourceChooserFactory","../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserComputedMixinFactory","../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory","../../../component/repositoryResourceChooser/component/chooser/mixin/behaviour/repositoryResourceChooserResourceDoubleClickBehaviourMixin","../../../component/repositoryResourceChooser/component/chooser/predicate/ignoreFolderSelectionPredicate","runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/view/RepositoryItemChooserDialogView","../../../component/repositoryResourceChooser/factory/RepositoryResourceChooserDialogFactory","text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserTreeTemplate.htm","text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserListTemplate.htm","../../../common/factory/addAutomationDataNameAttributeMixinFactory","../../../common/enum/automationDataNameAttributesEnum","../../../component/repositoryResourceChooser/component/dialog/store/RepositoryResourceChooserDialogStore","../../../component/repositoryResourceChooser/component/dialog/factory/repositoryResourceChooserDialogVueConfigFactory","../../../component/repositoryResourceChooser/component/dialog/mixin/behaviour/repositoryResourceChooserDialogBehaviourMixinFactory"],function(o,e,r){function t(o,e){o.register("repositoryChooserDialogFactory",new h({Dialog:y})),o.register("vueRepositoryChooserDialogFactory",{create:function(r){return s(o,r,e)}})}function s(o,e,r){var t=new g({},{listItemHeight:r.repositoryResourceChooser.resourcesList.itemsHeight}),s=t.get("repositoryResourceChooser");o.register("repositoryResourceChooserDialogStore",t);var y=l.create({config:{},dataNames:d.common.repositoryResourceChooser}).mixins,h=l.create({config:{},dataNames:d.common.repositoryResourceChooserList}).mixins,f=l.create({config:{},dataNames:d.common.repositoryResourceChooserTree}).mixins,T=n.create({store:s,resourceService:o.get("resourcesServiceWrappedWithLoader"),resourcesTypeToSelectTree:e.resourcesTypeToSelectTree,resourcesTypeToLoad:e.resourcesTypeToLoad||e.resourcesTypeToSelectTree,repositoryResourceChooserList:{offset:r.repositoryResourceChooser.resourcesList.offset,limit:r.repositoryResourceChooser.resourcesList.limit,template:R,mixins:h.concat(u)},repositoryResourceChooserTree:{debounceTime:r.loader.dialog.loadingDelay+r.loader.embedded.loadingMinDuration,offset:r.repositoryResourceChooser.repositoryTree.offset,limit:r.repositoryResourceChooser.repositoryTree.limit,template:C,mixins:f.concat(u)},mixins:y}),v=D.create({store:o.get("repositoryResourceChooserDialogStore"),repositoryResourceChooserStateMutations:T.mutations,repositoryResourceChooserStateActions:T.actions}),S=x.create({RepositoryResourceChooser:T.component,store:o.get("repositoryResourceChooserDialogStore"),mixins:[T.behaviour,v,p.create({store:s}),a.create({store:s,test:e.ignoreResourceSelectionPredicate||m})]}),F=l.create({config:S,dataNames:d.common.repositoryResourceChooserDialog}),b=i.extend(F),M=new b;return o.register("repositoryResourceChooserDialog",M),new c({repositoryResourceChooserDialog:M})}var i=o("vue"),c=o("../../../component/repositoryResourceChooser/component/dialog/wrapper/RepositoryResourceChooserDialogWrapper"),n=o("../../../component/repositoryResourceChooser/component/chooser/factory/repositoryResourceChooserFactory"),p=o("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserComputedMixinFactory"),a=o("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory"),u=o("../../../component/repositoryResourceChooser/component/chooser/mixin/behaviour/repositoryResourceChooserResourceDoubleClickBehaviourMixin"),m=o("../../../component/repositoryResourceChooser/component/chooser/predicate/ignoreFolderSelectionPredicate"),y=o("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/view/RepositoryItemChooserDialogView"),h=o("../../../component/repositoryResourceChooser/factory/RepositoryResourceChooserDialogFactory"),C=o("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserTreeTemplate.htm"),R=o("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserListTemplate.htm"),l=o("../../../common/factory/addAutomationDataNameAttributeMixinFactory"),d=o("../../../common/enum/automationDataNameAttributesEnum"),g=o("../../../component/repositoryResourceChooser/component/dialog/store/RepositoryResourceChooserDialogStore"),x=o("../../../component/repositoryResourceChooser/component/dialog/factory/repositoryResourceChooserDialogVueConfigFactory"),D=o("../../../component/repositoryResourceChooser/component/dialog/mixin/behaviour/repositoryResourceChooserDialogBehaviourMixinFactory");r.exports=function(o,e){t(o,e)}});