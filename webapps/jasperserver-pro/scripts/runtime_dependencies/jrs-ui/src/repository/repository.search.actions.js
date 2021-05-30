define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var dialogs = require('../components/components.dialogs');

var _ = require('underscore');

var _repositorySearchMain = require('./repository.search.main');

var repositorySearch = _repositorySearchMain.repositorySearch;
var ResourcesUtils = _repositorySearchMain.ResourcesUtils;
var invokeResourceAction = _repositorySearchMain.invokeResourceAction;
var isPropertiesChanged = _repositorySearchMain.isPropertiesChanged;
var isPermissionsChanged = _repositorySearchMain.isPermissionsChanged;

var actionModel = require('../actionModel/actionModel.modelGenerator');

var _namespaceNamespace = require("../namespace/namespace");

var JRS = _namespaceNamespace.JRS;

var _coreCoreAjax = require("../core/core.ajax");

var ajax = _coreCoreAjax.ajax;
var ajaxTargettedUpdate = _coreCoreAjax.ajaxTargettedUpdate;
var AjaxRequester = _coreCoreAjax.AjaxRequester;

var _coreCoreAjaxUtils = require("../core/core.ajax.utils");

var baseErrorHandler = _coreCoreAjaxUtils.baseErrorHandler;

var _utilUtilsCommon = require("../util/utils.common");

var ajaxIframeDownload = _utilUtilsCommon.ajaxIframeDownload;
var doNothing = _utilUtilsCommon.doNothing;
var redirectToUrl = _utilUtilsCommon.redirectToUrl;
var downloadFileByUrl = _utilUtilsCommon.downloadFileByUrl;

var jQuery = require('jquery');

var layoutModule = require('../core/core.layout');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * @version: $Id$
 */

/* global alert, confirm*/

/**
 * Asynchronous action class.
 */
repositorySearch.Action = function (invokeFn) {
  if (Object.isFunction(invokeFn)) {
    this.invokeAction = invokeFn;
  }
};

repositorySearch.Action.DEFAULT = 'default-action';
repositorySearch.Action.addMethod('invokeAction', doNothing);
repositorySearch.folderActionFactory = {
  'CreateFolder': function CreateFolder(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.showCreateFolderConfirm(folder);
    });
  },
  'CopyFolder': function CopyFolder(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.copy(folder);
    });
  },
  'MoveFolder': function MoveFolder(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.move(folder);
    });
  },
  'PasteFolder': function PasteFolder(folder) {
    return new repositorySearch.Action(function () {
      var actionName;
      var toFolder = folder ? folder : repositorySearch.model.getContextFolder();
      var object = repositorySearch.CopyMoveController.object;

      if (repositorySearch.CopyMoveController.isCopyFolder()) {
        actionName = repositorySearch.FolderAction.COPY;
      } else if (repositorySearch.CopyMoveController.isMoveFolder()) {
        actionName = repositorySearch.FolderAction.MOVE;
      } else {
        return;
      }

      var action = new repositorySearch.ServerAction.createFolderAction(actionName, {
        toFolder: toFolder,
        folder: repositorySearch.CopyMoveController.object
      });
      action.invokeAction();
    });
  },
  'PasteResources': function PasteResources(folder) {
    return new repositorySearch.Action(function () {
      var actionName;
      var toFolder = folder ? folder : repositorySearch.model.getContextFolder();

      if (!toFolder) {
        toFolder = repositorySearch.model.getSelectedFolder();
      }

      var object = repositorySearch.CopyMoveController.object;
      var resources = repositorySearch.CopyMoveController.isBulkAction() ? [].concat(object) : [object];

      if (repositorySearch.CopyMoveController.isCopyResource()) {
        actionName = repositorySearch.ResourceAction.COPY;
      } else if (repositorySearch.CopyMoveController.isMoveResource()) {
        actionName = repositorySearch.ResourceAction.MOVE;
      } else {
        return;
      }

      for (var i = 0; i < resources.length; i++) {
        if (resources[i].parentResource) {
          var uri = resources[i].parentResource.URI,
              contains = false;

          for (var j = 0; j < resources.length && !contains; j++) {
            contains |= resources[j].URI == uri;
          }

          contains || resources.push(resources[i].parentResource);
        }
      }

      var action = new repositorySearch.ServerAction.createResourceAction(actionName, {
        resources: resources,
        folder: toFolder
      });
      action.invokeAction();
    });
  },
  'DeleteFolder': function DeleteFolder(folder) {
    return new repositorySearch.Action(function () {
      actionModel.hideMenu();
      repositorySearch.showDeleteFolderConfirm(folder);
    });
  },
  'ShowFolderProperties': function ShowFolderProperties(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.showFolderProperties(folder);
    });
  },
  'EditFolderProperties': function EditFolderProperties(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.editFolderProperties(folder);
    });
  },
  'AssignPermissions': function AssignPermissions(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.editFolderPermissions(folder);
    });
  },
  'SetActiveThemeFolder': function SetActiveThemeFolder(folder) {
    return new repositorySearch.Action(function () {
      var action = new repositorySearch.ServerAction.createFolderAction(repositorySearch.ThemeAction.SETTHEME, {
        folder: folder
      });
      action.invokeAction();
    });
  },
  'DownloadTheme': function DownloadTheme(folder) {
    return new repositorySearch.Action(function () {
      var action = new repositorySearch.ServerAction.createFolderAction(repositorySearch.ThemeAction.DOWNLOAD_THEME, {
        folder: folder
      });
      action.initDownload();
    });
  },
  'UploadTheme': function UploadTheme(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.showUploadThemeConfirm(folder, false);
    });
  },
  'ReuploadTheme': function ReuploadTheme(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.showUploadThemeConfirm(folder, true);
    });
  },
  'Export': function Export(folder) {
    return new repositorySearch.Action(function () {
      repositorySearch.exportDialog.openRepoDialog(folder);
    });
  }
};

