define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var HoverMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");

var i18n = require("bundle!DashboardBundle");

var baseToolbarTemplate = require("text!../../template/toolbarTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  el: _.template(baseToolbarTemplate, {
    i18n: i18n
  }),
  events: {
    'click #undo': 'runUndo',
    'click #undoAll': 'runUndoAll',
    'click #redo': 'runRedo',
    'click #filterPopup': 'toggleFilterPopupDialog',
    'click #back': 'goBack'
  },
  initialize: function initialize() {
    this.exportMenu = new HoverMenu([{
      label: 'PNG',
      action: 'png'
    }, {
      label: 'PDF',
      action: 'pdf'
    }, {
      label: 'DOCX',
      action: 'docx'
    }, {
      label: 'ODT',
      action: 'odt'
    }, {
      label: 'PPTX',
      action: 'pptx'
    }], this.$('#export'));
    this.listenTo(this.exportMenu, 'all', function (name) {
      if (name.indexOf('option:') === 0) {
        this.exportMenu.hide();
        this.exportDashboard(name.substring('option:'.length));
      }
    }, this);
    this.filterPopupIsVisible = false;
    this.listenTo(this, 'filterButtonStyle:open', this.openFilterPopupDialog);
    this.listenTo(this, 'filterButtonStyle:close', this.closeFilterPopupDialog);
    this.setVisibility({
      back: /dashboard\/viewer/.test(window.location.href) && /_ddHyperlink=\d+/.test(window.location.href) && !/noReturn=true/.test(window.location.href)
    });
  },
  remove: function remove() {
    this.exportMenu.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  },
  setTitle: function setTitle(title) {
    this.$('.header .title').text(title);
  },
  toggleFilterPopupDialog: function toggleFilterPopupDialog() {
    this.trigger('button:filterPopup');

    if (this.filterPopupIsVisible) {
      this.closeFilterPopupDialog();
    } else {
      this.openFilterPopupDialog();
    }
  },
  goBack: function goBack() {
    this.trigger('button:back');
  },
  openFilterPopupDialog: function openFilterPopupDialog() {
    this.$('#filterPopup').addClass('pressed').addClass('down');
    this.filterPopupIsVisible = true;
  },
  closeFilterPopupDialog: function closeFilterPopupDialog() {
    this.$('#filterPopup').removeClass('pressed').removeClass('down');
    this.filterPopupIsVisible = false;
  },
  setVisibility: function setVisibility(buttons) {
    var self = this;

    _.each(_.keys(buttons), function (key) {
      var button = self.$('#' + key),
          separator = button.parent().prev();
      button[buttons[key] ? 'removeClass' : 'addClass']('hidden');

      if (separator.hasClass('separator')) {
        separator[buttons[key] ? 'show' : 'hide']();
      }
    });
  },
  setEnabled: function setEnabled(buttons) {
    var self = this;

    _.each(_.keys(buttons), function (key) {
      if (buttons[key]) {
        self.$('#' + key).attr('disabled', false);
      } else {
        self.$('#' + key).removeClass('over').attr('disabled', true);
      }
    });
  },
  exportDashboard: function exportDashboard(type) {
    this.trigger('button:export', type);
  },
  runUndo: function runUndo() {
    this.trigger('button:undo');
  },
  runUndoAll: function runUndoAll() {
    this.trigger('button:undoAll');
  },
  runRedo: function runRedo() {
    this.trigger('button:redo');
  }
});

});