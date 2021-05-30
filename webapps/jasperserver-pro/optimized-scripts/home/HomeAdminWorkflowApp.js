/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","react","./converter/homeAdminWorkflowsConverter","./components/WorkflowsCategory","./components/Workflow"],function(t,e,o){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function r(){return r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},r.apply(this,arguments)}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function c(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,e,o){return e&&c(t.prototype,e),o&&c(t,o),t}function u(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?l(t):e}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function p(t,e){return(p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t,e){window.location.href=e}function m(t){window.location.href=t}var b=t("react"),w=b,h=b.Component,v=t("./converter/homeAdminWorkflowsConverter"),k=v.adminWorkflowsConverter,d=t("./components/WorkflowsCategory"),O=d.WorkflowsCategory,g=t("./components/Workflow"),C=g.Workflow,j=function(t){function e(){return i(this,e),u(this,a(e).apply(this,arguments))}return s(e,t),f(e,[{key:"render",value:function(){var t=k(this.props.workflows);return w.createElement("div",{className:"homeAdmin"},w.createElement(O,{key:t.title,title:t.title,categoryClass:t.categoryClass},t.items.map(function(t){return w.createElement(C,r({key:t.title},t,{onPrimaryActionClick:y,onSecondaryActionClick:m}))})))}}]),e}(h);o.exports=j});