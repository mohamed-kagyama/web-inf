define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var base64 = require("runtime_dependencies/js-sdk/src/common/util/base64");

var request = require("request");

var applicationStateEventsEnum = require('../../../../../dispatcher/enum/applicationStateEventsEnum');

var canvasViewDesignersEnum = require('../../../../../model/enum/canvasViewDesignersEnum');

var subResourceTypesEnum = require('../../../../../model/enum/subResourceTypesEnum');

var RSecuritySourceEditor = require('./react/RSecuritySourceEditor');

var RModal = require('./react/RModal');

var securityXmlTemplate = require('./securityXmlTemplate');

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var i18nCommon = require("bundle!CommonBundle"); // eslint-disable-line no-undef
// @ts-disable-next-line


var i18n = require("bundle!DomainDesignerBundle"); // eslint-disable-line no-undef
// @ts-disable-next-line


var endpoints = require('../../../../../../rest/enum/endpointsEnum'); // eslint-disable-line no-undef

/**
 * Unfortunately, the use of i18nMessage class from 'js-sdk/src/common/util/i18nMessage' does not play
 * nicely in React. We create this temporary replacement, which will look for strings inside
 * i18n array.
 *
 * @param key
 * @param args
 */


var messageFormat = function messageFormat(key) {
  if (typeof i18n[key] !== 'undefined') {
    var text = i18n[key];

    for (var i = 0, l = arguments.length <= 1 ? 0 : arguments.length - 1; i < l; i += 1) {
      var parameter = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1],
          regexp = "\\{".concat(i, "\\}");
      text = text.replace(new RegExp(regexp, 'g'), parameter);
    }

    return text;
  }

  return key; // fallback to the key if a translation was not found...
};

var RSecurityEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RSecurityEditor, _React$Component);

  function RSecurityEditor() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RSecurityEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RSecurityEditor)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      secFile: null,
      referencedResourceContent: null,
      rulesDeleteWarningDialogVisible: false,
      rulesReplaceWarningDialogVisible: false,
      rulesImportWarningDialogVisible: false,
      temporarySecurityFile: null
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var storeChangeEventBus = _this.props.options.context.get('storeChangeEventBus');

      storeChangeEventBus.on('change', _this.onSecurityFileChange);

      var applicationDispatcherEventBus = _this.props.options.context.get('applicationDispatcherEventBus'); // This event is triggered when the user pick a new file (either local or form the repository)
      // in order to replace whatver we already have


      applicationDispatcherEventBus.on(applicationStateEventsEnum.SECURITY_DESIGNER_SHOW_REPLACE_FILE_CONFIRM_DIALOG, _this.onImportSecurityFile);
    });

    _defineProperty(_assertThisInitialized(_this), "onSecurityFileChange", function (domainState) {
      var s = domainState.resourceProperties;
      var f = s.securityFile;

      if (_this.isSecurityDesignerVisible(domainState.viewState)) {
        if (f != null && f.type === subResourceTypesEnum.FILE_REFERENCE) {
          // Check the parent folder of this file is the local resource container
          // of our domain resource. In this case we will consider the resource as local
          var folder = f.uri.substring(0, f.uri.lastIndexOf('/'));

          if (folder === "".concat(s.uri, "_files")) {
            f.type = subResourceTypesEnum.FILE;
          } else {
            // We need to load the file inside the editor and set the editor as read only.
            request({
              url: endpoints.RESOURCES_SERVICE + f.uri,
              type: 'GET',
              dataType: 'text' // We don't want the data being processed in anyway.

            }).done(function (xml) {
              // Let's Feed the editor!!!!
              _this.setState({
                referencedResourceContent: xml
              });
            }).fail(function () {
              _this.setState({
                referencedResourceContent: 'An error has occurred while requesting the content of the referenced resource'
              });
            });
          }
        }

        _this.setState({
          secFile: f,
          referencedResourceContent: null
        });
      } else if (typeof f === 'undefined' || f === null) {
        // in spite of the visibility of the editor, if there is no
        // security file, let's clear up the editor. This fixes bug JS-58254
        _this.setState({
          secFile: null,
          referencedResourceContent: null
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isSecurityDesignerVisible", function (store) {
      return store.get('currentDesigner') === canvasViewDesignersEnum.SECURITY_DESIGNER;
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (content) {
      // If we are in readOnly mode, let's stop here...
      // Please note that events may be fired for things that are not relevant to the
      // text itself.
      if (_this.isReadOnly()) {
        return;
      } // If the editor has no content, we want to remove the security file
      // This will have the effect that we lost the file name... but since the file is local,
      // this is not a big issue. In the long term the file will be always called security.xml
      // and it is not visible to the user anyway


      if (content.length === 0) {
        _this.setState(function (currentState) {
          if (typeof currentState.secFile !== 'undefined' && currentState.secFile !== null) {
            // Remove the security file...
            var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

            appBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REMOVE_SECURITY_FILE);
          }
        });

        return;
      } // If the content is not empty... well.. time to create a new security file if not
      // available yet.


      var c = _this.createBaseSecurityFileFromContent(content);

      var eventType = applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_SECURITY_FILE;

      _this.setState(function (currentState) {
        if (typeof currentState.secFile !== 'undefined' && currentState.secFile !== null) {
          c.type = currentState.secFile.type;
          c.label = currentState.secFile.label;
          eventType = applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_SECURITY_FILE;
        }

        return {
          secFile: c
        };
      }, function () {
        var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

        appBus.trigger(eventType, c);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDownloadFile", function () {
      var appBus = _this.props.options.context.get('storeChangeEventBus');

      appBus.trigger('download:securityFile', _this.state.secFile);
    });

    _defineProperty(_assertThisInitialized(_this), "onClearSecurityFile", function () {
      _this.setState({
        rulesDeleteWarningDialogVisible: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmClearSecurityFile", function () {
      _this.setState({
        rulesDeleteWarningDialogVisible: false
      }, function () {
        // Remove the security file...
        var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

        appBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REMOVE_SECURITY_FILE);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelClearSecurityFile", function () {
      _this.setState({
        rulesDeleteWarningDialogVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onImportFile", function () {
      var appBus = _this.props.options.context.get('optionsDesignerEventBus');

      appBus.trigger('show:securityFileUploadDialog');
    });

    _defineProperty(_assertThisInitialized(_this), "onInitSecurityFile", function () {
      if (_this.isReadOnly() || _this.getText().length > 0) {
        // Show Warning dialog before replacing the content of the security rules....
        _this.setState({
          rulesReplaceWarningDialogVisible: true
        });
      } else {
        _this.onConfirmReplaceSecurityFile();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmReplaceSecurityFile", function () {
      _this.setState({
        rulesReplaceWarningDialogVisible: false
      }, function () {
        // Replace the security file...
        var c = _this.createBaseSecurityFileFromContent(securityXmlTemplate);

        var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

        appBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_SECURITY_FILE, c);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelReplaceSecurityFile", function () {
      _this.setState({
        rulesReplaceWarningDialogVisible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onImportSecurityFile", function (newSecurityFile) {
      if (_this.isReferencedResource() || _this.getText().length > 0) {
        _this.setState({
          rulesImportWarningDialogVisible: true,
          temporarySecurityFile: newSecurityFile
        });
      } else {
        var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

        appBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_SECURITY_FILE, newSecurityFile);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onConfirmImportSecurityFile", function () {
      var temporarySecurityFile = _this.state.temporarySecurityFile;

      _this.setState({
        rulesImportWarningDialogVisible: false,
        temporarySecurityFile: null
      }, function () {
        var appBus = _this.props.options.context.get('applicationDispatcherEventBus');

        appBus.trigger(applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_SECURITY_FILE, temporarySecurityFile);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onCancelImportSecurityFile", function () {
      _this.setState({
        rulesImportWarningDialogVisible: false,
        temporarySecurityFile: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getTypeLabel", function () {
      var secFile = _this.state.secFile;

      if (typeof secFile !== 'undefined' && secFile !== null) {
        if (secFile.type === subResourceTypesEnum.FILE_REFERENCE) {
          return 'Reference';
        }
      } // Attention, the file may not even exist...


      return 'Local';
    });

    _defineProperty(_assertThisInitialized(_this), "isReadOnly", function () {
      return _this.isReferencedResource();
    });

    _defineProperty(_assertThisInitialized(_this), "hasSecurityFile", function () {
      var secFile = _this.state.secFile;
      return typeof secFile !== 'undefined' && secFile !== null;
    });

    _defineProperty(_assertThisInitialized(_this), "isReferencedResource", function () {
      if (!_this.hasSecurityFile()) {
        return false;
      }

      var secFile = _this.state.secFile;

      if (typeof secFile !== 'undefined' && secFile !== null) {
        return secFile.type === subResourceTypesEnum.FILE_REFERENCE;
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "getReferencedFileURI", function () {
      var secFile = _this.state.secFile;

      if (_this.isReferencedResource() && typeof secFile !== 'undefined' && secFile !== null) {
        if (secFile.uri) {
          return secFile.uri;
        }
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "getText", function () {
      var secFile = _this.state.secFile;

      if (typeof secFile !== 'undefined' && secFile !== null) {
        // Check if we have the content...
        if (typeof secFile.content !== 'undefined' && typeof secFile.content.raw !== 'undefined') {
          return secFile.content.raw;
        } // Check if the file is a fileReference...


        if (_this.isReadOnly()) {
          // Here we know that the file is a fileReference, let's see if
          // we have also its conntent...
          if (_this.state.referencedResourceContent !== null) {
            return _this.state.referencedResourceContent;
          }
        }
      }

      return '';
    });

    _defineProperty(_assertThisInitialized(_this), "createBaseSecurityFileFromContent", function (content) {
      return {
        content: {
          raw: content,
          base64: base64.encode(content)
        },
        type: subResourceTypesEnum.FILE,
        label: 'security.xml'
      };
    });

    _defineProperty(_assertThisInitialized(_this), "createModalContent", function (message, description, okLabel, cancelLabel, okCallback, cancelCallback) {
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "jr-mDialog-body jr-mDialog-bodyPadded jr"
      }, React.createElement("div", {
        className: "jr-mValidation jr"
      }, React.createElement("div", {
        className: "jr-mValidation-alert jr jr-mValidation-alertWarning"
      }, React.createElement("span", {
        className: "jr-mValidation-alert-icon jr-mIcon jr-mIconSmall jr jr-cancelRound"
      }), React.createElement("span", {
        className: "jr-mValidation-alert-text jr"
      }, message))), React.createElement("p", {
        className: "jr-mText jr-mTextMedium jr jr-uTop-double"
      }, React.createElement("span", {
        className: "jr-mText-wrapper jr"
      }, description))), React.createElement("div", {
        className: "jr-mDialog-footer jr"
      }, React.createElement("button", {
        type: "button",
        className: "jr-mButton jr-mButtonText jr jr-mButtonPrimary jr-mButtonWarning",
        onClick: okCallback
      }, React.createElement("span", {
        className: "jr-mButton-label jr"
      }, okLabel)), React.createElement("button", {
        type: "button",
        className: "jr-mButton jr-mButtonText jr jr-mButtonSecondary",
        onClick: cancelCallback
      }, React.createElement("span", {
        className: "jr-mButton-label jr"
      }, cancelLabel))));
    });

    return _this;
  }

  _createClass(RSecurityEditor, [{
    key: "render",
    value: function render() {
      // const type = this.getTypeLabel();
      var txt = this.getText();
      return React.createElement(React.Fragment, null, React.createElement("div", {
        className: "jr-mDomain-mode-title jr"
      }, React.createElement("span", {
        className: "jr-mDomain-mode-title-text jr"
      }, i18n['domain.designer.security.title'])), React.createElement("div", {
        className: "jr-mDomain-mode-subtitle jr-uBottom-doublehalf jr"
      }, React.createElement("p", {
        className: "jr-mText jr-mTextParagraph jr-mTextGreyLight jr"
      }, i18n['domain.designer.security.subtitle'])), React.createElement("div", {
        className: "jr-mGrid jr-mGrid2 jr"
      }, React.createElement("div", {
        className: "jr-mGrid-column jr"
      }, React.createElement("h2", {
        className: "jr-mText jr-mTextTitle jr-mTextSmall jr-uBottom-half jr"
      }, React.createElement("span", {
        className: "jr-mText-wrapper jr"
      }, this.isReferencedResource() ? messageFormat('domain.designer.security.readonlyPath', this.getReferencedFileURI()) : i18n['domain.designer.security.xmleditor']))), React.createElement("div", {
        className: "jr-mGrid-column jr-uRightAlign jr",
        "js-stdnav": "false"
      }, React.createElement("button", {
        type: "button",
        className: "jr-mButton jr-mButtonAction jr jr-uLeft-quarter",
        title: i18n['domain.designer.security.button.insertCode.tooltip'],
        "aria-label": i18n['domain.designer.security.button.insertCode.tooltip'],
        onClick: this.onInitSecurityFile
      }, React.createElement("span", {
        className: "jr-mButton-icon jr-mIcon jr-code jr"
      })), React.createElement("button", {
        type: "button",
        className: "jr-mButton jr-mButtonAction jr jr-uLeft-quarter",
        title: i18n['domain.designer.security.button.import.tooltip'],
        "aria-label": i18n['domain.designer.security.button.import.tooltip'],
        onClick: this.onImportFile
      }, React.createElement("span", {
        className: "jr-mButton-icon jr-mIcon jr-import jr"
      })), React.createElement("button", {
        type: "button",
        disabled: this.getText().length === 0 && !this.isReferencedResource(),
        className: "jr-mButton jr-mButtonAction jr jr-uLeft-quarter",
        title: i18n['domain.designer.security.button.download.tooltip'],
        "aria-label": i18n['domain.designer.security.button.download.tooltip'],
        onClick: this.onDownloadFile
      }, React.createElement("span", {
        className: "jr-mButton-icon jr-mIcon jr-download jr"
      })), React.createElement("button", {
        id: "securityDesignerDeleteButton",
        type: "button",
        disabled: this.getText().length === 0 && !this.isReadOnly(),
        className: "jr-mButton jr-mButtonAction jr jr-uLeft-quarter",
        title: i18n['domain.designer.security.button.delete.tooltip'],
        "aria-label": i18n['domain.designer.security.button.delete.tooltip'],
        onClick: this.onClearSecurityFile
      }, React.createElement("span", {
        className: "jr-mButton-icon jr-mIcon jr-delete jr"
      })))), React.createElement("div", {
        className: "jr-mDomain-mode-editor jr",
        style: {
          opacity: this.isReadOnly() ? 0.5 : 1
        }
      }, React.createElement(RSecuritySourceEditor, {
        options: this.props.options,
        content: txt,
        onChange: this.onChange,
        readOnly: this.isReadOnly()
      })), React.createElement(RModal, {
        open: this.state.rulesDeleteWarningDialogVisible
      }, this.createModalContent(i18n['domain.designer.security.dialog.rulesDeleteWarning.message'], i18n['domain.designer.security.dialog.rulesDeleteWarning.description'], i18n['domain.designer.security.dialog.rulesDeleteWarning.button.deleteRules'], i18nCommon['button.cancel'], this.onConfirmClearSecurityFile, this.onCancelClearSecurityFile)), React.createElement(RModal, {
        open: this.state.rulesReplaceWarningDialogVisible
      }, this.createModalContent(i18n['domain.designer.security.dialog.rulesReplaceWarning.message'], i18n['domain.designer.security.dialog.rulesReplaceWarning.description'], i18n['domain.designer.security.dialog.rulesReplaceWarning.button.replaceRules'], i18nCommon['button.cancel'], this.onConfirmReplaceSecurityFile, this.onCancelReplaceSecurityFile)), React.createElement(RModal, {
        open: this.state.rulesImportWarningDialogVisible
      }, this.createModalContent(i18n['domain.designer.security.dialog.rulesReplaceWarning.message'], i18n['domain.designer.security.dialog.rulesImportWarning.description'], i18n['domain.designer.security.dialog.rulesReplaceWarning.button.replaceRules'], i18nCommon['button.cancel'], this.onConfirmImportSecurityFile, this.onCancelImportSecurityFile)));
    }
  }]);

  return RSecurityEditor;
}(React.Component);

module.exports = RSecurityEditor;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});