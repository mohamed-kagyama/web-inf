define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Loader = require("../jasperreports-loader");

var StatusChecker = require("./status-checker");

var ComponentRegistrar = require("./component-registrar");

var EventManager = require("./event-manager");

var $ = require("jquery");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
var log = logger.register("jasperreports/report");

var Report = function Report(o) {
  this.config = {
    reporturi: null,
    async: true,
    page: 0,
    updateInterval: 1000,
    container: null
  };
  $.extend(this.config, o); // report state members

  this.currentpage = this.config.page;
  this.html = null;
  this.status = null;
  this.components = null; // events

  this.eventManager = new EventManager();
  this.events = {
    ACTION_PERFORMED: "action",
    BEFORE_ACTION_PERFORMED: "beforeAction",
    UNDO_PERFORMED: "undo",
    UNDO_ALL_PERFORMED: "undoall",
    SEARCH_PERFORMED: "search",
    SAVE_ZOOM_PERFORMED: "saveZoom",
    REDO_PERFORMED: "redo",
    PAGE_MODIFIED: "pageModified",
    REPORT_HTML_READY: "reportHtmlReady",
    COMPONENTS_LOADED: "componentsLoaded",
    COMPONENTS_REGISTERED: "componentsRegistered",
    REPORT_FINISHED: "reportFinished"
  }; // utils

  this.loader = new Loader({
    reporturi: this.config.reporturi,
    async: this.config.async,
    eventManager: this.eventManager
  });
  this.statusChecker = new StatusChecker(this.loader, this.config.updateInterval);
  this.componentRegistrar = new ComponentRegistrar(this.loader);
  o.stopOnFinishOnly && (this.loader.config.stopOnFinishOnly = true);
};

Report.prototype = {
  init: function init(inputParameters) {
    return this.refreshPage(this.currentpage, null, inputParameters);
  },
  refreshPage: function refreshPage(page, boolNavigate, inputParameters) {
    var it = this;
    it.currentpage = page;
    return it.loader.getHtmlForPage(it.currentpage, boolNavigate, inputParameters).then(function (htmlData, textStatus, jqXHR) {
      it.status = $.parseJSON(jqXHR.getResponseHeader("jasperreports-report-status"));
      it.html = htmlData; // an anchor may change the current page index, so try to set it from status

      if (it.status && it.status.pageIndex != null) {
        it.currentpage = it.status.pageIndex;
      }

      it.config.postProcess && it.config.postProcess.call(it);
      it.eventManager.triggerEvent(it.events.REPORT_HTML_READY);

      if (it.status.isComponentMetadataEmbedded) {
        return $.parseJSON($(htmlData).find("#reportComponents").text());
      } else {
        return it.loader.getComponentsForPage(it.currentpage);
      }
    }).then(function (componentsObject) {
      it.loadedComponents = componentsObject;
      it.eventManager.triggerEvent(it.events.COMPONENTS_LOADED);
      it.components = {};
      return it.componentRegistrar.registerComponents(componentsObject, it, it.components);
    }).then(function () {
      if ((it.status.pageTimestamp || !it.status.totalPages) && it.status.reportStatus != 'canceled') {
        it.statusChecker.checkPageModified(it.currentpage, it.status.pageTimestamp).then(function (statusResult) {
          it.status.originalStatus = statusResult;

          if (statusResult.status == 'finished') {
            it.status.totalPages = statusResult.lastPageIndex + 1;
            it.status.partialPageCount = statusResult.lastPartialPageIndex + 1;
            it.status.reportStatus = statusResult.status; // final pages may not contain all the report components (e.g. bookmarks, parts), so try to load them

            if (it.status.pageFinal) {
              it.loader.getComponentsForPage().then(function (reportComponents) {
                it.reportComponents = {};
                it.componentRegistrar.registerComponents(reportComponents, it, it.reportComponents).then(function () {
                  it.eventManager.triggerEvent(it.events.REPORT_FINISHED);
                });
              });
            } else {
              it.eventManager.triggerEvent(it.events.REPORT_FINISHED);
            }
          } else {
            if (statusResult.pageModified) {
              it.eventManager.triggerEvent(it.events.PAGE_MODIFIED);
            }
          }
        });
      }

      it.eventManager.triggerEvent(it.events.COMPONENTS_REGISTERED);
      return it;
    });
  },
  gotoPage: function gotoPage(page) {
    this.statusChecker.cancelCheckPageModified();
    return this.refreshPage(page, true);
  },
  search: function search(searchOptions) {
    var it = this;

    it._notify({
      name: it.events.BEFORE_ACTION_PERFORMED,
      type: "search"
    });

    return this.loader.runAction({
      action: {
        actionName: "search",
        searchData: {
          searchString: searchOptions.searchString,
          caseSensitive: searchOptions.caseSensitive || false,
          wholeWordsOnly: searchOptions.wholeWordsOnly || false
        }
      }
    }).then(function (jsonData) {
      it._notify({
        name: it.events.SEARCH_PERFORMED,
        type: "search",
        data: jsonData
      });

      return it;
    });
  },
  saveZoom: function saveZoom(zoomValue) {
    var it = this;
    return this.loader.runAction({
      action: {
        actionName: "saveZoom",
        zoomValue: zoomValue
      },
      showAjaxDialog: false
    }).then(function (jsonData) {
      it._notify({
        name: it.events.SAVE_ZOOM_PERFORMED,
        type: "saveZoom",
        data: jsonData
      });

      return it;
    });
  },
  undo: function undo() {
    var it = this;

    it._notify({
      name: it.events.BEFORE_ACTION_PERFORMED
    });

    return this.loader.runAction({
      action: {
        actionName: "undo"
      }
    }).then(function (jsonData) {
      it._notify({
        name: it.events.UNDO_PERFORMED,
        type: "undo",
        data: jsonData
      });

      return it;
    });
  },
  redo: function redo() {
    var it = this;

    it._notify({
      name: it.events.BEFORE_ACTION_PERFORMED
    });

    return this.loader.runAction({
      action: {
        actionName: "redo"
      }
    }).then(function (jsonData) {
      it._notify({
        name: it.events.REDO_PERFORMED,
        type: "redo",
        data: jsonData
      });

      return it;
    });
  },
  undoAll: function undoAll() {
    var it = this;

    it._notify({
      name: it.events.BEFORE_ACTION_PERFORMED
    });

    return this.loader.runAction({
      action: {
        actionName: "undoAll"
      }
    }).then(function (jsonData) {
      it._notify({
        name: it.events.UNDO_ALL_PERFORMED,
        type: "undoall",
        data: jsonData
      });

      return it;
    });
  },
  cancelStatusUpdates: function cancelStatusUpdates() {
    this.statusChecker.cancelCheckPageModified();
  },
  cancelExecution: function cancelExecution(async) {
    this.statusChecker.cancelCheckPageModified();
    return this.loader.cancelExecution(async);
  },
  on: function on(evtName, callback) {
    this.eventManager.subscribeToEvent({
      name: evtName,
      callback: callback,
      thisContext: this,
      keep: true
    });
    return this;
  },
  _notify: function _notify(evt) {
    this.config.debug && log.debug("report notified of event: " + evt.name + "; type: " + evt.type);
    this.eventManager.triggerEvent(evt.name, evt);
  }
};
module.exports = Report;

});