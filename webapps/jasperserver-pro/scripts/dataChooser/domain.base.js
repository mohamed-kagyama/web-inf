define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;
var Template = _prototype.Template;
var $break = _prototype.$break;
var $$ = _prototype.$$;

var _ = require('underscore');

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var buildActionUrl = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.buildActionUrl;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var isSupportsTouch = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.isSupportsTouch;
var deepClone = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.deepClone;

var _runtime_dependenciesJrsUiSrcCoreCoreAjax = require("runtime_dependencies/jrs-ui/src/core/core.ajax");

var AjaxRequester = _runtime_dependenciesJrsUiSrcCoreCoreAjax.AjaxRequester;
var ajaxTargettedUpdate = _runtime_dependenciesJrsUiSrcCoreCoreAjax.ajaxTargettedUpdate;

var _coreCoreAjaxUtils = require("../core/core.ajax.utils");

var baseErrorHandler = _coreCoreAjaxUtils.baseErrorHandler;

var buttonManager = require("runtime_dependencies/jrs-ui/src/core/core.events.bis");

var dynamicTree = require("runtime_dependencies/jrs-ui/src/dynamicTree/dynamicTree.utils");

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var date = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var moment = require("momentExtension");

var NumberUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
//////////////////////////////////////////////////////
// Domain designer and data chooser main object init
//////////////////////////////////////////////////////
var numberUtil = new NumberUtils();
var domain = {
  PROPAGATE_EVENT: 'propagateEvent',
  _messages: {},
  disabledFolderTooltip: 'disabledFolderTooltip',
  attributesPattern: new RegExp('\\s*attribute\\s*\\(\\s*\'[^\\/\'\\s][^\\/\']*\'(?:\\s*,\\s*\'[^\\/\'\\s][^\\/\']*\')*\\s*\\)\\s*'),
  getMessage: function getMessage(messageId, object) {
    var message = this._messages[messageId];
    return message ? new Template(message).evaluate(object ? object : {}) : '';
  },
  setMessage: function setMessage(messageId, message) {
    this._messages[messageId] = message;
  },
  treeErrorHandler: function treeErrorHandler() {
    throw 'exception while loading tree';
  },
  submitForm: function submitForm(formId, params, fillForm) {
    if (!params) {
      return;
    } // prepare action url
    // prepare action url


    var url = buildActionUrl(params);
    fillForm && fillForm(); // write form attributes and submit it
    // write form attributes and submit it

    $(formId).writeAttribute('method', 'post').writeAttribute('action', url);
    $(formId).submit();
  },
  // Sends AJAX request to the given action.
  sendAjaxRequest: function sendAjaxRequest(urlData, postData, callback, params) {
    var actionURL = buildActionUrl(urlData);
    var options = {
      postData: Object.toQueryString(postData),
      callback: callback,
      errorHandler: this._serverErrorHandler,
      mode: AjaxRequester.prototype.EVAL_JSON
    };
    params && Object.extend(options, params);
    ajaxTargettedUpdate(actionURL, options);
  },
  _serverErrorHandler: function _serverErrorHandler(ajaxAgent, flowId) {
    /* Login request is handled in baseErrorHandler */

    /* TODO clean up this method, looks like need to completely remove it and use baseErrorHandler directly */

    /* BTW: flowId param is not provided to errorHandlers, look at core.ajax.js checkForErrors(requester) */

    /* if (ajaxAgent.getResponseHeader("LoginRequested")) {
        document.location = 'flow.html?_flowId=' + flowId;
    } */
    return baseErrorHandler(ajaxAgent);
    /* Error 500 is handled in baseErrorHandler */

    /* if (!resolved && ajaxAgent.status == 500) {
    document.location = 'flow.html?_eventId=error&_flowId=' + flowId;
    } */
  },
  elementClicked: function elementClicked(element, domId) {
    if (!element || !domId) {
      return false;
    }

    return matchAny(element, [domId], true);
  },
  basicClickHandler: function basicClickHandler(element, clickHandlersMap, callback) {
    var elementClicked = null;
    return clickHandlersMap.any(function (pair) {
      elementClicked = domain.elementClicked(element, pair.key);

      if (elementClicked) {
        if (Object.isFunction(pair.value)) {
          pair.value(elementClicked);
        } else if (Object.isFunction(callback)) {
          callback(pair.value);
        }

        return true;
      }
    });
  },
  // Setup main event handler for click events on all domain designer and
  // data chooser pages.
  registerClickHandlers: function registerClickHandlers(handlers, observeElementSelector, addAtBeginning) {
    if (domain._bodyClickEventHandlers) {
      //If we want some handlers to fire before others we should pass addAtBeginning = true
      (addAtBeginning ? Array.prototype.unshift : Array.prototype.push).apply(domain._bodyClickEventHandlers, handlers);
      return;
    }

    domain._bodyClickEventHandlers = handlers;
    var selector = observeElementSelector ? observeElementSelector : 'body';
    $$(selector)[0].observe(isSupportsTouch() ? 'touchstart' : 'click', function (event) {
      var element = event.element();

      if (domain._bodyClickEventHandlers) {
        domain._bodyClickEventHandlers.each(function (clickEventHandler) {
          var result = clickEventHandler(element); //if handler returns some result
          //this means that we have found necessary handler so
          //do not need to process other
          //if handler returns some result
          //this means that we have found necessary handler so
          //do not need to process other

          if (result) {
            if (result !== domain.PROPAGATE_EVENT) {
              Event.stop(event);
            }

            throw $break;
          }
        });
      }
    });
  },
  enableButton: function enableButton(button, enable) {
    if (typeof button == 'string') {
      button = $(button);
    }

    button.disabled = enable;

    if (enable) {
      buttonManager.enable(button);
    } else {
      buttonManager.disable(button);
    }
  },
  setOptionsToSelect: function setOptionsToSelect(select, options) {
    if (!select) {
      return;
    }

    select.update('');

    if (!options) {
      return;
    }

    options.each(function (value) {
      var optionAttributes = {
        value: value.value,
        title: value.label
      };

      if (value.selected) {
        optionAttributes['selected'] = 'selected';
      }

      var option = new Element('option', optionAttributes);
      option.appendChild(document.createTextNode(value.label));
      select.appendChild(option);
    });
    return select;
  },
  getDataIslandId: function getDataIslandId(item, islandProperty) {
    var rootNode = dynamicTree.trees[item.getTreeId()].getRootNode();

    var _getDataIslandId = function _getDataIslandId(item, islandProperty) {
      return item.parent === null || item.parent === rootNode ? item.param.extra[islandProperty] : _getDataIslandId(item.parent, islandProperty);
    };

    return _getDataIslandId(item, islandProperty);
  },
  areNodesFromSameIsland: function areNodesFromSameIsland(nodes, islandProperty) {
    var atLeastOneConstant = nodes.any(function (node) {
      return node.param.extra.isConstant;
    });
    if (atLeastOneConstant) return true;
    var fromTheSameTable = nodes.pluck('parent').uniq().length === 1;
    if (fromTheSameTable) return true; // Are nodes selected from one data island?
    // Are nodes selected from one data island?

    return nodes.map(function (node) {
      return domain.getDataIslandId(node, islandProperty || 'itemId');
    }).uniq().length === 1;
  },
  NumberFormat: function NumberFormat(decSeparator, groupSeparator) {
    var isDecimalPoint = decSeparator === '.';
    var decimalSeparatorPattern = new RegExp('[' + decSeparator.gsub(/\s/, '\\s') + ']+');
    var groupingSeparatorPattern = new RegExp('[' + groupSeparator.gsub(/\s/, '\\s') + ']+');
    var numberPartsPattern = new RegExp('^-|\\' + groupSeparator + '?\\d+|\\' + groupSeparator + '$|\\' + decSeparator + '+', 'g');
    return {
      toNumber: function toNumber(value) {
        return value && (isDecimalPoint || !/[.]/.test(value)) ? Number(value.gsub(groupingSeparatorPattern, '').gsub(decimalSeparatorPattern, '.')) || domain.attributesPattern.test(value) : NaN;
      },
      normalizeNumberEntry: function normalizeNumberEntry(value) {
        var stripedValue = value.strip();
        var parts = stripedValue.match(domain.attributesPattern) || stripedValue.match(numberPartsPattern);
        if (!parts) return '';
        var hasDecSep = false;

        for (var i = 0; i < parts.length; i++) {
          if (parts[i].startsWith(decSeparator)) {
            if (hasDecSep) {
              delete parts[i];
            } else {
              parts[i] = decSeparator;
              hasDecSep = true;
            }
          } else if (parts[i].startsWith(groupSeparator) && hasDecSep) {
            parts[i] = parts[i].substring(1);
          }
        }

        var ret = parts.join('');
        return ret;
      },
      isInteger: function isInteger(value) {
        return decimalSeparatorPattern.test(value);
      }
    };
  },
  ////////////////
  // Validation
  ////////////////

  /**
   * Basic validation routine.
   * @param predicate Predicate function for determining validation conditions.
   * @param message Error message, that will displayed in-place.
   */
  baseValidator: function baseValidator(predicate, message) {
    var isValid = true;
    var errorMessage = '';

    if (predicate()) {
      errorMessage = message;
      isValid = false;
    }

    return {
      isValid: isValid,
      errorMessage: errorMessage
    };
  },
  maxLengthValidator: function maxLengthValidator(value, length, message) {
    return domain.baseValidator(function (value, length) {
      return value.length > length;
    }.curry(value, length), message);
  },
  minLengthValidator: function minLengthValidator(value, length, message) {
    return domain.baseValidator(function (value, length) {
      return value.length < length;
    }.curry(value, length), message);
  },
  valueNotEmptyValidator: function valueNotEmptyValidator(value, message) {
    return domain.baseValidator(function (value) {
      return Object.isArray(value) && value.length === 0 || !value || !String(value).strip();
    }.curry(value), message);
  },
  stringIdValidator: function stringIdValidator(value, message) {
    return domain.baseValidator(function (value) {
      //            return !/^[\w\d]+$/.test(value); #18227
      return !/^[^0-9() .,'"=!+-/><//:][^() .,'"=!+-/><//:]*$/.test(value);
    }.curry(value), message);
  },
  numberValidator: function numberValidator(value, numberFormat, message) {
    return domain.baseValidator(isNaN.curry(numberFormat.toNumber(value)), message);
  },

  /*
   * Validates whether number value is within appropriate bounds.
   * @param bounds Object containing max and min properties. Example : <code>{min : -128, max: 127}</code>
   */
  numberBoundsValidator: function numberBoundsValidator(value, bounds, message) {
    return domain.baseValidator(function (value, bounds) {
      return value === numberUtil.MinRange || value === numberUtil.MaxRange || !(value <= bounds.max && value >= bounds.min);
    }.curry(value, bounds), message);
  },
  rangeValidator: function rangeValidator(from, to, message) {
    return domain.baseValidator(function (from, to) {
      return !(from < to);
    }.curry(from, to), message);
  },
  dateValidator: function dateValidator(value, dateFormat, dateTimeSeparator, message) {
    return domain.baseValidator(function () {
      var momentFormat = date.toMomentDateOrTimeOrTimestampPattern(dateFormat, dateTimeSeparator);
      return !moment(value, momentFormat, true).isValid() && !domain.attributesPattern.test(value);
    }, message);
  },
  unescapeTree: function unescapeTreeRecur(node) {
    if (node.hasChilds()) {
      _.each(node.childs, function (child) {
        unescapeTreeRecur(child);
      });
    }

    node.name = xssUtil.unescape(node.name);
  }
}; ///////////////////////////////////////////////////
// Copy/Move nodes
///////////////////////////////////////////////////
///////////////////////////////////////////////////
// Copy/Move nodes
///////////////////////////////////////////////////

domain.NodeCopyMoveController = function () {}; ////////////
// Public
////////////
// Copy nodes from source tree to specified node of destination tree
////////////
// Public
////////////
// Copy nodes from source tree to specified node of destination tree


domain.NodeCopyMoveController.addMethod('copy', function (nodes, destNode, duplicate) {
  if (nodes && nodes.length > 0 && destNode) {
    var destTree = dynamicTree.trees[destNode.getTreeId()];
    var copiedNodes = nodes.collect(function (node) {
      var nodeId = node.param.id;

      var copiedNodeStructure = this._copyParentStructure(node, destTree);

      if (copiedNodeStructure) {
        return this._mergeToDestTree(copiedNodeStructure, destNode, nodeId, duplicate);
      } else {
        return null;
      }
    }.bind(this));
    destNode.isloaded = true;
    return copiedNodes.without(null);
  }
}); // Copy selected nodes from source tree to specified node of destination tree
// Copy selected nodes from source tree to specified node of destination tree

domain.NodeCopyMoveController.addMethod('copySelected', function (nodes, destNode) {
  if (window.sourceTree && destNode) {
    return this.copy(window.sourceTree.selectedNodes, destNode);
  }
}); // Move nodes from source tree to specified node of destination tree
// Move nodes from source tree to specified node of destination tree

domain.NodeCopyMoveController.addMethod('move', function (nodes, destNode) {
  if (nodes && destNode) {
    var copies = this.copy(nodes, destNode);
    this.hide(nodes);
    return copies;
  }
}); // Move selected nodes from source tree to specified node of destination tree
// Move selected nodes from source tree to specified node of destination tree

domain.NodeCopyMoveController.addMethod('moveSelected', function (sourceTree, destNode) {
  if (sourceTree && destNode) {
    return this.move(sourceTree.selectedNodes, destNode);
  }
}); // Hide specified nodes from tree
// if getChildrenCount and hideNode functions are specified they will be used
// to perform appropriate actions, else default actions will be used
// Hide specified nodes from tree
// if getChildrenCount and hideNode functions are specified they will be used
// to perform appropriate actions, else default actions will be used

domain.NodeCopyMoveController.addMethod('hide', function (nodes, getChildrenCount, hideNode) {
  if (nodes && nodes.length > 0) {
    if (!getChildrenCount) {
      getChildrenCount = this._getVisibleChildrenCount;
    }

    if (!hideNode) {
      hideNode = function hideNode(node, hideChilds) {
        node.hide(hideChilds);
      };
    }

    var sourceTree = dynamicTree.trees[nodes[0].getTreeId()];
    nodes.collect(function (node) {
      return node.id;
    }).each(function (nodeId) {
      var node = dynamicTree.nodes[nodeId];
      hideNode(node, true);
      var parentNode = node.parent;

      while (parentNode && parentNode != sourceTree.getRootNode()) {
        if (getChildrenCount(parentNode) > 0) {
          break;
        } //parentNode.hide(false);
        //parentNode.hide(false);


        hideNode(parentNode, false);
        parentNode.refreshStyle();
        parentNode = parentNode.parent;
      }
    }.bind(this));
  }
}); ////////////
// Private
////////////
//Should be overwritten with actual implementation
////////////
// Private
////////////
//Should be overwritten with actual implementation

domain.NodeCopyMoveController.addMethod('_handleDuplicatedNode', function (node, existingParent) {
  return node.param.id;
});
domain.NodeCopyMoveController.addMethod('_markAsLoaded', function (node) {
  node.isloaded = true;

  if (node.isParent()) {
    node.childs.each(function (child) {
      this._markAsLoaded(child);
    }.bind(this));
  }
}); // Merge node structure created from sourceNode into destination tree
// Merge node structure created from sourceNode into destination tree

domain.NodeCopyMoveController.addMethod('_mergeToDestTree', function (node, existingParent, nodeId, duplicate) {
  if (!existingParent) {
    return;
  }

  var tree = dynamicTree.trees[existingParent.getTreeId()];

  if (duplicate) {
    nodeId = this._handleDuplicatedNode(node, existingParent);
    return tree.findNodeById(nodeId, node);
  }

  var existingNode = tree.findNodeChildByMetaName(existingParent, node.param.id);

  if (existingNode != null) {
    if (existingNode.isHidden()) {
      existingNode.show();
    }

    if (node.hasChilds()) {
      if (existingNode.disabled) {
        existingNode.enable(node.tooltip);
      }

      node.childs.each(function (child) {
        this._mergeToDestTree(child, existingNode);
      }.bind(this));
    }

    return tree.findNodeById(nodeId, existingNode);
  } else {
    existingParent.addChild(node);

    this._markAsLoaded(node);

    return tree.findNodeById(nodeId, node);
  }
}); // recreates the tree stucture from given node to the root, and copies this structure
// to the destination tree
// recreates the tree stucture from given node to the root, and copies this structure
// to the destination tree

domain.NodeCopyMoveController.addMethod('_copyParentStructure', function (sourceNode, destTree) {
  if (sourceNode && destTree) {
    var sourceTree = dynamicTree.trees[sourceNode.getTreeId()];
    if (sourceNode.disabled) return null;

    var destNode = this._copyNode(sourceNode, destTree, true);

    var sourceNodeParent = sourceNode.parent;
    var destParent = null;

    while (sourceNodeParent && sourceNodeParent != sourceTree.getRootNode()) {
      destParent = this._copyNode(sourceNodeParent, destTree, false);
      destParent.addChild(destNode);
      destNode = destParent;
      sourceNodeParent = sourceNodeParent.parent;
    }

    return destNode;
  }
}); //This is default implementation
//In some cases it should be redefined
//This is default implementation
//In some cases it should be redefined

domain.NodeCopyMoveController.addMethod('_buildMetanode', function (node) {
  return deepClone(node.param);
}); // Creates copy of node in destination tree,
// but do not insert it into the dest tree
// Creates copy of node in destination tree,
// but do not insert it into the dest tree

domain.NodeCopyMoveController.addMethod('_copyNode', function (sourceNode, destTree, copyChilds) {
  if (sourceNode && destTree) {
    var destNode = destTree.processNode(this._buildMetanode(sourceNode));

    if (!!copyChilds) {
      if (sourceNode.hasChilds()) {
        sourceNode.childs.each(function (child) {
          if (!child.disabled) {
            var child = this._copyNode(child, destTree, copyChilds);

            if (child) {
              destNode.addChild(child);
            }
          }
        }.bind(this));
      } else {
        destNode.setHasChilds(false);
      }
    }

    var disabledChilds = sourceNode.childs.findAll(function (child) {
      return child.disabled;
    });

    if (sourceNode.childs.length > 0 && disabledChilds.length == sourceNode.childs.length) {
      return null;
    }

    return destNode;
  }
}); // Delete selected nodes from source tree
// Delete selected nodes from source tree

domain.NodeCopyMoveController.addMethod('_delete', function (nodes) {
  if (nodes) {
    nodes.collect(function (node) {
      return node.id;
    }).each(function (nodeId) {
      var node = dynamicTree.nodes[nodeId];

      if (node) {
        node.parent.removeChild(node);
      }
    });
  }
}), // Return count of hidden child nodes of node
domain.NodeCopyMoveController.addMethod('_getVisibleChildrenCount', function (node) {
  var hidden = node.childs.findAll(function (child) {
    return child.isHidden();
  });
  return node.childs.length - hidden.length;
}); /////////////////////////////////
// Reset tree selection handler
/////////////////////////////////
/////////////////////////////////
// Reset tree selection handler
/////////////////////////////////

domain.resetTreeSelectionHandler = {
  _COMMON_ELEMENTS_TO_SAVE_SELECTION: ['#pageDimmer', '#detail', '#standardConfirm'],
  _getTrees: null,
  _elementIds: null,
  _callback: null,
  _validator: null,
  ////////////////////
  // Public
  ////////////////////
  init: function init(elementIds, getTrees, callback, validator) {
    domain.resetTreeSelectionHandler._init.bind(domain.resetTreeSelectionHandler, elementIds, getTrees, callback, validator)();
  },
  ////////////////////
  // Private
  ////////////////////
  _init: function _init(elementIds, getTrees, callback, validator) {
    this._getTrees = getTrees;
    this._callback = callback;
    this._validator = validator;
    this._elementIds = this._COMMON_ELEMENTS_TO_SAVE_SELECTION.concat(elementIds);
    domain.registerClickHandlers([this._removeTreeSelectionClickEventHandler.bind(this)], null, true);
  },
  _removeTreeSelectionClickEventHandler: function _removeTreeSelectionClickEventHandler(element) {
    if (!matchAny(element, this._elementIds, true)) {
      var atLeastOneItemSelected = false;

      this._getTrees().each(function (tree) {
        if (tree.selectedNodes && tree.selectedNodes.first()) {
          atLeastOneItemSelected = true;
          throw $break;
        }
      });

      if (!atLeastOneItemSelected) {
        return false;
      } else if (this._validator && !this._validator()) {
        //stop event handling if validation was not passed
        return true;
      }

      this._getTrees().each(function (tree) {
        tree._deselectAllNodes();
      });

      this._callback && this._callback(); //This is common handler so do not stop handling
      //This is common handler so do not stop handling

      return false;
    }
  }
}; ////////////////////////////////
// Change node order controller
////////////////////////////////
////////////////////////////////
// Change node order controller
////////////////////////////////

domain.NodeChangeOrderController = function () {};

domain.NodeChangeOrderController.addMethod('findNodeWithSpecificOrder', function (siblingNodes, order, selected) {
  for (var i = siblingNodes.length - 1; i >= 0; i--) {
    if (siblingNodes[i].isSelected() == selected && siblingNodes[i].orderNumber === order) {
      return siblingNodes[i];
    }
  }

  return null;
});
domain.NodeChangeOrderController.addMethod('findMaxSiblingNode', function (siblingNodes, selected, highest) {
  var order = null;
  var node = null;
  siblingNodes.each(function (siblingNode) {
    if (siblingNode.isSelected() == selected) {
      if (order === null || highest == siblingNode.orderNumber < order) {
        order = siblingNode.orderNumber;
        node = siblingNode;
      }
    }
  });
  return node;
});
domain.NodeChangeOrderController.addMethod('moveNode', function (node, upward, maxMove, updateNodeOrderNumberCallback) {
  var order = node.orderNumber;
  var siblings = node.parent.childs;
  var nodeToSwap = null;
  var newOrder = null;

  if (maxMove) {
    nodeToSwap = this.findMaxSiblingNode(siblings, false, upward, node.param.type);
    newOrder = nodeToSwap ? nodeToSwap.orderNumber : -1;
    siblings.each(function (sibling) {
      if (sibling.param.id !== node.param.id && (upward == sibling.orderNumber > newOrder && upward == sibling.orderNumber < order || sibling.orderNumber == newOrder)) {
        sibling.orderNumber = upward ? sibling.orderNumber + 1 : sibling.orderNumber - 1;
        updateNodeOrderNumberCallback && updateNodeOrderNumberCallback(sibling, sibling.orderNumber);
      }
    });
    updateNodeOrderNumberCallback && updateNodeOrderNumberCallback(node, newOrder);
    node.orderNumber = newOrder;
  } else {
    newOrder = upward ? node.orderNumber - 1 : node.orderNumber + 1;
    nodeToSwap = this.findNodeWithSpecificOrder(siblings, newOrder, false);

    if (nodeToSwap) {
      updateNodeOrderNumberCallback && updateNodeOrderNumberCallback(node, newOrder);
      updateNodeOrderNumberCallback && updateNodeOrderNumberCallback(nodeToSwap, order);
      node.orderNumber = newOrder;
      nodeToSwap.orderNumber = order;
    }
  }
});
domain.NodeChangeOrderController.addMethod('nodeAscSorter', function (a, b) {
  return a.orderNumber - b.orderNumber;
});
domain.NodeChangeOrderController.addMethod('nodeDescSorter', function (a, b) {
  return b.orderNumber - a.orderNumber;
}); ////////////////////////////////////////////////////////////
// Change order controller for Domain designer Display tab
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Change order controller for Domain designer Display tab
////////////////////////////////////////////////////////////

domain.DisplayNodeChangeOrderController = function () {
  domain.NodeChangeOrderController.call();
};

domain.DisplayNodeChangeOrderController.prototype = deepClone(domain.NodeChangeOrderController.prototype);
domain.DisplayNodeChangeOrderController.addMethod('findMaxSiblingNode', function (siblingNodes, selected, highest, nodeType) {
  var order = null;
  var node = null;
  siblingNodes.each(function (siblingNode) {
    if (siblingNode.isSelected() == selected) {
      if ((order === null || highest == siblingNode.orderNumber < order) && (nodeType ? siblingNode.param.type === nodeType : true)) {
        order = siblingNode.orderNumber;
        node = siblingNode;
      }
    }
  });
  return node;
});
module.exports = domain;

});