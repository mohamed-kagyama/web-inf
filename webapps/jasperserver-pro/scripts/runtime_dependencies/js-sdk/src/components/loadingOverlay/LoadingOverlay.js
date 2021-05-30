define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var overlayLayout = require("text!./template/overlayLayout.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
module.exports = Backbone.View.extend({
  template: _.template(overlayLayout),
  initialize: function initialize(options) {
    this.delay = options.delay;
    this.render();
  },
  render: function render() {
    this.$el.append(this.template());
    this.$elSpinner = this.$('.jr-mSpinnerDatatable');
    this.$elOverlay = this.$('.jr-mOverlay');
    return this;
  },
  show: function show(delay) {
    var self = this,
        show = function show() {
      self.$elSpinner.show();
      self.$elOverlay.show();
    };

    if (this.delay || delay) {
      if (!this._timer) {
        this._timer = setTimeout(show, this.delay || delay);
      }
    } else show();
  },
  hide: function hide() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }

    this.$elSpinner.hide();
    this.$elOverlay.hide();
  },
  remove: function remove() {
    this.$elSpinner.remove();
    this.$elOverlay.remove();
    this.stopListening();
    return this;
  }
});

});