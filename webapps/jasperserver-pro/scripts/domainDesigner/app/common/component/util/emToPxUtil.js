define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var div = document.createElement('div');

_.extend(div.style, {
  width: '1em',
  visibility: 'hidden'
});

document.body.appendChild(div);
var emInPx = div.offsetWidth;
document.body.removeChild(div);
module.exports = {
  convertEmToPx: function convertEmToPx(em) {
    return emInPx * em;
  }
};

});