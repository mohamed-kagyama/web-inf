define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var canvasViewDesignersEnum = require("./app/model/enum/canvasViewDesignersEnum");

var emToPxUtil = require("./app/common/component/util/emToPxUtil");

var uriLocation = require("./app/util/uriLocation");

var applicationProfileEnum = require("./app/enum/applicationProfileEnum");

var tooltipTypesEnum = require("./app/common/component/enum/messageTypesEnum");

var tooltipPlacements = require("./app/common/component/enum/placementsEnum");

var treeComponentSettings = require("settings!treeComponent");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var READ_ONLY_FILTER_HEIGHT = 32.98;
var JOINS_DESIGNER_JOIN_HEIGHT = 32;
var JOINS_DESIGNER_JOIN_EXPRESSION_HEIGHT = 32;
var JOINS_DESIGNER_JOIN_TREES_SECTION_MIN_HEIGHT = emToPxUtil.convertEmToPx(2.364);
var FOOTER_HEIGHT = 17;
var TOOLTIP_OFFSET_LEFT = emToPxUtil.convertEmToPx(0.5);
var LIST_ITEM_HEIGHT = emToPxUtil.convertEmToPx(2.455);
module.exports = {
  get: function get(options) {
    options = options || {};
    var PREVIOUS_URL_STORAGE_KEY = 'jrs_dd_previous_location',
        homePageUrl = 'flow.html?_flowId=homeFlow',
        domainDesignerPageUrl = 'domaindesigner.html',
        uriParams = uriLocation.getCurrentLocationParameters(),
        defaultPreviousLocation = uriLocation.getPreviousLocation(PREVIOUS_URL_STORAGE_KEY, homePageUrl, domainDesignerPageUrl),
        profile = options.profile || uriParams['_profile'];
    return {
      //session
      timeoutWarningDelay: 120,
      //element where application will be rendered
      el: options.el || '.jr-jDomainDesigner',
      // previous location where user can be redirected
      previousLocation: options.previousLocation || defaultPreviousLocation,
      // login page url
      loginPageUrl: 'login.html',
      // window
      window: window,
      //Sub-designer which will be visible by default
      defaultDesigner: options.defaultDesigner || canvasViewDesignersEnum.METADATA_DESIGNER,
      dispatcher: {
        startExecutionTimeout: 0
      },
      dialogs: {
        constantJoinExpressionEditor: {
          selectOptionClassName: 'jr-mInput jr-mInput-selectt-list-item jr'
        },
        renameDialog: {
          minHeight: 190,
          minWidth: 190
        }
      },
      loader: {
        dialog: {
          loadingDelay: 300,
          loadingMinDuration: 150,
          zIndex: 6000
        },
        embedded: {
          loadingDelay: 100,
          loadingMinDuration: 150
        }
      },
      autoScroll: {
        autoScrollAreaTopOffset: 170,
        autoScrollAreaBottomOffset: 17,
        autoScrollStep: 10,
        autoScrollTimeout: 10,
        autoScrollThrottle: 60
      },
      list: {
        listItemHeight: LIST_ITEM_HEIGHT
      },
      virtualData: {
        debounce: 50
      },
      sidebar: {
        initialWidth: '15.625em',
        SIDEBAR_MIN_WIDTH: 200,
        SIDEBAR_MAX_WIDTH: 1300,
        joinsDesigner: {
          MIN_HEIGHT: 28,
          MAX_HEIGHT: 1000
        }
      },
      metadataDesigner: {
        emptyResourcesTooltipOffset: {
          top: emToPxUtil.convertEmToPx(9),
          left: TOOLTIP_OFFSET_LEFT
        }
      },
      joinsDesigner: {
        height: {
          JOIN_CONSTRUCTOR: emToPxUtil.convertEmToPx(3.635),
          JOIN_TREE: 32,
          JOIN_TREE_PLACEHOLDER: emToPxUtil.convertEmToPx(1.455),
          JOIN_TREE_FIRST_PLACEHOLDER: emToPxUtil.convertEmToPx(0.727),
          JOIN: JOINS_DESIGNER_JOIN_HEIGHT,
          JOIN_EXPRESSION: JOINS_DESIGNER_JOIN_EXPRESSION_HEIGHT,
          JOIN_ALIAS: JOINS_DESIGNER_JOIN_EXPRESSION_HEIGHT,
          TABLE_REFERENCE: JOINS_DESIGNER_JOIN_EXPRESSION_HEIGHT,
          COMPLEX_JOIN: JOINS_DESIGNER_JOIN_HEIGHT,
          COMPLEX_JOIN_EXPANDED: 65.98,
          canvas: 1000
        },
        joinTreesSectionMinHeight: JOINS_DESIGNER_JOIN_TREES_SECTION_MIN_HEIGHT
      },
      calculatedFieldsDesigner: {
        zIndex: 5000
      },
      derivedTablesDesigner: {
        height: {
          // show 3.5 items in list
          queryResultSetHeight: 3.5 * LIST_ITEM_HEIGHT,
          fieldHeight: LIST_ITEM_HEIGHT
        }
      },
      filtersDesigner: {
        multiSelect: {
          height: emToPxUtil.convertEmToPx(27.091)
        },
        height: {
          FILTER_EXPRESSION: {
            readOnly: READ_ONLY_FILTER_HEIGHT,
            edit: {
              LITERAL: {
                rawValueEditor: {
                  normal: emToPxUtil.convertEmToPx(7.449),
                  error: emToPxUtil.convertEmToPx(9.267)
                },
                singleSelectEditor: {
                  normal: emToPxUtil.convertEmToPx(8.723)
                }
              },
              VARIABLE: {
                normal: emToPxUtil.convertEmToPx(7.541)
              },
              LIST: {
                normal: emToPxUtil.convertEmToPx(33.452),
                error: emToPxUtil.convertEmToPx(33.452)
              },
              RANGE: {
                normal: emToPxUtil.convertEmToPx(13.445),
                error: emToPxUtil.convertEmToPx(17.081)
              }
            }
          },
          COMPLEX_FILTER: READ_ONLY_FILTER_HEIGHT,
          canvas: 1000
        },
        width: {
          isOneOf: 300
        }
      },
      presentationDesigner: {
        columnDefaultWidths: {
          column0Width: 25,
          column1Width: 75
        },
        resizer: {
          minOffsetInPercent: 15,
          maxOffsetInPercent: 75
        },
        clickedClass: 'jr-isClicked',
        height: {
          COLLAPSED_ITEM: emToPxUtil.convertEmToPx(3.09),
          EXPANDED_ITEM: emToPxUtil.convertEmToPx(19.9927),
          LAST_ROW: emToPxUtil.convertEmToPx(2.909),
          LAST_ROW_PADDING: emToPxUtil.convertEmToPx(0.091),
          canvas: 1000
        },
        width: {
          minCanvasWidthEm: 86.364
        },
        canvasErrorTooltipConfig: {
          type: tooltipTypesEnum.ERROR,
          placement: tooltipPlacements.BOTTOM_LEFT,
          style: {
            expanded: {
              top: -1 * emToPxUtil.convertEmToPx(0.727) + 'px',
              left: '0'
            },
            collapsed: {
              top: emToPxUtil.convertEmToPx(0.909) + 'px',
              left: '0',
              'margin-bottom': emToPxUtil.convertEmToPx(0.818) + 'px'
            }
          }
        }
      },
      dependenciesInspector: {
        canvasHeight: emToPxUtil.convertEmToPx(20),
        itemHeight: LIST_ITEM_HEIGHT
      },
      repositoryResourceChooser: {
        resourcesList: {
          offset: 0,
          limit: 500,
          itemsHeight: LIST_ITEM_HEIGHT
        },
        repositoryTree: {
          offset: 0,
          limit: parseInt(treeComponentSettings.treeLevelLimit, 10)
        }
      },
      tooltip: {
        offset: TOOLTIP_OFFSET_LEFT
      },
      save: {
        skipDataBaseMetadataCheck: true
      },
      footerHeight: FOOTER_HEIGHT,
      //domain uri has higher priority than data source uri parameter
      domainUri: options.domainUri || uriParams['uri'],
      dataSourceUri: options.dataSourceUri || uriParams['dataSourceUri'],
      parentFolderUri: options.parentFolderUri || uriParams['ParentFolderUri'],
      allowJSONExport: profile === applicationProfileEnum.DEV,
      // Dev Tools
      profile: profile,
      performance: options.performance || uriParams['_perf']
    };
  }
};

});