define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var eventBusFactory = require("../../../../util/eventBusFactory");

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var bundleItemVueConfigFactory = require("../../../component/designer/optionsDesigner/component/bundles/bundleItemVueConfigFactory");

var bundlesListVueConfigFactory = require("../../../component/designer/optionsDesigner/component/bundles/bundlesListVueConfigFactory");

var emptyBundlesVueConfigFactory = require("../../../component/designer/optionsDesigner/component/bundles/emptyBundlesVueConfigFactory");

var optionsDesignerVueConfigFactory = require("../../../component/designer/optionsDesigner/component/main/optionsDesignerVueConfigFactory");

var downloadBundleTemplateDialogVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/downloadBundleTemplateDialog/factory/downloadBundleTemplateDialogVueConfigFactory");

var OptionsDesignerResourcePropertiesToStoreConverter = require("../../../component/designer/optionsDesigner/converter/OptionsDesignerResourcePropertiesToStoreConverter");

var OptionsDesignerStore = require("../../../component/designer/optionsDesigner/store/OptionsDesignerStore");

var DownloadBundleTemplateDialogStore = require("../../../component/designer/optionsDesigner/store/DownloadBundleTemplateDialogStore");

var OptionsDesignerDownloadBundleController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerDownloadBundleController");

var OptionsDesignerRemoveBundleController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerRemoveBundleController");

var OptionsDesignerBundlesUploadDialogController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerBundlesUploadDialogController");

var OptionsDesignerDownloadBundleTemplateDialogController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerDownloadBundleTemplateDialogController");

var OptionsDesignerController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerController");

var OptionsDesignerUploadSchemaController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerUploadSchemaController");

var OptionsDesignerDownloadSchemaAsJsonController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerDownloadSchemaAsJsonController");

var OptionsDesignerDownloadSchemaAsXmlController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerDownloadSchemaAsXmlController");

var replaceBundlesDialogVueConfigFactory = require("../../../component/designer/optionsDesigner/dialog/replaceBundlesDialog/factory/replaceBundlesDialogVueConfigFactory");

var ReplaceBundlesDialogStore = require("../../../component/designer/optionsDesigner/dialog/replaceBundlesDialog/store/ReplaceBundlesDialogStore");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

var OptionsDesignerSecurityFileUploadDialogController = require("../../../component/designer/optionsDesigner/controller/OptionsDesignerSecurityFileUploadDialogController");

var optionsDesignerUploadDialogContextConfiguration = require("./optionsDesignerUploadDialogContextConfiguration");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createOptionsDesignerModels(context, options) {
  var optionsDesignerViewModelOptions = {
    ownDesigner: canvasViewDesignersEnum.OPTIONS_DESIGNER
  };
  context.register('optionsDesignerStore', new OptionsDesignerStore(_.extend(optionsDesignerViewModelOptions, {})));
  context.register('downloadBundleTemplateDialogStore', new DownloadBundleTemplateDialogStore());
}

function createOptionsDesignerVueComponents(context, options) {
  var optionsDesignerEmptyBundlesConfig = emptyBundlesVueConfigFactory.create({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  });
  var optionsDesignerEmptyBundlesConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerEmptyBundlesConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.emptyBundles
  });
  var EmptyBundles = Vue.extend(optionsDesignerEmptyBundlesConfigWithDataNameAttribute);
  var optionsDesignerBundlesItemConfig = bundleItemVueConfigFactory.create({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  });
  var optionsDesignerBundlesItemConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerBundlesItemConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundleItem
  });
  var BundleItem = Vue.extend(optionsDesignerBundlesItemConfigWithDataNameAttribute);
  var optionsDesignerBundlesListConfig = bundlesListVueConfigFactory.create({
    bundleItem: BundleItem,
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  });
  var optionsDesignerBundlesListConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerBundlesListConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.bundlesList
  });
  var BundlesList = Vue.extend(optionsDesignerBundlesListConfigWithDataNameAttribute);
  context.register('optionsDesignerVueConfig', optionsDesignerVueConfigFactory.create({
    data: context.get('optionsDesignerStore').attributes,
    emptyBundles: EmptyBundles,
    bundlesList: BundlesList,
    // emptySecurityFile: EmptySecurityFile,
    // securityFile: SecurityFile,
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  }));
  var optionsDesignerDownloadBundleTemplateDialogViewConfig = downloadBundleTemplateDialogVueConfigFactory.create({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  });
  var optionsDesignerDownloadBundleTemplateDialogViewConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerDownloadBundleTemplateDialogViewConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.downloadBundleTemplateDialog
  });
  var DownloadBundleTemplateDialogView = Vue.extend(optionsDesignerDownloadBundleTemplateDialogViewConfigWithDataNameAttribute);
  context.register('downloadBundleTemplateDialogView', new DownloadBundleTemplateDialogView({
    data: context.get('downloadBundleTemplateDialogStore').attributes
  }));
  context.register('replaceBundlesDialogStore', new ReplaceBundlesDialogStore());
  var optionsDesignerReplaceBundleDialogConfig = replaceBundlesDialogVueConfigFactory.create({
    store: context.get('replaceBundlesDialogStore').attributes,
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  });
  var optionsDesignerReplaceBundleDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: optionsDesignerReplaceBundleDialogConfig,
    dataNames: automationDataNameAttributesEnum.optionsDesigner.replaceBundleDialog
  });
  var ReplaceBundlesDialogView = Vue.extend(optionsDesignerReplaceBundleDialogConfigWithDataNameAttribute);
  context.register('replaceBundlesDialogView', new ReplaceBundlesDialogView({}));
}

