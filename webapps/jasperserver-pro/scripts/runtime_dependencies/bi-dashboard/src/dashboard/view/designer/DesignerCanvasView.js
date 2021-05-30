define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var i18n = require("bundle!CommonBundle");

var OverlayDialog = require('./DashboardOverlayDialog');

var CanvasView = require('../base/CanvasView');

var designerCanvasTemplate = require("text!../../template/designerCanvasTemplate.htm");

var AdhocDesignerIframeView = require('./AdhocDesignerIframeView');

var DashboardMessageView = require('../base/DashboardMessageView');

var DashboardResourceModel = require('../../model/DashboardResourceModel');

var RepositoryResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var ParameterMenu = require('../../view/designer/ParameterMenu');

var dashboardComponentModelFactory = require('../../factory/dashboardComponentModelFactory');

var AddDashboardComponentDialogController = require('../../view/designer/AddDashboardComponentDialogController');

var dashboardComponentTypes = require('../../enum/dashboardComponentTypes');

var dashboardSettings = require('../../dashboardSettings');

var dashboardResourceReferenceTypes = require('../../enum/dashboardResourceReferenceTypes');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var dashboardMessageBus = require('../../dashboardMessageBus');

var dashboardMessageBusEvents = require('../../enum/dashboardMessageBusEvents');

var adHocToDashboardTypeMapper = require('../../mapper/adHocToDashboardTypeMapper');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

require('jquery-ui/ui/widgets/droppable');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Kostiantyn Tsaregradskyi, Zakhar Tomchenko
 * @version: $Id$
 */