function parseRepoData(data) {
  if (_.isArray(data)) {
    return _.pluck(data, 'URIString');
  } else {
    return [data.URIString];
  }
}

repositorySearch.resourceActionFactory = {
  'Copy': function Copy(resource) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.copy(resource);
    });
  },
  'Move': function Move(resource) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.move(resource);
    });
  },
  'Delete': function Delete(resource) {
    return new repositorySearch.Action(function () {
      actionModel.hideMenu();
      repositorySearch.showDeleteResourceConfirm(resource);
    });
  },
  'Export': function Export(resource, options) {
    return new repositorySearch.Action(function () {
      repositorySearch.exportDialog.openRepoDialog(resource);
    });
  },
  'ShowProperties': function ShowProperties(resource, options) {
    return new repositorySearch.Action(function () {
      repositorySearch.showResourceProperties(resource, options);
    });
  },
  'EditProperties': function EditProperties(resource, options) {
    return new repositorySearch.Action(function () {
      repositorySearch.editResourceProperties(resource, options);
    });
  },
  'AssignPermissionsToResourceAction': function AssignPermissionsToResourceAction(resource) {
    return new repositorySearch.Action(function () {
      repositorySearch.editResourcePermissions(resource);
    });
  },
  'GenerateResourceAction': function GenerateResourceAction(resource, options) {
    return new repositorySearch.Action(function () {
      JRS.CreateReport.selectGenerator(resource.URIString);
    });
  },
  'ConvertResourceAction': function ConvertResourceAction(resource, options) {
    return new repositorySearch.Action(function () {
      var action = new repositorySearch.ServerAction.createConvertAction(repositorySearch.ResourceAction.CONVERT, {
        reportUri: resource.URIString
      });
      action.invokeAction();
    });
  }
};
repositorySearch.bulkActionFactory = {
  'Run': function Run(resources) {
    return new repositorySearch.Action(function () {
      resources.each(function (resource, index) {
        var action = repositorySearch.RedirectAction.createRunResourceAction(resource, index !== 0);
        action.invokeAction();
      });
    });
  },
  'Edit': function Edit(resources) {
    return new repositorySearch.Action(function () {
      resources.each(function (resource, index) {
        var action = repositorySearch.RedirectAction.createEditResourceAction(resource, index !== 0);
        action.invokeAction();
      });
    });
  },
  'Open': function Open(resources) {
    return new repositorySearch.Action(function () {
      resources.each(function (resource, index) {
        var action = repositorySearch.RedirectAction.createOpenResourceAction(resource, resources.length > 1);
        action.invokeAction();
      });
    });
  },
  'Copy': function Copy(resources) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.copy(resources);
    });
  },
  'Move': function Move(resources) {
    return new repositorySearch.Action(function () {
      repositorySearch.CopyMoveController.move(resources);
    });
  },
  'Delete': function Delete(resources) {
    return new repositorySearch.Action(function () {
      actionModel.hideMenu();
      resources.length == 1 ? repositorySearch.showDeleteResourceConfirm(resources[0]) : repositorySearch.showBulkDeleteResourcesConfirm(resources);
    });
  },
  'ShowProperties': function ShowProperties(resources) {
    return new repositorySearch.Action(function () {
      resources.each(function (resource, index) {
        invokeResourceAction('ShowProperties', resource, {
          cascade: true,
          position: index,
          number: resources.length
        });
      });
    });
  },
  'EditProperties': function EditProperties(resources) {
    return new repositorySearch.Action(function () {
      resources.each(function (resource, index) {
        invokeResourceAction('EditProperties', resource, {
          cascade: true,
          position: index,
          number: resources.length
        });
      });
    });
  },
  'Export': function Export(resources) {
    return new repositorySearch.Action(function () {
      repositorySearch.exportDialog.openRepoDialog(resources);
    });
  }
};
/**
* Server action class.
*/

/**
 * Server action class.
 */

repositorySearch.ServerAction = function (eventId, options) {
  this.actionURL = 'flow.html?_flowExecutionKey=' + repositorySearch.flowExecutionKey + '&_eventId=' + eventId;
  this.data = Object.toQueryString(options.data);
};
/**
* Invokes server action.
*/

/**
 * Invokes server action.
 */


repositorySearch.ServerAction.addMethod('invokeAction', function () {
  ajaxTargettedUpdate(this.actionURL, {
    postData: this.data,
    callback: function (response) {
      if (response.status == 'OK') {
        this.onSuccess(response.data);
      } else {
        this.onError(response.data);
      }
    }.bind(this),
    errorHandler: this._serverErrorHandler,
    mode: AjaxRequester.prototype.EVAL_JSON
  });
});
repositorySearch.ServerAction.addMethod('initDownload', function () {
  var url = this.actionURL + '&' + this.data;
  ajaxIframeDownload(url, {
    onload: function onload() {
      var str = jQuery($('ajax-download-iframe').contentDocument.body).html();

      try {
        var json = str.evalJSON();
        alert(json.data);
      } catch (ex) {} // exception here means there is no JSON object
      // which is a good thing, i.e. file did download!

    }
  });
});
repositorySearch.ServerAction.addMethod('_serverErrorHandler', function (ajaxAgent) {
  /* Login request is handled in baseErrorHandler */

  /* TODO clean up this method, looks like need to completely remove it and use baseErrorHandler directly */

  /* if (ajaxAgent.getResponseHeader("LoginRequested")) {
      var loginAndGoToSearch = new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT, {
          flowId: 'searchFlow'
      });
       loginAndGoToSearch.invokeAction();
      return true;
  } */
  return baseErrorHandler(ajaxAgent);
  /* Error 500 is handled in baseErrorHandler */

  /* if (resolved && ajaxAgent.status == 500) {
      var gotoError = new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT, {
          url: 'flow.html',
          paramsMap: {
              _flowExecutionKey: repositorySearch.flowExecutionKey,
              _eventId: 'error'
          }
      });
      gotoError.invokeAction();
      return true;
  } */
});
/**
* Handler for success response.
*
* @param data the data received from the server.
*/

