define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require('./expressionsEnum');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = expressionsEnum.operators;
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  joinOperators: _.pick(operators, ['equals', 'notEqual', 'greater', 'less', 'greaterOrEqual', 'lessOrEqual']),
  joinTypes: {
    inner: {
      name: 'inner',
      label: i18nMessage('domain.designer.joinsDesigner.joinType.inner')
    },
    leftOuter: {
      name: 'leftOuter',
      label: i18nMessage('domain.designer.joinsDesigner.joinType.left')
    },
    rightOuter: {
      name: 'rightOuter',
      label: i18nMessage('domain.designer.joinsDesigner.joinType.right')
    },
    fullOuter: {
      name: 'fullOuter',
      label: i18nMessage('domain.designer.joinsDesigner.joinType.full')
    }
  }
};

});