var log = logger.register("DesignerCanvasView");
module.exports = CanvasView.extend({
  isDesigner: true,
  el: function el() {
    this.$rootEl = $(_.template(designerCanvasTemplate, {
      i18n: i18n
    }));
    return this.$rootEl.find(".dashboardCanvas")[0];
  },
  addComponentByTypeHandlerMap: function addComponentByTypeHandlerMap() {
    var handlerMap = {};
    handlerMap[dashboardComponentTypes.WEB_PAGE_VIEW] = this._addWebPageView;
    handlerMap[dashboardComponentTypes.FREE_TEXT] = this._addFreeText;
    handlerMap[dashboardComponentTypes.IMAGE] = this._addImage;
    handlerMap[dashboardComponentTypes.CHART] = this._addNewVisualization;
    handlerMap[dashboardComponentTypes.CROSSTAB] = this._addNewVisualization;
    handlerMap[dashboardComponentTypes.TABLE] = this._addNewVisualization;
    handlerMap[dashboardComponentTypes.FILTER_GROUP] = this._addInputControl;
    return handlerMap;
  },
  initialize: function initialize(options) {
    _.bindAll(this, "_addWebPageView", "_addFreeText", "_addImage", "_addNewVisualization", "_addDefaultComponentType", "_addInputControl");

    CanvasView.prototype.initialize.apply(this, arguments);
    this.strategy = options.strategy;
    this.message = new DashboardMessageView();
    this.$el.append(this.message.$el);

    this._initGrid();

    this.strategy.initVisualHelpers(this.$el);
    this.$el.droppable({
      accept: ".draggable",
      activeClass: "ui-dropping",
      tolerance: "pointer",
      drop: _.bind(this._onCanvasDrop, this)
    });
    this.filterDialog.$el.droppable({
      accept: ".draggable",
      activeClass: "ui-dropping",
      tolerance: "pointer"
    });
    this.listenTo(this.model.currentFoundation, "addComponent", function (model) {
      if (model.get("type") === dashboardComponentTypes.DASHBOARD_PROPERTIES) {
        this.listenTo(model, "change:dashletFilterShowPopup", this.changeFloatingFilterGroup, this);
      }
    }, this);

    _.bindAll(this, "_onGlobalMousedown", "_onGlobalKeydown");

    $(document).on("mousedown", this._onGlobalMousedown);
    $(document).on("keydown", this._onGlobalKeydown);
    this.$overlay = new OverlayDialog({
      content: i18n["dialog.overlay.loading"]
    });
    this.listenTo(this.model.currentFoundation, "addComponent", function (model) {
      if (model.get("type") === dashboardComponentTypes.DASHBOARD_PROPERTIES) {
        this.listenTo(model, "change:useFixedSize change:fixedWidth change:fixedHeight", this.applyCanvasSize, this);
        this.listenTo(model, "change:canvasColor", this.applyCanvasColor, this);
      }
    }, this);
  },
  getElement: function getElement() {
    return this.$el;
  },
  getRootElement: function getRootElement() {
    return this.$rootEl;
  },
  show: function show() {
    this.$el.css({
      top: '0px'
    });
  },
  hide: function hide() {
    this.$el.css({
      top: '-100000px'
    });
  },
  enableAutoRefresh: function enableAutoRefresh() {},
  addComponentView: function addComponentView(componentModel) {
    var componentView = CanvasView.prototype.addComponentView.call(this, componentModel);

    if (componentView) {
      this.listenTo(componentView, "delete", this.removeComponent);
    }

    return componentView;
  },
  addFloatingGroupView: function addFloatingGroupView(componentView) {
    CanvasView.prototype.addFloatingGroupView.apply(this, arguments);
    this.listenTo(componentView.model, "change:floating", this.convertFloatingGroupView);
    this.listenTo(componentView.model, "change:name", this.updateFloatingGroupViewTitle);
    this.listenTo(componentView, "delete", this.removeComponent);
  },
  changeFloatingFilterGroup: function changeFloatingFilterGroup(dashboardProperties) {
    if (!dashboardProperties.get("dashletFilterShowPopup") && this.filterDialog.$el.is(":visible")) {
      this.filterDialog.close();
    }
  },
  convertFloatingGroupView: function convertFloatingGroupView(model) {
    model.get("floating") ? this.dashletToPopup(model) : this.popupToDashlet(model);
  },
  updateFloatingGroupViewTitle: function updateFloatingGroupViewTitle(model) {
    this.filterDialog.updateTitle(model.get("name"));
  },
  popupToDashlet: function popupToDashlet(componentModel) {
    if (componentModel.get("type") === dashboardComponentTypes.FILTER_GROUP) {
      var dashletGroupView = this.getComponentViewByComponentId(componentModel.id),
          canvasDashletContainer = $(".dashboardCanvas > div.content > div.body"),
          topLeftDashlet,
          dashletGroupModel = this.model.currentFoundation.components.get(componentModel.id),
          replacingPosition;
      topLeftDashlet = this.model.currentFoundation.components.filter(function (model) {
        return model.get("x") === 0 && model.get("y") === 0 && model.get("type") !== componentModel.get("type");
      });
      topLeftDashlet = topLeftDashlet.length == 1 ? topLeftDashlet[0] : undefined;
      this.filterDialog.close();

      if (topLeftDashlet) {
        var topLeftPosition = topLeftDashlet.getPositionObject();
        replacingPosition = _.clone(topLeftPosition);

        if (replacingPosition.height > replacingPosition.width) {
          replacingPosition.height = parseInt(replacingPosition.height / 2);
          replacingPosition.y += replacingPosition.height;
        } else {
          replacingPosition.width = parseInt(replacingPosition.width / 2);
          replacingPosition.x += replacingPosition.width;
        }

        topLeftDashlet.set(replacingPosition);
      } else {
        // This case when there is no dashlet at (0, 0).
        // Expand a 1x1 square until we find the largest empty space around (0, 0).
        replacingPosition = this.strategy.calculateEmptyArea({
          x: 0,
          y: 0,
          height: 1,
          width: 1
        }, componentModel.id);
      }

      if (dashletGroupView && this.filterDialog.$el.find(dashletGroupView.$el.parent()).length > 0) {
        canvasDashletContainer.append(dashletGroupView.$el.parent());
        this.strategy.updateLayout(dashletGroupModel.id, {
          x: 0,
          y: 0,
          height: replacingPosition.height,
          width: replacingPosition.width
        });
        this.model.currentFoundation.trigger("moveComponent", dashletGroupModel, this.model.currentFoundation);

        dashletGroupView._onComponentMove();

        dashletGroupView.resizeContentContainer();
      }
    }
  },
  dashletToPopup: function dashletToPopup(componentModel) {
    if (componentModel.get("type") === dashboardComponentTypes.FILTER_GROUP) {
      var dashletGroupView = this.getComponentViewByComponentId(componentModel.id);

      if (dashletGroupView && dashletGroupView.$el.parents().length > 0) {
        this.filterDialog.updateTitle(componentModel.get("name"));
        this.filterDialog.$el.find(this.filterDialog.contentContainer).append(dashletGroupView.$el.parent());
        this.listenTo(dashletGroupView.model, "change:name", this.updateFloatingGroupViewTitle);
      }
    }
  },
  _onCanvasDrop: function _onCanvasDrop(event, ui) {
    // here we prevent dropping items on elements outside of canvas
    var $originalTarget = $(event.originalEvent.target);

    if ($originalTarget.hasClass("dashboardCanvas") || $originalTarget.parents(".dashboardCanvas").length || $originalTarget.hasClass(".filterGroup.dialog.open") || $originalTarget.parents(".filterGroup.dialog.open").length || $originalTarget.is(".helper.filter-dialog-drop")) {
      var self = this,
          componentObj = ui.helper.data("data");

      if (!componentObj.componentId) {
        // prevent adding the same Input Control twice
        if (componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL && (this.model.currentFoundation.components.findWhere({
          resource: componentObj.uri
        }) || this.model.currentFoundation.components.find(function (component) {
          return component.get("type") === repositoryResourceTypes.INPUT_CONTROL && component.getOwnerUri() === componentObj.ownerResourceId && component.getOwnerParameterName() === componentObj.id;
        }))) {
          return;
        }

        this.$overlay.open();
        this.addComponent(componentObj).done(function (componentModel) {
          if (!(componentModel.get("type") === dashboardComponentTypes.FILTER_GROUP && componentModel.getChildren().length >= 2) && !(componentObj.resourceType == dashboardComponentTypes.INPUT_CONTROL && self.model.currentFoundation.components.getDashboardPropertiesComponent().get("dashletFilterShowPopup"))) {
            self.strategy.onDashletDrop(componentModel, event, ui, self.$el);
          }

          $.when(componentModel.paramsDfd || {}).always(function () {
            self.$overlay.close();
          }).done(function () {
            dashboardMessageBus.trigger(dashboardMessageBusEvents.SAVE_DASHBOARD_STATE);
          });
        });
      } else {
        var component = this.model.currentFoundation.components.get(componentObj.componentId),
            // TODO: revise this after refactoring MoveHelper
        // store current position values to be able then to check if they changed
        // is done because drop action corrupts component position
        position = component.getPositionObject();
        this.strategy.onDashletDrop(component, event, ui, this.$el);

        if (!_.isEqual(component.getPositionObject(), position)) {
          dashboardMessageBus.trigger(dashboardMessageBusEvents.SAVE_DASHBOARD_STATE);
        }
      }
    }
  },
  _onGlobalMousedown: function _onGlobalMousedown(e) {
    var components = this.model.currentFoundation.components,
        selectedComponent = components.getSelectedComponent(),
        componentId;

    if (selectedComponent && (componentId = selectedComponent.get("id")) && selectedComponent.isVisible()) {
      var $selectedComponentEl = this.getComponentViewByComponentId(componentId).$el;
      var selectedComponentOffset = $selectedComponentEl.offset();
      var xIntersection = e.pageX - selectedComponentOffset.left;
      var yIntersection = e.pageY - selectedComponentOffset.top;

      if (!(xIntersection > 0 && xIntersection < $selectedComponentEl.width() && yIntersection > 0 && yIntersection < $selectedComponentEl.height()) && !$(e.target).closest("." + dashboardSettings.DASHLET_PROPERTIES_DIALOG_CLASS).length && !$(e.target).closest("." + dashboardSettings.DELETE_CONFIRMATION_DIALOG_CLASS).length && !$(e.target).closest("." + dashboardSettings.CONTEXT_MENU_CLASS).length) {
        components.selectComponent(undefined);
      }
    }
  },
  _onGlobalKeydown: function _onGlobalKeydown(e) {
    if (e.which === 46 && !$(e.target).closest("." + dashboardSettings.DASHLET_PROPERTIES_DIALOG_CLASS).length && !$(e.target).closest("." + dashboardSettings.SAVE_AS_DIALOG_CLASS).length && !$(e.target).find("." + dashboardSettings.SAVE_AS_DIALOG_CLASS + ":visible").length) {
      this.removeComponent(this.model.currentFoundation.components.getSelectedComponent());
    }
  },
  _initAddComponentDialogEvents: function _initAddComponentDialogEvents(componentModel, dfd, callback) {
    var self = this;
    this.listenTo(this.addComponentDialogController.dialog, "button:ok", function () {
      callback && callback.call(self, componentModel);
      self.closeAddComponentDialog();
      self.model.currentFoundation.components.add(componentModel);
      self.model.currentFoundation.components.selectComponent(componentModel);
      dfd.resolve(componentModel);
    });
    this.listenTo(this.addComponentDialogController.dialog, "button:cancel", function () {
      self.closeAddComponentDialog();
      dfd.reject(componentModel);
    });
  },
  addComponent: function addComponent(componentObj) {
    var dashboardResource,
        contextPath = this.model.contextPath,
        componentsCollection = this.model.currentFoundation.components,
        componentModel,
        dfd = $.Deferred();

    if (componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL) {
      var filterGroup = componentsCollection.findWhere({
        type: dashboardComponentTypes.FILTER_GROUP
      });
      componentModel = filterGroup || dashboardComponentModelFactory({
        type: dashboardComponentTypes.FILTER_GROUP,
        name: i18n["dashboard.component.filter.group.component.name"] || "Filter Group"
      }, {
        collection: componentsCollection,
        dashboardId: this.dashboardId
      });
    } else {
      if (componentObj.uri && componentObj.resourceType) {
        dashboardResource = this.model.resources.get(componentObj.uri);

        if (!dashboardResource) {
          dashboardResource = DashboardResourceModel.createDashboardResource(componentObj, contextPath);
        }
      }

      componentModel = dashboardComponentModelFactory(componentObj, {
        resource: dashboardResource,
        collection: componentsCollection,
        dashboardId: this.dashboardId
      }, {
        createComponentObj: true
      });
    } //Getting handler for adding component from a map or use default one.


    var addSpecificComponentHandler = this.addComponentByTypeHandlerMap()[componentModel.get("type")] || this._addDefaultComponentType;

    addSpecificComponentHandler(componentModel, dfd, componentObj);
    return dfd.promise();
  },
  addInputControlToFilterGroup: function addInputControlToFilterGroup(componentObj, filterGroupComponentId) {
    var componentsCollection = this.model.currentFoundation.components;

    if (componentsCollection.findWhere({
      resource: componentObj.uri
    })) {
      return;
    }

    var dashboardResource;

    if (componentObj.uri && componentObj.resourceType) {
      if (!this.model.resources.get(componentObj.ownerResourceId)) {
        this.model.resources.each(function (resource) {
          resource.resource.get("uri") === componentObj.ownerResourceId && (componentObj.ownerResourceId = resource.get("name"));
        });
      }

      dashboardResource = this.model.resources.get(componentObj.uri);

      if (!dashboardResource) {
        dashboardResource = DashboardResourceModel.createDashboardResource(componentObj, this.model.contextPath);
      }
    }

    var filterGroupComponentModel = componentsCollection.get(filterGroupComponentId),
        inputControlsInFilterGroup = filterGroupComponentModel.getChildren(),
        maxIndexInFilterGroup = inputControlsInFilterGroup.length ? Math.max.apply(null, _.map(inputControlsInFilterGroup, function (model) {
      return model.get("position");
    })) || 0 : 0,
        inputControlComponentModel = dashboardComponentModelFactory(componentObj, {
      resource: dashboardResource,
      collection: componentsCollection,
      dashboardId: this.dashboardId
    }, {
      createComponentObj: true
    });
    inputControlComponentModel.set({
      "ownerResourceId": componentObj.ownerResourceId,
      "ownerResourceParameterName": componentObj.ownerResourceParameterName,
      "masterDependencies": componentObj.masterDependencies,
      "fullCollectionRequired": componentObj.mandatory && !!componentObj.masterDependencies.length,
      "parentId": filterGroupComponentId,
      "position": maxIndexInFilterGroup + 1
    });
    return componentsCollection.add(inputControlComponentModel);
  },
  openAddComponentDialog: function openAddComponentDialog(componentModel) {
    this.$overlay.close();
    ParameterMenu.useModel(this.model);
    this.addComponentDialogController = new AddDashboardComponentDialogController(componentModel);
    this.addComponentDialogController.dialog.open();
  },
  closeAddComponentDialog: function closeAddComponentDialog() {
    this.stopListening(this.addComponentDialogController.dialog);
    this.addComponentDialogController.dialog.close();
    this.addComponentDialogController.remove();
  },
  openAdhocDesignerIframe: function openAdhocDesignerIframe(componentModel) {
    this.adhocDesigner && this.removeAdhocDesignerIframe();
    this.adhocDesigner = new AdhocDesignerIframeView({
      model: componentModel
    });
    this.adhocDesigner.render();
  },
  removeAdhocDesignerIframe: function removeAdhocDesignerIframe() {
    this.stopListening(this.adhocDesigner);
    this.adhocDesigner.remove();
  },
  hideAdhocDesignerIframe: function hideAdhocDesignerIframe() {
    this.stopListening(this.adhocDesigner);
    this.adhocDesigner.hide();
    this.adhocDesigner.removeSubComponents();
    this.adhocDesigner.detachEvents();
  },
  remove: function remove() {
    try {
      this.$el.droppable("destroy");
    } catch (e) {
      // destroyed already, skip
      log.debug(e);
    }

    this.addComponentDialogController && this.addComponentDialogController.remove();
    this.adhocDesigner && this.adhocDesigner.remove();
    this.$overlay.remove();
    this.message.remove();
    $(document).off("mousedown", this._onGlobalMousedown);
    $(document).off("keydown", this._onGlobalKeydown);
    CanvasView.prototype.remove.apply(this, arguments);
  },
  removeComponent: function removeComponent(componentModel) {
    if (!componentModel) {
      return;
    }

    this.model.currentFoundation.components.selectComponent(undefined);
    this.model.currentFoundation.components.remove(componentModel);
    dashboardMessageBus.trigger(dashboardMessageBusEvents.SAVE_DASHBOARD_STATE); // TODO: check if this is really needed

    if (componentModel.get("type") === dashboardComponentTypes.INPUT_CONTROL) {
      var filterDashlet = this.getComponentViewByComponentId(componentModel.get("parentId"));
      filterDashlet && filterDashlet.refreshFilterGroup();
      var dashletModel = this.model.currentFoundation.components.findWhere({
        resource: componentModel.get("ownerResourceId")
      }); //TODO: Refresh dashlet content in a more acceptable way.

      this.getComponentViewByComponentId(dashletModel.id).render();
    }
  },
  applyCanvasSize: function applyCanvasSize() {
    CanvasView.prototype.applyCanvasSize.apply(this, arguments);

    _.each(this.componentViews, function (view) {
      var parent = view.model.getParent();
      !parent || parent.get("floating") || view.render();
    });
  },
  _initGrid: function _initGrid() {
    var $grid = $('<div>').addClass('grid').hide(),
        i,
        pos;

    for (i = 1; i < dashboardSettings.GRID_WIDTH; i++) {
      pos = this.strategy.cellToCoord(i, 0);
      $('<div>').appendTo($grid).css({
        width: '1px',
        height: '100%',
        left: pos.x + '%'
      });
    }

    for (i = 1; i < dashboardSettings.GRID_HEIGHT; i++) {
      pos = this.strategy.cellToCoord(0, i);
      $('<div>').appendTo($grid).css({
        width: '100%',
        height: '1px',
        top: pos.y + '%'
      });
    }

    this.$el.append($grid);
  },
  //Different component type adding handlers
  _addWebPageView: function _addWebPageView(componentModel, dfd) {
    this.openAddComponentDialog(componentModel);
    this.addComponentDialogController.dialog.disableButton("ok");

    this._initAddComponentDialogEvents(componentModel, dfd, function (componentModel) {
      componentModel.set("name", componentModel.generateName(componentModel.get("url")));
    });
  },
  _addFreeText: function _addFreeText(componentModel, dfd) {
    this.openAddComponentDialog(componentModel);

    this._initAddComponentDialogEvents(componentModel, dfd);
  },
  _addImage: function _addImage(componentModel, dfd) {
    this.openAddComponentDialog(componentModel);
    this.addComponentDialogController.dialog.disableButton("ok");

    this._initAddComponentDialogEvents(componentModel, dfd);
  },
  _addNewVisualization: function _addNewVisualization(componentModel, dfd) {
    var self = this,
        contextPath = this.model.contextPath,
        componentsCollection = this.model.currentFoundation.components;
    this.$overlay.close();
    this.openAdhocDesignerIframe(componentModel);
    this.listenTo(this.adhocDesigner, "close", function () {
      self.removeAdhocDesignerIframe();
      dfd.reject(componentModel);
    });
    this.listenTo(this.adhocDesigner, "save", function (designerIframe, resource) {
      self.hideAdhocDesignerIframe(); // we should fix Ad Hoc View Type for Dashboard

      resource.type = adHocToDashboardTypeMapper(resource.type);
      resource.resourceType = repositoryResourceTypes.ADHOC_DATA_VIEW;
      var dashboardResource = DashboardResourceModel.createDashboardResource(resource, contextPath);
      var componentModel = dashboardComponentModelFactory(resource, {
        resource: dashboardResource,
        collection: componentsCollection,
        dashboardId: self.dashboardId
      }, {
        createComponentObj: true
      });
      initializeVizIconDisplay(componentModel);
      componentsCollection.add(componentModel);
      componentsCollection.selectComponent(componentModel);
      dfd.resolve(componentModel);
    });
  },
  _addInputControl: function _addInputControl(filterGroupModel, dfd, controlComponentObj) {
    var self = this,
        componentsCollection = this.model.currentFoundation.components,
        finishAdd = function finishAdd() {
      var filterComponentModel = self.addInputControlToFilterGroup(controlComponentObj, filterGroupModel.get("id"));
      filterComponentModel && componentsCollection.selectComponent(filterComponentModel);
      filterComponentModel && filterComponentModel.set("label", filterComponentModel.get("name"));
      dfd.resolve(filterGroupModel);
    };

    if (componentsCollection.indexOf(filterGroupModel) === -1) {
      componentsCollection.add(filterGroupModel);
    }

    if (controlComponentObj.ownerResourceId + "_files/" + controlComponentObj.ownerResourceParameterName == controlComponentObj.uri) {
      // this is local resource of report, which means, that it must be copied to the dashboard resources
      var controlResource = new RepositoryResourceModel({
        uri: controlComponentObj.uri
      }, {
        contextPath: self.model.contextPath
      });
      controlResource.fetch({
        expanded: true
      }).done(function () {
        var resourceModel = new DashboardResourceModel({}, {
          contextPath: self.model.contextPath
        }),
            resourceObj = {},
            uri = controlResource.get("uri");
        controlResource.unset("uri");
        controlResource.set("label", self._generateControlId(controlComponentObj.id));
        replaceGlobalResourceWithRef(controlResource.get("dataType"), uri, "dataTypeReference");
        replaceGlobalResourceWithRef(controlResource.get("listOfValues"), uri, "listOfValuesReference");
        var queryResource = replaceGlobalResourceWithRef(controlResource.get("query"), uri, "queryReference");
        queryResource && replaceGlobalResourceWithRef(queryResource.dataSource, uri, "dataSourceReference");
        stripVersion(controlResource);
        resourceObj[dashboardResourceReferenceTypes.INPUT_CONTROL] = controlResource.attributes;
        resourceModel.set({
          "name": uri,
          "type": dashboardComponentTypes.INPUT_CONTROL,
          "resource": resourceObj
        });
        resourceModel.resource.resource = controlResource;
        self.model.resources.add(resourceModel);
        finishAdd();
      }).fail(_.bind(dfd.reject, dfd));
    } else {
      finishAdd();
    }
  },
  _addDefaultComponentType: function _addDefaultComponentType(componentModel, dfd, componentObj) {
    var componentsCollection = this.model.currentFoundation.components;
    initializeVizIconDisplay(componentModel);

    if (componentsCollection.indexOf(componentModel) === -1) {
      componentsCollection.add(componentModel);
    }

    componentsCollection.selectComponent(componentModel);
    dfd.resolve(componentModel);
  },
  _generateControlId: function _generateControlId(base) {
    var index = 2,
        self = this;

    if (labelAvailable(base)) {
      return base;
    }

    if (/.*_\d+$/.match(base)) {
      var underscore = base.lastIndexOf("_");
      index = +base.substring(underscore + 1) + 1;
      base = base.substring(0, underscore);
    }

    function labelAvailable(base) {
      return !self.model.currentFoundation.components.find(function (component) {
        return component.resource && component.resource.resource.get("label") === base;
      });
    }

    function generateId(base, index) {
      var label = base + "_" + index;

      if (labelAvailable(label)) {
        return label;
      } else {
        return generateId(base, index + 1);
      }
    }

    return generateId(base, index);
  }
});