/**
 * Handler for success response.
 *
 * @param data the data received from the server.
 */

repositorySearch.ServerAction.addMethod('onSuccess', doNothing);
/**
* Handler for error response.
*
* @param data the data received from the server.
*/

/**
 * Handler for error response.
 *
 * @param data the data received from the server.
 */

repositorySearch.ServerAction.addMethod('onError', doNothing);
/*
* Creates server action instance for repository search actions.
*
* @param actionName the name of the search action.
* @param options {JSON object} - set of options for search action. The number of options and their names are different
*      for different search actions.
*/

/*
 * Creates server action instance for repository search actions.
 *
 * @param actionName the name of the search action.
 * @param options {JSON object} - set of options for search action. The number of options and their names are different
 *      for different search actions.
 */

repositorySearch.ServerAction.createSearchAction = function (actionName, options) {
  options.mode = repositorySearch.mode;
  var action = new repositorySearch.ServerAction(actionName, {
    data: options
  });

  action.onSuccess = function (data) {
    if (actionName == repositorySearch.SearchAction.NEXT) {
      repositorySearch.fire(repositorySearch.Event.RESULT_NEXT, data);
    } else if (actionName == repositorySearch.SearchAction.GET_RESOURCE_CHILDREN) {
      repositorySearch.fire(repositorySearch.Event.CHILDREN_LOADED, {
        inputData: options,
        responseData: data
      });
    } else {
      repositorySearch.fire(repositorySearch.Event.RESULT_CHANGED, data);
      repositorySearch.fire(repositorySearch.Event.STATE_CHANGED, data);

      if (repositorySearch.mode == repositorySearch.Mode.SEARCH) {
        repositorySearch.fire(repositorySearch.Event.FILTER_PATH_CHANGED, data);
      }
    }
  };

  action.onError = function (data) {
    repositorySearch.fire(repositorySearch.Event.RESULT_ERROR, data);
  };

  return action;
};
/*
* Creates server action instance for folder actions.
*
* @param actionName the name of the folder action.
* @param options {JSON object} - set of options for folder action. The number of options and their names are different
*      for different folder actions.
*/

/*
 * Creates server action instance for folder actions.
 *
 * @param actionName the name of the folder action.
 * @param options {JSON object} - set of options for folder action. The number of options and their names are different
 *      for different folder actions.
 */


repositorySearch.ServerAction.createFolderAction = function (actionName, options) {
  var params;
  var eventName;
  var errorEventName;

  if (repositorySearch.FolderAction.DELETE == actionName) {
    params = {
      sourceFolderUri: options.folder.URI
    };
    eventName = repositorySearch.FolderEvent.DELETED;
    errorEventName = repositorySearch.FolderEvent.DELETE_ERROR;
  } else if (repositorySearch.FolderAction.CREATE == actionName) {
    params = {
      destFolderUri: options.toFolder.URI,
      folder: Object.toJSON({
        URI: '',
        label: options.label,
        desc: options.desc
      })
    };
    eventName = repositorySearch.FolderEvent.CREATED;
    errorEventName = repositorySearch.FolderEvent.CREATE_ERROR;
  } else if (repositorySearch.FolderAction.COPY == actionName) {
    params = {
      destFolderUri: options.toFolder.URI,
      sourceFolderUri: options.folder.URI
    };
    eventName = repositorySearch.FolderEvent.COPIED;
    errorEventName = repositorySearch.FolderEvent.COPY_ERROR;
  } else if (repositorySearch.FolderAction.MOVE == actionName) {
    params = {
      destFolderUri: options.toFolder.URI,
      sourceFolderUri: options.folder.URI
    };
    eventName = repositorySearch.FolderEvent.MOVED;
    errorEventName = repositorySearch.FolderEvent.MOVE_ERROR;
  } else if (repositorySearch.FolderAction.UPDATE == actionName) {
    params = {
      folder: Object.toJSON({
        URI: options.folder.URI,
        label: options.folder.label,
        desc: options.folder.description
      })
    };
    eventName = repositorySearch.FolderEvent.UPDATED;
    errorEventName = repositorySearch.FolderEvent.UPDATE_ERROR;
  } else if (repositorySearch.ThemeAction.SETTHEME == actionName) {
    if (options.folder) {
      params = {
        folderUri: options.folder.URI
      };
    } else if (options.folderUri) {
      params = {
        folderUri: options.folderUri
      };
    }

    eventName = repositorySearch.ThemeEvent.UPDATED;
  } else if (repositorySearch.ThemeAction.DOWNLOAD_THEME == actionName) {
    params = {
      folderUri: options.folder.URI
    };
    errorEventName = repositorySearch.ThemeEvent.THEME_ERROR;
  } else if (repositorySearch.ThemeAction.REUPLOAD == actionName) {
    params = {
      themeName: options.themeName,
      folderUri: options.folderUri
    };
    eventName = repositorySearch.ThemeEvent.REUPLOADED;
    errorEventName = repositorySearch.ThemeEvent.THEME_ERROR;
  }

  if (!params || !eventName || !errorEventName) {
    new Error('Unsupported folder action.');
  }

  var action = new repositorySearch.ServerAction(actionName, {
    data: params
  });

  action.onSuccess = function (data) {
    repositorySearch.fire(eventName, {
      responseData: data,
      inputData: options
    });
  };

  action.onError = function (data) {
    repositorySearch.fire(errorEventName, {
      responseData: data,
      inputData: options
    });
  };

  return action;
};
/*
* Creates server action instance for folder actions.
*
* @param actionName the name of the folder action.
* @param options {JSON object} - set of options for folder action. The number of options and their names are different
*      for different folder actions.
*/

