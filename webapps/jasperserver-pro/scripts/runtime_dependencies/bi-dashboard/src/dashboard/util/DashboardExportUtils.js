define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var request = require("request");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var _oldStyle;

function setRequiredByPhantomPrefixes(view) {
  view.$('.jrPage').each(function (index, element) {
    var $element = $(element),
        style = $element.attr('style') || '',
        transform = $element.css('transform'),
        transformOrigin = $element.css('transform-origin');

    if (style.indexOf('transform') >= 0 && style.indexOf('-webkit-transform') == -1) {
      $element.attr('style', [style, '-webkit-transform:', transform, '; -webkit-transform-origin:', transformOrigin, ';'].join(''));
    }
  });
}

function embedImages() {
  try {
    var canvas = document.createElement("canvas"),
        dfd = new $.Deferred();

    if (!canvas || !canvas.getContext) {
      dfd.resolve();
    } else {
      return $.when.apply($, $("img").map(function (index, img) {
        var mapResultDfd = new $.Deferred();

        if (img.src.substring(0, 4) !== "data") {
          if (!canvas) {
            canvas = document.createElement("canvas");
          }

          try {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext("2d").drawImage(img, 0, 0);
            img.src = canvas.toDataURL("image/png");
            mapResultDfd.resolve();
          } catch (e) {
            var imageUrl = img.src;

            if (imageUrl.indexOf('/rest_v2/') >= 0) {
              var downloadedImg = new Image();
              downloadedImg.crossOrigin = "use-credentials";
              downloadedImg.addEventListener("load", function () {
                canvas = document.createElement("canvas");
                canvas.width = downloadedImg.width;
                canvas.height = downloadedImg.height;
                canvas.getContext("2d").drawImage(downloadedImg, 0, 0);

                try {
                  img.src = canvas.toDataURL("image/png");
                  mapResultDfd.resolve();
                } catch (err) {
                  mapResultDfd.resolve();
                }
              }, false);
              downloadedImg.src = imageUrl;
            } else {
              mapResultDfd.resolve();
            }
          }

          canvas = null;
        } else {
          mapResultDfd.resolve();
        }

        return mapResultDfd.promise();
      }));
    }
  } catch (e) {}

  return dfd.promise();
}

function embedValues() {
  $("input").each(function (index, inp) {
    var input = $(inp),
        type = input.attr("type");

    if (type == "text") {
      input.attr("value", input.val());
    } else if (type == "radio" || type == "checkbox") {
      input.attr("checked", inp.checked ? "checked" : null);
    }
  });
}

function style() {
  return _.reduce(document.styleSheets, function (memo, stylesheet) {
    var str = "/reportresource?",
        index = stylesheet.href ? stylesheet.href.indexOf(str) : -1;

    if (index >= 0) {
      memo.push(stylesheet.href.substring(index + str.length));
    }

    return memo;
  }, []);
}

function hideJive() {
  var jive_overlay = $("#jive_overlay").css("display"),
      jive_marker = $("#jive_marker").css("display"),
      jive_foobar = $("#jive_marker").css("display");
  $("#jive_overlay").css("display", "none");
  $("#jive_marker").css("display", "none");
  $("#jive_foobar").css("display", "none");
  return function () {
    $("#jive_overlay").css("display", jive_overlay);
    $("#jive_marker").css("display", jive_marker);
    $("#jive_foobar").css("display", jive_foobar);
  };
}

module.exports = {
  prepareForExport: function prepareForExport(canvasView) {
    setRequiredByPhantomPrefixes(canvasView);
  },
  applyReferenceSize: function applyReferenceSize(canvasView, size) {
    var ratio,
        canvas = canvasView.$('.dashboardCanvas:first').length == 0 ? canvasView.$el : canvasView.$('.dashboardCanvas:first');
    _oldStyle = _oldStyle || canvas.attr('style') || false;
    ratio = Math.min(3508 / size.width, 2480 / size.height); // style set using attribute intentionally, because -webkit-* properties are removed sometimes,
    // while old PhantomJS versions demand exactly -webkit-* versions of selector names
    // style set using attribute intentionally, because -webkit-* properties are removed sometimes,
    // while old PhantomJS versions demand exactly -webkit-* versions of selector names

    canvas.attr('style', '-webkit-transform: scale(' + ratio + '); transform-origin: left top; transform: scale(' + ratio + '); -webkit-transform-origin: left top; width: ' + size.width + 'px; height: ' + size.height + 'px;');
  },
  removeReferenceSize: function removeReferenceSize(canvasView) {
    var canvas = canvasView.$('.dashboardCanvas:first').length == 0 ? canvasView.$el : canvasView.$('.dashboardCanvas:first');

    if (!_.isUndefined(_oldStyle)) {
      canvas.attr('style', _oldStyle ? _oldStyle : null);
      _oldStyle = undefined;
    }
  },
  requestDashboardExport: function requestDashboardExport(self, options) {
    var contextPath = self.contextPath;
    var dfd = new $.Deferred();
    this.createExportDto(self, options).then(function (dto) {
      request({
        url: contextPath + "/rest_v2/dashboardExecutions",
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        contentType: "application/json",
        processData: false,
        dataType: "json",
        data: JSON.stringify(dto)
      }).done(function (a, b, c) {
        dfd.resolve(a, b, c);
      }).fail(function (a, b, c) {
        dfd.reject(a, b, c);
      });
    });
    return dfd;
  },
  createExportDto: function createExportDto(self, type) {
    var _this = this;

    var markup,
        width,
        height,
        content,
        restoreJive = hideJive(),
        canvas = self.dashboardCanvas ? self.dashboardCanvas.$el : self.$('.dashboardCanvas:first'),
        dfd = new $.Deferred();
    embedImages().then(function () {
      embedValues();

      _this.prepareForExport(self.dashboardCanvas ? self.dashboardCanvas : self);

      if (type == "pdf") {
        content = canvas.children(".content");

        _this.applyReferenceSize(self.dashboardCanvas ? self.dashboardCanvas : self, {
          width: content.width(),
          height: content.height()
        });

        width = 3508;
        height = 2480;
      } else {
        width = canvas.width();
        height = canvas.height();
      }

      markup = canvas.parent().html();
      restoreJive();

      _this.removeReferenceSize(self.dashboardCanvas ? self.dashboardCanvas : self);

      dfd.resolve({
        uri: self.model.get("uri"),
        width: width,
        height: height,
        format: type,
        markup: markup,
        jrStyle: style()
      });
    });
    return dfd.promise();
  },
  wait: function wait(id, dfd) {
    var self = this;
    id && request({
      url: this.contextPath + "/rest_v2/dashboardExecutions/" + id + "/status",
      headers: {
        "Accept": "application/json"
      },
      dataType: "json"
    }).done(function (status) {
      if (status.status === "execution") {
        dfd.notifyWith(self, [status.progress]);
        setTimeout(_.bind(wait, self, id, dfd), 1000);
      } else {
        dfd.resolve({
          status: status.status,
          href: self.contextPath + "/rest_v2/dashboardExecutions/" + status.id + "/outputResource",
          id: status.id
        });
      }
    }).fail(_.bind(dfd.reject, dfd));
    return dfd;
  }
};

});