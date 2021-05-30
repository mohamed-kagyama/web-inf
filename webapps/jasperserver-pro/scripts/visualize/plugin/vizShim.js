/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/*global console, define*/
define(function(require) {

    var request = require("request"),
        requestSettings = require("requestSettings"),
        _ = require("underscore");

    var VISUALIZE_NS = '__visualize__.';

    return {
        load: function (name, req, onLoad, config) {
            if (config.isBuild) {
                onLoad();
                return;
            }
            var settings = _.extend({}, requestSettings, {
                type: 'GET',
                dataType: 'script',
                cache: true,
                url: req.toUrl(name + '.js')
            });
            request(settings).then(function (resp) {
                if (window.__visualize__) {
                    var indexOfDefine = resp.indexOf('define(');
                    if (indexOfDefine > -1) {
                        onLoad.fromText(_.str.splice(resp, indexOfDefine, 0, VISUALIZE_NS));
                        return;
                    }
                }
                onLoad.fromText(resp);
            }, function() {
                console.log(arguments); /* eslint-disable-line */
                onLoad.error();
            });
        }
    };
});