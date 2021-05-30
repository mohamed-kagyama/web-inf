define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var RepositoryResourceModel = require("runtime_dependencies/bi-repository/src/bi/repository/model/RepositoryResourceModel");

var RepositoryJsonFileModel = require('./RepositoryJsonFileModel');

var RepositoryComponentsFileModel = require('./RepositoryComponentsFileModel');

var RepositoryHtmlFileModel = require('./RepositoryHtmlFileModel');

var dashboardResourceReferenceTypes = require('../enum/dashboardResourceReferenceTypes');

var dashboardResourceTypes = require('../enum/dashboardResourceTypes');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

var dashboardSettings = require('../dashboardSettings');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createResource(resourceJson) {
  if (dashboardResourceReferenceTypes.FILE in resourceJson) {
    this.resourceReferenceType = dashboardResourceReferenceTypes.FILE;

    if (this.get('type') === dashboardResourceTypes.COMPONENTS) {
      this.resource = new RepositoryComponentsFileModel(resourceJson[this.resourceReferenceType], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    } else if (this.get('type') === dashboardResourceTypes.LAYOUT) {
      this.resource = new RepositoryHtmlFileModel(resourceJson[this.resourceReferenceType], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    } else {
      this.resource = new RepositoryJsonFileModel(resourceJson[this.resourceReferenceType], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    }
  } else if (dashboardResourceReferenceTypes.ADHOC_VIEW in resourceJson) {
    this.resourceReferenceType = dashboardResourceReferenceTypes.ADHOC_VIEW;
    this.resource = new RepositoryResourceModel(resourceJson[this.resourceReferenceType], {
      contextPath: dashboardSettings.CONTEXT_PATH,
      type: repositoryResourceTypes.ADHOC_DATA_VIEW
    });
  } else if (dashboardResourceReferenceTypes.REPORT in resourceJson) {
    this.resourceReferenceType = dashboardResourceReferenceTypes.REPORT;
    this.resource = new RepositoryResourceModel(resourceJson[this.resourceReferenceType], {
      contextPath: dashboardSettings.CONTEXT_PATH,
      type: repositoryResourceTypes.REPORT_UNIT
    });
  } else if (dashboardResourceReferenceTypes.INPUT_CONTROL in resourceJson) {
    this.resourceReferenceType = dashboardResourceReferenceTypes.INPUT_CONTROL;
    this.resource = new RepositoryResourceModel(resourceJson[this.resourceReferenceType], {
      contextPath: dashboardSettings.CONTEXT_PATH,
      type: repositoryResourceTypes.INPUT_CONTROL
    });
  } else if (dashboardResourceReferenceTypes.RESOURCE_REFERENCE in resourceJson) {
    if (this.get('type') === dashboardResourceTypes.COMPONENTS) {
      this.resourceReferenceType = dashboardResourceReferenceTypes.FILE;
      this.resource = new RepositoryComponentsFileModel(resourceJson[dashboardResourceReferenceTypes.RESOURCE_REFERENCE], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    } else if (this.get('type') === dashboardResourceTypes.LAYOUT) {
      this.resourceReferenceType = dashboardResourceReferenceTypes.FILE;
      this.resource = new RepositoryHtmlFileModel(resourceJson[dashboardResourceReferenceTypes.RESOURCE_REFERENCE], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    } else if (this.get('type') === dashboardResourceTypes.WIRING) {
      this.resourceReferenceType = dashboardResourceReferenceTypes.FILE;
      this.resource = new RepositoryJsonFileModel(resourceJson[dashboardResourceReferenceTypes.RESOURCE_REFERENCE], {
        contextPath: dashboardSettings.CONTEXT_PATH
      });
    } else {
      this.resourceReferenceType = dashboardResourceReferenceTypes.RESOURCE_REFERENCE;
      this.resource = new RepositoryResourceModel(resourceJson[this.resourceReferenceType], {
        contextPath: dashboardSettings.CONTEXT_PATH,
        type: repositoryResourceTypes.RESOURCE_LOOKUP
      });
    }
  }
}

var DashboardResourceModel = Backbone.Model.extend({
  idAttribute: 'name',
  defaults: {
    name: undefined,
    type: undefined,
    resource: undefined
  },
  initialize: function initialize() {
    this.updateResource();
    this.on('change:resource', this.updateResource);
  },
  updateResource: function updateResource() {
    var resourceJson = this.get('resource');

    if (resourceJson && _.isObject(resourceJson)) {
      if (!this.resource) {
        createResource.call(this, resourceJson);
      } else {
        if (this.resourceReferenceType in resourceJson) {
          this.resource.set(resourceJson[this.resourceReferenceType]);
        } else {
          createResource.call(this, resourceJson);
        }
      }
    }
  },
  toJSON: function toJSON(useFullResource) {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.resource = {}; // TODO: need additional marker to differentiate embedded and external resources
    // TODO: need additional marker to differentiate embedded and external resources

    if (this.resourceReferenceType !== dashboardResourceReferenceTypes.FILE) {
      if (this.resource.isNew() || useFullResource === true) {
        json.resource[this.resourceReferenceType] = this.resource.toJSON();
      } else {
        json.resource[dashboardResourceReferenceTypes.RESOURCE_REFERENCE] = {
          'uri': this.resource.get('uri')
        };
      }
    } else {
      json.resource[dashboardResourceReferenceTypes.FILE] = this.resource.toJSON();
      delete json.resource[dashboardResourceReferenceTypes.FILE].version;
      delete json.resource[dashboardResourceReferenceTypes.FILE].uri;
      delete json.resource[dashboardResourceReferenceTypes.FILE].permissionMask;
      delete json.resource[dashboardResourceReferenceTypes.FILE].creationDate;
      delete json.resource[dashboardResourceReferenceTypes.FILE].updateDate;
    }

    return json;
  }
});

DashboardResourceModel.createDashboardResource = function (componentObj, contextPath) {
  var resourceObj = {};

  if (componentObj.resourceType === repositoryResourceTypes.ADHOC_DATA_VIEW) {
    resourceObj[dashboardResourceReferenceTypes.ADHOC_VIEW] = componentObj;
  } else if (componentObj.resourceType === repositoryResourceTypes.REPORT_UNIT) {
    resourceObj[dashboardResourceReferenceTypes.REPORT] = componentObj;
  } else if (componentObj.resourceType === repositoryResourceTypes.INPUT_CONTROL) {
    resourceObj[dashboardResourceReferenceTypes.INPUT_CONTROL] = componentObj;
  }

  return new this({
    resource: resourceObj,
    type: componentObj.resourceType,
    name: componentObj.uri
  }, {
    contextPath: contextPath
  });
};

module.exports = DashboardResourceModel;

});