/*
 * Creates server action instance for folder actions.
 *
 * @param actionName the name of the folder action.
 * @param options {JSON object} - set of options for folder action. The number of options and their names are different
 *      for different folder actions.
 */


repositorySearch.ServerAction.createResourceAction = function (actionName, options) {
  var params;
  var eventName;
  var errorEventName;

  if (repositorySearch.ResourceAction.DELETE == actionName) {
    var list = ResourcesUtils.getResourceUriAndTypeList(options.resources);
    params = {
      selectedResources: Object.toJSON(list)
    };
    eventName = repositorySearch.ResourceEvent.DELETED;
    errorEventName = repositorySearch.ResourceEvent.DELETE_ERROR;
  } else if (repositorySearch.ResourceAction.COPY == actionName) {
    var copyUris = ResourcesUtils.getResourceUris(options.resources);
    params = {
      selectedResources: Object.toJSON(copyUris),
      destFolderUri: options.folder.URI
    };
    eventName = repositorySearch.ResourceEvent.COPIED;
    errorEventName = repositorySearch.ResourceEvent.COPY_ERROR;
  } else if (repositorySearch.ResourceAction.MOVE == actionName) {
    var moveUris = ResourcesUtils.getResourceUris(options.resources);
    params = {
      selectedResources: Object.toJSON(moveUris),
      destFolderUri: options.folder.URI
    };
    eventName = repositorySearch.ResourceEvent.MOVED;
    errorEventName = repositorySearch.ResourceEvent.MOVE_ERROR;
  } else if (repositorySearch.ResourceAction.UPDATE == actionName) {
    params = {
      selectedResource: Object.toJSON(options.resource)
    };
    eventName = repositorySearch.ResourceEvent.UPDATED;
    errorEventName = repositorySearch.ResourceEvent.UPDATE_ERROR;
  }

  if (!params || !eventName || !errorEventName) {
    new Error('Unsupported resource action.');
  }

  var action = new repositorySearch.ServerAction(actionName, {
    data: params
  });

  action.onSuccess = function (data) {
    if (repositorySearch.ResourceAction.MOVE == actionName) {
      repositorySearch.CopyMoveController.cancel();
    }

    repositorySearch.fire(eventName, {
      responseData: data,
      inputData: options
    });
  };

  function promptFilteredRetry(existingLabels, filteredResources) {
    dialogs.dependentResources.show(existingLabels, {
      dependenciesBtnOk: function dependenciesBtnOk() {
        var action = new repositorySearch.ServerAction.createResourceAction(actionName, {
          resources: filteredResources,
          folder: options.folder
        });
        action.invokeAction();
      }
    }, {
      buttons: ['ok', 'cancel'],
      dialogTitle: repositorySearch.getMessage('dialog.resources.exist.title'),
      topMessage: repositorySearch.getMessage('dialog.resources.exist'),
      bottomMessage: repositorySearch.getMessage('dialog.resources.exist.confirm.skip')
    });
  }

  function convertErrorResponse(data) {
    var dataObj;

    if (repositorySearch.ResourceAction.COPY != actionName && repositorySearch.ResourceAction.MOVE != actionName) {
      return data;
    }

    try {
      dataObj = JSON.parse(data);
    } catch (e) {
      return data;
    }

    if (!dataObj || !dataObj.existingLabels) {
      return data;
    }

    var filteredResources = _.filter(options.resources, function (item) {
      return dataObj.existingLabels.indexOf(item.label) == -1;
    });

    if (filteredResources.length === 0) {
      return (dataObj.existingLabels.length == 1 ? repositorySearch.getMessage('dialog.resources.one.exists') : repositorySearch.getMessage('dialog.resources.all.exist')) + ' ' + options.folder.URIString;
    }

    promptFilteredRetry(dataObj.existingLabels, filteredResources);
    return null;
  }

  action.onError = function (data) {
    var resp = convertErrorResponse(data);

    if (resp) {
      repositorySearch.fire(errorEventName, {
        responseData: resp,
        inputData: options
      });
    }
  };

  return action;
};
/*
* Creates server action instance for permissions actions.
*
* @param actionName the name of the permission action.
* @param options {JSON object} - set of options for permission action. The number of options and their names are different
*      for different permission actions.
*/

/*
 * Creates server action instance for permissions actions.
 *
 * @param actionName the name of the permission action.
 * @param options {JSON object} - set of options for permission action. The number of options and their names are different
 *      for different permission actions.
 */


repositorySearch.ServerAction.createPermissionAction = function (actionName, options) {
  var action = new repositorySearch.ServerAction(actionName, {
    data: options
  });
  var successEvent = actionName == repositorySearch.PermissionAction.UPDATE ? repositorySearch.PermissionEvent.UPDATED : repositorySearch.PermissionEvent.LOADED;

  action.onSuccess = function (data) {
    repositorySearch.fire(successEvent, {
      responseData: data,
      inputData: options,
      doSet: actionName != repositorySearch.PermissionAction.NEXT
    });
  };

  action.onError = function (data) {
    repositorySearch.fire(repositorySearch.PermissionEvent.ERROR, data);
  };

  return action;
};
/*
* Creates server action instance for permissions actions.
*
* @param actionName the name of the permission action.
* @param options {JSON object} - set of options for permission action. The number of options and their names are different
*      for different permission actions.
*/

