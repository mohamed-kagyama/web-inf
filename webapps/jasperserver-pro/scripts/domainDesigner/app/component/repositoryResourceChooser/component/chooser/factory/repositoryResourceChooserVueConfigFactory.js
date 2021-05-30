define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var popoverDirective = require("../../../../../common/component/popover/directive/popoverDirective");

var scrollToPositionDirective = require("../../../../../common/vue/directive/scrollToPositionDirective");

var repositoryResourceChooserSearchResultModeEnum = require('../enum/repositoryResourceChooserSearchResultModeEnum');

var repositoryResourceChooserDialogUtil = require("../util/repositoryResourceChooserDialogUtil");

var template = require("text!../template/repositoryResourceChooserTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var RepositoryTree = options.RepositoryTree,
        ResourcesList = options.ResourcesList;
    return {
      components: {
        repositoryTree: RepositoryTree,
        resourcesList: ResourcesList
      },
      template: options.template || template,
      directives: {
        popover: popoverDirective,
        scrollTo: scrollToPositionDirective
      },
      mixins: options.mixins || {},
      computed: _.extend({
        isTreeMode: function isTreeMode() {
          return repositoryResourceChooserDialogUtil.isRepositoryTreeMode(this.searchResultMode);
        },
        isListMode: function isListMode() {
          return repositoryResourceChooserDialogUtil.isResourcesListMode(this.searchResultMode);
        }
      }, i18nComputed),
      data: function data() {
        return {
          _searchKeyword: ''
        };
      },
      props: ['repositoryTree', 'resourcesList', 'searchKeyword', 'searchResultMode', 'popover'],
      methods: {
        onRepositoryTreeDoubleClick: function onRepositoryTreeDoubleClick(treeNode) {
          this.$emit('repositoryTreeDoubleClick', treeNode);
        },
        onResourcesListDoubleClick: function onResourcesListDoubleClick(treeNode) {
          this.$emit('resourcesListDoubleClick', treeNode);
        },
        onRepositoryTreeSelect: function onRepositoryTreeSelect(treeNode) {
          this.$emit('treeSelect', treeNode);
        },
        onResourcesListSelect: function onResourcesListSelect(treeNode) {
          this.$emit('listSelect', treeNode);
        },
        onRepositoryTreeToggle: function onRepositoryTreeToggle(treeNode) {
          this.$emit('toggle', treeNode);
        },
        onCloseErrorPopover: function onCloseErrorPopover() {
          this.$emit('closeErrorPopover');
        },
        setSearchKeyword: function setSearchKeyword(event) {
          this._searchKeyword = event.target.value;
        },
        submitSearchKeyword: function submitSearchKeyword() {
          this.$emit('submitSearchKeyword', this._searchKeyword);
        },
        toggleSearchResultModeToTree: function toggleSearchResultModeToTree() {
          this.$emit('toggleSearchResultMode', repositoryResourceChooserSearchResultModeEnum.TREE);
        },
        toggleSearchResultModeToList: function toggleSearchResultModeToList() {
          this.$emit('toggleSearchResultMode', repositoryResourceChooserSearchResultModeEnum.LIST);
        },
        resetSearchKeyword: function resetSearchKeyword() {
          this.$emit('resetSearchKeyword');
        }
      },
      updated: function updated() {
        this._searchKeyword = this.searchKeyword;
      }
    };
  }
};

});