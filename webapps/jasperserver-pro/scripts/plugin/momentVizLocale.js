/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(function (require) {
    "use strict";

    var momentLocalePluginFactory = require("plugin/factory/momentLocalePluginFactory");

    return momentLocalePluginFactory.create("momentLocales/viz/");
});
