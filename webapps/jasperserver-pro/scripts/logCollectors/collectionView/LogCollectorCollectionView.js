define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!all");

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var request = require("request");

var Marionette = require('backbone.marionette');

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var collectorStatusEnum = require('../enum/collectorStatusEnum');

var LogCollectorView = require('../view/LogCollectorView');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var LogCollectorsListTemplate = require("text!../templates/LogCollectorsList.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Marionette.CollectionView.extend({
  initialize: function initialize(models, options) {
    this.options = options;
    this.setElement(_.template(LogCollectorsListTemplate, {
      i18n: i18n
    }));
    this.$collectors = this.$el.find('[name=collectors]');
    this.$nothingToDisplay = this.$el.find('[name=nothingToDisplay]');
    this.ui = {};
    this.ui.createNewButton = this.$el.find('[name=createNewBtn]');
    this.ui.stopAllButton = this.$el.find('[name=stopAllBtn]');
    this.ui.deleteAllButton = this.$el.find('[name=deleteAllBtn]'); // assign listeners to the control buttons
    // assign listeners to the control buttons

    this.ui.createNewButton.on('click', _.bind(this.createNewLogCollector, this));
    this.ui.stopAllButton.on('click', _.bind(this.confirmStopAll, this));
    this.ui.deleteAllButton.on('click', _.bind(this.confirmDeleteAll, this));
    this.views = [];
  },
  getErrorDialog: function getErrorDialog() {
    return this.errorDialog ? this.errorDialog : this.errorDialog = new AlertDialog();
  },
  // dirty hack because of our javascript hovering library which does not track case when
  // mouse went from button
  removeOverClassOnButtons: function removeOverClassOnButtons() {
    this.$el.find('button').removeClass('over');
  },
  parse: function parse(model) {
    var list = model.CollectorSettingsList;
    list = _.sortBy(list, function (collector) {
      return collector.name;
    });
    return list;
  },
  showServerCommunicationError: function showServerCommunicationError() {
    var errorDialog = this.getErrorDialog();
    errorDialog.setMessage(i18n['logCollectors.alert.server.communication.error']);
    errorDialog.open();
  },
  appendNewlyCreatedLogCollector: function appendNewlyCreatedLogCollector(createdModel) {
    // take a look at this ticket: http://bugzilla.jaspersoft.com/show_bug.cgi?id=45013
    // QAA asks to add new log collector into the list of log collectors right after
    // it has been added on server side.
    var view = this._buildViewFromModel(createdModel); // and add this view into the list of views
    // and add this view into the list of views


    this.views.push(view); // then render it
    // then render it

    view.render(); // and append it's view to the container of collectors
    // and append it's view to the container of collectors

    this.$collectors.append(view.$el); // next, adjust buttons and "nothing to display"
    // next, adjust buttons and "nothing to display"

    this._reRenderAllButtons();

    this._reRenderNothingToDisplay();
  },
  refreshListOfCollectors: function refreshListOfCollectors() {
    var self = this,
        dfr = new $.Deferred();
    request({
      type: 'GET',
      url: jrsConfigs.contextPath + '/rest_v2/diagnostic/collectors',
      cache: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).done(function (model) {
      // now, parse what has came from server
      model = model ? self.parse(model) : [];

      self._refreshListOfCollectorsDone(model);

      dfr.resolve();
    }).fail(function (error) {
      if (error.status === 404) {
        // it's a normal response, it means "there is no any log collector"
        self._refreshListOfCollectorsDone([]);

        dfr.resolve();
        return;
      }

      dfr.reject();
      self.showServerCommunicationError();
    });
    return dfr;
  },
  _refreshListOfCollectorsDone: function _refreshListOfCollectorsDone(models) {
    var self = this; // if anything exists in DOM, let's remove it
    // if anything exists in DOM, let's remove it

    this.removeCollectorsFromDOM(); // and clear the list of views
    // and clear the list of views

    this.views = []; // now, create a view for each of collector's model
    // now, create a view for each of collector's model

    _.each(models, function (collectorModelFromServer) {
      var view = self._buildViewFromModel(collectorModelFromServer); // and add this view into the list of views
      // and add this view into the list of views


      self.views.push(view); // then render it
      // then render it

      view.render(); // and append it's view to the container of collectors
      // and append it's view to the container of collectors

      self.$collectors.append(view.$el);
    }); // next, adjust buttons and "nothing to display"
    // next, adjust buttons and "nothing to display"


    this._reRenderAllButtons();

    this._reRenderNothingToDisplay();
  },
  _buildViewFromModel: function _buildViewFromModel(collectorModelFromServer) {
    var view = new LogCollectorView({
      collectorModelFromServer: collectorModelFromServer
    }); // register actions on different view events
    // register actions on different view events

    this.listenTo(view, 'removed', this.onCollectorViewRemoved);
    this.listenTo(view, 'modelStatusChange', this._reRenderAllButtons);
    this.listenTo(view, 'stopped', this._reRenderAllButtons);
    return view;
  },
  triggerButtons: function triggerButtons(state, buttons) {
    if (buttons === 'all') {
      buttons = ['stopAll', 'deleteAll'];
    }

    for (var i = 0, button; i < buttons.length; i++) {
      button = buttons[i];

      switch (button) {
        case 'stopAll':
          button = this.ui.stopAllButton;
          break;

        case 'deleteAll':
          button = this.ui.deleteAllButton;
          break;

        default:
          return;
      }

      if (state) {
        button.removeAttr('disabled');
      } else {
        button.attr('disabled', 'true');
      }
    }
  },
  createNewLogCollector: function createNewLogCollector() {
    this.trigger('createNewCollectorClick');
  },
  confirmStopAll: function confirmStopAll() {
    if (this.views.length === 0) {
      return;
    }

    var text = i18n['logCollectors.confirm.stopAll'].replace('{newline}', '<br/><br/>');
    var dialog = new ConfirmationDialog({
      title: i18n['logCollectors.confirm.title'],
      text: text
    });
    this.listenTo(dialog, 'button:yes', this.stopAll);
    dialog.open();
  },
  stopAll: function stopAll() {
    var self = this;
    var data = JSON.stringify({
      version: 0,
      patch: [{
        field: 'status',
        value: collectorStatusEnum.STOPPED
      }]
    });

    _.each(this.views, function (view) {
      if (view.model.isInRunningMode()) {
        // now, silently set the correct status to avoid triggering events which will trigger a lot of logic
        view.model.set({
          status: collectorStatusEnum.SHUTTING_DOWN
        }, {
          silent: true
        }); // after this, update the status on UI of this job, nothing else !
        // after this, update the status on UI of this job, nothing else !

        view.updateUI({
          status: collectorStatusEnum.SHUTTING_DOWN
        });
      }
    });

    this.triggerButtons(false, 'all');
    request({
      type: 'PATCH',
      url: jrsConfigs.contextPath + '/rest_v2/diagnostic/collectors/',
      cache: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      },
      data: data
    }).always(function () {
      self.triggerButtons(true, 'all');
    }).done(function () {
      // we do refresh list of collectors from server because
      // server may shutdown collectors asynchronously: you may see how
      // each log collector one by one get's stopped
      self.refreshListOfCollectors();
    }).fail(function () {
      self.showServerCommunicationError();
    });
  },
  confirmDeleteAll: function confirmDeleteAll() {
    if (this.views.length === 0) {
      // nothing to remove, nothing to do
      return;
    }

    var text = i18n['logCollectors.confirm.deleteAll'].replace('{newline}', '<br><br>');
    var dialog = new ConfirmationDialog({
      title: i18n['logCollectors.confirm.title'],
      text: text
    });
    this.listenTo(dialog, 'button:yes', this.deleteAll);
    dialog.open();
  },
  deleteAll: function deleteAll() {
    var self = this;
    self.triggerButtons(false, 'all');
    request({
      type: 'DELETE',
      url: jrsConfigs.contextPath + '/rest_v2/diagnostic/collectors',
      cache: false,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).always(function () {
      self.triggerButtons(true, 'all');
    }).done(function () {
      self.removeCollectorsFromDOM();
      self.views = [];

      self._reRenderAllButtons();

      self._reRenderNothingToDisplay();
    }).fail(function () {
      self.showServerCommunicationError();
    });
  },
  // this method empties the collection list from the DOM
  removeCollectorsFromDOM: function removeCollectorsFromDOM() {
    // first, remove all views from DOM
    _.each(this.views, function (view) {
      view.$el.detach();
    });
  },
  onCollectorViewRemoved: function onCollectorViewRemoved(id) {
    // at this moment collector already removed himself from the DOM
    // so what we need to do is just remove his from our registry and adjust buttons
    // and maybe to display "nothing to display" message
    this.views = _.filter(this.views, function (view) {
      return view.model.get('id') !== id;
    }, this);

    this._reRenderAllButtons();

    this._reRenderNothingToDisplay();
  },
  _reRenderNothingToDisplay: function _reRenderNothingToDisplay() {
    this.$nothingToDisplay.addClass('hidden');

    if (this.views.length === 0) {
      this.$nothingToDisplay.removeClass('hidden');
    }
  },
  _reRenderAllButtons: function _reRenderAllButtons() {
    var hasRunningCollectors = false;
    var hasShuttingDownCollectors = false;
    this.ui.stopAllButton.attr('disabled', 'true');
    this.ui.deleteAllButton.attr('disabled', 'true');

    _.each(this.views, function (view) {
      if (view.model.isInRunningMode()) {
        hasRunningCollectors = true;
      }

      if (view.model.isInShuttingDownMode()) {
        hasShuttingDownCollectors = true;
      }
    });

    if (hasRunningCollectors && !hasShuttingDownCollectors) {
      this.ui.stopAllButton.removeAttr('disabled');
    }

    if (this.views.length > 0 && !hasShuttingDownCollectors) {
      this.ui.deleteAllButton.removeAttr('disabled');
    }
  }
});

});