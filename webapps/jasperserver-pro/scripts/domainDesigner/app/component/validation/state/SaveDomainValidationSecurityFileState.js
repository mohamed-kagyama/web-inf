define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

var restErrorCodesEnum = require("../../../../rest/enum/restErrorCodesEnum");

var errorParametersKeysEnum = require("../../../../app/component/validation/errorHandling/enum/errorParametersKeysEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var i18nMessage = i18nMessageUtil.create(i18n);

var SaveDomainValidationSecurityFileState = function SaveDomainValidationSecurityFileState(options) {
  this.initialize(options);
};

_.extend(SaveDomainValidationSecurityFileState.prototype, {
  initialize: function initialize(options) {
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var designerState = this.clientCurrentDesignerStateService.getDesignerState();
    this.domainValidationMutations.setDesignerState(designerState);
    context.useSaveMethod = true;
    var s = designerState.resourceProperties;
    var f = s.securityFile;

    if (f != null && typeof f.uri !== 'undefined' && f.uri !== null) {
      var folder = f.uri.substring(0, f.uri.lastIndexOf('/'));

      if (folder === "".concat(s.uri, "_files")) {
        var verr = this.validateModel(f, designerState.schema);

        if (verr) {
          var p = {
            errorCode: restErrorCodesEnum.DOMAIN_SECURITY_SCHEMA_CLIENT_VALIDATION_ERROR,
            properties: [{
              key: errorParametersKeysEnum.EXPRESSION,
              value: verr
            }]
          };
          stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_SECURITY_FILE_ERROR_STATE, {
            xhr: {
              responseJSON: p
            },
            errors: [p]
          });
          return;
        }
      }
    }

    stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE, context);
  },
  validateModel: function validateModel(file, model) {
    // Maybe we should find a better solution than parseFromString? We are not going to output the result of the parsing, other if an error occurs.
    var xml = new DOMParser().parseFromString(file.content.raw, 'text/xml'); // eslint-disable-line xss/htmlOutputRule

    if (xml.getElementsByTagName('parsererror').length > 0) {
      // TODO GT: Find a better solution for innerHTML here?
      return xml.getElementsByTagName('parsererror')[0].getElementsByTagName('div')[0].innerHTML; // eslint-disable-line xss/htmlOutputRule
    }

    var obj = this.xml2json(xml);
    var sd = obj.securityDefinition;

    if (sd) {
      var verr = this.validateResourceAccessGrants(sd.resourceAccessGrants, model);

      if (verr) {
        return verr;
      }

      return this.validateItemGroupAccessGrants(sd.itemGroupAccessGrants, model);
    }

    return null;
  },
  validateResourceAccessGrants: function validateResourceAccessGrants(rag, model) {
    // We keep validation at bare minimum, the server will take care of a better control
    if (rag && !rag.A_resourceId) {
      return i18nMessage('domain.designer.error.dialog.domain.security.schema.resource.access.grant.missing.resourceid'); // ResourceId attribute is missing
    }

    return null;
  },
  validateItemGroupAccessGrants: function validateItemGroupAccessGrants(igag, model) {
    if (igag) {// Nothing is validate a this point, the server will take care of it
      // This code is left only for future optimizarions.
    }

    return null;
  },
  xml2json: function xml2json(srcDOM) {
    var _this = this;

    var children = _toConsumableArray(srcDOM.children);

    if (!children) return {};

    if (!children.length) {
      return srcDOM.innerHTML; // eslint-disable-line xss/htmlOutputRule
    }

    var res = {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var child = _step.value;

        if (child.attributes.length > 0) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = child.attributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var at = _step2.value;
              res['A_' + at.name] = at.value;
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }

        var childIsArray = children.filter(function (eachChild) {
          return eachChild.nodeName === child.nodeName;
        }).length > 1;

        if (childIsArray) {
          if (res[child.nodeName] === undefined) {
            res[child.nodeName] = [_this.xml2json(child)];
          } else {
            res[child.nodeName].push(_this.xml2json(child));
          }
        } else {
          res[child.nodeName] = _this.xml2json(child);
        }
      };

      for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return res;
  }
});

module.exports = SaveDomainValidationSecurityFileState;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});