define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $$ = _prototype.$$;

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var webHelpModule = require("runtime_dependencies/jrs-ui/src/components/components.webHelp");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var centerElement = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.centerElement;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var Administer = require("runtime_dependencies/jrs-ui/src/administer/administer.base");

var jQuery = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
var DataSetList = {
  DS_CONTAINER: 'dsContainer',
  BUTTON_CLOSE: '#detail #close',
  BUTTON_CLEAR_ALL_CACHE: 'clearAllCache',
  Q_ITEM_PFX: 'qItem_',
  SORTING_FORM: 'changeSortType',
  SORTING_SELECT_ITEMS: '#sortMode .tab',
  initialize: function initialize() {
    layoutModule.resizeOnClient('serverSettingsMenu', 'settings');
    webHelpModule.setCurrentContext('admin');

    if (!$(this.DS_CONTAINER)) {
      var nothingToDisplay = $('nothingToDisplay');
      nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
      centerElement(nothingToDisplay, {
        horz: true,
        vert: true
      });
      jQuery(document.body).addClass(layoutModule.NOTHING_TO_DISPLAY_CLASS);
    }

    $('display').observe('click', function (e) {
      var elem = e.element();
      var button = matchAny(elem, [layoutModule.BUTTON_PATTERN], true);

      if (button) {
        // observe navigation
        for (var pattern in Administer.menuActions) {
          if (button.match(pattern) && !button.up('li').hasClassName('selected')) {
            document.location = Administer.menuActions[pattern]();
            return;
          }
        } // observe clear all cache button
        // observe clear all cache button


        if (button.match('button#' + DataSetList.BUTTON_CLEAR_ALL_CACHE)) {
          e.stop();

          DataSetList._clearAll();
        } // observe clear button
        // observe clear button


        if (button.match('div.five > button')) {
          DataSetList._clearQuery(button);

          return;
        }
      } // observe query link
      // observe query link


      if (elem.match('a') && matchAny(elem, ['div.two'], true)) {
        DataSetList._getDetails(elem);

        return;
      }
    });
    document.body.appendChild($('detail'));
    $$(DataSetList.BUTTON_CLOSE)[0].observe('click', function (e) {
      e.stop();
      dialogs.popup.hide($('detail'));
    });
    var form = $(DataSetList.SORTING_FORM);
    var currentSorting = form.sort.value;
    $$(DataSetList.SORTING_SELECT_ITEMS).each(function (element) {
      if (currentSorting) $(element)[currentSorting === element.id ? 'addClassName' : 'removeClassName']('selected');
      $(element).observe('click', function (id) {
        return function () {
          form.sort.setAttribute('value', id);
          form.submit();
        };
      }(element.id));
    });
  },
  _getDetails: function _getDetails(element) {
    var url = 'flow.html?_flowExecutionKey=' + Administer.flowExecutionKey + '&_eventId=isServerAvailable';

    Administer._sendRequest(url, null, function (response) {
      if (response.data && response.data.strip() == 'Yes') {
        var data = 'id=' + element.readAttribute('name');
        var url = 'flow.html?_flowExecutionKey=' + Administer.flowExecutionKey + '&_eventId=getDetails';

        Administer._sendRequest(url, data, DataSetList._getDetailsCallback);
      }
    });
  },
  _clearQuery: function _clearQuery(element) {
    var data = 'id=' + element.name;
    var url = 'flow.html?_flowExecutionKey=' + Administer.flowExecutionKey + '&_eventId=clearQuery';

    Administer._sendRequest(url, data, DataSetList._clearCallback);
  },
  _clearAll: function _clearAll() {
    var url = 'flow.html?_flowExecutionKey=' + Administer.flowExecutionKey + '&_eventId=clearAll';

    Administer._sendRequest(url, null, DataSetList._clearCallback);
  },
  _getDetailsCallback: function _getDetailsCallback(response) {
    var detDialog = $('detail');
    $('detAge').update(response.age);
    $('detQuery').update(response.query.replace(new RegExp('\n', 'g'), '<br/>'));
    $('detDataSourceURI').update(response.datasourceURI);
    $('detParameters').update(response.params);
    $('detTime').update(response.idle);
    $('detRows').update(response.rows);
    $('detQueryTime').update(response.queryTime);
    $('detFetchTime').update(response.fetchTime);
    dialogs.popup.show(detDialog);
  },
  _clearCallback: function _clearCallback(response) {
    // in case if detail dialog is opened
    $('detail').hide();

    if (response.empty) {
      var nothingToDisplay = $('nothingToDisplay');
      nothingToDisplay.removeClassName(layoutModule.HIDDEN_CLASS);
      centerElement(nothingToDisplay, {
        horz: true,
        vert: true
      });
      jQuery(document.body).addClass(layoutModule.NOTHING_TO_DISPLAY_CLASS);

      DataSetList._disableClearAll();
    } else if (response.id) {
      $(DataSetList.Q_ITEM_PFX + response.id).remove();
    }

    dialogs.systemConfirm.show(Administer.getMessage(response.result));
  },
  _disableClearAll: function _disableClearAll(name) {
    buttonManager.disable($(DataSetList.BUTTON_CLEAR_ALL_CACHE));
  }
};

if (typeof require === 'undefined') {
  // prevent conflict with domReady plugin in RequireJS environment
  document.observe('dom:loaded', DataSetList.initialize.bind(DataSetList));
}

module.exports = DataSetList;

});