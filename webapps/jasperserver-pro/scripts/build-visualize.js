/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

module.exports = {
    mainConfigFile: "../require.config.js",

    optimizeCss: "none",

    optimize: "uglify2",

    uglify2: {
        output: {
            ascii_only: true
        }
    },

    namespace: "__visualize__",

    skipDirOptimize: true,

    removeCombined: true,

    preserveLicenseComments: false,

    excludeText: [
    ],

    paths: {
        "jquery": "empty:",
        "fusioncharts" : "empty:",
        "vizShim": "visualize/plugin/vizShim",
        "momentLocale": "plugin/momentVizLocale"
    },

    shim: {
        "visualize/visualize": {
            deps: [
                "visualize/loader/jasper",
                "visualize/factory/BiComponentFactory",
                "visualize/auth/Authentication",
                "visualize/jiveComponent/jive.component.deps",
                "runtime_dependencies/jrs-ui/src/config/dateAndTimeSettings",
                "css"
            ],
            exports: "visualize"
        },
        "visualize/loader/jasper": {
            "deps":[
                // include jquery in a bundle via deps, because it cannot be traced by r.js during optimization
                "runtime_dependencies/jquery/dist/jquery",
                "visualize/loader/core/Root",
                "runtime_dependencies/js-sdk/src/common/logging/logger"
            ],
            "exports": "jasper"
        }
    },

    name: "visualize/visualize",

    include: [
        "runtime_dependencies/requirejs/require",
        "vizShim"
    ],
    wrap: {
        "startFile": "visualize.js.start.frag",
        "endFile": "visualize.js.end.frag"
    },
    out: "../optimized-scripts/visualize/visualize.js"
};
