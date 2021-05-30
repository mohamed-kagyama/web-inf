define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FAKE_ROOT_FOLDER_ID = '@fakeResourceId';
var PUBLIC_FOLDER_URI = '/public';
module.exports = {
  ROOT_FOLDER: {
    URI: '/',
    FAKE_ID: FAKE_ROOT_FOLDER_ID,
    FOLDER: {
      id: FAKE_ROOT_FOLDER_ID,
      uri: '/',
      resourceType: repositoryResourceTypes.FOLDER,
      _links: {
        content: '@fakeContentLink'
      }
    }
  },
  PUBLIC_FOLDER: {
    URI: PUBLIC_FOLDER_URI,
    FOLDER: {
      id: PUBLIC_FOLDER_URI,
      uri: PUBLIC_FOLDER_URI,
      resourceType: repositoryResourceTypes.FOLDER,
      _links: {
        content: '@fakeContentLink'
      }
    }
  }
};

});