function createOptionsDesignerViews(context, options) {
  context.register('downloadBundleTemplateDialog', new Dialog({
    el: context.get('downloadBundleTemplateDialogView').$mount().$el
  }));
  context.register('replaceBundlesDialog', new Dialog({
    el: context.get('replaceBundlesDialogView').$mount().$el
  }));
}

function createOptionsDesignerControllers(context) {
  context.register('optionsDesignerBundlesUploadDialogController', new OptionsDesignerBundlesUploadDialogController({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    clientResourcePropertiesService: context.get('clientResourcePropertiesService'),
    bundlesUploadDialog: context.get('bundlesUploadDialog'),
    replaceBundlesDialog: context.get('replaceBundlesDialog'),
    replaceBundlesDialogStore: context.get('replaceBundlesDialogStore')
  }));
  context.register('optionsDesignerRemoveBundleController', new OptionsDesignerRemoveBundleController({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    notification: context.get('notification'),
    storeChangeEventBus: context.get('storeChangeEventBus')
  }));
  context.register('optionsDesignerDownloadBundleController', new OptionsDesignerDownloadBundleController({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus')
  }));
  context.register('optionsDesignerDownloadBundleTemplateDialogController', new OptionsDesignerDownloadBundleTemplateDialogController({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    downloadBundleTemplateDialog: context.get('downloadBundleTemplateDialog'),
    clientDomainSchemaAdvancedOptionsService: context.get('clientDomainSchemaAdvancedOptionsService')
  }));
  context.register('optionsDesignerSecurityFileUploadDialogController', new OptionsDesignerSecurityFileUploadDialogController({
    optionsDesignerEventBus: context.get('optionsDesignerEventBus'),
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    securityFileUploadDialog: context.get('securityFileUploadDialog'),
    notification: context.get('notification'),
    storeChangeEventBus: context.get('storeChangeEventBus'),
    optionsDesignerStore: context.get('optionsDesignerStore')
  }));
  context.register('optionsDesignerController', new OptionsDesignerController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    optionsDesignerStore: context.get('optionsDesignerStore'),
    optionsDesignerResourcePropertiesToStoreConverter: new OptionsDesignerResourcePropertiesToStoreConverter()
  }));
  context.register('optionsDesignerUploadSchemaController', new OptionsDesignerUploadSchemaController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    notification: context.get('notification'),
    uploadSchemaDialog: context.get('schemaUploadDialog'),
    validationStateFactory: context.get('validationStateFactory')
  }));
  context.register('optionsDesignerDownloadSchemaController', new OptionsDesignerDownloadSchemaAsJsonController({
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    objectDOMElExpressionsToStringConversionService: context.get('objectDOMElExpressionsToStringConversionService'),
    serverSchemaModelSerializerWithStringDOMElExpressions: context.get('serverSchemaModelSerializerWithStringDOMElExpressions'),
    validationStateFactory: context.get('validationStateFactory')
  }));
  context.register('optionsDesignerDownloadSchemaAsXmlController', new OptionsDesignerDownloadSchemaAsXmlController({
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    applicationCrossComponentEventBus: context.get('applicationCrossComponentEventBus'),
    validationStateFactory: context.get('validationStateFactory'),
    resourcesService: context.get('resourcesServiceWrappedWithLoader'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer')
  }));
}

module.exports = function (context, options) {
  context.register('optionsDesignerEventBus', eventBusFactory.create());
  createOptionsDesignerModels(context, options);
  createOptionsDesignerVueComponents(context, options);
  createOptionsDesignerViews(context, options);
  optionsDesignerUploadDialogContextConfiguration(context, options);
  createOptionsDesignerControllers(context, options);
};

});