define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _reactAce = require('react-ace');

var ReactAce = _reactAce;

var _underscore = require('underscore');

var throttle = _underscore.throttle;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-disable-next-line
var ace = require('ace-builds/src-min-noconflict/ace'); // eslint-disable-line no-undef


require('ace-builds/src-min-noconflict/ext-language_tools'); // eslint-disable-line no-undef


require('ace-builds/src-min-noconflict/theme-tomorrow'); // eslint-disable-line no-undef


var xssUtil = require("runtime_dependencies/js-sdk/src/common/util/xssUtil"); // eslint-disable-line no-undef


var langTools = ace.require('ace/ext/language_tools');

var registerSnippets = function registerSnippets(editor, session, mode, snippetText) {
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true
  });

  var _ace$require = ace.require('ace/snippets'),
      snippetManager = _ace$require.snippetManager;

  var snippet = snippetManager.parseSnippetFile(snippetText, mode);
  snippetManager.register(snippet, mode);
};

var createSnippets = function createSnippets(snippets) {
  return (Array.isArray(snippets) ? snippets : [snippets]).map(function (_ref) {
    var name = _ref.name,
        code = _ref.code;
    return ["snippet ".concat(name), code.split('\n').map(function (c) {
      return "\t".concat(c);
    }).join('\n')].join('\n');
  }).join('\n');
};
/**
 * Utility function to escape unwanted or malicious tags in the security xml
 *
 * @param content
 */


var escapeSecurityXml = function escapeSecurityXml(content) {
  return xssUtil.softHtmlEscape(xssUtil.softHtmlEscape(content, {
    whiteList: ['filterExpression', 'itemAccessGrant', 'itemAccessGrantList', 'itemAccessGrants', 'itemGroupAccessGrant', 'itemGroupAccessGrantList', 'itemGroupAccessGrants', 'itemGroupAccessGrants', 'principalExpression', 'principalExpression', 'resourceAccessGrant', 'resourceAccessGrantList', 'resourceAccessGrants', 'resourceAccessGrants', 'securityDefinition']
  }));
};

var RSecuritySourceEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RSecuritySourceEditor, _React$Component);

  _createClass(RSecuritySourceEditor, null, [{
    key: "getDerivedStateFromProps",

    /** Test to avoid to render the ACE editor during tests execution */
    value: function getDerivedStateFromProps(nextProps, preState) {
      if (preState.committed) {
        return {
          content: nextProps.content,
          committed: true
        };
      }

      return {};
    }
  }]);

  function RSecuritySourceEditor(props) {
    var _this;

    _classCallCheck(this, RSecuritySourceEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RSecuritySourceEditor).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "aceEditorRef", void 0);

    _defineProperty(_assertThisInitialized(_this), "isTestEnv", false);

    _defineProperty(_assertThisInitialized(_this), "state", {
      content: '',
      committed: true
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      var xmlCompleter = {
        getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
          // Check if the user is after a < character or other special chunk of text...
          if (pos.column > prefix.length) {
            var line = editor.getSession().getDocument().getLine(pos.row);
            var suggestedKeywords = [];

            if (_this.checkPreviousText('<', line, pos, prefix)) {
              var keywords = ['filterExpression', 'itemAccessGrant', 'itemAccessGrantList', 'itemAccessGrants', 'itemGroupAccessGrant', 'itemGroupAccessGrantList', 'itemGroupAccessGrants', 'itemGroupAccessGrants', 'principalExpression', 'principalExpression', 'resourceAccessGrant', 'resourceAccessGrantList', 'resourceAccessGrants', 'resourceAccessGrants', 'securityDefinition'];
              suggestedKeywords = keywords.filter(function (keyword) {
                return keyword.toLowerCase().startsWith(prefix.toLowerCase());
              }).map(function (keyword) {
                return {
                  name: keyword,
                  value: keyword,
                  score: 1,
                  meta: 'tag'
                };
              });
            } else if (_this.checkPreviousText('resourceId="', line, pos, prefix)) {
              var joins = [];

              _this.props.options.context._container.schemaDataStore.collections.joinTrees.each(function (t) {
                return joins.push(t.name);
              });

              suggestedKeywords = joins.filter(function (join) {
                return join.toLowerCase().startsWith(prefix.toLowerCase());
              }).map(function (join) {
                return {
                  name: join,
                  value: join,
                  score: 1,
                  meta: 'join'
                };
              });
            }

            callback(null, suggestedKeywords);
            return;
          }

          callback(null, []); // Nothing to suggest...
        }
      }; // langTools.addCompleter(xmlCompleter);

      langTools.setCompleters([xmlCompleter, langTools.snippetCompleter]);

      if (!_this.aceEditorRef.current) {
        return;
      } // Create snippets...


      registerSnippets(_this.aceEditorRef.current.editor, _this.aceEditorRef.current.editor.getSession(), 'xml', createSnippets([{
        name: 'Resource Access Grant',
        code: "<!-- \naRuleId - A unique identifier\naPrincipalExpression - an conditional expression to check if the filter needs to be applied\naFilterExpression - a condition to filter your data\n-->\n<resourceAccessGrant id=\"${1:aRuleId}\">\n    <principalExpression>${2:aPrincipalExpression}</principalExpression>\n    <filterExpression>${0:aFilterExpression}</filterExpression>\n</resourceAccessGrant>"
      }, {
        name: 'Item Group Access Grant',
        code: "<!-- \naRuleId - A unique identifier\naPrincipalExpression - an conditional expression to check if the specified access type will be applied to the column\n-->\n<itemGroupAccessGrant id=\"${1:aRuleId}\" access=\"granted\">\n    <principalExpression>${0:aPrincipalExpression}</principalExpression>\n</itemGroupAccessGrant>"
      }, {
        name: 'PE: Test user role',
        code: "authentication.getPrincipal().getRoles().any{it.getRoleName() in ['${1:ROLE_A}','${0:ROLE_B}'] }" // eslint-disable-line quotes

      }, {
        name: 'PE: Test user attribute',
        code: "authentication.getPrincipal().getAttributes().any{ it.getAttrName() in ['${1:Attribute_A}','${0:Attribute_B}'] }" // eslint-disable-line quotes

      }, {
        name: 'PE: Test user organization',
        code: "authentication.principal.tenantId == '${1:Organization_1}'" // eslint-disable-line quotes

      }]));

      _this.aceEditorRef.current.editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChange", function (value, event) {
      // elsint-disable-line @typescript-eslint/no-unused-vars
      _this.setState({
        content: value,
        committed: false
      }, function () {
        return _this.onChangeThrottle();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeThrottle", throttle(function () {
      if (!_this.state.committed) {
        if (_this.props.onChange) {
          _this.props.onChange(_this.state.content);
        }

        _this.setState({
          committed: true
        });
      }
    }, 1000, {
      leading: false
    }));

    _defineProperty(_assertThisInitialized(_this), "checkPreviousText", function (previousText, line, pos, prefix) {
      if (previousText.length <= pos.column - prefix.length) {
        var realPreviousText = line.substring(pos.column - previousText.length - prefix.length, pos.column - prefix.length);

        if (realPreviousText.toLowerCase() === previousText.toLowerCase()) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(_assertThisInitialized(_this), "onBlur", function () {
      if (_this.state.content === _this.props.content && _this.state.committed) {
        return; // Nothing to do...
      } // If the content needs to be fixed... let's fix it...


      var unsecure = _this.state.content;
      var secure = escapeSecurityXml(unsecure);

      _this.setState({
        committed: true
      }, function () {
        if ((unsecure !== secure || secure !== _this.props.content) && _this.props.onChange) {
          _this.props.onChange(secure);
        }
      });
    });

    _this.aceEditorRef = React.createRef(); // Here is where the black magic of ACE integration starts.
    // We just tell to ACE how to download things. We assume, which is true for JRS,
    // that window.require is defined (with a version of requirejs > 2.1.3).
    // window.require.toUrl will return something like /runtime/88BAF3FB/optimized-scripts/runtime_dependencies/....

    if (typeof window.require !== 'undefined' && typeof window.require.toUrl !== 'undefined') {
      // @ts-disable-next-line
      ace.config.set('workerPath', window.require.toUrl('ace-builds/src-min-noconflict')); // @ts-disable-next-line

      ace.config.set('modePath', window.require.toUrl('ace-builds/src-min-noconflict')); // @ts-disable-next-line

      ace.config.set('themePath', window.require.toUrl('ace-builds/src-min-noconflict')); // @ts-disable-next-line

      ace.config.set('basePath', window.require.toUrl('ace-builds/src-min-noconflict'));
      ace.config.setModuleUrl('ace/mode/xml', require('ace-builds/src-min-noconflict/mode-xml')); // eslint-disable-line global-require, no-undef
    } else {
      _this.isTestEnv = true;
    }

    return _this;
  }

  _createClass(RSecuritySourceEditor, [{
    key: "render",
    value: function render() {
      // If we are in test mode, we avoid to render ACE, since it will
      // break the testing environment...
      if (this.isTestEnv) {
        return React.createElement("div", null);
      }

      return React.createElement(ReactAce["default"], {
        ref: this.aceEditorRef,
        mode: "xml",
        theme: "tomorrow",
        highlightActiveLine: true,
        showPrintMargin: false,
        width: "100%",
        height: "100%",
        value: this.state.content,
        onChange: this.onChange,
        onBlur: this.onBlur,
        readOnly: this.props.readOnly
      });
    }
  }]);

  return RSecuritySourceEditor;
}(React.Component);

module.exports = RSecuritySourceEditor;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});