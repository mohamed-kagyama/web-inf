define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var i18n = require("bundle!DomainDesignerBundle");

var FileLoader = require("../../../common/util/FileLoader");

var fileExtensionEnum = require("../../../model/enum/fileExtensionEnum");

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var repositoryResourceChooserFactory = require("../../../component/repositoryResourceChooser/component/chooser/factory/repositoryResourceChooserFactory");

var repositoryResourceChooserComputedMixinFactory = require("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserComputedMixinFactory");

var repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory = require("../../../component/repositoryResourceChooser/component/chooser/mixin/computed/repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory");

var repositoryResourceChooserResourceDoubleClickBehaviourMixin = require("../../../component/repositoryResourceChooser/component/chooser/mixin/behaviour/repositoryResourceChooserResourceDoubleClickBehaviourMixin");

var ignoreFolderSelectionPredicate = require("../../../component/repositoryResourceChooser/component/chooser/predicate/ignoreFolderSelectionPredicate");

var uploadDialogComputedMixin = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/mixin/computed/uploadDialogComputedMixin");

var importDialogComputedMixin = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/mixin/computed/importDialogComputedMixin");

var uploadDialogBehaviourFactoryMixin = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/mixin/behaviour/uploadDialogBehaviourFactoryMixin");

var singleFileUploadWithValidationBehaviourFactoryMixin = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/mixin/behaviour/singleFileUploadWithValidationBehaviourFactoryMixin");

var UploadDialogLocalFileValidator = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/UploadDialogLocalFileValidator");

var UploadDialogRepositoryFileValidator = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/UploadDialogRepositoryFileValidator");

var localFileDuplicateValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/rules/localFileDuplicateValidationRule");

var localFileEmptyContentValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/rules/localFileEmptyContentValidationRule");

var LocalFileExtensionValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/rules/LocalFileExtensionValidationRule");

var repositoryFileDuplicateValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/validation/rules/repositoryFileDuplicateValidationRule");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var ActionButton = require("../../../common/component/actionButton/ActionButton");

var uploadDialogTabsVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/uploadDialogTabs/factory/uploadDialogTabsVueConfigFactory");

var uploadDialogTabsComputedMixin = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/uploadDialogTabs/mixin/computed/uploadDialogTabsComputedMixin");

var singleFileUploadFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/singleFileUpload/factory/singleFileUploadFactory");

var multipleFileUploadFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/multipleFileUpload/factory/multipleFileUploadFactory");

var repositoryResourceChooserTreeTemplate = require("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserTreeTemplate.htm");

var repositoryResourceChooserListTemplate = require("text!../../../component/repositoryResourceChooser/component/chooser/template/repositoryResourceChooserListTemplate.htm");

var BundlesUploadDialogWrapper = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/wrapper/BundlesUploadDialogWrapper");

var bundlesUploadDialogVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/factory/bundlesUploadDialogVueConfigFactory");

var bundlesUploadDialogBehaviourMixinFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/mixin/behaviour/bundlesUploadDialogBehaviourMixinFactory");

var BundlesUploadDialogStore = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/store/BundlesUploadDialogStore");

var BundleLocalFileBaseNameValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/validation/rules/BundleLocalFileBaseNameValidationRule");

var BundleFileReferenceBaseNameValidationRule = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/bundlesUploadDialog/validation/rules/BundleFileReferenceBaseNameValidationRule");

var SecurityFileUploadDialogWrapper = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/securityFileUploadDialog/wrapper/SecurityFileUploadDialogWrapper");

var securityFileUploadDialogVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/securityFileUploadDialog/factory/securityFileUploadDialogVueConfigFactory");

var securityFileUploadDialogBehaviourMixinFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/securityFileUploadDialog/mixin/behaviour/securityFileUploadDialogBehaviourMixinFactory");

var SecurityFileUploadDialogStore = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/securityFileUploadDialog/store/SecurityFileUploadDialogStore");

var schemaUploadDialogVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/schemaUploadDialog/factory/schemaUploadDialogVueConfigFactory");

var SchemaUploadDialogStore = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/schemaUploadDialog/store/SchemaUploadDialogStore");

