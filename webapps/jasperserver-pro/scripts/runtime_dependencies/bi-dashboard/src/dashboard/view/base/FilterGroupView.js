define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var i18n = require("bundle!CommonBundle");

var dashboardSettings = require('../../dashboardSettings');

var filterGroupButtonsTemplate = require("text!../../template/filterGroupButtonsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ATTRIBUTES = {
  APPLY: 'applyButton',
  RESET: 'resetButton',
  FILTERS_PER_ROW: 'filtersPerRow',
  BUTTONS_POSITION: 'buttonsPosition',
  FLOATING: 'floating'
};
var FILTER_ROW_CLASS = 'filterRow';
var FILTER_ROW_FLUID = 'fluid';
var BUTTONS_FIXED = 'fixed';
var BUTTONS_POSITION_RIGHT = 'right';
var ONE_BUTTON_CLASS = 'oneButton';
/**
 * @class FilterGroupView
 * @classdesc FilterGroupView component.
 */

module.exports = Backbone.View.extend(
/** @lends FilterGroupView.prototype */
{
  /**
   * @description Initializes event handlers for model events.
   */
  initialize: function initialize() {
    _.bindAll(this, '_onWindowResize');

    this.listenTo(this.model, 'change', this._onPropertiesChange);
    $(window).on('resize', this._onWindowResize);
  },

  /**
   * @description Renders filter group buttons and subscribes on events.
   */
  render: function render() {
    this.$footer = this.$el.parent().append(_.template(filterGroupButtonsTemplate, {
      i18n: i18n
    })).find('.filterGroupButtons');
    this.$applyButton = this.$footer.find('[data-target=\'' + ATTRIBUTES.APPLY + '\']');
    this.$resetButton = this.$footer.find('[data-target=\'' + ATTRIBUTES.RESET + '\']');
    this.$applyButton.on('click', _.bind(this.model.notify, this.model, true));
    this.$resetButton.on('click', _.bind(this._onResetClick, this));

    this._setButtonsVisibility();
  },

  /**
   * @description Removes buttons and unsubscribes from events.
   * @returns {*}
   */
  remove: function remove() {
    this.$applyButton && this.$applyButton.off('click');
    this.$resetButton && this.$resetButton.off('click');
    $(window).off('resize', this._onWindowResize);
    return Backbone.View.prototype.remove.apply(this, arguments);
  },

  /**
   * @description Changes ICs width to put necessary amount of them in one row.
   */
  resizeInputControlsWidth: function resizeInputControlsWidth(filtersPerRow) {
    if (this.$el.width() !== 0) {
      var diff = this.$el.width() / this.$el.outerWidth() * 100,
          percentageWidth = Math.floor(diff / (filtersPerRow || this.model.get(ATTRIBUTES.FILTERS_PER_ROW))) + '%';
      this.$el.find('.inputControlWrapper').css({
        width: percentageWidth
      });
    }
  },

  /**
   * @description Wrap input controls into div.
   */
  wrapInputControls: function wrapInputControls() {
    var filtersPerRow = this.model.get(ATTRIBUTES.FILTERS_PER_ROW),
        $inputControls = this.$el.find('.inputControlWrapper'),
        inputControlsCount = $inputControls.length;
    this.removeEmptyRows();
    this.unwrapInputControls($inputControls);

    for (var i = 0; i < inputControlsCount; i += filtersPerRow) {
      var $row = $('<div></div>', {
        'class': FILTER_ROW_CLASS
      }),
          $inputControlsInRow = $inputControls.filter(function (index) {
        return index >= i && index < i + filtersPerRow;
      });
      $inputControlsInRow.wrapAll($row);
    }
  },

  /**
   * @description Refresh input controls wrapping and buttons position.
   */
  refresh: function refresh() {
    this.wrapInputControls();
    this.refreshFilterGroupLayout(this.model.get(ATTRIBUTES.BUTTONS_POSITION));
  },

  /**
   * @description Unwrap input controls.
   * @param $inputControls[jQuery Object] - collection of input controls.
   */
  unwrapInputControls: function unwrapInputControls($inputControls) {
    $inputControls = $inputControls || this.$el.find('.inputControlWrapper');

    _.each($inputControls, function (inputControl) {
      $(inputControl).parent().hasClass(FILTER_ROW_CLASS) && $(inputControl).unwrap();
    });
  },

  /**
   * @description Removes empty div(.filterGroup).
   */
  removeEmptyRows: function removeEmptyRows() {
    var $rows = this.$el.find('.' + FILTER_ROW_CLASS);

    _.each($rows, function (row) {
      !$(row).children().length && $(row).remove();
    });
  },

  /**
   * @description Changes buttons position.
   * @param position
   */
  refreshFilterGroupLayout: function refreshFilterGroupLayout(position) {
    var $filterGroups = this.$el.find('.' + FILTER_ROW_CLASS),
        parentHeight = this.$el.parent().height(),
        elPadding = this.$el.css('padding'),
        self = this;

    if (position === BUTTONS_POSITION_RIGHT && (this.model.get('resetButton') || this.model.get('applyButton'))) {
      $filterGroups.addClass(FILTER_ROW_FLUID);
      this.$footer.addClass(BUTTONS_FIXED);
      this.$el.css({
        "float": 'left',
        height: this.isFloating() ? 'auto' : parentHeight - elPadding * 2 + 'px'
      });

      if (this.model.get(ATTRIBUTES.APPLY) && this.model.get(ATTRIBUTES.RESET)) {
        this.$footer.removeClass(ONE_BUTTON_CLASS);
        $filterGroups.removeClass(ONE_BUTTON_CLASS);
      } else {
        this.$footer.addClass(ONE_BUTTON_CLASS);
        $filterGroups.addClass(ONE_BUTTON_CLASS);
      }
    } else {
      $filterGroups.length && $filterGroups.removeClass(FILTER_ROW_FLUID).removeClass(ONE_BUTTON_CLASS);
      this.$footer && this.$footer.removeClass(ONE_BUTTON_CLASS).removeClass(BUTTONS_FIXED);
      this.$el.css({
        "float": 'none',
        height: this.isFloating() ? 'auto' : this.$footer.is(':visible') ? parentHeight - this.$footer.outerHeight(true) + 'px' : parentHeight
      });
    }

    if (this.isFloating()) {
      _.defer(_.bind(this.setFloatingStyle, self));
    }
  },

  /**
   * @description Enables buttons.
   */
  enableButtons: function enableButtons() {
    this.$applyButton && this.$applyButton.removeAttr('disabled');
    this.$resetButton && this.$resetButton.removeAttr('disabled');
  },

  /**
   * @description Disables buttons.
   */
  disableButtons: function disableButtons() {
    this.$applyButton && this.$applyButton.attr('disabled', 'disabled');
    this.$resetButton && this.$resetButton.attr('disabled', 'disabled');
  },
  isFloating: function isFloating() {
    return this.model.get('floating');
  },
  setFloatingStyle: function setFloatingStyle() {
    var dashletContainer = this.$el.parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + '=\'' + this.model.id + '\']');
    dashletContainer.css({
      height: 'auto',
      width: 'auto',
      position: ''
    });
    dashletContainer.find('.dashletContent > .content').css({
      height: '100%',
      width: '100%'
    });

    if (dashletContainer.hasClass('ui-resizable')) {
      dashletContainer.resizable('destroy');
    }
  },

  /**
   * @description Resets view.
   * @listens "click"
   * @private
   */
  _onResetClick: function _onResetClick() {
    this.model.isMute = true;
    var id = this.model.id;

    _.each(this.componentViews, function (view) {
      var parent = view.model.getParent();
      parent && parent.id === id && view.reset();
    });

    this.model.isMute = false;
    this.model.notify(true);
  },
  _onWindowResize: function _onWindowResize(e) {
    if (this.isFloating()) {
      var dashletContainer = this.$el.parents('[' + dashboardSettings.COMPONENT_ID_ATTRIBUTE + '=\'' + this.model.id + '\']');
      dashletContainer.css({
        maxHeight: $('.dashboardContainer').height()
      });
    }
  },

  /**
   * @description Changes view according to properties selected in propeties dialog.
   * @listens model "change"
   * @private
   */
  _onPropertiesChange: function _onPropertiesChange() {
    var changedAttrs = this.model.changedAttributes();

    if (changedAttrs) {
      if (ATTRIBUTES.APPLY in changedAttrs || ATTRIBUTES.RESET in changedAttrs) {
        this._setButtonsVisibility();

        this.refreshFilterGroupLayout(this.model.get(ATTRIBUTES.BUTTONS_POSITION));
      }

      if (ATTRIBUTES.FILTERS_PER_ROW in changedAttrs) {
        this.resizeInputControlsWidth();
        this.refresh();
      }

      if (ATTRIBUTES.BUTTONS_POSITION in changedAttrs) {
        this.refreshFilterGroupLayout(changedAttrs[ATTRIBUTES.BUTTONS_POSITION]);
      }

      if (ATTRIBUTES.FLOATING in changedAttrs) {
        if (changedAttrs[ATTRIBUTES.FLOATING]) {
          this.resizeInputControlsWidth(1);
          this.refresh();
          this.refreshFilterGroupLayout('bottom');
          this.setFloatingStyle();
        } else {
          this.resizeInputControlsWidth();
          this.refresh();
        }
      }
    }
  },

  /**
   * @description Sets visibility of both buttons.
   * @private
   */
  _setButtonsVisibility: function _setButtonsVisibility() {
    _.each(ATTRIBUTES, function (buttonName) {
      this['$' + buttonName] && this._setButtonVisibility(buttonName);
    }, this);

    this.model.get(ATTRIBUTES.APPLY) || this.model.get(ATTRIBUTES.RESET) ? this.$footer.show() : this.$footer.hide();
  },

  /**
   * @description Sets visibility of one button.
   * @param {string} buttonName - name of button.
   * @private
   */
  _setButtonVisibility: function _setButtonVisibility(buttonName) {
    var $button = this['$' + buttonName];
    this.model.get(buttonName) ? $button.show() : $button.hide();
  }
});

});