/*
 * Creates server action instance for permissions actions.
 *
 * @param actionName the name of the permission action.
 * @param options {JSON object} - set of options for permission action. The number of options and their names are different
 *      for different permission actions.
 */


repositorySearch.ServerAction.createGenerateAction = function (actionName, options) {
  var action = new repositorySearch.ServerAction(actionName, {
    data: {
      data: Object.toJSON(options)
    }
  });
  action.actionURL = 'reportGenerator.html?action=' + actionName;

  action.onSuccess = function (data) {
    repositorySearch.fire(repositorySearch.ResourceEvent.GENERATED, {
      responseData: data,
      inputData: options
    });
  };

  action.onError = function (data) {
    repositorySearch.fire(repositorySearch.ResourceEvent.GENERATE_ERROR, {
      responseData: data,
      inputData: options
    });
  };

  return action;
};

repositorySearch.ServerAction.createConvertAction = function (actionName, options) {
  var action = new repositorySearch.ServerAction(actionName, {
    data: options
  });
  action.actionURL = 'dataViewConverter.html?action=' + actionName;

  action.onSuccess = function (data) {
    repositorySearch.fire(repositorySearch.ResourceEvent.CONVERTED, {
      responseData: data,
      inputData: options
    });
  };

  action.onError = function (data) {
    repositorySearch.fire(repositorySearch.ResourceEvent.CONVERT_ERROR, {
      responseData: data,
      inputData: options
    });
  };

  return action;
};
/**
* Creates server action instance for folder actions.
*
* @param type {} type of redirect. All supported types defined in {@see repositorySearch.RedirectType} map.
* @param options Set of options for action:
* <ul>
* <li>url {String} URL</li>
* <li>flowId {String} ID of the flow</li>
* <li>paramsMap {JSON Object} map of parameters</li>
* <li>encode {Boolean} </li>
* </ul>
*/

/**
 * Creates server action instance for folder actions.
 *
 * @param type {} type of redirect. All supported types defined in {@see repositorySearch.RedirectType} map.
 * @param options Set of options for action:
 * <ul>
 * <li>url {String} URL</li>
 * <li>flowId {String} ID of the flow</li>
 * <li>paramsMap {JSON Object} map of parameters</li>
 * <li>encode {Boolean} </li>
 * </ul>
 */


repositorySearch.RedirectAction = function (type, options) {
  this.DIMMER_TIMEOUT = 400;
  this.type = type;
  this.flowId = options.flowId;
  this.url = options.url ? options.url : this.flowId ? this.FLOW_URL : undefined;
  this.paramsMap = options.paramsMap || {};
  this.hash = options.hash ? '#' + options.hash : ''; //part of the url which may come after parameters: "#someHash"
  //part of the url which may come after parameters: "#someHash"

  this.encode = options.encode;

  if (this.type !== repositorySearch.RedirectType.FLOW_REDIRECT && this.url === this.FLOW_URL) {
    this.paramsMap['_flowId'] = this.flowId;
  }
};

