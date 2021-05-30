define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var reference = require('./dashboardHyperlinkHandlerReference');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  events: {
    click: function click(ev, link, dashlet) {
      reference.events.click.apply(this, arguments);
    }
  }
};

});