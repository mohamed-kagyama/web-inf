define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AJAX_LOADING_ID = 'loading';
var isIE = navigator.userAgent.toLowerCase().indexOf('msie') > -1;
module.exports = {
  LOADING_DIALOG_DELAY: 800,
  //check presents of element in DOM
  isElementInDom: function isElementInDom(elem) {
    var nextSibling = elem.nextSibling;
    var parent = elem.parentNode && elem.parentNode.nodeType !== 11;
    return nextSibling || parent;
  },
  // Optimized inserting of big content to DOM
  setInnerHtml: function setInnerHtml(el, template, data) {
    var nextSibling, parent, display;

    if (this.isElementInDom(el)) {
      nextSibling = el.nextSibling;
      parent = el.parentNode;
      display = el.style.display; //turn off css reflows on it element during update
      //turn off css reflows on it element during update

      el.style.display = 'none'; //remove from the dom, it also reduce reflows on this element
      //remove from the dom, it also reduce reflows on this element

      parent.removeChild(el);
    }

    $(el).html('');

    if (isIE && el.tagName == 'SELECT') {
      //workaround for bug in IE, select element and innerHTML functionality
      //TODO: rewrite it, because it hardcoded for one special case it doesn't use template
      var fragment = document.createDocumentFragment();

      _.each(data.data, function (data) {
        var option = document.createElement('OPTION'); //hardcoded workaround for report options
        //hardcoded workaround for report options

        option.value = !_.isUndefined(data.value) ? data.value : data.id;
        $(option).html(data.label);

        if (data.selected) {
          option.setAttribute('selected', 'selected');
        }

        fragment.appendChild(option);
      });

      el.appendChild(fragment);
    } else {
      $(el).html(template(data));
    }

    if (nextSibling) {
      parent.insertBefore(el, nextSibling);
    } else {
      parent.appendChild(el);
    }

    el.style.display = display;

    if (isIE && el.tagName == 'SELECT') {
      //workaround for IE8,9, where width of 'select' not updates, before user click on.
      //reset style to force browser's reflows for 'select' element
      var styleContent = el.getAttribute('style');
      el.removeAttribute('style');
      el.setAttribute('style', styleContent);
    }
  },
  wait: function wait(delay) {
    return $.Deferred(function (dfr) {
      setTimeout(dfr.resolve, delay);
    });
  },
  showLoadingDialogOn: function showLoadingDialogOn(deferred, delay, modal) {
    this.wait(delay ? delay : this.LOADING_DIALOG_DELAY).then(_.bind(function () {
      if (deferred.state() == 'pending') {
        //Do not focus on loading dialog
        // TODO replace dialog
        //dialogs.popup.show(jQuery(AJAX_LOADING_ID), modal, {focus: false});
        $.when(deferred).always(_.bind(function () {
          //don't close loading dialog very fast it irritates user
          this.wait(500).then(function () {} // TODO replace dialog
          //dialogs.popup.hide(jQuery(AJAX_LOADING_ID));
          );
        }, this));
      }
    }, this));
  },
  createTimer: function createTimer(message) {
    var timer = new $.Deferred();
    timer.done(function (startTime) {
      var endTime = new Date().getTime();
      var diff = endTime - startTime;
      /*eslint-disable-next-line no-console*/

      console.log(message + ' took time: ' + diff + ' msec.');
    });
    return {
      start: function start() {
        this.startTime = new Date().getTime();
        return this;
      },
      stop: function stop() {
        timer.resolve(this.startTime);
        return this;
      }
    };
  },
  //merge  values  with selection
  merge: function merge(values, selections) {
    if (_.isNull(values) || _.isUndefined(values)) {
      return selections;
    }

    if (_.isNull(selections) || _.isUndefined(selections)) {
      return values;
    }

    if (_.isArray(selections)) {
      return _.map(values, function (option) {
        var selectedValue = _.find(selections, function (selection) {
          return selection === option.value;
        });

        if (selectedValue !== undefined) {
          option.selected = true;
        } else {
          delete option.selected;
        }

        return option;
      });
    } else {
      return this.merge(values, [selections]);
    }
  },
  extractSelection: function extractSelection(controlData, single) {
    if (!controlData) {
      return null;
    }

    var selection = {};

    for (var i = 0; i < controlData.length; i++) {
      var item = controlData[i];

      if (item.selected) {
        selection[i] = item.value;

        if (single) {
          break;
        }
      }
    }

    return selection;
  },
  //check for changes between two objects
  isSelectionChanged: function isSelectionChanged(previous, next) {
    var previousControlIds = previous ? _(previous).keys() : [];
    var nextControlIds = next ? _(next).keys() : [];

    var controlsIdUnion = _.union(previousControlIds, nextControlIds);

    if (controlsIdUnion.length === previousControlIds.length) {
      var previousFlattenValues = previous ? _.flatten(_(previous).values()) : [];
      var nextFlattenValues = next ? _.flatten(_(next).values()) : [];
      return _.difference(previousFlattenValues, nextFlattenValues).length > 0 || _.difference(nextFlattenValues, previousFlattenValues).length > 0;
    }

    return true;
  }
};

});