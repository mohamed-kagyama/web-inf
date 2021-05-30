define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var adhocDesigner = require('./designer');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var InPlaceEditor = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.InPlaceEditor;
var getInnerText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.getInnerText;
var isIE8 = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isIE8;
var isNotNullORUndefined = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isNotNullORUndefined;
var matchMeOrUp = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchMeOrUp;

var jQuery = require('jquery');

var designerBase = require('../base/designer.base');

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
     * Select item header to be edited
     * @param element
     * @param type
     */
adhocDesigner.editDataHeader = function (element, type) {
  var currentText = null;
  var dialogInput = null;
  var submitFunction = null;
  var submitBtn = null;
  var cancelBtn = null;
  var index = null;
  var edited = null;
  var dialog = $('editLabel');
  var width = 100; //hard code for now
  //hard code for now

  var postEdit = function postEdit() {
    adhocDesigner.initPreventBrowserSelection($('designer'));
  };

  this.initEnableBrowserSelection($('designer'));

  if (type === 'title') {
    adhocDesigner.prevTitle = jQuery('#titleCaption').html();
    window.editor = new InPlaceEditor(element);
    window.editor.oldTitle = window.editor.value;
    window.editor.makeEditable({
      'onMouseup': adhocDesigner.returnToNormalReportTitle,
      'onTab': adhocDesigner.returnToNormalReportTitle,
      'onEnter': adhocDesigner.returnToNormalReportTitle,
      'onEsc': adhocDesigner.returnToNormalReportTitle
    });
    jQuery('#mainTableContainer').scrollLeft(0);
  } else {
    if (dialog) {
      cancelBtn = dialog.down('button#cancelEditBtn');
      submitBtn = dialog.down('button#editLabelBtn');

      if (type === 'legend') {
        var selectedLegend = designerBase.getSelectedObject();

        if (selectedLegend) {
          index = selectedLegend.index;
          currentText = selectedLegend.userName;
          dialogInput = dialog.down('input#editLabelInput');

          if (dialogInput) {
            dialogInput.value = currentText;

            submitFunction = function submitFunction() {
              edited = dialogInput.value;
              window.localContext.updateLegendLabel(edited, index);
            };
          }
        }
      } else if (type === 'column') {
        var selectedColumn = adhocDesigner.getSelectedColumnOrGroup();

        if (selectedColumn) {
          var headerSpan = selectedColumn.header.getElementsByTagName('span')[0];
          var headerText = headerSpan ? jQuery(headerSpan).html().trim() : getInnerText(selectedColumn.header);
          currentText = xssUtil.unescape(headerText);
          width = $(selectedColumn.header).getWidth();
          index = selectedColumn.index;
          dialogInput = dialog.down('input#editLabelInput');

          if (dialogInput) {
            dialogInput.value = currentText;

            submitFunction = function submitFunction() {
              edited = dialogInput.value;
              window.localContext.updateColumnHeaderRequest(edited, index, width);
            };
          }
        }
      } else if (type === 'tableGroup') {
        var selectedGroup = adhocDesigner.getSelectedColumnOrGroup();

        if (selectedGroup) {
          var groupIndex = selectedGroup.index;
          currentText = selectedGroup.label;
          dialogInput = dialog.down('input#editLabelInput');

          if (dialogInput) {
            dialogInput.value = currentText;

            submitFunction = function submitFunction() {
              edited = dialogInput.value;
              window.localContext.updateGroupLabel(edited, groupIndex);
            };
          }
        }
      } //shared by all
      //shared by all


      if (dialogInput) {
        $(cancelBtn).observe('click', function (evt) {
          $(submitBtn).stopObserving('click');
          postEdit();
          dialogs.popup.hide(dialog);
          Event.stop(evt);
        });
        $(submitBtn).observe('click', function (evt) {
          submitFunction();
          postEdit();
          $(submitBtn).stopObserving('click');
          dialogs.popup.hide(dialog);
          Event.stop(evt);
        });
        $(dialogInput).observe('key:enter', function (evt) {
          submitFunction();
          postEdit();
          $(submitBtn).stopObserving('click');
          $(dialogInput).stopObserving('key:enter');
          dialogs.popup.hide(dialog);
          Event.stop(evt);
        });
        $(dialogInput).observe('keypress', function (evt) {
          evt = evt ? evt : window.event;
          /**
          * Stop special characters
          * < : 60
          * > : 62
          * & : 38
          * = : 61
          */

          /**
               * Stop special characters
               * < : 60
               * > : 62
               * & : 38
               * = : 61
               */

          if (type === 'legend') {
            if (evt.keyCode == 62 || evt.keyCode == 60 || evt.keyCode == 38 || evt.keyCode == 61 || evt.charCode == 62 || evt.charCode == 60 || evt.charCode == 38 || evt.charCode == 61) {
              //                                console.log(String.fromCharCode(evt.charCode));
              //                                console.log(evt.keyCode);
              Event.stop(evt);
            }
          }
        });
        dialogs.popup.show(dialog);
        var DELAY_COMPONENT_AVALIABLE = 500;

        var focusDialog = function focusDialog() {
          dialogInput.focus();
          dialogInput.select();
        };

        if (isIE8()) {
          setTimeout(focusDialog, DELAY_COMPONENT_AVALIABLE);
        } else {
          focusDialog();
        }
      }
    }
  }
};
/**
* Add label to deleted column
*/

