define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!all");

var Backbone = require('backbone');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var Validation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var collectorStatusEnum = require('../enum/collectorStatusEnum');

var LogCollectorModel = require('../model/LogCollectorModel');

var ConfirmationDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/ConfirmationDialog");

var logCollectorTemplate = require("text!../templates/logCollector.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  events: {
    'keyup input, textarea, select': 'updateModelProperty',
    'change input, textarea, select': 'updateModelProperty',
    'change [name=verbosity]': 'verbosityChange',
    'click [name=stopIcon]': 'stopIconClick',
    'click [name=downloadIcon]': 'downloadIconClick',
    'click [name=deleteIcon]': 'deleteIconClick'
  },
  constructor: function constructor(options) {
    // since the options object will be changed, we need to make the copy of it
    var args = $.extend(true, [], arguments);
    options = $.extend(true, {}, options);
    args[0] = options;
    Backbone.View.apply(this, args);
  },
  initialize: function initialize(options) {
    this.options = options;
    this._updatingModeData = {
      inProgress: false,
      timeoutHandler: false,
      startTimestamp: 0,
      updateNumber: 0,
      secondsToWaitForShutdown: 5 * 60
    };
    this.model = new LogCollectorModel(options.collectorModelFromServer, _.extend({}, options, {
      parse: true
    }));
    Validation.bind(this, {
      valid: this.fieldIsValid,
      invalid: this.fieldIsInvalid,
      forceUpdate: true,
      selector: 'name'
    });
    this.listenTo(this.model, 'change:verbosity change:status', this.updateUI);
    this.listenTo(this.model, 'change:status', this.statusChange);
    this.listenTo(this.model, 'server_communication_error', this.showServerCommunicationError); // launch the update process is the job is in shutting down mode
    // launch the update process is the job is in shutting down mode

    if (this.model.isInShuttingDownMode()) {
      this._startUpdateProcess();
    }
  },
  getErrorDialog: function getErrorDialog() {
    return this.errorDialog ? this.errorDialog : this.errorDialog = new AlertDialog();
  },
  updateModelProperty: function updateModelProperty(e) {
    var $targetEl = $(e.target),
        update = {},
        attr = $targetEl.attr('realName') || $targetEl.attr('name');
    update[attr] = 'checkbox' === $targetEl.attr('type') ? $targetEl.is(':checked') : $.trim($targetEl.val());
    this.model.set(update);
    this.model.validate(update);
  },
  render: function render() {
    this.setElement(_.template(logCollectorTemplate, _.extend({}, this.model.attributes, {
      i18n: i18n,
      collectorStatusEnum: collectorStatusEnum
    })));
    return this;
  },
  updateUI: function updateUI(extraModelAttributes) {
    this.undelegateEvents();

    var model = _.extend({}, this.model.attributes, {
      i18n: i18n,
      collectorStatusEnum: collectorStatusEnum
    });

    if (extraModelAttributes) {
      model = _.extend(model, extraModelAttributes);
    }

    var newView = $(_.template(logCollectorTemplate, model));
    this.$el.find('[name=verbosity]').replaceWith(newView.find('[name=verbosity]'));
    this.$el.find('[name=status]').replaceWith(newView.find('[name=status]')); // we can't use replaceWith method here because it causes error in IE11 (see 44721)
    // we can't use replaceWith method here because it causes error in IE11 (see 44721)

    this.$el.find('[name=icons]').children().remove();
    this.$el.find('[name=icons]').append(newView.find('[name=icons]').children());
    this.$el.attr('status', this.model.get('status').toLowerCase());
    this.delegateEvents();
  },
  fieldIsValid: function fieldIsValid(view, attr, selector) {
    var $parentEl = view.$('[' + selector + '="' + attr + '"]').parent();
    $parentEl.removeClass('error');
    $parentEl.find('.message.warning').text('');
  },
  fieldIsInvalid: function fieldIsInvalid(view, attr, error, selector) {
    if (error === true) {
      // don't show anything since this type of error is used when you need to
      // mark model as invalid and at the same time don't show any error message
      return;
    }

    var $parentEl = view.$('[' + selector + '="' + attr + '"]').parent();
    $parentEl.addClass('error');
    $parentEl.find('.message.warning').text(error);
  },
  verbosityChange: function verbosityChange() {
    var self = this;
    this.model.save().fail(function () {
      self.showServerCommunicationError();
    });
  },
  statusChange: function statusChange() {
    this.trigger('modelStatusChange');
  },
  showServerCommunicationError: function showServerCommunicationError() {
    var errorDialog = this.getErrorDialog();
    errorDialog.setMessage(i18n['logCollectors.alert.server.communication.error']);
    errorDialog.open();
  },
  _startUpdateProcess: function _startUpdateProcess() {
    if (this._updatingModeData.inProgress === true) {
      return;
    }

    this._updatingModeData.inProgress = true;
    this._updatingModeData.startTimestamp = Math.floor(new Date().getTime() / 1000);
    this._updatingModeData.updateNumber = 0;

    this._scheduleModelUpdate();
  },
  _scheduleModelUpdate: function _scheduleModelUpdate() {
    // increase the update number
    this._updatingModeData.updateNumber++; // usually we update each 5 seconds, but for the first 5 updates we do this each second
    // usually we update each 5 seconds, but for the first 5 updates we do this each second

    var nextUpdateIn = 5;

    if (this._updatingModeData.updateNumber < 5) {
      nextUpdateIn = 1;
    }

    this._updatingModeData.timeoutHandler = setTimeout(_.bind(this.updateItsModelFromServer, this), nextUpdateIn * 1000);
  },
  _stopUpdateProcess: function _stopUpdateProcess() {
    if (this._updatingModeData.inProgress === false) {
      return;
    }

    clearTimeout(this._updatingModeData.timeoutHandler);
    this._updatingModeData.timeoutHandler = false;
    this._updatingModeData.updateNumber = 0;
    this._updatingModeData.inProgress = false;
  },
  updateItsModelFromServer: function updateItsModelFromServer() {
    this.model.fetch().done(_.bind(function () {
      if (this.model.isInShuttingDownMode()) {
        var currentTimestamp = Math.floor(new Date().getTime() / 1000);

        if (currentTimestamp - this._updatingModeData.startTimestamp > this._updatingModeData.secondsToWaitForShutdown) {
          this._stopUpdateProcess();

          return;
        }

        this._scheduleModelUpdate();
      } else {
        this._stopUpdateProcess();

        this.trigger('stopped');
      }
    }, this)).fail(_.bind(function () {
      // we got some error.... weird.
      // ok, we can't show any error to user because it's an hidden update
      // what we'll do is just silently disable auto-updating
      this._stopUpdateProcess();
    }, this));
  },
  stopIconClick: function stopIconClick() {
    if (this.model.isInRunningMode()) {
      var self = this,
          dfr = this.model.sendStopSignal();

      if (!dfr) {
        return;
      } // set the "SHUTTING_DOWN" status to show it on UI
      // set the "SHUTTING_DOWN" status to show it on UI


      this.model.set({
        status: collectorStatusEnum.SHUTTING_DOWN
      });
      dfr.fail(function () {
        self.showServerCommunicationError();
      }).done(function () {
        self._startUpdateProcess();
      });
    }
  },
  downloadIconClick: function downloadIconClick() {
    if (this.model.isInStoppedMode()) {
      var downloadUrl = jrsConfigs.contextPath + '/rest_v2/diagnostic/collectors/' + this.model.get('id') + '/content';
      var iframe = document.createElement('iframe');
      iframe.src = downloadUrl;
      iframe.style.display = 'none';
      $(iframe).on('load', _.bind(this._onDownloadIframeLoad, this, iframe));
      $('body').append(iframe);
    }
  },
  _onDownloadIframeLoad: function _onDownloadIframeLoad(iframe) {
    if (iframe.contentWindow || iframe.contentDocument) {
      var frameDoc = (iframe.contentWindow || iframe.contentDocument).document; // if we found some tags (error tag in modern browsers or body in IE8), it means
      // we faced an error
      // if we found some tags (error tag in modern browsers or body in IE8), it means
      // we faced an error

      var showError = false;

      if (frameDoc.getElementsByTagName('errorDescriptor').length > 0) {
        showError = true;
      }

      if ($('body > *', frameDoc).length > 0) {
        showError = true;
      }

      if (showError === true) {
        this.showServerCommunicationError();
      }
    } else {
      setTimeout(function () {
        _.bind(this._onDownloadIframeLoad, this, iframe);
      }, 1000);
    }
  },
  deleteIconClick: function deleteIconClick() {
    if (this.model.isInShuttingDownMode()) {
      return;
    }

    var self = this;
    var text = i18n['logCollectors.confirm.deleteOne'].replace('{name}', this.model.get('name')).replace('{newline}', '<br><br>');
    var dialog = new ConfirmationDialog({
      title: i18n['logCollectors.confirm.title'],
      text: text
    });
    this.listenTo(dialog, 'button:yes', function () {
      self.model.destroy({
        dataType: 'text'
      }).done(function () {
        self.remove();
        self.trigger('removed', self.model.get('id'));
      }).fail(function () {
        self.showServerCommunicationError();
      });
    });
    dialog.open();
  }
});

});