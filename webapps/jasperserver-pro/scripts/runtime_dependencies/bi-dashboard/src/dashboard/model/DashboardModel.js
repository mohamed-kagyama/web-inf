define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var DashboardFoundationCollection = require('../collection/DashboardFoundationCollection');

var DashboardResourceCollection = require('../collection/DashboardResourceCollection');

var DashboardResourceModel = require('./DashboardResourceModel');

var DashboardWiringModel = require('./DashboardWiringModel');

var dashboardComponentModelFactory = require('../factory/dashboardComponentModelFactory');

var PropertiesDashboardComponentModel = require('./component/PropertiesDashboardComponentModel');

var DashboardComponentCollection = require('../collection/DashboardComponentCollection');

var ReportsParametersCollection = require('../collection/ReportsParametersCollection');

var dashboardResourceTypes = require('../enum/dashboardResourceTypes');

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var errorCodes = require("runtime_dependencies/js-sdk/src/common/enum/errorCodes");

var dashboardResourceReferenceTypes = require('../enum/dashboardResourceReferenceTypes');

var dashboardWiringStandardIds = require('../enum/dashboardWiringStandardIds');

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Sergii Kylypko, Kostiantyn Tsaregradskyi
 * @version: $Id$
 */
var ParametersCache = ReportsParametersCollection.instance;
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
module.exports = ResourceModel.extend({
  type: repositoryResourceTypes.DASHBOARD,
  defaults: _.extend({}, ResourceModel.prototype.defaults, {
    label: i18n['dashboard.new.dashboard'],
    defaultFoundation: undefined,
    resources: undefined,
    foundations: undefined
  }),
  validation: _.extend({}, ResourceModel.prototype.validation, {
    label: [{
      required: true,
      msg: new i18nMessage("dashboard.error.label.required")
    }, {
      maxLength: ResourceModel.settings.LABEL_MAX_LENGTH,
      msg: new i18nMessage("dashboard.error.label.maxLength", ResourceModel.settings.LABEL_MAX_LENGTH)
    }],
    description: [{
      required: false
    }, {
      maxLength: ResourceModel.settings.DESCRIPTION_MAX_LENGTH,
      msg: new i18nMessage("dashboard.error.description.maxLength", ResourceModel.settings.DESCRIPTION_MAX_LENGTH)
    }],
    parentFolderUri: [{
      required: true,
      msg: new i18nMessage("dashboard.error.parentFolderUri.required")
    }]
  }),
  initialize: function initialize(attrs, options) {
    ResourceModel.prototype.initialize.apply(this, arguments);
    options || (options = {});

    if (options.dashboardId) {
      this.dashboardId = options.dashboardId;
    }

    this.isDesigner = !!options.isDesigner;
    this.resources = new DashboardResourceCollection();
    this.foundations = new DashboardFoundationCollection();
    this.listenTo(this.foundations, "add", this._onFoundationAdd);
    this.listenTo(this.foundations, "addComponent", this._onComponentAdd);
    this.listenTo(this.foundations, "removeComponent", this._onComponentRemove);
    this.listenTo(this.foundations, "addComponent removeComponent moveComponent resizeComponent", this._onLayoutChange);
    this.listenTo(this.foundations, "changeProperties changedControlProperties", this._onComponentChange);
    this.listenTo(this.foundations, "changeWiring", this._onWiringChange);
    this.on("resourcesDataFetched", function () {
      this.listenTo(this.currentFoundation, "addComponent", this.addResourceReference);
      this.listenTo(this.currentFoundation.components, "change:url", this.updateResourceReference);
      this.listenTo(this.currentFoundation, "removeComponent", this.removeResourceReference);
    }, this);
    this.on("change:defaultFoundation", this._onDefaultFoundationChange);

    this._initDefaultFoundation();
  },
  resetToInitialCondition: function resetToInitialCondition() {
    var currentFoundation = this.currentFoundation;
    this.set(_.omit(this.defaults, "defaultFoundation"));
    currentFoundation.wiring.set([]); // TODO: this should be done automatically in set([])

    currentFoundation.wiring.handlers = {};
    currentFoundation.components.set([]);
    currentFoundation.components.add(new PropertiesDashboardComponentModel({}, {
      dashboardId: this.dashboardId || this.cid
    }));
    this.resources.set([this.resources.get(currentFoundation.get("wiring")), this.resources.get(currentFoundation.get("layout")), this.resources.get(currentFoundation.get("components"))]);
  },
  fetch: function fetch(options) {
    options || (options = {});
    var origFetchDfd = ResourceModel.prototype.fetch.call(this, options),
        dfd = new $.Deferred(),
        self = this;
    origFetchDfd.done(function () {
      var fakeXhrResponse = false; // fake response from server if we requested repository resource with invalid type

      if (self.type !== repositoryResourceTypes.DASHBOARD) {
        fakeXhrResponse = {
          status: 400,
          responseText: JSON.stringify({
            message: "Resource '" + self.get("uri") + "' is not of type '" + repositoryResourceTypes.DASHBOARD + "'",
            errorCode: errorCodes.INVALID_RESOURCE_TYPE,
            parameters: [self.type]
          })
        };
      }

      if (self.isDesigner && self.get("permissionMask") !== 1 && !(self.get("permissionMask") & 4)) {
        fakeXhrResponse = {
          status: 403,
          responseText: JSON.stringify({
            message: "Access denied",
            errorCode: errorCodes.ACCESS_DENIED
          })
        };
      }

      if (fakeXhrResponse) {
        self.set(_.omit(self.defaults, "defaultFoundation", "foundations", "resources"));
        self.trigger("error", self, fakeXhrResponse);
        dfd.reject(fakeXhrResponse);
      } else {
        self.trigger("rawDataFetched", self);
        self.updateResourceCollection();
        var fileResourcesDfdArray = self.resources.chain().filter(function (dashboardResource) {
          return dashboardResource.resource && dashboardResource.resource.fetchContent;
        }).map(function (dashboardResource) {
          if (dashboardResource.resource instanceof ResourceModel) {
            if (_.isUndefined(dashboardResource.resource.contextPath)) {
              dashboardResource.resource.contextPath = self.contextPath;
            }
          }

          return dashboardResource.resource.fetchContent();
        }).value();
        $.when.apply($, fileResourcesDfdArray).done(function () {
          self.trigger("resourcesDataFetched", self);
          self.updateFoundationCollection();
          self.currentFoundation.startLoadingSequence();
          self.trigger("propertiesAvailable", self.currentFoundation.components.getDashboardPropertiesComponent());
          dfd.resolve();
        });
      }
    }).fail(dfd.reject);
    return dfd;
  },
  parse: function parse(response) {
    if (response.resources) {
      for (var i = 0; i < response.resources.length; i++) {
        if (response.resources[i].resource.resourceReference && (response.resources[i].type === "layout" || response.resources[i].type === "wiring" || response.resources[i].type === "components")) {
          response.resources[i].resource = {
            file: {
              label: response.resources[i].name,
              uri: response.resources[i].resource.resourceReference.uri
            }
          };
          delete response.resources[i].resource.resourceReference;
        }
      }
    }

    return response;
  },
  toJSON: function toJSON(useFullResource) {
    this.foundations.map(_.bind(this._onWiringChange, this, null));
    var json = ResourceModel.prototype.toJSON.apply(this, arguments);
    json.foundations = this.foundations.toJSON();
    json.resources = this.resources.toJSON(useFullResource);
    return json;
  },
  _initDefaultFoundation: function _initDefaultFoundation() {
    var foundation = this.foundations.addDefaultFoundation();
    foundation.components.add(new PropertiesDashboardComponentModel({}, {
      dashboardId: this.dashboardId || this.cid
    }));
    this.set("defaultFoundation", this.foundations.getDefaultFoundation().get("id"));
  },
  _onDefaultFoundationChange: function _onDefaultFoundationChange() {
    if (this.currentFoundation !== this.foundations.get(this.get("defaultFoundation"))) {
      this.currentFoundation = this.foundations.get(this.get("defaultFoundation"));
    }
  },
  _onComponentAdd: function _onComponentAdd(componentModel, foundationModel) {
    var componentsResource = this.resources.get(foundationModel.get("components"));
    componentsResource.resource.setContent(foundationModel.components.toJSON());
    var resource = componentModel.resource;

    if (resource && !this.resources.get(resource.id)) {
      this.resources.add(resource);
    }
  },
  _onComponentChange: function _onComponentChange(componentModel, foundationModel) {
    var componentsResource = this.resources.get(foundationModel.get("components"));
    componentsResource.resource.setContent(foundationModel.components.toJSON());
  },
  _onComponentRemove: function _onComponentRemove(componentModel, foundationModel) {
    var componentsResource = this.resources.get(foundationModel.get("components"));
    componentsResource.resource.setContent(foundationModel.components.toJSON());
    var resource = componentModel.resource,
        resourceIsUsed = false;

    if (resource) {
      // check if resource related to deleted component is used by other components
      this.foundations.forEach(function (foundation) {
        foundation.components.forEach(function (component) {
          if (component !== componentModel && component.resource === resource) {
            resourceIsUsed = true;
          }
        });
      });

      if (!resourceIsUsed) {
        this.resources.remove(resource);
      }
    }
  },
  _onLayoutChange: function _onLayoutChange(componentModel, foundationModel) {
    var layoutResource = this.resources.get(foundationModel.get("layout"));
    layoutResource.resource.setContent(foundationModel.components.toHTML());
  },
  _onWiringChange: function _onWiringChange(componentModel, foundationModel) {
    var wiringResource = this.resources.get(foundationModel.get("wiring"));
    wiringResource.resource.setContent(foundationModel.wiring.toJSON());
  },
  _onFoundationAdd: function _onFoundationAdd(model) {
    var componentsResourceObj = {};
    componentsResourceObj[dashboardResourceReferenceTypes.FILE] = {
      label: model.get("components")
    };
    var layoutResourceObj = {};
    layoutResourceObj[dashboardResourceReferenceTypes.FILE] = {
      label: model.get("layout")
    };
    var wiringResourceObj = {};
    wiringResourceObj[dashboardResourceReferenceTypes.FILE] = {
      label: model.get("wiring")
    };
    var componentsResourceModel = this.resources.add(new DashboardResourceModel({
      name: model.get("components"),
      type: dashboardResourceTypes.COMPONENTS,
      resource: componentsResourceObj
    }, {
      contextPath: this.contextPath
    }));
    componentsResourceModel.resource.setContent(model.components.toJSON());
    var layoutResourceModel = this.resources.add(new DashboardResourceModel({
      name: model.get("layout"),
      type: dashboardResourceTypes.LAYOUT,
      resource: layoutResourceObj
    }, {
      contextPath: this.contextPath
    }));
    layoutResourceModel.resource.setContent(model.components.toHTML());
    var wiringResourceModel = this.resources.add(new DashboardResourceModel({
      name: model.get("wiring"),
      type: dashboardResourceTypes.WIRING,
      resource: wiringResourceObj
    }, {
      contextPath: this.contextPath
    }));
    wiringResourceModel.resource.setContent(model.wiring.toJSON());
  },
  addResourceReference: function addResourceReference(componentModel) {
    if (componentModel.get("type") === dashboardComponentTypes.IMAGE && /^repo:/.test(componentModel.get("url"))) {
      this.resources.add({
        name: componentModel.get("id"),
        type: componentModel.get("type"),
        resource: {
          resourceReference: {
            uri: componentModel.get("url").replace(/^repo:/, "")
          }
        }
      });
    }
  },
  updateResourceReference: function updateResourceReference(componentModel) {
    this.removeResourceReference(componentModel);
    this.addResourceReference(componentModel);
  },
  removeResourceReference: function removeResourceReference(componentModel) {
    if (componentModel.get("type") === dashboardComponentTypes.IMAGE) {
      this.resources.remove(componentModel.get("id"));
    }
  },
  updateResourceCollection: function updateResourceCollection() {
    this.resources.set(this.get("resources"), {
      merge: true,
      remove: true,
      add: true
    });
  },
  updateFoundationCollection: function updateFoundationCollection() {
    var self = this;
    this.foundations.set(this.get("foundations"), {
      merge: true,
      remove: true,
      add: true
    });
    this.foundations.forEach(function (foundationModel) {
      var componentsDashboardResource = self.resources.get(foundationModel.get("components")),
          layoutDashboardResource = self.resources.get(foundationModel.get("layout")),
          wiringDashboardResource = self.resources.get(foundationModel.get("wiring")),
          components = new DashboardComponentCollection(),
          wiringDashboardResourceContent;

      if (wiringDashboardResource && wiringDashboardResource.resource && wiringDashboardResource.resource.content && _.isArray(wiringDashboardResource.resource.content)) {
        wiringDashboardResourceContent = _.clone(wiringDashboardResource.resource.content);
      }

      if (componentsDashboardResource && componentsDashboardResource.resource && componentsDashboardResource.resource.content && _.isArray(componentsDashboardResource.resource.content)) {
        preloadValues(componentsDashboardResource.resource.content, self.resources.reduce(function (memo, resource) {
          memo[resource.id] = resource.resource.get("uri");
          return memo;
        }, {})); // we need to make sure that "filterGroup" component goes before all "inputControl" components,
        // and all inputControls are sorted by "position" attribute

        var content = componentsDashboardResource.resource.content,
            filterGroup,
            inputControls = [],
            otherComponents = _.reject(content, function (component) {
          if (component.type === dashboardComponentTypes.FILTER_GROUP) {
            filterGroup = component;
            return true;
          } else if (component.type === dashboardComponentTypes.INPUT_CONTROL) {
            inputControls.push(component);
            return true;
          }

          return false;
        });

        if (filterGroup && inputControls.length) {
          inputControls = _.sortBy(inputControls, "position");
          content = otherComponents.concat(filterGroup, inputControls);
        }

        _.forEach(content, function (componentObj) {
          components.add(dashboardComponentModelFactory(componentObj, {
            resource: self.resources.get(componentObj.resource),
            collection: foundationModel.components,
            dashboardId: self.dashboardId || self.cid
          }));
        });

        if (layoutDashboardResource && layoutDashboardResource.resource) {
          components.setPositionFromHtml(layoutDashboardResource.resource.content);
        }

        foundationModel.components.set(components.models, {
          merge: true,
          remove: true,
          add: true
        });
      }

      if (wiringDashboardResourceContent) {
        foundationModel.wiring.set(_.map(ensureBackwardCompatibility(wiringDashboardResourceContent, foundationModel), function (connectionObj) {
          return new DashboardWiringModel(_.omit(connectionObj, "consumers"), {
            component: foundationModel.components.get(connectionObj.component),
            consumers: connectionObj.consumers
          });
        }));

        _.each(wiringDashboardResourceContent, function (connectionObj) {
          foundationModel.wiring.get(connectionObj.producer).consumers.set(connectionObj.consumers);
        });
      }
    });
  },
  clone: function clone(dashboardId) {
    var clonedModel = new this.constructor({}, {
      dashboardId: dashboardId
    });
    clonedModel.applyJsonState(this.toJSON(true));
    return clonedModel;
  },
  applyJsonState: function applyJsonState(fullJsonState) {
    var resourcesContent = {};

    _.each(fullJsonState.resources, function (resourceObj) {
      if ("file" in resourceObj.resource) {
        resourcesContent[resourceObj.name] = resourceObj.resource.file.content;
        delete resourceObj.resource.file.content;
      }
    });

    this.set(fullJsonState); // this is temporary solution

    _.each(fullJsonState.resources, function (resourceObj) {
      if (resourceObj.name in resourcesContent) {
        resourceObj.resource.file.content = resourcesContent[resourceObj.name];
      }
    });

    this.updateResourceCollection(); // emulate result of fetchContent method

    this.resources.forEach(function (dashboardResource) {
      if (dashboardResource.get("name") in resourcesContent) {
        dashboardResource.resource.set("content", resourcesContent[dashboardResource.get("name")]);
      }
    });
    this.updateFoundationCollection();
  }
});

