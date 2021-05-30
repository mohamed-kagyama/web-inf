define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _prototype = require('prototype');

var $ = _prototype.$;

var orgModule = require('./org.mng.main');

var layoutModule = require("runtime_dependencies/jrs-ui/src/core/core.layout");

var _runtime_dependenciesJrsUiSrcComponentsListBase = require("runtime_dependencies/jrs-ui/src/components/list.base");

var dynamicList = _runtime_dependenciesJrsUiSrcComponentsListBase.dynamicList;

var RegExpRepresenter = require("runtime_dependencies/jrs-ui/src/tenantImportExport/utils/RegExpRepresenter");

var dialogs = require("runtime_dependencies/jrs-ui/src/components/components.dialogs");

var primaryNavModule = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation");

var jQuery = require('jquery');

var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var ValidationModule = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.ValidationModule;
var matchAny = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.matchAny;
var encodeUriParameter = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.encodeUriParameter;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @version: $Id$
 */
//////////////////////////////////
// Panel which shows organizations list
//////////////////////////////////
orgModule.orgManager.orgList = {
  LIST_TEMPLATE_ID: "tabular_threeColumn",
  ITEM_TEMPLATE_ID: "tabular_threeColumn:leaf",
  ORG_ID_PATTERN: ".ID > a",
  ORG_NAME_PATTERN: ".name",
  ORG_ORGANIZATIONS_PATTERN: ".organization",
  initialize: function initialize(options) {
    orgModule.entityList.initialize({
      listTemplateId: this.LIST_TEMPLATE_ID,
      itemTemplateId: this.ITEM_TEMPLATE_ID,
      toolbarModel: options.toolbarModel,
      text: options.text
    });

    orgModule.entityList._createEntityItem = function (value) {
      var item = new dynamicList.ListItem({
        label: value.id,
        value: value
      });

      item.processTemplate = function (element) {
        var orgList = orgModule.orgManager.orgList;
        var id = element.select(orgList.ORG_ID_PATTERN)[0];
        var name = element.select(orgList.ORG_NAME_PATTERN)[0];
        var org = element.select(orgList.ORG_ORGANIZATIONS_PATTERN)[0];
        id.update(xssUtil.hardEscape(this.getValue().id));
        name.update(xssUtil.hardEscape(this.getValue().name));
        var subTenantCount = this.getValue().subTenantCount;
        subTenantCount = subTenantCount || 0;
        org.update(xssUtil.hardEscape(orgModule.getMessage("MT_SUB_TENANT_COUNT", {
          count: subTenantCount
        })));
        return element;
      };

      return item;
    };
  }
}; ////////////////////////////////////////
// Create org dialog
////////////////////////////////////////

