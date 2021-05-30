define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

var jiveTypes = require('../enum/jiveTypes');

var hyperlinkTargets = require('../enum/hyperlinkTargets');

var hyperlinkTypes = require('../enum/hyperlinkTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: function defaults() {
    return {
      hyperlinks: [],
      id: undefined,
      type: jiveTypes.HYPERLINKS
    };
  },
  constructor: function constructor(attrs, options) {
    options || (options = {});
    options.parse || (options = _.extend({}, options, {
      parse: true
    }));
    BaseComponentModel.call(this, attrs, options);
  },
  parse: function parse(data) {
    var self = this,
        res = _.clone(data);

    res.hyperlinks = _.map(data.hyperlinks, function (jrLink) {
      var hyperlink = {
        id: jrLink.id,
        parameters: jrLink.params,
        href: jrLink.href,
        type: jrLink.type,
        tooltip: jrLink.tooltip,
        target: _.isUndefined(jrLink.target) ? hyperlinkTargets.SELF : jrLink.target,
        anchor: jrLink.anchor,
        pages: jrLink.page
      };

      if (_.contains([hyperlinkTypes.REPORT_EXECUTION, hyperlinkTypes.LOCAL_PAGE, hyperlinkTypes.LOCAL_ANCHOR], jrLink.type)) {
        hyperlink.href = '';
        hyperlink.resource = jrLink.params && !_.isUndefined(jrLink.params._report) ? jrLink.params._report : self.parent.get('reportURI');
      }

      if (jrLink.type === hyperlinkTypes.REPORT_EXECUTION) {
        hyperlink.anchor = jrLink.params ? jrLink.params._anchor : undefined;
        hyperlink.pages = jrLink.params ? jrLink.params._page : undefined;
      }

      return hyperlink;
    });
    return res;
  }
});

});