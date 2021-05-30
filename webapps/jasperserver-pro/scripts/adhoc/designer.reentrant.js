define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var $H = _prototype.$H;
var $$ = _prototype.$$;

var designerBase = require('../base/designer.base');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var encodeText = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeText;
var doNothing = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.doNothing;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var deepClone = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.deepClone;

var _runtime_dependenciesJrsUiSrcCoreCoreAjax = require("runtime_dependencies/jrs-ui/src/core/core.ajax");

var AjaxRequester = _runtime_dependenciesJrsUiSrcCoreCoreAjax.AjaxRequester;

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var domain = require('../dataChooser/domain.components');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
///////////////////////////////////////////////////////////////
// Re-entrant ad hoc
///////////////////////////////////////////////////////////////
var adhocReentrance = {
  TEMPLATE_ID: 'selectFields',
  TREE_TEMPLATE_DOM_ID: 'list_responsive_collapsible_type_sets',
  OK_PATTERN: '#selectFieldsOk',
  CANCEL_PATTERN: '#selectFieldsCancel',
  ajaxBuffer: 'ajaxbuffer',
  callbackCalled: false,
  initialize: function initialize() {
    this._dialog = $(this.TEMPLATE_ID);
    this.actionHash = {
      '#selectFieldsOk': function selectFieldsOk(event) {
        domain.chooser.fields.fillForm();
        adhocReentrance.callbackCalled = true;

        var callback = function callback(state) {
          window.adhocDesigner.generalDesignerCallback();
          window.adhocDesigner.filtersController.setFilters(state);
        };

        designerBase.sendRequest('co_setAdhocFields', ['selectedModel=' + encodeText($('selectedModel').value)], callback, {
          'bPost': true
        });
        this.close();
      },
      '#selectFieldsCancel': function selectFieldsCancel(event) {
        this.close();
      }
    };

    this.getAction = function (element) {
      for (var id in this.actionHash) {
        if (element.match(id)) {
          return this.actionHash[id];
        }
      }

      return doNothing;
    };

    this._dialog.observe('click', function (e) {
      var element = e.element();
      var btn = matchAny(element, [this.OK_PATTERN, this.CANCEL_PATTERN], true);

      if (btn) {
        this.getAction(btn).bind(this)(e);
      }

      e.stop();
    }.bindAsEventListener(this));
  },
  launchDialog: function launchDialog() {
    designerBase.sendRequest('co_loadSchemaPos', [], adhocReentrance.init, {
      'target': adhocReentrance.ajaxBuffer,
      'bpost': true,
      'mode': AjaxRequester.prototype.EVAL_JSON
    });
  },
  init: function init(response) {
    response = response[0];
    domain.chooser.fields.mode = domain.chooser.fields.RE_ENTRANCE_MODE;
    domain.chooser.fields.TREE_TEMPLATE_DOM_ID = adhocReentrance.TREE_TEMPLATE_DOM_ID;
    domain.chooser.fields.NODE_CLASS = adhocReentrance.ReentranceNode;
    domain.setMessage('disabledFolderTooltip', window.disabledFolderTooltip);

    domain.chooser.fields.disableNodesInAdhocReEntrance = function () {
      adhocReentrance.disableNode(dynamicTree.trees[domain.chooser.fields.DESTINATION_FIELDS_DOM_ID].rootNode, response['disabledNodes']);
    };

    domain.chooser.fields.updateReEntrantControls = function (params) {
      var okButton = $$(adhocReentrance.OK_PATTERN);

      if (okButton.size() && typeof params.destTreeHasVisibleNodes != 'undefined') {
        domain.enableButton(okButton[0], params.destTreeHasVisibleNodes);
      }
    };

    delete domain._bodyClickEventHandlers;
    domain.chooser.fields.init();
    dialogs.popup.show($('selectFields'));
    designerBase.updateMainOverlay('hidden');
  },
  disableNode: function disableNode(node, disabledNodes) {
    var id = $H(disabledNodes).keys().detect(function (id) {
      return node.param.id == id;
    });

    if (id) {
      node.disable(disabledNodes[id]);
    }

    node.childs.each(function (child) {
      adhocReentrance.disableNode(child, disabledNodes);
    });
    var parent = node.parent;

    while (parent && parent != dynamicTree.trees[node.getTreeId()].rootNode) {
      var disabledChilds = parent.childs.findAll(function (child) {
        return child.disabled;
      });

      if (parent.childs.length > 0 && parent.childs.length == disabledChilds.length) {
        parent.disable(window.disabledFolderTooltip);
      }

      parent = parent.parent;
    }
  },
  close: function close() {
    dialogs.popup.hide($('selectFields'));

    if (!adhocReentrance.callbackCalled) {
      window.adhocDesigner.generalDesignerCallback();
    }

    adhocReentrance.callbackCalled = false;
  }
};

adhocReentrance.ReentranceNode = function (options) {
  domain.ItemNode.call(this, options);
  this.Types = {
    Folder: new dynamicTree.TreeNode.Type('ItemGroupType'),
    Leaf: new dynamicTree.TreeNode.Type('ItemType')
  };
  this.nodeHeaderTemplateDomId = 'list_responsive_collapsible_type_sets:sets';
};

adhocReentrance.ReentranceNode.prototype = deepClone(domain.ItemNode.prototype);
module.exports = adhocReentrance;

});