var SchemaUploadDialogWrapper = require("../../../component/designer/optionsDesigner/dialog/uploadDialog/schemaUploadDialog/wrapper/SchemaUploadDialogWrapper");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createFileLoader(context, options) {
  context.register('fileLoader', new FileLoader());
}

function createBundlesUploadDialog(context, options) {
  var store = new BundlesUploadDialogStore();
  var repositoryResourceChooserStore = store.get('repositoryResourceChooser'),
      multipleFileUploadStore = store.get('multipleFileUpload');
  var bundleUploadDialogRepositoryResourceChooserMixins = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundlesUploadDialogRepositoryResourceChooser
  }).mixins;
  var bundleUploadDialogRepositoryResourceChooserListMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundlesUploadDialogRepositoryResourceChooserList
  }).mixins;
  var bundleUploadDialogRepositoryResourceChooserTreeMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundlesUploadDialogRepositoryResourceChooserTree
  }).mixins;
  var repositoryResourceChooser = repositoryResourceChooserFactory.create({
    store: repositoryResourceChooserStore,
    resourceService: context.get('resourcesServiceWrappedWithLoader'),
    resourcesTypeToSelectTree: [repositoryResourceTypes.FILE],
    resourcesTypeToLoad: [repositoryResourceTypes.PROP],
    repositoryResourceChooserTree: {
      debounceTime: options.loader.dialog.loadingDelay + options.loader.embedded.loadingMinDuration,
      offset: options.repositoryResourceChooser.repositoryTree.offset,
      limit: options.repositoryResourceChooser.repositoryTree.limit,
      template: repositoryResourceChooserTreeTemplate,
      mixins: bundleUploadDialogRepositoryResourceChooserTreeMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    repositoryResourceChooserList: {
      offset: options.repositoryResourceChooser.resourcesList.offset,
      limit: options.repositoryResourceChooser.resourcesList.limit,
      template: repositoryResourceChooserListTemplate,
      mixins: bundleUploadDialogRepositoryResourceChooserListMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    mixins: bundleUploadDialogRepositoryResourceChooserMixins
  });
  var Tabs = Vue.extend(uploadDialogTabsVueConfigFactory.create());
  var optionsDesignerMultipleFileUploadConfig = multipleFileUploadFactory.create({
    store: multipleFileUploadStore,
    fileLoader: context.get('fileLoader')
  });
  var optionsDesignerMultipleFileUploadConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerMultipleFileUploadConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.multipleFileUpload
  });
  var uploadDialogBehaviourMixin = uploadDialogBehaviourFactoryMixin.create({
    store: store
  });
  var uploadDialogLocalFileValidator = new UploadDialogLocalFileValidator({
    validationRules: [localFileDuplicateValidationRule, localFileEmptyContentValidationRule, new LocalFileExtensionValidationRule({
      store: multipleFileUploadStore,
      errorMessage: 'domain.designer.advanced.options.bundlesUploadDialog.invalidFileType'
    }), new BundleLocalFileBaseNameValidationRule({
      clientResourcePropertiesService: context.get('clientResourcePropertiesService')
    })]
  });
  var uploadDialogRepositoryFileValidator = new UploadDialogRepositoryFileValidator({
    validationRules: [repositoryFileDuplicateValidationRule, new BundleFileReferenceBaseNameValidationRule({
      clientResourcePropertiesService: context.get('clientResourcePropertiesService')
    })]
  });
  var bundlesUploadDialogBehaviourMixin = bundlesUploadDialogBehaviourMixinFactory.create({
    store: store,
    multipleFileUploadActions: optionsDesignerMultipleFileUploadConfigWithDataNameAttribute.actions,
    multipleFileUploadStateMutations: optionsDesignerMultipleFileUploadConfigWithDataNameAttribute.mutations,
    resourcePropertiesChooserBehaviour: repositoryResourceChooser.behaviour,
    repositoryResourceChooserStateMutations: repositoryResourceChooser.mutations,
    localFileValidator: uploadDialogLocalFileValidator,
    repositoryFileValidator: uploadDialogRepositoryFileValidator
  });
  var optionsDesignerBundlesUploadDialogConfig = bundlesUploadDialogVueConfigFactory.create({
    Tabs: Tabs,
    ActionButton: ActionButton,
    MultipleFileUpload: optionsDesignerMultipleFileUploadConfigWithDataNameAttribute.component,
    RepositoryResourceChooser: repositoryResourceChooser.component,
    store: store,
    mixins: [uploadDialogComputedMixin, uploadDialogBehaviourMixin, optionsDesignerMultipleFileUploadConfigWithDataNameAttribute.behaviour, bundlesUploadDialogBehaviourMixin, uploadDialogTabsComputedMixin, repositoryResourceChooser.behaviour, repositoryResourceChooserComputedMixinFactory.create({
      store: repositoryResourceChooserStore
    }), repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory.create({
      store: repositoryResourceChooserStore,
      test: ignoreFolderSelectionPredicate
    })]
  });
  var optionsDesignerBundlesUploadDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerBundlesUploadDialogConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundlesUploadDialog
  });
  var BundlesUploadDialog = Vue.extend(optionsDesignerBundlesUploadDialogConfigWithDataNameAttribute);
  context.register('bundlesUploadDialog', new BundlesUploadDialogWrapper({
    bundlesUploadDialog: new BundlesUploadDialog()
  }));
}

