define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function setupViewState(setupOptions, options) {
  var designerName = setupOptions.designerName,
      state = setupOptions.state,
      viewState = setupOptions.viewState,
      storeChangeEventBus = setupOptions.storeChangeEventBus;
  viewState.get && viewState.get.withArgs('currentTab').returns(options.currentTab);
  viewState.getCurrentDesigner && viewState.getCurrentDesigner.returns(options.currentDesigner);
  viewState.getCurrentResource && viewState.getCurrentResource.withArgs(designerName).returns(options.currentResource);
  viewState.getSearchKeyword && viewState.getSearchKeyword.withArgs(designerName).returns(options.searchKeyword);
  storeChangeEventBus.trigger('change:viewState', state);
}

function setupViewModel(model, options) {
  model.get.withArgs('isVisible').returns(options.isVisible);
}

module.exports = function (options) {
  var designerName = options.designerName,
      state = options.state,
      model = options.model,
      storeChangeEventBus = options.storeChangeEventBus,
      viewState = options.viewState;
  return {
    setupViewState: _.partial(setupViewState, {
      designerName: designerName,
      viewState: viewState,
      state: state,
      storeChangeEventBus: storeChangeEventBus
    }),
    setupViewModel: _.partial(setupViewModel, model)
  };
};

});