repositorySearch.RedirectAction.addMethod('FLOW_URL', 'flow.html');
repositorySearch.RedirectAction.addMethod('_serializeParams', function (paramsMap, encode) {
  if (paramsMap) {
    var result = '';

    for (var name in paramsMap) {
      if (!Object.isUndefined(name)) {
        result += '&' + name + '=' + (encode ? encodeURIComponent(paramsMap[name]) : paramsMap[name]);
      }
    }

    return result && result.length > 0 ? result.substring(1) : '';
  } else {
    return '';
  }
});
repositorySearch.RedirectAction.addMethod('invokeAction', function (options) {
  options = options || {};
  var ajaxLoading = jQuery('#' + ajax.LOADING_ID);

  if (ajaxLoading.length > 0) {
    ajaxLoading.addClass(layoutModule.CANCELLABLE_CLASS);
    ajaxLoading.find("#cancel").click(function () {
      jQuery(this).addClass('disabled');
      ajaxLoading.addClass('cancelCalled');
      window.location.reload();
    });
  }

  if (this.type === repositorySearch.RedirectType.FLOW_REDIRECT) {
    var form = $('redirectForm');
    var flowParams = $('flowParams');
    flowParams.setValue(this.flowId + '?' + this._serializeParams(this.paramsMap, this.encode));
    var action = new repositorySearch.ServerAction('isServerAvailable', {
      data: {}
    }); // // show loading popup. It will be shown till new page appears as a response for form submit below

    var timeout = setTimeout(function () {
      dialogs.popup.show(ajax.LOADING_ID, true);
    }, this.DIMMER_TIMEOUT);

    action.onSuccess = function (data) {
      if (data.strip() == 'Yes') {
        // increment ajax request counter to avoid closing of a loading dialogue by common ajax response handler
        ++ajax.ajaxRequestCount;

        if (ajaxLoading.hasClass('cancelCalled')) {
          ajaxLoading.removeClass('cancelCalled');
        } else {
          form.submit();
        }

        repositorySearch.fire(repositorySearch.Event.FLOW_REDIRECT_RUNNING, data);
      } else {
        hidePopup();
        repositorySearch.fire(repositorySearch.Event.REDIRECT_ERROR, data);
      }
    };

    action.onError = function (data) {
      hidePopup();
      repositorySearch.fire(repositorySearch.Event.REDIRECT_ERROR, data);
    };

    var hidePopup = function hidePopup() {
      clearTimeout(timeout);
      dialogs.popup.hide(ajax.LOADING_ID);
    };

    action.invokeAction();
  } else if (this.type === repositorySearch.RedirectType.LOCATION_REDIRECT) {
    var url = this.url + (jQuery.isEmptyObject(this.paramsMap) ? '' : '?' + this._serializeParams(this.paramsMap, this.encode)) + this.hash; // because of this bug: http://stackoverflow.com/questions/13681156
    // because of this bug: http://stackoverflow.com/questions/13681156
    // so, we do this to overcome this issue

    if (options.isContentResource) {
      downloadFileByUrl(url);
    } else {
      redirectToUrl(url);
    }
  } else if (this.type === repositorySearch.RedirectType.WINDOW_REDIRECT) {
    var w = window.open(),
        params = this._serializeParams(this.paramsMap, this.encode);

    w.opener = null;
    w.document.location = this.url + (params ? '?' + params : '') + this.hash;
  }
});
repositorySearch.runActionFactory = {
  'ReportUnit': function ReportUnit(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.FLOW_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'flow.html',
      flowId: 'viewReportFlow',
      paramsMap: {
        _flowId: 'viewReportFlow',
        reportUnit: inNewTab ? encodeURIComponent(resource.URIString) : resource.URIString,
        standAlone: true,
        ParentFolderUri: inNewTab ? encodeURIComponent(resource.parentFolder) : resource.parentFolder
      }
    });
  },
  'AdhocReportUnit': function AdhocReportUnit(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.FLOW_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'flow.html',
      flowId: 'viewAdhocReportFlow',
      paramsMap: {
        reportUnit: inNewTab ? encodeURIComponent(resource.URIString) : resource.URIString,
        standAlone: true,
        ParentFolderUri: inNewTab ? encodeURIComponent(resource.parentFolder) : resource.parentFolder
      }
    });
  },
  'OlapUnit': function OlapUnit(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.LOCATION_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'olap/viewOlap.html',
      paramsMap: {
        name: inNewTab ? encodeURIComponent(resource.URIString) : resource.URIString,
        'new': true,
        parentFlow: 'searchFlow',
        ParentFolderUri: inNewTab ? encodeURIComponent(resource.parentFolder) : resource.parentFolder
      }
    });
  },
  'DashboardResource': function DashboardResource(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.FLOW_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'flow.html',
      flowId: 'dashboardRuntimeFlow',
      paramsMap: {
        dashboardResource: inNewTab ? encodeURIComponent(resource.URIString) : resource.URIString
      }
    });
  },
  'DashboardModelResource': function DashboardModelResource(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.LOCATION_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'dashboard/viewer.html#' + encodeURIComponent(resource.URIString)
    });
  },
  'ReportOptions': function ReportOptions(resource, inNewTab) {
    var params = {
      reportOptionsURI: inNewTab ? encodeURIComponent(resource.URIString) : resource.URIString,
      standAlone: true,
      ParentFolderUri: inNewTab ? encodeURIComponent(resource.parentFolder) : resource.parentFolder
    };
    var flow;
    var parentResource = resource.parentResource;

    if (parentResource && parentResource.typeEquals(repositorySearch.ResourceType.ADHOC_REPORT_UNIT)) {
      flow = 'viewAdhocReportFlow';
      params.reportUnit = inNewTab ? encodeURIComponent(parentResource.URIString) : parentResource.URIString;
    } else {
      flow = 'viewReportFlow';
    }

    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.FLOW_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'flow.html',
      flowId: flow,
      paramsMap: params
    });
  }
};
/**
* Creates server action instance for folder actions.
*
* @param resource {Resource} the name of the folder action.
*/

/**
 * Creates server action instance for folder actions.
 *
 * @param resource {Resource} the name of the folder action.
 */

repositorySearch.RedirectAction.createRunResourceAction = function (resource, inNewTab) {
  if (!resource) {
    resource = resource ? resource : repositorySearch.model.getSelectedResources()[0];
  }

  var factoryMethod = repositorySearch.runActionFactory[resource.typeSuffix()];

  if (factoryMethod) {
    return factoryMethod(resource, inNewTab);
  } else {
    return new repositorySearch.Action(function () {
      alert('Run action for resource type \'' + resource.resourceType + '\' is not implemented!');
    });
  }
};
/**
*
*  Run resource in a new tab
*
* @param resource {Resource} the name of the folder action.
*/

/**
 *
 *  Run resource in a new tab
 *
 * @param resource {Resource} the name of the folder action.
 */


repositorySearch.RedirectAction.createRunResourceInNewTabAction = function (resource, inNewTab) {
  return repositorySearch.RedirectAction.createRunResourceAction(resource, true);
};

