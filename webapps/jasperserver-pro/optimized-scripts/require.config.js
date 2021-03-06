requirejs.config({
  baseUrl: '',
  enforceDefine: true,
  config: {
    moment: {
      noGlobal: true
    },
    logger: {
      enabled: true,
      level: 'error',
      appenders: ['console']
    }
  },
  paths: {
    'underscore.string': 'runtime_dependencies/underscore.string/dist/underscore.string',
    react: 'runtime_dependencies/react/umd/react.production.min',
    'react-dom': 'runtime_dependencies/react-dom/umd/react-dom.production.min',
    'require-css': 'runtime_dependencies/require-css/css',
    tv4: 'runtime_dependencies/tv4/tv4',
    'react-color': 'runtime_dependencies/react-color/dist/react-color.min',
    'backbone-validation': 'runtime_dependencies/backbone-validation/dist/backbone-validation-amd',
    jquery: 'runtime_dependencies/jquery/dist/jquery',
    underscore: 'runtime_dependencies/underscore/underscore',
    xregexp: 'runtime_dependencies/xregexp/xregexp-all',
    'numeral/locales': 'runtime_dependencies/numeral/locales',
    'numeral/numeral': 'runtime_dependencies/numeral/numeral',
    momentLocales: 'runtime_dependencies/moment/locale',
    moment: 'runtime_dependencies/moment/moment',
    'requirejs-domready': 'runtime_dependencies/requirejs-domready/domReady',
    'backbone.epoxy': 'runtime_dependencies/backbone.epoxy/backbone.epoxy',
    'perfect-scrollbar': 'runtime_dependencies/perfect-scrollbar/dist/js/perfect-scrollbar.jquery',
    'jquery-ui-touch-punch': 'runtime_dependencies/jquery-ui-touch-punch/jquery.ui.touch-punch',
    'jquery.selection': 'runtime_dependencies/jquery.selection/src/jquery.selection',
    'jquery.urldecoder': 'runtime_dependencies/jquery.urldecoder/jquery.urldecoder',
    jCryption: 'runtime_dependencies/jCryption/jquery.jcryption',
    request: 'runtime_dependencies/jrs-ui/src/transport/request',
    requestSettings: 'runtime_dependencies/jrs-ui/src/config/requestSettings',
    backbone: 'config/Backbone',
    'backbone.original': 'runtime_dependencies/backbone/backbone',
    'backbone.marionette': 'runtime_dependencies/backbone.marionette/lib/core/backbone.marionette',
    'backbone.wreqr': 'runtime_dependencies/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': 'runtime_dependencies/backbone.babysitter/lib/backbone.babysitter',
    'requirejs-text': 'runtime_dependencies/requirejs-text/text',
    prototype: 'runtime_dependencies/prototype/dist/prototype',
    'scriptaculous/src/builder': 'runtime_dependencies/scriptaculous/src/builder',
    'scriptaculous/src/effects': 'runtime_dependencies/scriptaculous/src/effects',
    'scriptaculous/src/dragdrop': 'runtime_dependencies/scriptaculous/src/dragdrop',
    iscroll: 'runtime_dependencies/iscroll/src/iscroll',
    dragdropextra: 'runtime_dependencies/dragdropextra/dragdropextra',
    ReportRequireJsConfig: '../getRequirejsConfig.html?noext',
    underscoreExtension: 'runtime_dependencies/js-sdk/src/common/extension/underscoreExtension',
    tv4Extension: 'runtime_dependencies/js-sdk/src/common/extension/tv4Extension',
    momentExtension: 'runtime_dependencies/js-sdk/src/common/extension/momentExtension',
    numeralExtension: 'runtime_dependencies/js-sdk/src/common/extension/numeralExtension',
    async: 'runtime_dependencies/requirejs-plugins/src/async',
    bundle: 'plugin/bundle',
    settings: 'plugin/settings',
    restResource: 'plugin/restResource',
    text: 'plugin/text',
    json: 'plugin/json',
    momentLocale: 'plugin/momentLocale',
    csslink: 'plugin/csslink',
    css: 'plugin/css',
    'jquery-ui': 'runtime_dependencies/jquery-ui',
    'jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon': 'runtime_dependencies/jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon',
    'jqueryui-timepicker-addon/dist/jquery-ui-sliderAccess': 'runtime_dependencies/jqueryui-timepicker-addon/dist/jquery-ui-sliderAccess',
    'moment-timezone': 'runtime_dependencies/moment-timezone/builds/moment-timezone-with-data',
    backboneNoConflict: 'runtime_dependencies/js-sdk/src/common/config/backboneNoConflict',
    highcharts: 'runtime_dependencies/highcharts-pack/highcharts/highcharts',
    'highcharts-more': 'runtime_dependencies/highcharts-pack/highcharts/highcharts-more',
    'highcharts-heatmap': 'runtime_dependencies/highcharts-pack/highcharts/heatmap-hc',
    'highcharts-treemap': 'runtime_dependencies/highcharts-pack/highcharts/treemap',
    'highcharts-grouped-categories': 'runtime_dependencies/highcharts-pack/highcharts/grouped-categories',
    'highcharts-solid-gauge': 'runtime_dependencies/highcharts-pack/highcharts/solid-gauge',
    'highcharts-3d': 'runtime_dependencies/highcharts-pack/highcharts/highcharts-3d',
    vue: 'runtime_dependencies/vue/dist/vue.min',
    'resize-observer-polyfill': 'runtime_dependencies/resize-observer-polyfill/dist/ResizeObserver',
    'ireport.highcharts.default.service': '../reportresource?resource=com/jaspersoft/jasperreports/highcharts/charts/services/default.service.js',
    fusioncharts: '../fusion/fusioncharts',
    vizShim: 'visualize/plugin/vizShim',
    'ace-builds/src-min-noconflict': 'runtime_dependencies/ace-builds/src-min-noconflict/patched',
    'react-ace': 'runtime_dependencies/react-ace/dist/react-ace'
  },
  shim: {
    jquery: {
      init: function() {
                return this.jQuery.noConflict();
            }
    },
    'jquery.selection': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'jqueryui-timepicker-addon/dist/jquery-ui-sliderAccess': {
      deps: ['jquery','jquery-ui/ui/widgets/slider'],
      exports: 'jQuery'
    },
    'jquery.urldecoder': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    jCryption: {
      deps: ['jquery'],
      exports: 'jQuery',
      init: function() {
                return {
                    BigInt: this.BigInt,
                    biToHex: this.biToHex,
                    biToString: this.biToString
                };
            }
    },
    prototype: {
      exports: '__dollar_sign__',
      init: function() {
                return {
                    $: this.__dollar_sign__,
                    $$: this.$$,
                    $w: this.$w,
                    Prototype: this.Prototype,
                    Position: this.Position,
                    Hash: this.Hash,
                    $A: this.$A,
                    Template: this.Template,
                    Class: this.Class,
                    $F: this.$F,
                    Form: this.Form,
                    $break: this.$break,
                    $H: this.$H,
                    Selector: this.Selector,
                    Field: this.Field
                };
            }
    },
    'scriptaculous/src/builder': {
      deps: ['prototype'],
      exports: 'Builder'
    },
    'scriptaculous/src/effects': {
      deps: ['prototype'],
      exports: 'Effect'
    },
    'scriptaculous/src/dragdrop': {
      deps: ['prototype','scriptaculous/src/effects'],
      exports: 'Draggable'
    },
    dragdropextra: {
      deps: ['scriptaculous/src/dragdrop','jquery'],
      exports: 'Draggable',
      init: function() {
                return {
                    Droppables: this.Droppables,
                    Draggables: this.Draggables,
                    Draggable: this.Draggable,
                    SortableObserver: this.SortableObserver,
                    Sortable: this.Sortable
                };
            }
    },
    iscroll: {
      exports: 'iScroll'
    },
    ReportRequireJsConfig: {
      exports: 'window'
    },
    'fakeActionModel.primaryNavigation': {
      exports: 'primaryNavModule'
    },
    'backbone.original': {
      deps: ['underscore'],
      exports: 'Backbone',
      init: null
    },
    dateFormatter: {
      exports: 'window'
    },
    'ireport.highcharts.default.service': {
      deps: ['highcharts-more'],
      exports: 'JRDefaultHighchartsSettingService'
    },
    fusioncharts: {
      exports: 'FusionCharts'
    }
  },
  map: {
    logger: {
      './loggerConfig': 'loggerConfig/loggerConfig'
    },
    'numeral/locales': {
      numeral: 'numeral/numeral'
    },
    numeralExtension: {
      'numeral/numeral': 'numeral/numeral',
      'numeral/locales': 'numeral/locales',
      '../../jrs.configs': 'runtime_dependencies/js-sdk/src/jrs.configs'
    },
    momentExtension: {
      momentExtension: 'moment'
    },
    tv4Extension: {
      tv4: 'tv4',
      '../util/parse/time': 'runtime_dependencies/js-sdk/src/common/util/parse/time',
      '../util/parse/date': 'runtime_dependencies/js-sdk/src/common/util/parse/date'
    },
    underscoreExtension: {
      underscore: 'underscore',
      '../util/cloneDeep': 'runtime_dependencies/js-sdk/src/common/util/cloneDeep',
      '../util/xssUtil': 'runtime_dependencies/js-sdk/src/common/util/xssUtil',
      '../../jrs.configs': 'runtime_dependencies/js-sdk/src/jrs.configs'
    },
    'runtime_dependencies/js-sdk/src/common/extension/jqueryExtension': {
      '../util/xssUtil': 'runtime_dependencies/js-sdk/src/common/util/xssUtil'
    },
    'extension/jqueryExtension': {
      jquery: 'jquery'
    },
    'extension/prototypeExtension': {
      prototype: 'prototype',
      'util/prototypeExtension': 'runtime_dependencies/jrs-ui/src/util/prototypeExtension'
    },
    'runtime_dependencies/js-sdk/src/common/extension/jQueryDatepickerExtension': {
      'jquery-ui/ui/widgets/datepicker': 'jquery-ui/ui/widgets/datepicker'
    },
    'runtime_dependencies/js-sdk/src/common/extension/jQueryTimepickerExtension': {
      'jquery-ui/ui/widgets/timepicker': 'jquery-ui/ui/widgets/timepicker'
    },
    'jqueryui-timepicker-addon/dist/jquery-ui-timepicker-addon': {
      jquery: 'runtime_dependencies/js-sdk/src/common/extension/jQueryUiSliderAccessExtension',
      'jquery-ui': 'jquery-ui/ui/widgets/datepicker'
    },
    'scheduler/view/editor/parametersTabView': {
      '../../../controls/controls.options': 'controls/controls.base'
    },
    'runtime_dependencies/js-sdk/src/common/extension/epoxyExtension': {
      'backbone.epoxy': 'backbone.epoxy'
    },
    requestSettings: {
      requestSettings: 'runtime_dependencies/js-sdk/src/common/config/requestSettings'
    },
    'jquery-ui-touch-punch': {
      'jquery-ui/widget': 'jquery-ui/ui/widget',
      'jquery-ui/widgets/mouse': 'jquery-ui/ui/widgets/mouse'
    },
    '*': {
      jquery: 'extension/jqueryExtension',
      prototype: 'extension/prototypeExtension',
      underscore: 'underscoreExtension',
      tv4: 'tv4Extension',
      'numeral/numeral': 'numeralExtension',
      'backbone.epoxy': 'runtime_dependencies/js-sdk/src/common/extension/epoxyExtension',
      'jquery-ui/ui/widgets/datepicker': 'runtime_dependencies/js-sdk/src/common/extension/jQueryDatepickerExtension',
      'jquery-ui/ui/widgets/timepicker': 'runtime_dependencies/js-sdk/src/common/extension/jQueryTimepickerExtension',
      'jquery-ui/widgets/timepicker': 'runtime_dependencies/js-sdk/src/common/extension/jQueryTimepickerExtension',
      'jquery-ui/position': 'jquery-ui/ui/position',
      'jquery-ui/widgets/draggable': 'jquery-ui/ui/widgets/draggable',
      xssUtil: 'runtime_dependencies/js-sdk/src/common/util/xssUtil',
      'settings/jrs.configs': 'runtime_dependencies/js-sdk/src/jrs.configs',
      'settings/dateTimeSettings': 'settings!dateTimeSettings',
      'settings/decimalFormatSymbols': 'settings!decimalFormatSymbols',
      'settings/localeSettings': 'runtime_dependencies/js-sdk/src/jrs.configs',
      'settings/generalSettings': 'runtime_dependencies/js-sdk/src/jrs.configs',
      'jive.table': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/jive/jive.table',
      'jive.interactive.column': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/jive/jive.interactive.column',
      'jive.crosstab': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/jive/jive.crosstab',
      'jive.crosstab.interactive': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/jive/jive.crosstab.interactive',
      'jasperreports-map': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/map',
      'cv-component': 'runtime_dependencies/jrs-ui/src/reportViewer/jasperreports/cv-component',
      'jr.LocalAnchor': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.LocalAnchor',
      'jr.LocalPage': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.LocalPage',
      'jr.Reference': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.Reference',
      'jr.RemoteAnchor': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.RemoteAnchor',
      'jr.ReportExecution': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.ReportExecution',
      'jr.ReportDataSeries': 'runtime_dependencies/jrs-ui/src/reportViewer/hyperlinkHandler/jr.ReportDataSeries',
      'adhoc/api/chart/adhocToHighchartsAdapter': 'runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter',
      'runtime_dependencies/jrs-ui/src/controls/controls.options': 'controls/controls.options',
      'runtime_dependencies/jrs-ui/src/reportViewer/report.view.runtime': 'reportView/report.view',
      'runtime_dependencies/jrs-ui/src/repository/repository.search.root': 'repository/repository.search.root',
      adhocHighchartsSettingService: 'adhoc/intelligentChart/jr/chart/adhocHighchartsSettingsService',
      'jive.highcharts': 'reportViewer/jive.highcharts',
      'jive.interactive.highchart': 'reportViewer/jive.interactive.highchart',
      dataSettingService: 'reportViewer/services/data.service',
      defaultSettingService: 'reportViewer/services/default.service',
      itemHyperlinkSettingService: 'reportViewer/services/item.hyperlink.service',
      yAxisSettingService: 'reportViewer/services/y.axis.service',
      dualPieSettingService: 'reportViewer/services/dual.pie.service',
      treemapSettingService: 'reportViewer/services/treemap.service',
      gaugeSettingService: 'reportViewer/services/gauge.service',
      'runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.designerBase': 'base/designer.base',
      'runtime_dependencies/js-sdk/src/common/component/option/OptionContainer': 'runtime_dependencies/js-sdk/src/common/component/base/OptionContainer',
      'runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation': 'actionModel/actionModel.primaryNavigation'
    },
    'runtime_dependencies/jrs-ui/src/core/core.ajax': {
      './core.ajax.utils': 'core/core.ajax.utils'
    },
    'repository/repository.search.root': {
      'runtime_dependencies/jrs-ui/src/repository/repository.search.root': 'runtime_dependencies/jrs-ui/src/repository/repository.search.root'
    },
    'reportView/report.view.runtime': {
      'runtime_dependencies/jrs-ui/src/reportViewer/report.view.runtime': 'runtime_dependencies/jrs-ui/src/reportViewer/report.view.runtime'
    },
    'runtime_dependencies/bi-chart/src/jr/jive/highcharts/view/ChartJiveComponentView': {
      adhocHighchartsSettingService: 'adhoc/intelligentChart/jr/jive/adhocHighchartsSettingService'
    },
    'actionModel/actionModel.primaryNavigation': {
      'runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation': 'runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation'
    }
  },
  waitSeconds: 0
});