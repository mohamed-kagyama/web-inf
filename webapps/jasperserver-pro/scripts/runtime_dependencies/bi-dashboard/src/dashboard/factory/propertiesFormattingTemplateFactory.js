define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DashboardBundle");

var scaleToFitControlTemplate = require("text!../template/properties/controls/scaleToFitControlTemplate.htm");

var bordersControlTemplate = require("text!../template/properties/controls/bordersControlTemplate.htm");

var textFormattingControlTemplate = require("text!../template/properties/controls/text/textFormattingControlTemplate.htm");

var dashboardComponentTypes = require('../enum/dashboardComponentTypes');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var templateByType = {};
templateByType[dashboardComponentTypes.FREE_TEXT] = [wrapWithTitle(i18n['dashboard.dialog.properties.title.formatting.text'], [scaleToFitControlTemplate, textFormattingControlTemplate]), wrapWithTitle(i18n['dashboard.dialog.properties.title.formatting.dashlet'], [bordersControlTemplate])].join('\n');
/**
 * @description wraps template into div
 * @access private
 * @memberof factory:propertiesTemplateFactory
 */

/**
 * @description wraps template into div
 * @access private
 * @memberof factory:propertiesTemplateFactory
 */

function wrapTemplate(template) {
  return '<div>' + template + '</div>';
}
/**
 * Returns wrapped with content with provided title
 * @param {Array} content
 * @param {String} title
 * @returns {string}
 */

/**
 * Returns wrapped with content with provided title
 * @param {Array} content
 * @param {String} title
 * @returns {string}
 */


function wrapWithTitle(title, content) {
  return ['<div class="section">', '   <span class="title">' + title + '</span>', '   <div class="group">', '       ' + content.join('\n'), '   </div>', '</div>'].join('');
}

module.exports = function (model) {
  var type;
  var template = (type = model.get('type')) in templateByType ? templateByType[type] : '';
  return wrapTemplate(template);
};

});