orgModule.orgManager.addDialog = {
  _ADD_ORGANIZATION_ID: 'addOrganization',
  _ADD_BUTTON_ID: 'addOrgBtn',
  _CANCEL_BUTTON_ID: 'cancelOrgBtn',
  _ORG_NAME_ID: 'addOrgName',
  _ORG_ID_ID: 'addOrgID',
  _ORG_ALIAS_ID: 'addOrgAlias',
  _ORG_DESC_ID: 'addOrgDesc',
  _ADD_BUTTON_TITLE_PATTERN: '.wrap',
  initialize: function initialize() {
    this.addOrganization = $(this._ADD_ORGANIZATION_ID);
    this.addBtn = $(this._ADD_BUTTON_ID);
    this.cancelBtn = $(this._CANCEL_BUTTON_ID);
    this.orgName = $(this._ORG_NAME_ID);
    this.orgId = $(this._ORG_ID_ID);
    this.orgAlias = $(this._ORG_ALIAS_ID);
    this.orgDesc = $(this._ORG_DESC_ID);
    this.idUnsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantIdNotSupportedSymbols).getRepresentedString();
    this.aliasUnsupportedSymbols = this.idUnsupportedSymbols;
    this.nameUnsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantNameNotSupportedSymbols).getRepresentedString();
    this.orgId.regExp = orgModule.orgManager.ID_REG_EXP;
    this.orgId.regExpForReplacement = orgModule.orgManager.ID_REG_EXP_FOR_REPLACEMENT;
    this.orgName.regExp = orgModule.orgManager.NAME_REG_EXP;
    this.orgAlias.regExp = orgModule.orgManager.ALIAS_REG_EXP;
    this.orgAlias.regExpForReplacement = orgModule.orgManager.ALIAS_REG_EXP_FOR_REPLACEMENT;
    this.orgId.unsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantIdNotSupportedSymbols).getRepresentedString();
    this.orgName.unsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantNameNotSupportedSymbols).getRepresentedString();
    this.orgAlias.unsupportedSymbols = this.orgId.unsupportedSymbols;
    this.orgId.inputValidator = orgModule.createInputRegExValidator(this.orgId);
    this.orgName.inputValidator = orgModule.createInputRegExValidator(this.orgName);
    this.orgAlias.inputValidator = orgModule.createInputRegExValidator(this.orgAlias);
    this.addOrganization.observe('keyup', function (event) {
      var input = event.element();

      if ([this.orgId, this.orgName, this.orgAlias].include(input)) {
        ValidationModule.validate(input.inputValidator);

        if (this.orgName == input) {
          var source = this.orgName;
          [this.orgId, this.orgAlias].each(function (ipt) {
            if (!ipt.changedByUser) {
              if (!ipt.regExp.test(source.getValue())) {
                ipt.setValue(source.getValue());
              } else {
                ipt.setValue(source.getValue().replace(ipt.regExpForReplacement, '_'));
              }
            }
          });
        } else {
          if (!input.changedByUser) {
            input.changedByUser = input.getValue() != input.prevValue;
          }
        }

        event.stop();
      }
    }.bindAsEventListener(this));
    this.addOrganization.observe('keydown', function (event) {
      var input = event.element();

      if ([this.orgId, this.orgAlias].include(input)) {
        input.prevValue = input.getValue();
      }
    }.bindAsEventListener(this));
  },
  _clickButtonHandler: function _clickButtonHandler(event) {
    var button = matchAny(event.element(), [layoutModule.BUTTON_PATTERN], true);

    if (button == this.addBtn) {
      var that = this;

      var createdCallback = function createdCallback(event) {
        that.addOrganization.stopObserving('click');
        orgModule.stopObserving("entity:created", createdCallback);
      };

      orgModule.observe("entity:created", createdCallback);

      this._doAdd();
    } else if (button == this.cancelBtn) {
      this.hide();
      this.addOrganization.stopObserving('click');
    }
  },
  _hideValidationErrors: function _hideValidationErrors() {
    [this.orgName, this.orgId, this.orgAlias, this.orgDesc].each(function (e) {
      ValidationModule.hideError(e, true);
      e.changedByUser = false;
    });
  },
  show: function show(organization) {
    this.organization = organization;

    this._hideValidationErrors();

    var title = this.addBtn.select(this._ADD_BUTTON_TITLE_PATTERN)[0];

    if (title) {
      var msg = this.organization && !this.organization.isRoot() ? orgModule.getMessage('addOrgTo', {
        organizationName: orgModule.truncateOrgName(this.organization.id)
      }) : orgModule.getMessage('addOrg');
      title.update(msg);
    }

    this.addBtn.title = this.organization && !this.organization.isRoot() ? orgModule.getMessage('addOrgTo', {
      organizationName: this.organization.id
    }) : orgModule.getMessage('addOrg');
    dialogs.popup.show(this.addOrganization, true);
    this.addOrganization.observe('click', this._clickButtonHandler.bindAsEventListener(this));

    try {
      this.orgName.focus();
    } catch (e) {}
  },
  hide: function hide() {
    dialogs.popup.hide(this.addOrganization);
    this.orgName.setValue("");
    this.orgId.setValue("");
    this.orgAlias.setValue("");
    this.orgDesc.setValue("");
  },
  _validate: function _validate() {
    return ValidationModule.validateLegacy([orgModule.createBlankValidator(this.orgId, "orgIdIsEmpty"), orgModule.createBlankValidator(this.orgName, "orgNameIsEmpty"), orgModule.createBlankValidator(this.orgAlias, "orgAliasIsEmpty"), this.orgId.inputValidator, this.orgName.inputValidator, this.orgAlias.inputValidator, orgModule.createMaxLengthValidator(this.orgDesc, "error.length.description", "{0,number,integer}")]);
  },
  _autoFill: function _autoFill() {},
  _doAdd: function _doAdd() {
    if (this._validate()) {
      var org = new orgModule.Organization({
        tenantId: this.orgId.getValue(),
        tenantName: this.orgName.getValue(),
        tenantDesc: this.orgDesc.getValue(),
        tenantAlias: this.orgAlias.getValue()
      });

      if (this.organization && !this.organization.isRoot()) {
        org.parentId = this.organization.id;
      }

      this._checkId(org, function (org) {
        this._checkAlias(org, function (org) {
          orgModule.invokeServerAction(orgModule.ActionMap.CREATE, {
            entity: org.toJSON()
          });
        });
      }.bind(this));

      return true;
    }

    return false;
  },
  _checkId: function _checkId(org, successFn) {
    orgModule.invokeServerAction(orgModule.ActionMap.EXIST, {
      entity: org,
      onExist: function (uniqueId) {
        ValidationModule.showError(this.orgId, orgModule.getMessage('orgIdIsAlreadyInUse', {
          id: uniqueId
        }));
      }.bind(this),
      onNotExist: function () {
        ValidationModule.hideError(this.orgId);
        Object.isFunction(successFn) && successFn(org);
      }.bind(this)
    });
  },
  _checkAlias: function _checkAlias(org, successFn) {
    if (org.alias.blank()) {
      Object.isFunction(successFn) && successFn(org);
    } else {
      orgModule.invokeOrgAction(orgModule.orgManager.Action.ALIAS_EXIST, {
        org: org,
        onExist: function (uniqueAlias) {
          ValidationModule.showError(this.orgAlias, orgModule.getMessage('orgAliasIsAlreadyInUse', {
            alias: uniqueAlias
          }));
        }.bind(this),
        onNotExist: function () {
          ValidationModule.hideError(this.orgAlias);
          Object.isFunction(successFn) && successFn(org);
        }.bind(this)
      });
    }
  }
}; ////////////////////////////////////////
// Panel which shows user's properties
////////////////////////////////////////