function initializeVizIconDisplay(componentModel) {
  if (_.contains([dashboardComponentTypes.ADHOC_VIEW, dashboardComponentTypes.REPORT, dashboardComponentTypes.CHART, dashboardComponentTypes.TABLE, dashboardComponentTypes.CROSSTAB], componentModel.get('type'))) {
    if (componentModel.get('showVizSelectorIcon') === undefined) {
      componentModel.set('showVizSelectorIcon', dashboardSettings.DASHBOARD_SHOW_VISUALIZE_SELECTOR_ICON);
    }
  }
}

function stripVersion(resourceModel) {
  resourceModel.unset("version");
  delVersion(resourceModel.attributes);

  function delVersion(obj) {
    delete obj.version;

    _.each(_.keys(obj), function (key) {
      _.isObject(obj[key]) && delVersion(obj[key]);
    });
  }
}
/**
 * Replace resource with reference, if this resource will NOT be a local resource for the Parent resource
 *
 * @param resourceWrapper Resource wrapper object
 * @param uri Parent resource URI
 * @param referenceName The name of the reference resource object property
 * @returns {*}
 */


function replaceGlobalResourceWithRef(resourceWrapper, uri, referenceName) {
  if (!_.isObject(resourceWrapper)) {
    return resourceWrapper;
  }

  var localResKey = _.keys(resourceWrapper)[0],
      resource = resourceWrapper[localResKey];

  if (localResKey != referenceName && !isLocalResource(resource, uri)) {
    resource = resourceWrapper[referenceName] = _.pick(resource, "uri");
    delete resourceWrapper[localResKey];
  }

  return resource;
}

function isLocalResource(resource, parentResourceUri) {
  return (resource.uri || "").indexOf(parentResourceUri) === 0;
}

});