repositorySearch.editActionFactory = {
  'default-action': function defaultAction(resource, actionType) {
    if (ResourcesUtils.isCustomDataSource(resource)) {
      return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
    } else {
      return new repositorySearch.Action(function () {
        alert('Edit action for resource type \'' + resource.resourceType + '\' is not implemented!');
      });
    }
  },
  'ReportUnit': function ReportUnit(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'reportUnitFlow',
      paramsMap: {
        selectedResource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'AdhocReportUnit': function AdhocReportUnit(resource, actionType) {
    return repositorySearch.editActionFactory['ReportUnit'](resource, actionType);
  },
  'DataDefinerUnit': function DataDefinerUnit(resource, actionType) {
    // Going into the report unit edit flow is useless for domain topic.
    // Edit will go to the data chooser flow, and "Open in designer", which used to go to data chooser,
    // is disabled.
    // see JRS-3395
    //        return repositorySearch.editActionFactory["ReportUnit"](resource, actionType);
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'queryBuilderFlow',
      paramsMap: {
        uri: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'OlapUnit': function OlapUnit(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'olapUnitFlow',
      paramsMap: {
        resource: resource.URIString,
        isEdit: 'edit',
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'DashboardResource': function DashboardResource(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'dashboardRuntimeFlow',
      paramsMap: {
        dashboardResource: resource.URIString
      }
    });
  },
  'ReportOptions': function ReportOptions(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'reportOptionsEditFlow',
      paramsMap: {
        reportOptionsURI: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'JdbcReportDataSource': function JdbcReportDataSource(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'addDataSourceFlow',
      paramsMap: {
        resource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'JndiJdbcReportDataSource': function JndiJdbcReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'CustomReportDataSource': function CustomReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'BeanReportDataSource': function BeanReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'VirtualReportDataSource': function VirtualReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'HiveDataSourceService': function HiveDataSourceService(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'CassandraDataSourceService': function CassandraDataSourceService(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'DiagnosticCustomDataSourceService': function DiagnosticCustomDataSourceService(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'MongoDbDataSourceService': function MongoDbDataSourceService(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'AwsReportDataSource': function AwsReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'AzureSqlReportDataSource': function AzureSqlReportDataSource(resource, actionType) {
    return repositorySearch.editActionFactory['JdbcReportDataSource'](resource, actionType);
  },
  'Query': function Query(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'queryFlow',
      paramsMap: {
        currentQuery: resource.URIString,
        isEdit: true,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'InputControl': function InputControl(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'addInputControlFlow',
      paramsMap: {
        isEdit: true,
        resource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'ListOfValues': function ListOfValues(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'addListOfValuesFlow',
      paramsMap: {
        resource: resource.URIString,
        isEdit: 'edit',
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'DataType': function DataType(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'dataTypeFlow',
      paramsMap: {
        resource: resource.URIString,
        isEdit: 'edit',
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'MondrianConnection': function MondrianConnection(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'olapClientConnectionFlow',
      paramsMap: {
        selectedResource: resource.URIString,
        isEdit: 'edit',
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'SecureMondrianConnection': function SecureMondrianConnection(resource, actionType) {
    return repositorySearch.editActionFactory['MondrianConnection'](resource, actionType);
  },
  'XMLAConnection': function XMLAConnection(resource, actionType) {
    return repositorySearch.editActionFactory['MondrianConnection'](resource, actionType);
  },
  'MondrianXMLADefinition': function MondrianXMLADefinition(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'mondrianXmlaSourceFlow',
      paramsMap: {
        selectedResource: resource.URIString,
        isEdit: 'edit',
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'FileResource': function FileResource(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'addFileResourceFlow',
      paramsMap: {
        selectedResource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'SemanticLayerDataSource': function SemanticLayerDataSource(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      url: 'domaindesigner.html',
      paramsMap: {
        uri: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  }
};
repositorySearch.resourceTypeToDefaultRedirectTypeMap = {};
repositorySearch.resourceTypeToDefaultRedirectTypeMap[repositorySearch.ResourceType.SEMANTIC_LAYER_DATA_SOURCE] = repositorySearch.RedirectType.LOCATION_REDIRECT;

repositorySearch.getDefaultRedirectTypeByResourceType = function (resourceType) {
  var defaultRedirectType = repositorySearch.resourceTypeToDefaultRedirectTypeMap[resourceType];

  if (!defaultRedirectType) {
    defaultRedirectType = repositorySearch.RedirectType.FLOW_REDIRECT;
  }

  return defaultRedirectType;
};
/**
 * Creates edit resource actions.
 *
 * @param resource {Resource} the name of the folder action.
 */


repositorySearch.RedirectAction.createEditResourceAction = function (resource, inNewTab) {
  if (!resource) {
    resource = repositorySearch.model.getSelectedResources()[0];
  }

  var type;

  if (inNewTab) {
    type = repositorySearch.RedirectType.WINDOW_REDIRECT;
  } else {
    type = repositorySearch.getDefaultRedirectTypeByResourceType(resource.resourceType);
  }

  var factoryMethod = repositorySearch.editActionFactory[resource.typeSuffix()];

  if (factoryMethod) {
    return factoryMethod(resource, type);
  } else {
    return repositorySearch.editActionFactory[repositorySearch.Action.DEFAULT](resource, type);
  }
};

repositorySearch.openActionFactory = {
  'ContentResource': function ContentResource(resource, actionType) {
    if (actionType === repositorySearch.RedirectType.FLOW_REDIRECT) {
      actionType = repositorySearch.RedirectType.LOCATION_REDIRECT;
    }

    return new repositorySearch.RedirectAction(actionType, {
      url: 'fileview/fileview' + resource.URIString,
      paramsMap: {}
    });
  },
  'DashboardResource': function DashboardResource(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'dashboardDesignerFlow',
      paramsMap: {
        resource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'DashboardModelResource': function DashboardModelResource(resource, inNewTab) {
    var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.LOCATION_REDIRECT;
    return new repositorySearch.RedirectAction(type, {
      url: 'dashboard/designer.html#' + encodeURIComponent(resource.URIString)
    });
  },
  'DataDefinerUnit': function DataDefinerUnit(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'queryBuilderFlow',
      paramsMap: {
        uri: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'AdhocReportUnit': function AdhocReportUnit(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'adhocFlow',
      paramsMap: {
        resource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  },
  'AdhocDataView': function AdhocDataView(resource, actionType) {
    return new repositorySearch.RedirectAction(actionType, {
      flowId: 'adhocFlow',
      paramsMap: {
        resource: resource.URIString,
        ParentFolderUri: resource.parentFolder
      }
    });
  }
};
/**
* Creates open action instance for resource actions.
*
* @param resource {Resource} the name of the folder action.
*/

/**
 * Creates open action instance for resource actions.
 *
 * @param resource {Resource} the name of the folder action.
 */

repositorySearch.RedirectAction.createOpenResourceAction = function (resource, inNewTab) {
  if (!resource) {
    resource = repositorySearch.model.getSelectedResources()[0];
  }

  var type = inNewTab ? repositorySearch.RedirectType.WINDOW_REDIRECT : repositorySearch.RedirectType.FLOW_REDIRECT;
  var factoryMethod = repositorySearch.openActionFactory[resource.typeSuffix()];

  if (factoryMethod) {
    return factoryMethod(resource, type);
  } else {
    return new repositorySearch.Action(function () {
      alert('Open action for resource type \'' + resource.resourceType + '\' is not implemented!');
    });
  }
};
/**
* Creates run in background action instance for resource actions.
*
* @param resource {Resource} the name of the folder action.
*/

/**
 * Creates run in background action instance for resource actions.
 *
 * @param resource {Resource} the name of the folder action.
 */


repositorySearch.RedirectAction.createRunInBackgroundResourceAction = function () {
  var resource = repositorySearch.model.getSelectedResources()[0];
  var reportUnitParentURI = '';

  if (resource.resourceType.endsWith('.ReportUnit') || resource.resourceType.endsWith('.AdhocReportUnit') || resource.resourceType.endsWith('.DashboardModelResource') || resource.resourceType.endsWith('.ReportOptions')) {
    if (resource.parentResource) {
      reportUnitParentURI = '@@parentReportURI=' + resource.parentResource.URIString + '@@';
    }

    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT, {
      url: JRS.vars.contextPath + '/scheduler/main.html',
      //paramsMap is necessary for backend controller
      //while hash is necessary for UI scheduler application
      paramsMap: {
        'reportUnitURI': resource.URIString,
        'parentReportUnitURI': resource.parentResource ? resource.parentResource.URIString : '',
        'resourceType': resource.resourceType.substring(resource.resourceType.lastIndexOf('.') + 1)
      },
      hash: 'runInBackground@' + resource.URIString + reportUnitParentURI,
      encode: true
    });
  }
};
/**
* Creates run in background action instance for resource.
*
* @param resource {Resource} the name of the folder action.
*/

/**
 * Creates run in background action instance for resource.
 *
 * @param resource {Resource} the name of the folder action.
 */


repositorySearch.RedirectAction.createScheduleAction = function () {
  var resource = repositorySearch.model.getSelectedResources()[0];
  var reportUnitParentURI = '';

  if (resource.resourceType.endsWith('.ReportUnit') || resource.resourceType.endsWith('.AdhocReportUnit') || resource.resourceType.endsWith('.DashboardModelResource') || resource.resourceType.endsWith('.ReportOptions')) {
    if (resource.parentResource) {
      reportUnitParentURI = '@@parentReportURI=' + resource.parentResource.URIString + '@@';
    }

    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT, {
      url: JRS.vars.contextPath + '/scheduler/main.html',
      //paramsMap is necessary for backend controller
      //while hash is necessary for UI scheduler application
      paramsMap: {
        'reportUnitURI': resource.URIString,
        'resourceType': resource.resourceType.substring(1 + resource.resourceType.lastIndexOf('.')),
        'parentReportUnitURI': resource.parentResource ? resource.parentResource.URIString : ''
      },
      hash: resource.URIString + reportUnitParentURI,
      encode: true
    });
  }
};

repositorySearch.createActionFactory = {
  'OlapClientConnection': function OlapClientConnection(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'olapClientConnectionFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'OlapUnit': function OlapUnit(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'olapUnitFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'ReportDataSource': function ReportDataSource(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'addDataSourceFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'SemanticLayerDataSource': function SemanticLayerDataSource(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.LOCATION_REDIRECT, {
      url: 'domaindesigner.html',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'FileResource': function FileResource(folder, fileType) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      //            flowId: 'fileResourceFlow', // old
      flowId: 'addFileResourceFlow',
      // new
      paramsMap: {
        expectedFileType: fileType,
        parentFolder: folder.URI
      }
    });
  },
  'ReportUnit': function ReportUnit(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'reportUnitFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'Query': function Query(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'queryFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'InputControl': function InputControl(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'addInputControlFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'DataType': function DataType(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'dataTypeFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'ListOfValues': function ListOfValues(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'addListOfValuesFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  },
  'XMLAConnection': function XMLAConnection(folder) {
    return new repositorySearch.RedirectAction(repositorySearch.RedirectType.FLOW_REDIRECT, {
      flowId: 'mondrianXmlaSourceFlow',
      paramsMap: {
        ParentFolderUri: folder.URI
      }
    });
  }
};

repositorySearch.RedirectAction.createCreateResourceAction = function (resourceTypeSuffix, fileType) {
  var folder = repositorySearch.model.getContextFolder();
  var factoryMethod = repositorySearch.createActionFactory[resourceTypeSuffix];

  if (factoryMethod) {
    return factoryMethod(folder, fileType);
  } else {
    return new repositorySearch.Action(function () {
      alert('Create action for resource type suffix \'' + resourceTypeSuffix + '\' is not implemented!');
    });
  }
};

repositorySearch.confirmAndLeave = function () {
  return new repositorySearch.Action(function () {
    return !isPropertiesChanged() && !isPermissionsChanged() || confirm(repositorySearch.getMessage('RM_CANCEL_EDIT_MESSAGE'));
  }).invokeAction();
};

module.exports = repositorySearch;

});