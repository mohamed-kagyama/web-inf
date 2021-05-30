define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var halProviders;

(function (halProviders) {
  halProviders["root"] = "root";
  halProviders["resources"] = "resources";
  halProviders["workflows"] = "workflows";
  halProviders["contentReferences"] = "contentReferences";
})(halProviders || (halProviders = {}));

var halNames;

(function (halNames) {
  halNames["resource"] = "resource";
  halNames["workflow"] = "workflow";
  halNames["contentReference"] = "contentReference";
})(halNames || (halNames = {}));

exports.halProviders = halProviders;
exports.halNames = halNames;

});