define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var hyperlinkTargets = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTargets");

var hyperlinkTypes = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var urlTemplate = _.template('{{=url}}{{=parameters}}{{=anchor}}');

module.exports = {
  events: {
    click: function click(ev, link, dashlet) {
      // TODO check if we need to parse href
      var //http://somehost?param=value#anchor ->
      //["http://somehost?param=value#anchor", "http://somehost", "?param=value", "#anchor"]
      urlParts = link.href.match(/^([^\?\#]+)(\?[^\#]+)?(\#.*)?$/),
          params = '',
          anchor = urlParts[3] || '',
          url; //merge url parameters and link params
      //merge url parameters and link params

      if (urlParts[2]) {
        params += urlParts[2];
      }

      if (link.parameters) {
        params += (params ? '&' : '?') + $.param(link.parameters, true);
      }

      url = urlTemplate({
        url: urlParts[1],
        parameters: params,
        anchor: anchor
      });

      if (link.target !== hyperlinkTargets.SELF) {
        window.open(url, _.contains(_.values(hyperlinkTargets), link.target) ? '_' + link.target.toLowerCase() : link.target);
      } else {
        dashlet && dashlet.drilldown && dashlet.drilldown(_.extend({}, link, {
          type: hyperlinkTypes.REFERENCE,
          href: url
        }));
      }
    }
  }
};

});