/**
     * Add label to deleted column
     */


adhocDesigner.addColumnLabel = function () {
  if (window.selObjects.length == 1) {
    var selectedColumn = designerBase.getSelectedObject();
    var headerCell = selectedColumn.header;

    if (headerCell.hasClassName('deletedHeader')) {
      adhocDesigner.editDataHeader(headerCell, 'column');
    }
  }
};
/**
* Delete column header
*/

/**
     * Delete column header
     */


adhocDesigner.deleteColumnLabel = function () {
  if (window.selObjects.length == 1) {
    var selectedColumn = designerBase.getSelectedObject();
    var headerCell = selectedColumn.header;

    if (!headerCell.hasClassName('deletedHeader')) {
      headerCell.addClassName('deletedHeader');
      jQuery(headerCell).html(headerCell.readAttribute('data-fieldName'));
    } //send delete request
    //send delete request


    window.localContext.removeColumnHeaderRequest();
  }
};

adhocDesigner.selectAndEditLabel = function (index) {
  var selectedObject = null;
  var overlayObject = $('legendOverlay_' + index);

  if (overlayObject) {
    selectedObject = {
      id: overlayObject.identify(),
      legendName: overlayObject.readAttribute('data-legendName'),
      index: overlayObject.readAttribute('data-index'),
      defaultName: overlayObject.readAttribute('data-defaultName'),
      userName: overlayObject.readAttribute('data-userName')
    }; //deselect all selected legend overlays
    //deselect all selected legend overlays

    designerBase.unSelectAll();
    window.localContext.deselectAllSelectedOverlays();
    designerBase.addToSelected(selectedObject);
    buttonManager.select(overlayObject);
    adhocDesigner.editLegendLabel();
  }
};

adhocDesigner.editLegendLabel = function () {
  if (window.selObjects.length == 1) {
    var selectedMeasure = designerBase.getSelectedObject();
    var selectedMeasureDiv = $(selectedMeasure.id);

    if (selectedMeasureDiv) {
      adhocDesigner.editDataHeader(selectedMeasureDiv, 'legend');
    }
  }
};
/*
* Used to edit column label
*/

/*
     * Used to edit column label
     */


adhocDesigner.editColumnLabel = function () {
  if (window.selObjects.length == 1) {
    var selectedColumn = designerBase.getSelectedObject();
    var headerCell = selectedColumn.header;
    adhocDesigner.editDataHeader(headerCell, 'column');
  }
};

adhocDesigner.adhocTitleEdit = function (evt) {
  var element = evt.element();

  if (!isNotNullORUndefined(window.editor) && matchMeOrUp(element, '#titleCaption')) {
    this.editDataHeader($('titleCaption'), 'title');
    Event.stop(evt);
  }
};
/*
* Used to revert from input to regular span
*/

/*
     * Used to revert from input to regular span
     */


adhocDesigner.returnToNormalReportTitle = function (evt) {
  if (window.editor) {
    evt = evt ? evt : window.event;

    if (evt.keyCode == Event.KEY_ESC) {
      window.editor.revertEdit();
      window.editor = null;
      adhocDesigner.initPreventBrowserSelection($('designer'));
    } else {
      window.editor.makeNonEditable();
      var title = xssUtil.unescape(jQuery(window.editor.elem).html());

      if (window.editor.oldTitle != title) {
        adhocDesigner.updateReportTitle(title);
        adhocDesigner.initPreventBrowserSelection($('designer'));
      } else {
        if (window.localContext.getMode() == 'table') {
          jQuery('#titleCaption').html(adhocDesigner.prevTitle);
        }
      }

      window.editor = null;
    }
  }
};

adhocDesigner.addGroupLabel = function () {
  window.localContext.editGroupLabel();
};

adhocDesigner.deleteGroupLabel = function () {
  window.localContext.removeGroupLabel();
};

adhocDesigner.editGroupLabel = function () {
  window.localContext.editGroupLabel();
};

module.exports = adhocDesigner;

});