function preloadValues(components, idToUriMap) {
  var controls = _.where(components, {
    type: dashboardComponentTypes.INPUT_CONTROL
  }),
      controlGroups = _.reduce(controls, function (memo, control) {
    (memo[control.ownerResourceId] || (memo[control.ownerResourceId] = [])).push(control);
    return memo;
  }, {});

  _.each(_.keys(controlGroups), function (key) {
    ParametersCache.add({
      reportUri: idToUriMap[key]
    }, {
      full: !!_.findWhere(controlGroups[key], {
        fullCollectionRequired: true
      }),
      knownIds: _.pluck(controlGroups[key], "ownerResourceParameterName"),
      data: _.reduce(controlGroups[key], function (memo, control) {
        memo[control.ownerResourceParameterName] = control.value;
        return memo;
      }, {})
    });
  });
}

function ensureBackwardCompatibility(wiring, foundation) {
  try {
    var propsName = foundation.components.getDashboardPropertiesComponent().get("id"),
        propsWiring = _.find(wiring, function (w) {
      return w.component === propsName && w.name === dashboardWiringStandardIds.APPLY_SIGNAL;
    });

    if (!propsWiring) {
      wiring.push({
        component: propsName,
        consumers: [],
        name: dashboardWiringStandardIds.APPLY_SIGNAL,
        producer: propsName + ":" + dashboardWiringStandardIds.APPLY_SIGNAL
      });
    }
  } catch (e) {}

  return wiring;
}

});