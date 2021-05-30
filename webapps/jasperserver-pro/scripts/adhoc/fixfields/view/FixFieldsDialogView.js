define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Dialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/Dialog");

var ScalableList = require("runtime_dependencies/js-sdk/src/components/scalableList/view/ScalableList");

var i18n = require("bundle!adhoc_messages");

var fixFieldsDialogTemplate = require("text!../template/fixFieldsDialogTemplate.htm");

var missingFieldItemsTemplate = require("text!../template/missingFieldItemsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IS_EMBEDDED_DESIGNER_PARAM_NAME = 'embeddedDesigner';
module.exports = Dialog.extend({
  defaultTemplate: fixFieldsDialogTemplate,
  constructor: function constructor(options) {
    options || (options = {});

    _.defaults(options, {
      title: i18n['adhoc.inuse.dialog.title'],
      modal: true,
      resizable: true,
      dataNameAttribute: 'fixFieldsDialog',
      buttons: [{
        label: i18n['adhoc.inuse.remove.items.button.label'],
        action: 'apply',
        primary: true
      }, {
        label: i18n['ADH_010_BUTTON_CANCEL'],
        action: 'cancel',
        primary: false
      }]
    });

    this.isEmbeddedDesigner = this._getParameterByName(IS_EMBEDDED_DESIGNER_PARAM_NAME);
    Dialog.call(this, options);
    var self = this;
    this.on('button:apply', _.bind(this._onOKClick, self));
    this.on('button:cancel', _.bind(this._onCancelClick, self));
    this.fieldList = new ScalableList({
      getData: this._missingFieldDataProvider,
      itemsTemplate: missingFieldItemsTemplate,
      el: this.$el.find('.jr-mListbox-list')
    });
  },
  el: function el() {
    return this.template({
      title: this.title,
      additionalCssClasses: this.additionalCssClasses,
      fields: this.missingFields,
      bodyInstructions: i18n['adhoc.inuse.body.instructions']
    });
  },
  _missingFieldDataProvider: function _missingFieldDataProvider(options) {
    /* There is an element in the JSP with ID 'missingFieldBuffer' which
             * during preprocessing is populated with field names and a <br>
             * element, the following code finds it, and splits it into an
             * array of strings to be handled by the UI.
             */
    var missingFieldElement = document.getElementById('missingFieldBuffer'),
        missingFieldList = _.filter(_.map(jQuery(missingFieldElement).html().split('<br>'), function (item) {
      return {
        fieldName: _.trim(item)
      };
    }), function (field) {
      return field.fieldName !== '';
    });

    _.defaults(options, {
      limit: missingFieldElement.length,
      offset: 0
    });

    var deferred = new jQuery.Deferred(),
        limit = Math.min(missingFieldList.length, options.limit),
        resultData = [];

    if (options.offset < missingFieldList.length) {
      resultData = missingFieldList.slice(options.offset, options.offset + limit);
    }

    deferred.resolve({
      data: resultData,
      total: missingFieldList.length
    });
    return deferred.promise();
  },
  _getParameterByName: function _getParameterByName(name) {
    var urlParamPattern = new RegExp('[\\?&]' + name + '=([^&#]*)'),
        paramValues = urlParamPattern.exec(location.search);
    return paramValues == null ? '' : decodeURIComponent(paramValues[1].replace(/\+/g, ' '));
  },
  _onOKClick: function _onOKClick() {
    var toDecorate = this._getParameterByName('decorate');

    document.location = 'flow.html?_flowId=adhocFlow' + '&_flowExecutionKey=' + window.flowExecutionKey + '&embeddedDesigner=' + window.isEmbeddedDesigner + '&decorate=' + toDecorate + '&_eventId=' + 'fixAndInit';
  },
  _onCancelClick: function _onCancelClick() {
    this.close();

    if (window.isEmbeddedDesigner && document.referrer.indexOf('login.html') === -1) {
      jQuery(document).trigger('adhocDesigner:cancel');
    } else {
      this.close();
      window.history.back();
    }
  }
});

});