function createSecurityFileUploadDialog(context, options) {
  var store = new SecurityFileUploadDialogStore();
  var repositoryResourceChooserStore = store.get('repositoryResourceChooser'),
      singleFileUploadStore = store.get('singleFileUpload');
  var securityFileDialogRepositoryResourceChooserMixins = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.securityFileRepositoryResourceChooser
  }).mixins;
  var securityFileRepositoryResourceChooserListMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.securityFileRepositoryResourceChooserList
  }).mixins;
  var securityFileRepositoryResourceChooserTreeMixin = addAutomationDataNameAttributeMixinFactory.create({
    config: {},
    dataNames: automationDataNameAttributesEnum.optionsDesigner.securityFileRepositoryResourceChooserTree
  }).mixins;
  var repositoryResourceChooser = repositoryResourceChooserFactory.create({
    store: repositoryResourceChooserStore,
    resourceService: context.get('resourcesServiceWrappedWithLoader'),
    resourcesTypeToSelectTree: [repositoryResourceTypes.FILE],
    resourcesTypeToLoad: [repositoryResourceTypes.ACCESS_GRANT_SCHEMA],
    repositoryResourceChooserTree: {
      debounceTime: options.loader.dialog.loadingDelay + options.loader.embedded.loadingMinDuration,
      offset: options.repositoryResourceChooser.repositoryTree.offset,
      limit: options.repositoryResourceChooser.repositoryTree.limit,
      template: repositoryResourceChooserTreeTemplate,
      mixins: securityFileRepositoryResourceChooserTreeMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    repositoryResourceChooserList: {
      offset: options.repositoryResourceChooser.resourcesList.offset,
      limit: options.repositoryResourceChooser.resourcesList.limit,
      template: repositoryResourceChooserListTemplate,
      mixins: securityFileRepositoryResourceChooserListMixin.concat(repositoryResourceChooserResourceDoubleClickBehaviourMixin)
    },
    mixins: securityFileDialogRepositoryResourceChooserMixins
  });
  var Tabs = Vue.extend(uploadDialogTabsVueConfigFactory.create());
  var singleFileUpload = singleFileUploadFactory.create({
    store: singleFileUploadStore,
    fileLoader: context.get('fileLoader')
  });
  var uploadDialogBehaviourMixin = uploadDialogBehaviourFactoryMixin.create({
    store: store
  });
  var uploadDialogLocalFileValidator = new UploadDialogLocalFileValidator({
    validationRules: [localFileEmptyContentValidationRule, new LocalFileExtensionValidationRule({
      store: singleFileUploadStore,
      errorMessage: 'domain.designer.advanced.options.securityFileUploadDialog.invalidFileType'
    })]
  });
  var singleFileUploadWithValidationBehaviourMixin = singleFileUploadWithValidationBehaviourFactoryMixin.create({
    singleFileUploadActions: singleFileUpload.actions,
    singleFileUploadStateMutations: singleFileUpload.mutations,
    validator: uploadDialogLocalFileValidator
  });
  var securityFileUploadDialogBehaviourMixin = securityFileUploadDialogBehaviourMixinFactory.create({
    store: store
  });
  var securityFileUploadDialogConfig = securityFileUploadDialogVueConfigFactory.create({
    Tabs: Tabs,
    ActionButton: ActionButton,
    SingleFileUpload: singleFileUpload.component,
    RepositoryResourceChooser: repositoryResourceChooser.component,
    store: store,
    mixins: [uploadDialogComputedMixin, importDialogComputedMixin, uploadDialogBehaviourMixin, singleFileUpload.behaviour, securityFileUploadDialogBehaviourMixin, singleFileUploadWithValidationBehaviourMixin, uploadDialogTabsComputedMixin, repositoryResourceChooser.behaviour, repositoryResourceChooserComputedMixinFactory.create({
      store: repositoryResourceChooserStore
    }), repositoryResourceChooserIsSelectionShouldBeIgnoredComputedMixinFactory.create({
      store: repositoryResourceChooserStore,
      test: ignoreFolderSelectionPredicate
    })]
  });
  var securityFileUploadDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: securityFileUploadDialogConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.securityFileUploadDialog
  });
  var SecurityFileUploadDialog = Vue.extend(securityFileUploadDialogConfigWithDataNameAttribute);
  context.register('securityFileUploadDialog', new SecurityFileUploadDialogWrapper({
    securityFileUploadDialog: new SecurityFileUploadDialog()
  }));
}

