define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var jiveTypes = require('../jive/enum/jiveTypes');

var reportCreators = require('../enum/reportCreators');

var JiveComponentCollectionView = require('../jive/view/JiveComponentCollectionView');

var reportOutputFormats = require('../enum/reportOutputFormats');

var $ = require('jquery');

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

var reportEvents = require('../enum/reportEvents');

var scaleStrategies = require('../enum/scaleStrategies');

var domUtil = require("runtime_dependencies/js-sdk/src/common/util/domUtil");

var domReady = require('requirejs-domready');

var LoadingOverlay = require('./LoadingOverlay');

var LocalFrameView = require('./LocalFrameView');

var DialogStates = require('../utils/DialogStates');

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

require('jquery-ui/ui/scroll-parent');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var log = logger.register("ReportView");
var ADHOC_CHART_REPORT_TITLE_CLASS = "adhoc_chart_report_title",
    TIMEOUT_OF_DISPLAYING_OVERLAY = 1000;
module.exports = Backbone.View.extend({
  el: "<div style='height: 100%;'></div>",
  $reportContainer: false,
  $jrTables: false,
  savedContainersOverflow: false,
  reportIsEmpty: false,
  initialize: function initialize(options) {
    this.stateModel = options.stateModel; // the variable `visualChooserDialogStates` keeps the states of the dialogs `VisualChooserDialog` which
    // may be opened in the report viewer. Yes, there can be opened several dialogs.
    // By default we don't have any data, it's empty, and each dialog may add there its information
    // and use it later. Just search the 'visualChooserDialogStates' thr the code to see how it's used.

    this.dialogStates = new DialogStates();
    this.jiveComponentCollectionView = new JiveComponentCollectionView({
      collection: this.collection,
      dialogStates: this.dialogStates,
      stateModel: options.stateModel
    }); // set the relative position to the our $el element

    this.$el.css("position", "relative");
    this._afterResizeFunc = _.throttle(_.bind(this._afterResizeFunc, this), 400);
    $(window).on("resize", this._afterResizeFunc);
  },
  _afterResizeFunc: function _afterResizeFunc(e) {
    if (e && !e.target.tagName && this.stateModel.get("autoresize") !== false) {
      this.applyScale();
    }
  },
  linkOptions: function linkOptions() {
    return this.stateModel.get("linkOptions");
  },
  remove: function remove() {
    $(window).off("resize", this._afterResizeFunc); // in case of isolated dom we might installed additional resize listener

    if (this._setLocalFrameSize) {
      $(window).off("resize", this._setLocalFrameSize);
      this._setLocalFrameSize = false;
    }

    this.jiveComponentCollectionView.remove();
    this.localFrameView && this.localFrameView.remove();
    return Backbone.View.prototype.remove.call(this);
  },
  setContainer: function setContainer(selector) {
    var $reportContainer = $(selector),
        self = this;

    if (!$reportContainer.length) {
      return false;
    }

    if ($reportContainer[0] === this.$reportContainer[0] && $.contains($reportContainer[0], this.el)) {
      return true;
    }

    $reportContainer.empty(); // since we emptied the container, he report which might be there is removed as well

    this.$jrTables = false;
    this.$reportContainer = $reportContainer; // next, wait for the domReady event and append our $el into the container

    this.containerAttachedToDOM = new $.Deferred();
    domReady(function () {
      if (self.stateModel.get("isolateDom")) {
        self.localFrameView = new LocalFrameView(self.$el);
        self.$reportContainer.html(self.localFrameView.$el);
      } else {
        self.$reportContainer.html(self.$el);
        self.showOverlay();
      }

      self.containerAttachedToDOM.resolve();
    });
    return true;
  },
  render: function render() {
    var self = this,
        dfd = new $.Deferred();
    this.containerAttachedToDOM.done(function () {
      if (self.stateModel.get("isolateDom")) {
        self.renderIsolatedDom(dfd);
      } else {
        self.renderReport(); // the report is empty, nothing to do

        if (self.reportIsEmpty) {
          dfd.resolve();
          return;
        }

        self.renderJive().then(dfd.resolve, dfd.reject);
      }
    });
    return dfd;
  },
  renderIsolatedDom: function renderIsolatedDom(dfd) {
    var self = this;

    if (this.isElasticChart()) {
      this._setLocalFrameSize = _.throttle(function () {
        var containerHeight = self.$reportContainer.height();
        self.localFrameView.$el.height(containerHeight || 400);
      }, 100);

      this._setLocalFrameSize();

      $(window).resize(this._setLocalFrameSize);
    }

    this.renderReport(); // the report is empty, nothing to do

    if (this.reportIsEmpty) {
      dfd.resolve();
      return;
    }

    this.renderJive().done(function () {
      dfd.resolve();
    });
  },
  renderReport: function renderReport() {
    var output = this.model.getExport(reportOutputFormats.HTML).getHTMLOutput(),
        elastic = this.isElasticChart(),
        scrollToTop = typeof this.stateModel.get("scrollToTop") === "undefined" ? true : this.stateModel.get("scrollToTop"),
        showAdhocChartTitle = typeof this.stateModel.get("showAdhocChartTitle") === "undefined" ? true : this.stateModel.get("showAdhocChartTitle"),
        $output = $(output),
        defaultJiveUi = this.stateModel.get("defaultJiveUi");

    if (output) {
      this.reportIsEmpty = false;
      this.stateModel.get("linkOptions") && processLinks(this, $output);

      if (elastic) {
        if (showAdhocChartTitle) {
          this.highchartsReportTitle = $.trim($output.find("tbody tr td span").text());
        }

        $output = $output.find(".highcharts_parent_container").clone().css({
          "margin": "0 auto",
          "height": "100%"
        }); // Dirty hack to make pie chart rendering to work. Is done because of adhocHighchartsSettingService.js

        $output = $("<div></div>").append($output).append("<table cellpadding='0' cellspacing='0' class='jrPage'></table>").html();
      }

      this.$el.html($output);

      if (defaultJiveUi && !defaultJiveUi.enabled) {
        this.$el.addClass("jiveDisabled");
      }

      this.trigger(reportEvents.BEFORE_RENDER, this.$el[0]);
      var containerToFindIn = this.$reportContainer; // need to show scrollbar to properly calculate scale factor

      this.loadingOverlay && this.loadingOverlay.showScrollBarOnContainer();

      if (this.stateModel.get("isolateDom")) {
        containerToFindIn = this.localFrameView.$frameBody;
      }

      this.$jrTables = containerToFindIn.find(elastic ? "._jr_report_container_" : "._jr_report_container_ > table");
      this.applyScale();

      if (this.stateModel.has("pages") && _.isObject(this.stateModel.get("pages"))) {
        var anchor = this.stateModel.get("pages").anchor;

        if (!_.isUndefined(anchor) && anchor !== "") {
          var $anchorEl = this.$el.find("[name='" + anchor + "']"),
              scaleFactor = this.calculateScaleFactor(); // search for ID if name='anchor' was not found

          if (!$anchorEl.length) {
            $anchorEl = this.$el.find("#" + anchor);
          }

          if ($anchorEl.length && !_.isUndefined(scaleFactor)) {
            this.$el.scrollParent().scrollTop((domUtil.getElementOffset($anchorEl[0]).top - domUtil.getElementOffset(this.$el.scrollParent()[0]).top) * scaleFactor);
          } else {
            scrollToTop && this.$el.scrollParent().scrollTop(0);
          }
        }
      } else {
        scrollToTop && this.$el.scrollParent().scrollTop(0);
      }
    } else {
      // means the report is not found, we need to empty the container
      this.reportIsEmpty = true;
      this.$el.empty();
    }

    return this;
  },
  renderJive: function renderJive() {
    var self = this;
    log.debug('Start JIVE Rendering');
    var timer = setTimeout(function () {
      self.showOverlay();
    }, TIMEOUT_OF_DISPLAYING_OVERLAY);
    var dfd = this.jiveComponentCollectionView.render(this.$el, {
      highchartsReportTitle: this.highchartsReportTitle
    });
    dfd.always(function () {
      clearTimeout(timer);
      self.hideOverlay();
      log.debug('Finish JIVE Rendering');
    });
    return dfd;
  },
  showOverlay: function showOverlay() {
    var self = this,
        continueShowing = function continueShowing() {
      if (self.stateModel.get("loadingOverlay") === false) {
        return;
      }

      if (!self.$reportContainer) {
        return;
      }

      var biComponentContainer = self.$el;

      if (self.stateModel.get("isolateDom")) {
        biComponentContainer = self.localFrameView.$frameBody;
      }

      if (!self.loadingOverlay) {
        self.loadingOverlay = new LoadingOverlay({
          propertiesModel: self.stateModel,
          scaleFactor: self.scaleFactor,
          externalContainer: self.$reportContainer,
          biComponentContainer: biComponentContainer,
          biComponent: self.$jrTables
        });
      } else {
        // bi component and container are changing all the time, so we need to update them each time we are going to render the overlay
        self.loadingOverlay.setExternalContainer(self.$reportContainer);
        self.loadingOverlay.setBiComponentContainer(biComponentContainer);
        self.loadingOverlay.setBiComponent(self.$jrTables);
        self.loadingOverlay.setScaleFactor(self.scaleFactor);
      }

      self.loadingOverlay.show();
    };

    if (this.stateModel.get("isolateDom")) {
      // wait till local frame will be loaded as well
      this.localFrameView.frameLoaded.done(continueShowing);
    } else {
      continueShowing();
    }
  },
  hideOverlay: function hideOverlay() {
    if (!this.loadingOverlay) {
      return;
    }

    this.loadingOverlay.hide();
  },
  applyScale: function applyScale() {
    var self = this;

    if (!this.$jrTables) {
      return;
    }

    var scaleFactor = this.calculateScaleFactor();

    if (_.isUndefined(scaleFactor)) {
      return;
    }

    this._applyScaleTransform(scaleFactor);

    if (this.isElasticChart()) {
      this._autoScaleFontsEnabled() && this._setAutoScaleFonts();
      var chartParent = $(this.$jrTables.parents()[0]),
          $reportTitle = this.$reportContainer.find("." + ADHOC_CHART_REPORT_TITLE_CLASS);
      chartParent.css("overflow", "hidden");
      this.jiveComponentCollectionView.getSizableSubviews().then(function (sizableSubviews) {
        // we have to use this ugly hook to provide right recalculation of chart height
        $reportTitle.height(0);

        _.invoke(sizableSubviews, "setSize", chartParent.width(), chartParent.height(), self.stateModel.get("chart").animation); // restore report title height. Use timeout with 0 delay to put execution of callback function to end of events queue


        setTimeout(function () {
          $reportTitle.height('auto');
        }, 0);
      });
      chartParent.css("overflow", "visible");
    }
  },
  calculateScaleFactor: function calculateScaleFactor() {
    var scale = this.stateModel.get("scale"),
        scaleFactor;

    if (_.isUndefined(scale)) {
      scaleFactor = 1;
    } else {
      if (_.contains(_.values(scaleStrategies), scale)) {
        var jrWidth = this.$jrTables.width(),
            jrHeight = this.$jrTables.height(),
            cWidth = this.$reportContainer.width(),
            cHeight = this.$reportContainer.height() || 400;
        scaleFactor = getScaleFactor(scale, jrWidth, jrHeight, cWidth, cHeight);

        if (domUtil.isScrollable(this.$reportContainer[0])) {
          var scrollbarSize = domUtil.getScrollbarWidth();

          if (scale === scaleStrategies.CONTAINER || scale === scaleStrategies.WIDTH) {
            // if the new height of the report will be more than height of the container
            // then we need to decrease the scaleFactor to leave some space for vertical scroll on the right side
            if (scaleFactor * jrHeight > cHeight) {
              cWidth -= scrollbarSize + 1;
              scaleFactor = getScaleFactor(scale, jrWidth, jrHeight, cWidth, cHeight);
            }
          }

          if (scale === scaleStrategies.CONTAINER || scale === scaleStrategies.HEIGHT) {
            // if the new width of the report will be more than width of the container
            // then we need to decrease the scaleFactor to leave some space for horizontal scroll on the bottom
            if (scaleFactor * jrWidth > cWidth) {
              cHeight -= scrollbarSize + 1;
              scaleFactor = getScaleFactor(scale, jrWidth, jrHeight, cWidth, cHeight);
            }
          }
        }
      } else {
        var hasPercent = /^\d+%$/.test(scale);
        scaleFactor = parseFloat(scale.toString().replace(",", "."));

        if (_.isNaN(scaleFactor)) {
          scaleFactor = undefined;
        }

        if (hasPercent) {
          scaleFactor = scaleFactor / 100;
        }
      }
    }

    return scaleFactor;
  },
  _applyScaleTransform: function _applyScaleTransform(scaleFactor) {
    var self = this;
    this.scaleFactor = scaleFactor;

    if (this.loadingOverlay) {
      this.loadingOverlay.applyScale(scaleFactor);
    }

    var css = this._getCssRulesForScalingFactor(scaleFactor); // in case we have several pages ($jrTables) in report we should apply
    // scaling to whole container which contains pages. This is because once any page is scaled,
    // it will overlap its next page.
    // for details see issue https://jira.tibco.com/browse/JS-28319


    if (this.$jrTables.length > 1) {
      this.$jrTables.parent().css(css);
    } else {
      this.$jrTables.css(css);
    }

    this.isGoogleMap() && this._setScaleForGooglemap(scaleFactor);
    this.jiveComponentCollectionView.getScalableSubviews().then(function (scalableSubviews) {
      _.invoke(scalableSubviews, "scale", scaleFactor);
    }); //_.invoke(this.jiveComponentCollectionView.scalableSubviews(), "scale", scaleFactor);

    if (this.stateModel.get("isolateDom")) {
      // if frame has width less than report has, then increase the width of the frame
      if (this.localFrameView.$el.width() < this.$jrTables.width() * scaleFactor) {
        this.localFrameView.$el.width(this.$jrTables.width() * scaleFactor);
      }

      setTimeout(function () {
        self.localFrameView.$el.height(self.$jrTables.height() * self.$jrTables.length * scaleFactor);
      }, 50);
    }
  },
  _getCssRulesForScalingFactor: function _getCssRulesForScalingFactor(scaleFactor) {
    var scale = 'scale(' + scaleFactor + ")",
        origin = "top left";
    var css = {
      '-webkit-transform': scale,
      '-moz-transform': scale,
      '-ms-transform': scale,
      '-o-transform': scale,
      'transform': scale,
      '-webkit-transform-origin': origin,
      '-moz-transform-origin': origin,
      '-ms-transform-origin': origin,
      '-o-transform-origin': origin,
      'transform-origin': origin
    }; // transform: scale, analog for IE8 and lower.

    if (browserDetection.isIE8()) {
      css.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + scaleFactor + ", M12=0, M21=0, M22=" + scaleFactor + ", SizingMethod='auto expand')";
    }

    return css;
  },
  isElasticChart: function isElasticChart() {
    return this.collection.some(function (component) {
      return reportCreators.AD_HOC_DESIGNER === component.get("creator") && jiveTypes.CHART === component.get("type");
    });
  },
  isGoogleMap: function isGoogleMap() {
    return this.collection.some(function (component) {
      return jiveTypes.GOOGLEMAP === component.get("type");
    });
  },
  _setScaleForGooglemap: function _setScaleForGooglemap(scaleFactor) {
    this.collection.each(function (component) {
      if (jiveTypes.GOOGLEMAP === component.get("type")) {
        var $mapContainer = this.$el.find("#" + component.get("id")),
            $mapContainerParent = $mapContainer.parent();
        $mapContainer.width($mapContainerParent.width() * scaleFactor);
        $mapContainer.height($mapContainerParent.height() * scaleFactor);
        $mapContainer.css(this._getCssRulesForScalingFactor(1 / scaleFactor));
      }
    }, this);
  },
  _autoScaleFontsEnabled: function _autoScaleFontsEnabled() {
    return this.collection.some(function (component) {
      return component.get("hcinstancedata").services[0].data.chartState.autoScaleFonts;
    });
  },
  _setAutoScaleFonts: function _setAutoScaleFonts() {
    var fontSize = parseInt(this.$jrTables.css("font-size")),
        width = this.$jrTables.width(),
        scale = width > 600 ? 1 : (Math.floor(width / 100) + 4) / 10,
        scaledSize = Math.round(fontSize * scale);
    this.$jrTables.find(".highcharts_parent_container").css("font-size", scaledSize);
  }
});

