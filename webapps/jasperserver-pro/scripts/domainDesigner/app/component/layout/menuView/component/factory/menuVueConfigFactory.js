define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/menuVueTemplate.htm");

var menuEventsEnum = require("../../enum/menuEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var menuEventBus = options.menuEventBus,
        exportJSON = options.exportJSON,
        hoverMenuDirective = options.hoverMenuDirective,
        saveMenuOptionsFactory = options.saveMenuOptionsFactory,
        exportSchemaMenuOptionsFactory = options.exportSchemaMenuOptionsFactory;
    return {
      template: template,
      data: function data() {
        return options.data;
      },
      directives: {
        hoverMenu: hoverMenuDirective
      },
      computed: {
        isUndoDisabled: function isUndoDisabled() {
          return !this.undo;
        },
        isRedoDisabled: function isRedoDisabled() {
          return !this.redo;
        },
        isSaveDisabled: function isSaveDisabled() {
          return !this.isSaveEnabled;
        },
        saveMenuOptions: function saveMenuOptions() {
          return saveMenuOptionsFactory.create();
        },
        exportSchemaMenuOptions: function exportSchemaMenuOptions() {
          return exportSchemaMenuOptionsFactory.create();
        },
        isJsonExportEnabled: function isJsonExportEnabled() {
          return exportJSON;
        },
        isExportSchemaDisabled: function isExportSchemaDisabled() {
          return this.isSaveDisabled;
        }
      },
      methods: {
        _moveFocusOut: function _moveFocusOut(event) {
          event.currentTarget.blur();
        },
        onClick: function onClick(event) {
          this._moveFocusOut(event);
        },
        onUndo: function onUndo(event) {
          menuEventBus.trigger('undo');

          this._moveFocusOut(event);
        },
        onRedo: function onRedo(event) {
          menuEventBus.trigger('redo');

          this._moveFocusOut(event);
        },
        onUndoAll: function onUndoAll(event) {
          menuEventBus.trigger('undo:all');

          this._moveFocusOut(event);
        },
        onExportXML: function onExportXML(event) {
          menuEventBus.trigger(menuEventsEnum.DOWNLOAD_SCHEMA_XML);

          this._moveFocusOut(event);
        },
        onImport: function onImport(event) {
          menuEventBus.trigger('uploadSchema');

          this._moveFocusOut(event);
        }
      }
    };
  }
};

});