function createSchemaUploadDialog(context, options) {
  var allowJSONExport = options.allowJSONExport;
  var accept = [fileExtensionEnum.XML],
      fileInputLabel = i18n['domain.designer.advanced.options.uploadSchemaDialog.fileInputLabel'],
      errorMessage = 'domain.designer.advanced.options.schemaUploadDialog.invalidFileType';

  if (allowJSONExport) {
    accept = [fileExtensionEnum.JSON].concat(accept);
    fileInputLabel = i18n['domain.designer.advanced.options.uploadSchemaDialog.fileInputLabel.withJSON'];
    errorMessage = 'domain.designer.advanced.options.schemaUploadDialog.invalidFileType.withJSON';
  }

  var store = new SchemaUploadDialogStore({}, {
    accept: accept,
    fileInputLabel: fileInputLabel
  }),
      singleFileUploadStore = store.get('singleFileUpload');
  context.register('schemaUploadDialogSingleFileUploadStore', singleFileUploadStore);
  var singleFileUpload = singleFileUploadFactory.create({
    store: singleFileUploadStore,
    fileLoader: context.get('fileLoader')
  });
  var uploadDialogLocalFileValidator = new UploadDialogLocalFileValidator({
    validationRules: [localFileEmptyContentValidationRule, new LocalFileExtensionValidationRule({
      store: singleFileUploadStore,
      errorMessage: errorMessage
    })]
  });
  var singleFileUploadWithValidationBehaviourMixin = singleFileUploadWithValidationBehaviourFactoryMixin.create({
    singleFileUploadActions: singleFileUpload.actions,
    singleFileUploadStateMutations: singleFileUpload.mutations,
    validator: uploadDialogLocalFileValidator
  });
  var optionsDesignerSchemaUploadDialogConfig = schemaUploadDialogVueConfigFactory.create({
    ActionButton: ActionButton,
    SingleFileUpload: singleFileUpload.component,
    store: store,
    mixins: [singleFileUpload.behaviour, singleFileUploadWithValidationBehaviourMixin]
  });
  var optionsDesignerSchemaUploadDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerSchemaUploadDialogConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.schemaUploadDialog
  });
  var SchemaUploadDialog = Vue.extend(optionsDesignerSchemaUploadDialogConfigWithDataNameAttribute);
  context.register('schemaUploadDialog', new SchemaUploadDialogWrapper({
    schemaUploadDialog: new SchemaUploadDialog()
  }));
}

module.exports = function (context, options) {
  createFileLoader(context, options);
  createBundlesUploadDialog(context, options);
  createSecurityFileUploadDialog(context, options);
  createSchemaUploadDialog(context, options);
};

});