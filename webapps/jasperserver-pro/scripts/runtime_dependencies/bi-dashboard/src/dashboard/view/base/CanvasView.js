define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var $ = require('jquery');

var _ = require('underscore');

var FloatingDashletDialog = require('../../view/base/FloatingDashletDialogView');

var dashboardComponentViewFactory = require('../../factory/dashboardComponentViewFactory');

var dashboardSettings = require('../../dashboardSettings');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var canvasTemplate = require("text!../../template/canvasTemplate.htm");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

var i18n = require("bundle!DashboardBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Kostiantyn Tsaregradskyi, Zakhar Tomchenko
 * @version: $Id: CanvasView.js 11 2014-08-22 13:49:12Z ktsaregradskyi $
 */
var log = logger.register("CanvasView");

function triggerIfAttached(componentView) {
  if ($.contains(window.document, componentView.el)) {
    componentView.trigger("componentAttached", componentView);
  }
}

module.exports = Backbone.View.extend({
  el: _.template(canvasTemplate, {
    i18n: i18n
  }),
  initialize: function initialize(options) {
    options || (options = {});
    var self = this;
    this.ready = new $.Deferred();
    this.componentViews = [];
    this.dashboardId = options.dashboardId;
    this.filterDialog = new FloatingDashletDialog({
      modal: false,
      title: i18n["dashboard.component.filter.group.component.name"],
      resizable: false,
      foundation: this.model.currentFoundation
    });
    this.$canvasBody = this.$(" > .content > .body");
    this.listenTo(this.model.currentFoundation, "toggle:filterDialog", this.toggleFilterDialog);
    this.listenTo(this.model.currentFoundation, "close:filterDialog", this.closeFilterDialog);
    this.listenTo(this.model.foundations, "addComponent", function (componentModel, foundationModel) {
      if (foundationModel === self.model.currentFoundation) {
        self.addComponentView(componentModel);
      }
    });
    this.listenTo(this.model.foundations, "removeComponent", function (componentModel, foundationModel) {
      if (foundationModel === self.model.currentFoundation) {
        self.removeComponentView(componentModel);
      }
    });
    this.listenTo(this.model, "propertiesAvailable", function (model) {
      self.listenTo(model, "change:useFixedSize change:fixedWidth change:fixedHeight", this.applyCanvasSize, this);
      this.applyCanvasSize();
      this.applyCanvasColor();
    });
    this.listenTo(this.model, "resourcesDataFetched", this.render); // start resolve link's uri to url if any silently when visualizations are ready in order to not interfere rendering process
    // and do not make user wait after chart hyperlink click
    // This functionality is NOT required in designer

    this.isDesigner || this.ready.done(function () {
      self.model.currentFoundation.components.each(function (component) {
        component.getLinkUrl && component.getLinkUrl();
      });
    });
  },
  toggleFilterDialog: function toggleFilterDialog() {
    if (this.filterDialog.isVisible()) {
      this.filterDialog.close();
    } else {
      this.filterDialog.open();
    }
  },
  closeFilterDialog: function closeFilterDialog() {
    this.filterDialog.close();
  },
  render: function render() {
    if (this.model.currentFoundation) {
      var html = dashboardSettings.STRICT_LAYOUT ? this.model.currentFoundation.components.toHTML(true) : this.model.resources.get(this.model.currentFoundation.get("layout")).resource.content,
          self = this;
      this.removeAllComponentViews();
      this.disableAutoRefresh();
      this.$canvasBody.html(html);
      $("body#dashboard").append(this.filterDialog.$el);

      if (html) {
        this.message && this.message.hide();
        this.model.currentFoundation.components.forEach(_.bind(this.addComponentView, this));
        this.componentViews.length && $.when.apply($, _.pluck(this.componentViews, "ready")).then(function () {
          self.ready.resolve();
        });
        this.enableAutoRefresh();
      }
    }

    return this;
  },
  removeComponentView: function removeComponentView(componentModel) {
    var dashletView = this.getComponentViewByComponentId(componentModel.id),
        index = _.indexOf(this.componentViews, dashletView),
        dashletElement;

    dashletView && dashletView.remove();

    if (index > -1) {
      this.componentViews.splice(index, 1);
    }

    dashletElement = this.$canvasBody.find("[" + dashboardSettings.COMPONENT_ID_ATTRIBUTE + "='" + componentModel.id + "']");

    if (dashletElement.length) {
      dashletElement.remove();
    } else {
      dashletElement = $("[" + dashboardSettings.COMPONENT_ID_ATTRIBUTE + "='" + componentModel.id + "']");
      dashletElement && dashletElement.remove();
    }

    log.debug("removed dashlet " + componentModel.id);
  },
  addComponentView: function addComponentView(componentModel) {
    var componentView;

    if (componentModel.isVisible() && !this.getComponentViewByComponentId(componentModel.id)) {
      componentView = dashboardComponentViewFactory({
        model: componentModel,
        dashboardProperties: this.model.currentFoundation.components.getDashboardPropertiesComponent(),
        dashboardId: this.dashboardId
      }, this.isDesigner);

      if ((componentModel.get("floating") || componentView.dashboardProperties.get("dashletFilterShowPopup")) && componentModel.get("type") === dashboardComponentTypes.FILTER_GROUP) {
        this.addFloatingGroupView(componentView);
      } else if (componentModel.get("type") !== dashboardComponentTypes.INPUT_CONTROL) {
        var $dashlet = this.$canvasBody.find("[" + dashboardSettings.COMPONENT_ID_ATTRIBUTE + "='" + componentModel.id + "']");
        this.message && this.message.hide();

        if (!$dashlet.length) {
          $dashlet = $(componentModel.toHTML(true));
          this.$canvasBody.append($dashlet);
        } else {
          $dashlet.css(componentModel.getCssPosition());
        }

        this.componentViews.push(componentView);
        $dashlet.html(componentView.render().$el);
        triggerIfAttached(componentView);

        if (componentModel.get("type") === dashboardComponentTypes.FILTER_GROUP) {
          this.listenTo(componentModel, "change:floating", this.convertFloatingGroupView);
        }

        this.listenTo(componentModel, "change:maximized", this.toggleDashletMaximizedState);
        log.debug("added dashlet " + componentModel.id);
      } else {
        var dashletGroupComponentModel = componentModel.getParent(),
            dashletGroupView = this.getComponentViewByComponentId(dashletGroupComponentModel.id);

        if (!dashletGroupView) {
          if (componentView.dashboardProperties.get("dashletFilterShowPopup")) {
            this.addFloatingGroupView(dashletGroupComponentModel);
          } else {
            this.addComponentView(dashletGroupComponentModel);
          }

          dashletGroupView = this.getComponentViewByComponentId(dashletGroupComponentModel.id);
        }

        dashletGroupView.component.componentViews = this.componentViews;
        this.componentViews.push(componentView);
        var position = componentModel.get("position"),
            children = dashletGroupComponentModel.getChildren(),
            modelToInsertAfter,
            differenceInPositions = 9999999;

        _.each(children, function (inputControlComponentModel) {
          if (position > inputControlComponentModel.get("position") && differenceInPositions > position - inputControlComponentModel.get("position")) {
            differenceInPositions = position - inputControlComponentModel.get("position");
            modelToInsertAfter = inputControlComponentModel;
          }
        });

        if (!modelToInsertAfter) {
          dashletGroupView.$content.prepend(componentView.render().$el);
        } else {
          this.getComponentViewByComponentId(modelToInsertAfter.get("id")).$el.after(componentView.render().$el);
        }

        triggerIfAttached(componentView);

        dashletGroupView._resizeComponent();

        dashletGroupView.refreshFilterGroup();
        log.debug("added input control " + componentModel.id);
      }
    }

    return componentView;
  },
  addFloatingGroupView: function addFloatingGroupView(componentView) {
    var componentModel = componentView.model,
        $dashlet = $(componentModel.toHTML(false)),
        floatingContainer = this.filterDialog.$el.find(this.filterDialog.contentContainer);
    floatingContainer.append($dashlet);
    this.componentViews.push(componentView);
    componentView.setFloatingStyle && _.defer(componentView.setFloatingStyle());
    $dashlet.html(componentView.render().$el);
    this.filterDialog.updateTitle(componentModel.get("name"));
  },
  convertFloatingGroupView: function convertFloatingGroupView() {},
  removeAllComponentViews: function removeAllComponentViews(options) {
    _.invoke(this.componentViews, "remove", options);

    this.componentViews = [];
  },
  refresh: function refresh() {
    var refreshableViews = this.componentViews.filter(function (view) {
      return _.isFunction(view.refresh);
    }),
        dfd = new $.Deferred();
    this.ready.then(function () {
      $.when.apply($, _.invoke(refreshableViews || [], "refresh")).then(dfd.resolve, dfd.reject);
    }, dfd.reject);
    return dfd;
  },
  cancel: function cancel() {
    var cancellableViews = this.componentViews.filter(function (view) {
      return _.isFunction(view.refresh) && _.isFunction(view.cancel);
    }),
        dfd = new $.Deferred();
    this.ready.then(function () {
      $.when.apply($, _.invoke(cancellableViews || [], "cancel")).then(dfd.resolve, dfd.reject);
    }, dfd.reject);
    return dfd;
  },
  remove: function remove(options) {
    this.disableAutoRefresh();
    this.removeAllComponentViews(options);
    Backbone.View.prototype.remove.apply(this, arguments);
  },
  getComponentViewByComponentId: function getComponentViewByComponentId(id) {
    return _.find(this.componentViews, function (dashlet) {
      return dashlet.model.id === id;
    });
  },
  toggleDashletMaximizedState: function toggleDashletMaximizedState(model) {
    var dashlet = this.getComponentViewByComponentId(model.get("id")),
        canvasOverlayClassName = "canvasOverlay",
        maximizedDashletClasName = "maximizedDashlet";

    if (model.get("maximized")) {
      dashlet.$el.parent().addClass(canvasOverlayClassName);
      this.$el.addClass(maximizedDashletClasName);
      dashlet.toolbar && dashlet.toolbar.getOptionView("maximize").$el.addClass(dashboardSettings.DASHLET_TOOLBAR_MINIMIZE_BUTTON_CLASS).prop('title', i18n["dashboard.canvas.dashlet.minimize"]);
    } else {
      dashlet.$el.parent().removeClass(canvasOverlayClassName);
      this.$el.removeClass(maximizedDashletClasName);
      dashlet.toolbar && dashlet.toolbar.getOptionView("maximize").$el.removeClass(dashboardSettings.DASHLET_TOOLBAR_MINIMIZE_BUTTON_CLASS).prop('title', i18n["dashboard.canvas.dashlet.maximize"]);
    }

    dashlet.resize();
  },
  enableAutoRefresh: function enableAutoRefresh() {
    var self = this,
        dfds = [];

    function calculateRefreshTimeout(interval, unit) {
      var ratio = 1000;

      if (unit === "minute") {
        ratio *= 60;
      }

      return interval * ratio;
    }

    function recursiveRefresh(view, model, dfd) {
      dfd = dfd || new $.Deferred();
      view.ready.done(function () {
        if (self._autoRefreshEnabled && _.isFunction(view.refresh) && model.get("autoRefresh")) {
          setTimeout(function () {
            if (self._autoRefreshEnabled && _.isFunction(view.refresh) && model.get("autoRefresh")) {
              view.refresh().always(function () {
                recursiveRefresh.call(self, view, model, dfd);
              });
            } else {
              dfd.resolve();
            }
          }, calculateRefreshTimeout(model.get("refreshInterval"), model.get("refreshIntervalUnit")));
        } else {
          dfd.resolve();
        }
      });
      return dfd;
    }

    this.model.currentFoundation.components.forEach(function (componentModel) {
      if (componentModel.isAutoRefreshable() && componentModel.get("autoRefresh")) {
        self._autoRefreshEnabled = true;
        var view = componentModel.get("type") === dashboardComponentTypes.DASHBOARD_PROPERTIES ? self : self.getComponentViewByComponentId(componentModel.id);

        if (_.isFunction(view.refresh)) {
          dfds.push(recursiveRefresh.call(self, view, componentModel));
        }
      }
    });
    return $.when.apply($, dfds);
  },
  disableAutoRefresh: function disableAutoRefresh() {
    this._autoRefreshEnabled = false;
  },
  applyCanvasColor: function applyCanvasColor() {
    var propertiesModel = this.model.currentFoundation.components.getDashboardPropertiesComponent(),
        canvasColor = propertiesModel.get("canvasColor");
    this.$canvasBody.css('background-color', canvasColor);
  },
  applyCanvasSize: function applyCanvasSize() {
    var model = this.model.currentFoundation.components.getDashboardPropertiesComponent();

    if (model.get("useFixedSize")) {
      this.$el.css({
        width: model.get("fixedWidth") + "px",
        height: model.get("fixedHeight") + "px"
      });
    } else {
      this.$el.attr("style", null);
    }
  }
});

});