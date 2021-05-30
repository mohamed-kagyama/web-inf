define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _baseExpandableBlock = require('./base/ExpandableBlock');

var ExpandableBlockComponent = _baseExpandableBlock.ExpandableBlock;

var _baseExternalResourceLink = require('./base/ExternalResourceLink');

var ExternalResourceLinkComponent = _baseExternalResourceLink.ExternalResourceLink;

var _baseResourceLinkWithTooltip = require('./base/ResourceLinkWithTooltip');

var ResourceLinkWithTooltipComponent = _baseResourceLinkWithTooltip.ResourceLinkWithTooltip;

var _WorkflowsCategory = require('./WorkflowsCategory');

var WorkflowsCategoryComponent = _WorkflowsCategory.WorkflowsCategory;

var _Workflow = require('./Workflow');

var WorkflowComponent = _Workflow.Workflow;

var i18n = require("bundle!HomeBundle");

var expandableBlockEnum = require('../types/expandableBlockEnum');

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function getExpandedBlockContent(ResourceLink, ExternalResourceLink, block) {
  var map;

  if (block.id === expandableBlockEnum.RECENT_ITEMS) {
    var noItemsMessage = i18n['recently.viewed.nothing.display'];

    if (block.items.length === 0) {
      return React.createElement("div", {
        className: "message-nothing-display",
        "aria-label": "".concat(noItemsMessage)
      }, noItemsMessage);
    }

    map = function map(item) {
      return React.createElement(ResourceLink, _extends({
        key: item.url
      }, item));
    };
  } else {
    map = function map(item) {
      return React.createElement(ExternalResourceLink, _extends({
        key: item.url
      }, item));
    };
  }

  return block.items.map(map);
}

var createHome = function createHome(ExpandableBlock, ExternalResourceLink, ResourceLink, WorkflowsCategory, Workflow) {
  return function Home(props) {
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: "homeSidebar"
    }, props.sidebarBlocks.map(function (block) {
      return React.createElement(ExpandableBlock, {
        key: block.id,
        title: block.title,
        isExpanded: block.isExpanded,
        onClick: function onClick(isExpanded) {
          props.onGroupExpand(isExpanded, block.id);
        }
      }, getExpandedBlockContent(ResourceLink, ExternalResourceLink, block));
    })), React.createElement("div", {
      className: "homeMain"
    }, props.workflows.map(function (workflowCategory) {
      return React.createElement(WorkflowsCategory, {
        key: workflowCategory.title,
        title: workflowCategory.title,
        categoryClass: workflowCategory.categoryClass
      }, workflowCategory.items.map(function (item) {
        return React.createElement(Workflow, _extends({
          key: item.title
        }, item, {
          onPrimaryActionClick: props.onWorkflowPrimaryActionClick,
          onSecondaryActionClick: props.onWorkflowSecondaryActionClick
        }));
      }));
    })));
  };
};

var Home = createHome(ExpandableBlockComponent, ExternalResourceLinkComponent, ResourceLinkWithTooltipComponent, WorkflowsCategoryComponent, WorkflowComponent);
exports.createHome = createHome;
exports.Home = Home;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});