orgModule.orgManager.properties = {
  NAME_PATTERN: "#orgName",
  ID_PATTERN: "#orgID",
  ALIAS_PATTERN: "#orgAlias",
  DESC_PATTERN: "#orgDesc",
  MANAGE_USERS_PATTERN: "#manageUsers",
  MANAGE_ROLES_PATTERN: "#manageRoles",
  ASSIGNED_USERS_PATTERN: "#assignedUsers",
  ASSIGNED_ROLES_PATTERN: "#assignedRoles",
  org: null,
  initialize: function initialize(options) {
    var panel = $(orgModule.properties._id);
    this.orgName = panel.select(this.NAME_PATTERN)[0];
    this.orgId = panel.select(this.ID_PATTERN)[0];
    this.orgAlias = panel.select(this.ALIAS_PATTERN)[0];
    this.orgDesc = panel.select(this.DESC_PATTERN)[0];
    this.assignedUsers = panel.select(this.ASSIGNED_USERS_PATTERN)[0];
    this.assignedRoles = panel.select(this.ASSIGNED_ROLES_PATTERN)[0];
    this.manageUsers = panel.select(this.MANAGE_USERS_PATTERN)[0];
    this.manageRoles = panel.select(this.MANAGE_ROLES_PATTERN)[0];
    this.orgName.regExp = orgModule.orgManager.NAME_REG_EXP;
    this.orgAlias.regExp = orgModule.orgManager.ALIAS_REG_EXP;
    this.orgName.unsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantNameNotSupportedSymbols).getRepresentedString();
    this.orgAlias.unsupportedSymbols = new RegExpRepresenter(orgModule.Configuration.tenantIdNotSupportedSymbols).getRepresentedString();
    this.orgName.inputValidator = orgModule.createInputRegExValidator(this.orgName);
    this.orgAlias.inputValidator = orgModule.createInputRegExValidator(this.orgAlias);
    this._validators = [orgModule.createBlankValidator(this.orgName, "orgNameIsEmpty"), orgModule.createBlankValidator(this.orgAlias, "orgAliasIsEmpty"), this.orgName.inputValidator, this.orgAlias.inputValidator, orgModule.createMaxLengthValidator(this.orgDesc, "error.length.description", "{0,number,integer}")];
    orgModule.properties.initialize(options._.extend(options, {
      viewAssignedListTemplateDomId: "list_type_attributes",
      viewAssignedItemTemplateDomId: "list_type_attributes:role",
      searchAssigned: false,
      attributes: {
        context: {
          urlGETTemplate: "rest_v2/attributes?_embedded=permission&includeInherited=true{{ if (id) { }}&holder=tenant:/{{-id}}{{ } }}&group=custom&excludeGroup=serverSettings",
          urlPUTTemplate: "rest_v2{{ if (id) { }}/organizations/{{-id}}{{ } }}/attributes?_embedded=permission"
        }
      },
      showAssigned: false
    }));

    this._initCustomEvents();

    orgModule.properties.setProperties = function (properties) {
      var orgProperties = orgModule.orgManager.properties;
      orgProperties.orgName.setValue(properties.name);
      orgProperties.orgId.setValue(properties.id);
      orgProperties.orgAlias.setValue(properties.alias);
      orgProperties.orgDesc.setValue(properties.desc);
    };

    orgModule.properties._deleteEntity = function () {
      orgModule.invokeClientAction("delete", {
        entity: this._value,
        entityEvent: !!orgModule.entityList.getSelectedEntities().length
      });
    };

    orgModule.properties._editEntity = function () {
      var orgProperties = orgModule.orgManager.properties;
      this.resetValidation([orgProperties.NAME_PATTERN, orgProperties.ALIAS_PATTERN, orgProperties.DESC_PATTERN]);
      this.changeReadonly(true, [orgProperties.NAME_PATTERN, orgProperties.ALIAS_PATTERN, orgProperties.DESC_PATTERN]);
    };

    orgModule.properties._showEntity = function () {
      var orgProperties = orgModule.orgManager.properties;
      this.resetValidation([orgProperties.NAME_PATTERN, orgProperties.ALIAS_PATTERN, orgProperties.DESC_PATTERN]);
      this.changeReadonly(false, [orgProperties.NAME_PATTERN, orgProperties.ALIAS_PATTERN, orgProperties.DESC_PATTERN]);
    };

    orgModule.properties.validate = function () {
      var orgProperties = orgModule.orgManager.properties;

      var org = orgProperties._toOrg(this._value);

      if (ValidationModule.validateLegacy(orgProperties._validators)) {
        orgModule.invokeOrgAction("aliasExist", {
          org: org,
          onExist: function (uniqueAlias) {
            ValidationModule.showError(orgProperties.orgAlias, orgModule.getMessage('orgAliasIsAlreadyInUse', {
              alias: uniqueAlias
            }));
          }.bind(this),
          onNotExist: function () {
            ValidationModule.hideError(orgProperties.orgAlias);
            this.save(org);
          }.bind(this)
        });

        if (orgModule.properties.attributesFacade) {
          return true;
        }
      }
    };

    orgModule.properties.isChanged = function () {
      var orgProperties = orgModule.orgManager.properties,
          isAttributesChanged = orgModule.properties.attributesFacade.containsUnsavedItems();
      var oldOrg = this._value;

      var org = orgProperties._toOrg(this._value);

      return this.isEditMode && (isAttributesChanged || oldOrg.name != org.name || oldOrg.alias != org.alias || oldOrg.desc != org.desc);
    };

    orgModule.properties.save = function (orgJson) {
      var orgProperties = orgModule.orgManager.properties,
          org = orgProperties._toOrg(orgJson);

      orgModule.invokeServerAction("update", {
        entityName: this._value.getNameWithTenant(),
        entity: org,
        assigned: [],
        unassigned: []
      });
    };

    orgModule.properties.cancel = function () {
      var dfd = new jQuery.Deferred();
      this.setProperties(this._value);
      return this.attributesFacade ? this.attributesFacade.cancel() : dfd.resolve();
    };

    orgModule.properties.manageUsers = function () {
      primaryNavModule.navigationPaths.user.params += '&tenantId=' + encodeUriParameter(this._value.id);
      primaryNavModule.navigationOption("user");
    };

    orgModule.properties.manageRoles = function () {
      primaryNavModule.navigationPaths.role.params += '&tenantId=' + encodeUriParameter(this._value.id);
      primaryNavModule.navigationOption("role");
    };
  },
  _initCustomEvents: function _initCustomEvents(roles) {
    var orgProperties = orgModule.orgManager.properties;
    var panel = $(orgModule.properties._id);
    panel.observe('keyup', function (event) {
      var input = event.element();

      if (matchAny(input, [this.NAME_PATTERN, this.ALIAS_PATTERN])) {
        input.inputValidator && ValidationModule.validate([input.inputValidator]);
        event.stop();
      }

      orgModule.properties._toggleButton();
    }.bindAsEventListener(this));
    panel.observe('click', function (event) {
      var btn = event.element();

      if (btn == this.manageUsers) {
        orgModule.properties.manageUsers();
        event.stop();
      } else if (btn == this.manageRoles) {
        orgModule.properties.manageRoles();
        event.stop();
      }
    }.bindAsEventListener(this));

    orgModule.properties._toggleButton();
  },
  _toOrg: function _toOrg(organization) {
    organization = organization || {};
    var org = new orgModule.Organization({
      tenantName: this.orgName.getValue(),
      tenantId: this.orgId.getValue(),
      tenantAlias: this.orgAlias.getValue(),
      tenantDesc: this.orgDesc.getValue(),
      tenantUri: organization.uri
    });

    if (organization.parentId) {
      org.parentId = organization.parentId;
    }

    return org;
  },
  setAssigned: function setAssigned(usersCount, rolesCount) {
    this.assignedUsers.update(usersCount);
    this.assignedRoles.update(rolesCount);
  }
};

});