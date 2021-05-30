define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var CollectionView = require('./CollectionView');

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = CollectionView.extend({
  initCollectionEventHandlers: function initCollectionEventHandlers() {
    this.listenTo(this.collection, 'add remove change:id change:parameter', this.render);
  },
  addSubview: function addSubview(model) {
    // handle hidden ICs
    if (model.get('parameter') === dashboardWiringStandardIds.APPLY_SLOT) {
      return;
    }

    if (!model.component || model.component.isParametrized()) {
      return CollectionView.prototype.addSubview.call(this, model);
    }
  }
});

});