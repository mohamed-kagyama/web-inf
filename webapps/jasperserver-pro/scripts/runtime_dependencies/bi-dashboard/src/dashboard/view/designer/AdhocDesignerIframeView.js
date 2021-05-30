define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var $ = require('jquery');

var dashboardSettings = require('../../dashboardSettings');

var DashboardComponentModel = require('../../model/component/DashboardComponentModel');

var adhocDesignerIframeTemplate = require("text!../../template/adhocDesignerIframeTemplate.htm");

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var ResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var AddDashboardComponentDialogController = require('../../view/designer/AddDashboardComponentDialogController');

var dashboardMessageBus = require('../../dashboardMessageBus');

var dashboardMessageBusEvents = require('../../enum/dashboardMessageBusEvents');

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDialogModel = ResourceModel.extend({
  initialize: function initialize(atts, options) {
    options || (options = {});

    this.constructor.__super__.initialize.apply(this, arguments);

    this.set('label', '');

    if (this.get('type') === 'ichart' || this.get('type') === 'olap_ichart') {
      this.set('type', dashboardComponentTypes.CHART);
    } else if (this.get('type') === 'olap_crosstab') {
      this.set('type', dashboardComponentTypes.CROSSTAB);
    }

    this.collection = options.dashletCollection;
    this.validation.label = DashboardComponentModel.prototype.validation.name;
  }
});
module.exports = Backbone.View.extend({
  el: _.template(adhocDesignerIframeTemplate),
  events: {
    'load': '_onIframeLoad'
  },
  initialize: function initialize() {
    _.bindAll(this, '_onWindowResize', '_onDesignerCancel', '_onDesignerSave');

    $(window).on('resize', this._onWindowResize);
  },
  render: function render() {
    var body = $('body');

    var bannerHeight = this._getBannerSize();

    this._addDimmer();

    body.append(this.$el);
    this.$el.attr('src', this.model.getDesignerUri()).css({
      'top': bannerHeight + 'px',
      'height': body.find('> #frame').height() - bannerHeight + 'px',
      'width': body.width() - dashboardSettings.DASHBOARD_ADHOC_IFRAME_MARGIN * 2,
      'background-color': body.css('background-color'),
      'z-index': dashboardSettings.DASHBOARD_ADHOC_IFRAME_Z_INDEX
    }).show();
    return this;
  },
  _onIframeLoad: function _onIframeLoad() {
    // Check if we were redirected to login page. This may happen for example if session got expired.
    // In this case we will close iframe for now.
    var frame = this._getFrame();

    if (frame.location.href.indexOf('login.html') > -1) {
      //We should not deal with session expiration here
      //so just triggering dashboard wide event
      dashboardMessageBus.trigger(dashboardMessageBusEvents.SESSION_EXPIRED);
    } else {
      var self = this;

      if (frame && frame.jQuery) {
        this._attachEventHandlers(frame);
      } else {
        var attachEventHandlersInterval = setInterval(function () {
          if (frame && frame.jQuery) {
            clearInterval(attachEventHandlersInterval);

            self._attachEventHandlers(frame);
          }
        }, 500);
      }
    }
  },
  _attachEventHandlers: function _attachEventHandlers(frame) {
    var $iframeDocument = frame.jQuery(frame.document);
    $iframeDocument.off('adhocDesigner:cancel errorPage:close').on('adhocDesigner:cancel errorPage:close', this._onDesignerCancel);
    $iframeDocument.off('adhocDesigner:save').on('adhocDesigner:save', $.proxy(this._onConfirmDesignerSave, this));
    $iframeDocument.off('adhocDesigner:saved').on('adhocDesigner:saved', $.proxy(this._onDesignerSave, this));
    $iframeDocument.off('adhocDesigner:notification').on('adhocDesigner:notification', $.proxy(this._onDesignerNotification, this));
  },
  _onDesignerCancel: function _onDesignerCancel(ev, meta) {
    this.trigger('close', this);

    this._hideDimmer();
  },
  _onDesignerNotification: function _onDesignerNotification(e, message, duration) {
    this.notification = this.notification ? this.notification : new Notification();
    this.notification.show({
      message: message,
      delay: duration,
      type: 'success'
    });
  },
  _hideDimmer: function _hideDimmer() {
    this.$dimmer.addClass('hidden').hide();
  },
  _addDimmer: function _addDimmer() {
    if (!$('.dashboard.dimmer').length) {
      this.$dimmer = $('<div class=\'dashboard dimmer hidden\' style=\'z-index:' + dashboardSettings.DASHBOARD_DIMMER_Z_INDEX + '; display: none;\'></div>');
      $('body').append(this.$dimmer);
    } else {
      !this.$dimmer && (this.$dimmer = $('.dashboard.dimmer'));
    }

    var iframeZIndex = parseInt(this.$el.css('zIndex'));
    iframeZIndex > 0 && this.$dimmer.css('zIndex', iframeZIndex - 1);
    this.$dimmer.removeClass('hidden').show();
  },
  _onDesignerSave: function _onDesignerSave(ev, meta) {
    meta.label = this.model.get('name');
    this.trigger('save', this, meta);
  },
  _onConfirmDesignerSave: function _onConfirmDesignerSave(ev, meta) {
    if (this.model.isNew()) {
      var model = new SaveDialogModel(meta, {
        dashletCollection: this.model.collection
      });
      this.addComponentDialogController = new AddDashboardComponentDialogController(model, {
        okButtonLabel: 'button.save',
        okButtonDisabled: true,
        overElement: this.$el
      });
      this.addComponentDialogController.dialog.open();
      this.listenTo(this.addComponentDialogController.dialog, 'button:ok', function () {
        if (model.isValid()) {
          this.model.set('name', model.get('label')); //meta.label = model.get("label");
          //meta.label = model.get("label");

          this._postMessageToDesigner('adhocDesigner:save');

          this.addComponentDialogController.closeAndRemove();
        }
      }, this);
      this.listenTo(this.addComponentDialogController.dialog, 'button:cancel', function () {
        this.addComponentDialogController.dialog.close();

        this._addDimmer();
      }, this);
    } else {
      this._postMessageToDesigner('adhocDesigner:save');
    }
  },
  _postMessageToDesigner: function _postMessageToDesigner(message) {
    this.$el[0].contentWindow.postMessage(message, window.location.origin);
  },
  _onWindowResize: function _onWindowResize() {
    var body = $('body');

    var bannerHeight = this._getBannerSize();

    this.resizeTimer && clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(_.bind(function () {
      this.$el.height(body.find('> #frame').height() - bannerHeight);
      this.$el.width(body.width() - dashboardSettings.DASHBOARD_ADHOC_IFRAME_MARGIN * 2);
    }, this), 100);
  },
  _getBannerSize: function _getBannerSize() {
    return $("body").find("> #banner").outerHeight(true) || 0;
  },
  _getFrame: function _getFrame() {
    return $(this.$el)[0].contentWindow;
  },
  detachEvents: function detachEvents() {
    var frame = this._getFrame();

    $(window).off('resize', this._onWindowResize);

    if (frame && frame.jQuery) {
      var $iframeDocument = frame.jQuery(frame.document);
      $iframeDocument.off('adhocDesigner:cancel errorPage:close').off('adhocDesigner:save');
    }
  },
  hide: function hide() {
    this.$el.hide();
  },
  removeSubComponents: function removeSubComponents() {
    this.addComponentDialogController && this.addComponentDialogController.remove();
    this.$dimmer && this.$dimmer.remove();
  },
  remove: function remove() {
    this.detachEvents();
    this.removeSubComponents();
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

});