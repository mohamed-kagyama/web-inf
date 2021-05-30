define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var request = require("request");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var $document;

function triggerEvent() {
  $document.trigger.apply($document, arguments);
}

if (typeof document !== 'undefined') {
  $document = $(document);
}

module.exports = function () {
  _.partial(triggerEvent, 'request:before').apply(null, arguments);

  return request.apply(request, arguments).done(_.partial(triggerEvent, 'request:success')).fail(_.partial(triggerEvent, 'request:failure'));
};

});