function getScaleFactor(scaleStrategy, jrWidth, jrHeight, cWidth, cHeight) {
  var scale;

  if (scaleStrategy === scaleStrategies.WIDTH) {
    scale = cWidth / jrWidth;
  } else if (scaleStrategy === scaleStrategies.HEIGHT) {
    scale = cHeight / jrHeight;
  } else {
    var scaleV = cWidth / jrWidth,
        scaleH = cHeight / jrHeight;
    scale = scaleV * jrHeight < cHeight ? scaleV : scaleH;
  }

  return scale;
}

function processLinks(view, $markup) {
  var links = view.model.components.getLinks();
  var linkOptions = view.linkOptions();

  if (linkOptions.beforeRender && links.length) {
    linkOptions.beforeRender(_.map(links, function (hyperlinkData) {
      return {
        element: $markup.find("[data-id='" + hyperlinkData.id + "']")[0],
        data: hyperlinkData
      };
    }));
  }

  if (linkOptions.events && links.length) {
    view.events = _.reduce(_.keys(linkOptions.events), function (events, eventName) {
      events[eventName + " ._jrHyperLink"] = processLinkEventHandler(links, view.stateModel.get("linkOptions").events[eventName]);
      return events;
    }, {});
    view.delegateEvents();
  }
}

function processLinkEventHandler(links, handler) {
  return function (event) {
    handler.call(this, event, _.findWhere(links, {
      id: event.currentTarget.getAttribute("data-id")
    }));
  };
}

});