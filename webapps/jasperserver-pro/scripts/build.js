module.exports = {
  dir: '../optimized-scripts',
  mainConfigFile: 'require.config.js',
  optimizeCss: 'none',
  optimize: 'uglify2',
  skipDirOptimize: null,
  removeCombined: null,
  preserveLicenseComments: null,
  paths: {
    jquery: 'empty:',
    prototype: 'empty:',
    ReportRequireJsConfig: 'empty:',
    fusioncharts: 'empty:',
    'ireport.highcharts.default.service': 'empty'
  },
  shim: {
    'commons/commons.main': {
      deps: ['runtime_dependencies/jquery/dist/jquery']
    },
    'dashboardViewer/dashboardViewerBareMain': {
      deps: ['runtime_dependencies/jquery/dist/jquery']
    }
  },
  modules: [{
    name: 'commons/commons.main'
  },{
    name: 'addResource/dataType/addDataTypeMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/fileResource/addFileResourceMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/inputControls/addInputControlMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/inputControls/addInputControlQueryInformationMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/inputControls/dataTypeLocateMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/inputControls/listOfValuesLocateMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/jasperReport/addJasperReportMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/jasperReport/addJasperReportLocateControlMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/jasperReport/addJasperReportResourceNamingMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/jasperReport/addJasperReportResourcesAndControlsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/listOfValues/addListOfValuesMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/mondrianXml/addMondrianXmlMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/analysisView/addOLAPViewMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/query/addQueryMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/query/addQueryWithResourceLocatorMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/analysisClientConnection/addAnalysisClientConnectionMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerCustomAttributesMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerExportMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerImportMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerLoggingMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerAnalysisOptionsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/resetSettings/resetSettingsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'manage/manageRolesMain',
    exclude: ['commons/commons.main']
  },{
    name: 'manage/manageUsersMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dataSource/dataSourceMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/analysisClientConnection/locateDataSourceMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/analysisClientConnection/locateMondrianConnectionSourceMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/query/locateQueryMain',
    exclude: ['commons/commons.main']
  },{
    name: 'addResource/analysisClientConnection/locateXmlConnectionSourceMain',
    exclude: ['commons/commons.main']
  },{
    name: 'login/loginMain',
    exclude: ['commons/commons.main']
  },{
    name: 'olapView/olapViewMain',
    exclude: ['commons/commons.main']
  },{
    name: 'reportViewer/reportViewerMain',
    exclude: ['commons/commons.main']
  },{
    name: 'repository/repositoryMain',
    exclude: ['commons/commons.main']
  },{
    name: 'messages/details/messageDetailsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'messages/list/messageListMain',
    exclude: ['commons/commons.main']
  },{
    name: 'scheduler/schedulerMain',
    exclude: ['commons/commons.main']
  },{
    name: 'encrypt/encryptMain',
    exclude: ['commons/commons.main']
  },{
    name: 'system/systemErrorMain',
    exclude: ['commons/commons.main']
  },{
    name: 'system/errorMain',
    exclude: ['commons/commons.main']
  },{
    name: 'domainDesigner/domainDesignerMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dashboardViewer/dashboardViewerBareMain'
  },{
    name: 'adhoc/adhocMain',
    exclude: ['commons/commons.main']
  },{
    name: 'adhoc/adhocStartMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerAdhocCacheMain',
    exclude: ['commons/commons.main']
  },{
    name: 'administer/administerAdhocOptionsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'manage/manageOrgsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dashboardDesigner/dashboardDesignerMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dashboardViewer/dashboardViewerMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dashboardViewer/dashboardViewerExporterMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dataChooser/dataChooserDisplayMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dataChooser/dataChooserFieldsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dataChooser/dataChooserPreFiltersMain',
    exclude: ['commons/commons.main']
  },{
    name: 'dataChooser/dataChooserSaveAsTopicMain',
    exclude: ['commons/commons.main']
  },{
    name: 'home/homeMain',
    exclude: ['commons/commons.main']
  },{
    name: 'home/homeAdminWorkflowMain',
    exclude: ['commons/commons.main']
  },{
    name: 'logCollectors/logCollectorsMain',
    exclude: ['commons/commons.main']
  },{
    name: 'reportOptions/editReportOptionMain',
    exclude: ['commons/commons.main']
  }],
  uglify2: {
    output: {
      ascii_only: true
    }
  },
  inlineText: true,
  excludeText: []
};