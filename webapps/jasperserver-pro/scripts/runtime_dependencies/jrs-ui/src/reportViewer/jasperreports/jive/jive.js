define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var _ = require('underscore');

var i18n = require("bundle!jasperreports_messages");

var jiveTemplate = require("text!./template/jive.htm");

require("jquery-ui/ui/position");

require("jquery-ui/ui/widgets/draggable");

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
var clickEventName = 'click';

if (/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  clickEventName = 'touchend';
}

var jive = {
  name: 'jive',
  reportInstance: null,
  active: false,
  started: false,
  selectors: {},
  elements: {},
  interactive: {},
  clickEventName: clickEventName,
  isIE: /msie/i.test(navigator.userAgent),
  isIPad: /ipad/i.test(navigator.userAgent),
  isFloatingHeader: false,
  isDashboard: false,
  activeContainer: null,
  getReportContainer: function getReportContainer() {
    return this.activeContainer;
  },
  i18n: i18n,
  ui: {
    scaleFactor: 1,
    marker: {
      jo: null,
      position: null,
      setElement: function setElement(selector) {
        this.jo = $(selector);
        this.jo.draggable({
          axis: "x",
          start: function start(ev, ui) {
            jive.ui.overlay.left = jive.ui.overlay.jo.position().left;
            jive.resizingColumn = true;
          },
          drag: function drag(ev, ui) {
            jive.ui.overlay.jo.width(ui.position.left - jive.ui.overlay.left);
          },
          stop: function stop(ev, ui) {
            //jive.interactive[jive.selected.ie.config.type].resize((ui.position.left - jive.ui.overlay.left) / jive.ui.scaleFactor);
            jive.interactive[jive.selected.ie.config.type].resize((ui.position.left - jive.ui.overlay.left) / (jive.reportInstance.zoom ? jive.reportInstance.zoom.level : 1));
            jive.resizingColumn = false;
          }
        }); //this.jo.appendTo('table.jrPage');
      },
      show: function show(dim) {
        var isFirstTimeSelection = false;

        if (!this.jo) {
          this.setElement('#jive_marker');
          isFirstTimeSelection = true;
        }

        this.jo.css({
          height: dim.h
        });
        this.jo.appendTo(jive.getReportContainer()).show();
        this.jo.position({
          of: jive.ui.overlay.jo,
          my: 'left top',
          at: 'right top',
          collision: 'none'
        }); // on first time selection the markers needs to be repositioned to be correctly aligned

        isFirstTimeSelection && this.jo.position({
          of: jive.ui.overlay.jo,
          my: 'left top',
          at: 'right top',
          collision: 'none'
        });
        var de = this.jo.get(0);
        var left = this.jo.get(0).style.left;
        var top = this.jo.get(0).style.top;
        var i = left.indexOf('px');
        if (i > 0) left = left.substring(0, i);
        i = top.indexOf('px');
        if (i > 0) top = top.substring(0, i);
        this.position = {
          left: left,
          top: top
        };
      }
    },
    overlay: {
      jo: null,
      left: null,
      setElement: function setElement(selector) {
        this.jo = $(selector);
        this.jo.draggable({
          cursorAt: {
            top: 40,
            left: -30
          },
          containment: "parent",
          scroll: false,
          start: function start(ev, ui) {
            jive.hide(['foobar', 'marker']);
            jive.interactive[jive.selected.ie.config.type].onDragStart(ev, ui);
          },
          drag: function drag(ev, ui) {
            jive.interactive[jive.selected.ie.config.type].debouncedDrag.apply(ev, ui);
          },
          stop: function stop(ev, ui) {
            var iElem = jive.interactive[jive.selected.ie.config.type],
                dd = iElem.debouncedDrag;

            if (dd.isRunning()) {
              dd.cancelAndExecute(ev, ui);
            }

            iElem.onDragStop(ev, ui);
            jive.hide();
          }
        });
      },
      show: function show(dim) {
        var isFirstTimeSelection = false;

        if (!this.jo) {
          this.setElement('#jive_overlay');
          isFirstTimeSelection = true;
        }

        this.jo.css({
          width: dim.w,
          height: dim.h
        }).draggable('option', 'helper', function (event) {
          return $('div.jive_drag_label').clone().appendTo('#jive_components').html(jive.i18n["net.sf.jasperreports.components.headertoolbar.label.draghelper"]).show();
        });
        this.jo.appendTo(jive.getReportContainer()).show();
        this.jo.position({
          of: jive.selected.jo,
          my: 'left top',
          at: 'left top',
          collision: 'none'
        }); // on first time selection the overlay needs to be repositioned to be correctly aligned

        isFirstTimeSelection && this.jo.position({
          of: jive.selected.jo,
          my: 'left top',
          at: 'left top',
          collision: 'none'
        });
      }
    },
    foobar: {
      jo: null,
      current: null,
      dropMenu: null,
      cache: {},
      menus: {},
      setElement: function setElement(selector) {
        this.jo = $(selector);
        this.jo.on('mousedown touchstart', 'button', function (evt) {
          var jo = $(this);
          !jo.hasClass('disabled') && jo.addClass('pressed');
          return false;
        });
        this.jo.on('mouseup touchend', 'button', function (evt) {
          var jo = $(this);
          jo.removeClass('pressed');
          var type = jive.selected.ie.config.type;
          var fn = jo.attr('fn');

          if (!jive.resizingColumn) {
            if (fn && !jo.hasClass('disabled')) {
              jive.interactive[type][fn](jive.interactive[type].actions[jo.attr('actionkey')].arg);
            } else {
              if (jo.attr('menu')) {
                var menu = jive.ui.foobar.menus[type][jo.attr('menu')];
                menu.jo.show().position({
                  of: $(this),
                  my: 'left top+2',
                  at: 'left bottom',
                  collision: 'none'
                });
                jive.ui.foobar.dropMenu = menu;
              }
            }
          }

          return false;
        });
        this.jo.on('mouseover', 'button', function () {
          jive.ui.foobar.dropMenu && jive.ui.foobar.dropMenu.jo.hide();
          var jo = $(this);
          !jo.hasClass('disabled') && jo.addClass('over');

          if (jo.attr('menu')) {
            var menu = jive.ui.foobar.menus[jive.selected.ie.config.type][jo.attr('menu')];
            menu.jo.show().position({
              of: $(this),
              my: 'left top+2',
              at: 'left bottom',
              collision: 'none'
            });
            jive.ui.foobar.dropMenu = menu;
          }
        });
        this.jo.on('mouseout', 'button', function () {
          $(this).removeClass('over pressed');
        });
        this.cache = {};
        this.menus = {};
        this.current = null;
      },
      show: function show(dim) {
        !this.jo && this.setElement('#jive_foobar');
        this.render(jive.interactive[jive.selected.ie.config.type].actions);
        this.jo.find('button').removeClass('over pressed');
        this.jo.appendTo(jive.getReportContainer()).show();
        this.setToolbarPosition();
        this.setToolbarPosition(); // twice
      },
      setToolbarPosition: function setToolbarPosition() {
        var top = jive.selected.jo.offset().top - this.jo.outerHeight(),
            containerTop;

        if (jive.isDashboard) {
          containerTop = $(window).scrollTop();
        } else if ($('div#reportViewFrame .body').length > 0) {
          containerTop = $('div#reportViewFrame .body').offset().top;
        } else {
          containerTop = 0;
        }

        this.jo.css({
          position: 'absolute'
        });
        this.jo.offset({
          top: top,
          left: jive.selected.jo.offset().left
        });

        if (jive.isFloatingHeader) {
          jive.setToolbarPositionWhenFloating(true);
        } else if (containerTop >= top) {
          this.jo.offset({
            top: jive.selected.jo.offset().top
          });
        }
      },
      render: function render(actionMap) {
        var it = this;
        var tmpl = ['<button class="jive_foobar_button" title="',, '" actionkey="',, '" ',, '><span class="wrap"><span class="icon ',, '"></span></span></button>'];

        if (!it.cache[jive.selected.ie.config.type]) {
          it.cache[jive.selected.ie.config.type] = '';
          var htm;
          $.each(actionMap, function (k, v) {
            if (v.actions) {
              it.menus[jive.selected.ie.config.type] = it.menus[jive.selected.ie.config.type] || {};
              it.createMenu(k, v.label, v.actions);
            }

            tmpl[1] = v.title;
            tmpl[3] = k;
            tmpl[5] = v.fn ? 'fn="' + v.fn + '"' : v.actions ? 'menu="' + k + '"' : '';
            tmpl[7] = v.icon;
            it.cache[jive.selected.ie.config.type] += tmpl.join('');
          });
        }

        if (it.current != jive.selected.ie.config.type) {
          it.jo.empty();
          it.jo.html(it.cache[jive.selected.ie.config.type]);
          it.current = jive.selected.ie.config.type;
        }
      },
      createMenu: function createMenu(key, label, items) {
        var it = this,
            htm = '<ul class="pmenu" label="' + key + '">';
        $.each(items, function (k, v) {
          if (!v.disabled) {
            var attr = v.fn ? 'fn="' + v.fn + '"' : '',
                label = v.label || k;
            attr += v.arg ? " data-args='" + v.arg + "'" : "";
            htm += '<li class="pmenuitem" key="' + k + '" ' + attr + '>' + jive.encodeHTML(label) + '</li>';
            v.actions && it.createMenu(k, v.label, v.actions);
          }
        });
        htm += '</ul>';
        it.menus[jive.selected.ie.config.type][key] = {
          jo: $(htm).appendTo('#jive_menus')
        };
      },
      reset: function reset() {
        this.cache = {};
        this.menus = {};
      }
    },
    dialog: {
      jo: null,
      body: null,
      isVisible: false,
      setElement: function setElement(selector) {
        var it = this;
        var jo, input;
        it.jo = $(selector);
        it.jo.draggable({
          handle: 'div.dialogHeader'
        });
        /*
         * Cache jquery objects
         */

        it.body = $('#jive_dialog div.dialogBody');
        it.title = $('#jive_dialog span.dialogTitle');
        it.tabs = $('#jive_dialog div.tabContainer');

        if (typeof isIE === 'function') {
          isIE() && navigator.appVersion.indexOf('MSIE 10.0;') < 0 && it.jo.prepend('<div class="msshadow" ></div>'); //eslint-disable-line no-undef
        }
        /*
         * Set behaviors for form elements
         */


        it.tabs.on(clickEventName, '.tab', function (e) {
          var jo = $(this),
              activeTabActionCache;

          if (!jo.hasClass('disabled')) {
            it.tabs.find('.tab').removeClass('active');
            jo.addClass('active');
            jive.selected.form.onBlur();
            jive.selected.form.jo.hide();
            activeTabActionCache = jive.selected.form.actionDataCache;
            jive.selected.form = jive.ui.forms[jo.data('form')];
            $.extend(jive.selected.form.actionDataCache, activeTabActionCache);
            jive.selected.form.onShow();
            jive.selected.form.jo.show();
            /*
             Force refresh for IE 10 box shadow bug.
             http://connect.microsoft.com/IE/feedback/details/763388/repaint-problem-with-dynamically-resizing-box-shadow#
             */

            $('body')[0].style.zoom = $('body')[0].style.zoom == 0 ? 1 : 0;
          }
        });
        it.body.on(clickEventName, 'input, select', function (e) {
          var jo = $(this);
          jo.focus();
          if (jo.attr('type') == 'radio') jo.trigger('change').prop('checked', true);
        });
        it.body.on('change', '.jive_listTextInput, .jive_listTextInputTouch', function (e) {
          var jo = $(this);
          jive.selected.form.inputs[jo.next('select').attr('name')].value = jo.val() !== "" ? jo.val() : null;
        });
        it.body.on('change', 'select.wFreeText', function (e) {
          var jo = $(this);
          jo.prev().val(jo.val());
          jive.selected.form.inputs[jo.attr('name')].set(jo.val());
        });
        it.body.on('keypress', '.jive_restrictedInput', function (e) {
          if ($(this).data('restriction') === "numeric" && isNaN(String.fromCharCode(e.which))) {
            return false;
          }

          return true;
        });
        it.body.on(clickEventName, '.jive_inputbutton', function () {
          jo = $(this);
          input = jive.selected.form.inputs[jo.attr('bname')];

          switch (jo.attr('type')) {
            case "radio":
              input.set(jo.attr('value'), jo);
              break;

            case "checkbox":
              input.toggle();
          }

          input.onClick && input.onClick(jo);
        });
        it.body.on(clickEventName, '.jive_freeTextButton', function () {
          jo = $(this);
          jo.parent().next().find('input, select').toggle();
        });
        $('#dialogOk, #dialogCancel').on(clickEventName, function (e) {
          if (this.className.indexOf('disabled') < 0) {
            if (this.id == 'dialogCancel') {
              jive.active = false;
              $('body').trigger('jive.inactive');
            } else {
              jive.selected.form.submit();
            }

            jive.ui.dialog.hide();
            jive.ui.dialog.isVisible = false;
          }
        });
      },
      show: function show(title, forms, formIndex) {
        !this.jo && this.setElement('#jive_dialog');

        if (forms.length > 1) {
          var htm = '';
          var form;
          var fi = formIndex || 0;
          var active;
          $.each(forms, function (i, v) {
            form = jive.ui.forms[v];
            active = i == fi ? 'active' : '';
            htm += '<div id="' + form.name + 'Tab" data-form="' + form.name + '" class="tab dialog ' + active + '"><span>' + form.title + '</span></div>';
            !form.jo && jive.ui.forms.render(form);
            jive.ui.dialog.body.append(form.jo);
          });
          this.tabs.html(htm).show();
          jive.selected.form = jive.ui.forms[forms[fi]];
        } else {
          this.tabs.hide();
          jive.selected.form = jive.ui.forms[forms[0]];
          !jive.selected.form.jo && jive.ui.forms.render(jive.selected.form);
          this.body.append(jive.selected.form.jo);
        }

        jive.selected.form.onShow();
        this.title.html(title);
        jive.selected.form.jo.show();
        this.jo.show().position({
          of: $(window),
          at: 'center center',
          my: 'center center',
          collision: 'none fit'
        });
        this.isVisible = true;
        jive.hide(null, true);
      },
      hide: function hide() {
        var it = this;
        var ids = [];
        jive.ui.dialog.jo.hide();
        it.body.children().each(function () {
          ids.push(this.id.substring(10));
          $(this).appendTo('#jive_forms').hide();
        });
        $('#jive_dropdown .pmenu').hide();
        $.each(ids, function (i, v) {
          jive.ui.forms[v].onHide && jive.ui.forms[v].onHide();
        });
      },
      toggleButtons: function toggleButtons() {
        $('#dialogOk, #dialogCancel').toggleClass('disabled');
      }
    },
    forms: {
      add: function add(parms) {
        jive.ui.forms[parms.name] = parms;
      },
      render: function render(parms) {
        var it = jive.ui.forms;
        var style = 'display:none;width:700px;';
        var form = $('<form id="jive_form_' + parms.name + '" action="" method="' + parms.method + '" class="jive_form" style="' + style + '"></form>').appendTo('#jive_forms');
        var tb = [];
        var label, colspan, rowspan;
        parms.inputs = {};
        $.each(parms.elements, function (i, table) {
          tb.push('<table width="100%">');
          $.each(table, function (i, row) {
            tb.push('<tr>');
            $.each(row, function (i, e) {
              jive.ui.forms.createElement(e, parms, form, tb);
            });
            tb.push('</tr>');
          });
          tb.push('</table>');
        });
        form.append(tb.join(''));
        it[parms.name].jo = form;
        it[parms.name].onCreate(form);
      },
      createElement: function createElement(e, parms, form, tb) {
        var label = e.label || '',
            colspan = e.colspan ? ' colspan="' + e.colspan + '"' : '',
            rowspan = e.rowspan ? ' rowspan="' + e.rowspan + '"' : '',
            tdClass = e.tdClass ? ' ' + e.tdClass : '',
            tdWidth = e.tdWidth ? 'width: ' + e.tdWidth + ';' : '',
            cellElem = e.isHeader ? 'th' : 'td',
            textAlign = e.align ? 'text-align: ' + e.align + ';' : '',
            textWidth = e.width ? ' width: ' + e.width + 'px;' : '',
            wrapClass = e.wrapClass || '',
            val;
        tb.push('<' + cellElem + ' ');

        if (e.type == 'label') {
          val = e.value || '';
          tb.push('class="jive_textLabel' + tdClass + '" style="' + tdWidth + '"' + colspan + '>');
          e.nowrap ? tb.push(val) : tb.push('<div class="' + wrapClass + '" style="' + textAlign + textWidth + '">' + val + '</div>');
        }

        if (e.type == 'text') {
          tb.push('class="' + tdClass + '" style="' + tdWidth + '"' + colspan + rowspan + '>');
          e.label && tb.push('<div class="wrapper label">' + e.label + ':</div>');
          tb.push('<div class="wrapper"><input id="' + e.id + '" type="text" name="' + e.id + '" value="' + e.value + '"/></div>');
          parms.inputs[e.id] = {
            set: function set(val) {
              $('#' + e.id).val(val);
            },
            get: function get() {
              return $('#' + e.id).val();
            }
          };
        }

        if (e.type == 'radio') {
          tb.push('class="' + tdClass + '" style="' + tdWidth + '"' + colspan + rowspan + '><div class="thick wrapper"><input type="radio" id="' + e.id + e.value + '" name="' + e.id + '" value="' + e.value + '"/><label for="' + e.id + e.value + '" class="jive_inputLabel">' + label + '</label></div>');
          parms.inputs[e.id] = {
            set: function set(val) {
              $('input[name="' + e.id + '"]').val(val);
            },
            get: function get() {
              return $('input[name="' + e.id + '"]').val();
            }
          };
        }

        if (e.type == 'list') {
          var size = e.size ? e.size : 1;
          var isTouch = 'ontouchstart' in document.documentElement ? 'Touch' : '';
          var showList = 'ontouchstart' in document.documentElement || size == 1 ? '' : 'showList';
          var wFreeText = e.freeText ? 'wFreeText' : '';
          var isRestricted = e.restriction != null;
          var select = ['<select id="' + e.id + '" name="' + e.id + '" class="' + showList + ' ' + wFreeText + '" size="' + size + '">'];
          $.each(e.values, function (i, options) {
            select.push('<option value="' + options[0] + '">' + options[1] + '</option>');
          });

          if (e.groups) {
            $.each(e.groups, function (i, group) {
              select.push('<optgroup label="' + group.name + '">');
              $.each(group.values, function (i, options) {
                select.push('<option value="' + options[0] + '">' + options[1] + '</option>');
              });
              select.push('</optgroup>');
            });
          }

          select.push('</select>');
          tb.push('class="' + tdClass + '" style="' + tdWidth + '"' + colspan + rowspan + '>');
          e.label && tb.push('<div class="wrapper label">' + e.label + ':</div>');
          tb.push('<div class="wrapper">');
          e.freeText && tb.push('<input id="' + e.id + 'Text" type="text" class="' + (isRestricted ? 'jive_restrictedInput ' : '') + 'jive_listTextInput' + isTouch + '" name="' + e.id + 'Text" value=""' + (isRestricted ? ' data-restriction="' + e.restriction + '"' : '') + '/>');
          tb.push(select.join(''));
          tb.push('</div>');
          parms.inputs[e.id] = {
            value: null,
            set: function set(val) {
              this.value = val;
              $('#' + e.id).val(val);
              e.freeText && $('#' + e.id + 'Text').val(val) && $("#" + e.id + "Text").trigger("change");
            },
            get: function get() {
              //                    return e.freeText ? $('#'+e.id+'Text').val() : $('#'+e.id).val();
              return this.value;
            }
          };
        }

        if (e.type == 'button') {
          tb.push('class="' + tdClass + '" style="' + tdWidth + '">');
          tb.push('<div class="jive_inputbutton' + (e.btnClass ? ' ' + ' ' + e.btnClass : '') + '" bname="' + e.id + '">');
          e.bIcon && tb.push('<span class="jive_bIcon ' + e.bIcon + '"></span>');

          if (e.bLabel) {
            e.nowrap ? tb.push(e.bLabel) : tb.push('<span class="jive_bLabel">' + e.bLabel + '</span>');
          }

          tb.push('</div>');
          parms.inputs[e.id] = {
            onClick: function onClick(jo) {
              jive.ui.forms[parms.name][e.fn](jo);
            }
          };
        }

        if (e.type == 'buttons') {
          tb.push('class="' + tdClass + '" style="' + tdWidth + '"' + colspan + rowspan + '>');
          label.length > 0 && tb.push('<div class="wrapper label">' + label + ':</div>');
          tb.push('<div class="wrapper"><div class="buttonbar">');
          $.each(e.items, function (i, v) {
            !parms.inputs[v.id] && form.append('<input type="hidden" name="' + v.id + '" value="" />');
            tb.push('<div class="jive_inputbutton ' + (v.btnClass ? ' ' + v.btnClass : '') + (v.drop ? ' drop' : '') + '" bname="' + v.id + '" value="' + v.value + '" type="' + v.type + '">');

            if (v.type === 'color' || v.type === 'backcolor') {
              tb.push('<div class="colorpick' + (v.styleClass ? ' ' + v.styleClass : ' normal') + '"></div>');
            }

            v.bIcon && tb.push('<span class="jive_bIcon ' + v.bIcon + '"></span>');
            v.bLabel && tb.push('<span class="jive_bLabel">' + v.bLabel + '</span>');
            tb.push('</div>');

            if (v.type === 'dropdown') {
              parms.inputs[v.id] = {
                _idd: v.id,
                _options: v.options,
                onClick: function onClick() {
                  jive.interactive[jive.selected.ie.config.type][v.fn]();
                },
                showOptions: function showOptions() {
                  var dd = $('#jive_dropdown');
                  dd.empty();
                  var htm = '<ul class="pmenu">',
                      args;
                  $.each(this._options, function (k, option) {
                    htm += "<li class='pmenuitem' data-args='{\"val\":\"" + option.value + "\"}' fn='" + option.fn + "'>" + jive.encodeHTML(option.label) + "</li>";
                  });
                  htm += '</ul>';
                  dd.append(htm);
                  dd.find('.pmenu').show();
                  dd.css({
                    width: '150px',
                    height: '100px'
                  }); //dd.position({my: 'left top', at: 'left bottom', of: $('div.jive_inputbutton[bname="'+this._idd+'"]'), collision: 'none', offset: '0 -10px'});

                  dd.position({
                    my: 'left top-10',
                    at: 'left bottom',
                    of: $('div.jive_inputbutton[bname="' + this._idd + '"]'),
                    collision: 'none'
                  });
                },
                hideOptions: function hideOptions() {
                  $('#jive_dropdown .pmenu').hide();
                }
              };
            }

            if (v.type == 'checkbox') {
              parms.inputs[v.id] = {
                value: null,
                set: function set(val) {
                  var btn = $('div.jive_inputbutton[bname="' + v.id + '"]');
                  this.value = val;

                  if (val === true) {
                    btn.removeClass('unchanged').addClass('selected');
                  } else if (val === false) {
                    btn.removeClass('unchanged').removeClass('selected');
                  } else if (val === null) {
                    if (v.isTripleState) btn.removeClass('selected').addClass('unchanged');else this.set(false);
                  }
                },
                toggle: function toggle() {
                  if (this.value === true) {
                    this.set(false);
                  } else if (this.value === false) {
                    if (v.isTripleState) this.set(null);else this.set(true);
                  } else if (v.isTripleState && this.value === null) this.set(true);
                },
                get: function get() {
                  return this.value;
                },
                onClick: function onClick() {
                  v.fn && jive.interactive[jive.selected.ie.config.type][v.fn]();
                }
              };
            }

            if (v.type == 'radio' && !parms.inputs[v.id]) {
              parms.inputs[v.id] = {
                value: null,
                set: function set(val, jo) {
                  if (jo && jo.is('.selected') && v.isTripleState) {
                    this.set(null);
                    return;
                  }

                  this.value = val;
                  $('div.jive_inputbutton[bname="' + v.id + '"]').removeClass('selected');
                  $('div.jive_inputbutton[bname="' + v.id + '"][value="' + val + '"]').addClass('selected');
                },
                get: function get() {
                  return this.value;
                },
                onClick: function onClick(jo) {
                  v.fn && jive.interactive[jive.selected.ie.config.type][v.fn]();
                }
              };
            }

            if (v.type == 'action') {
              parms.inputs[v.id] = {
                onClick: function onClick() {
                  jive.interactive[jive.selected.ie.config.type][v.fn]();
                }
              };
            }

            if (v.type == 'color') {
              parms.inputs[v.id] = {
                value: null,
                set: function set(val) {
                  var btn = $('div.jive_inputbutton[bname="' + v.id + '"]');
                  this.value = val;

                  if (val === null) {
                    btn.addClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (val === 'null') {
                    this.set(null);
                  } else {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', val === 'transparent' ? val : '#' + val);
                  }
                },
                get: function get() {
                  return this.value;
                },
                onClick: function onClick(jo) {
                  jive.ui.colorpicker.show({
                    title: v.title,
                    inputId: v.id,
                    anchor: jo,
                    currentColor: $('input[name="' + v.id + '"]').val(),
                    showTransparent: v.showTransparent,
                    showReset: v.showReset
                  });
                }
              };
            }

            if (v.type == 'backcolor') {
              parms.inputs[v.id] = {
                backColor: null,
                modeValue: null,
                set: function set(backColor, modeValue, isFromPicker) {
                  var btn = $('div.jive_inputbutton[bname="' + v.id + '"]');

                  if (isFromPicker) {
                    if (backColor !== 'keep_existing') {
                      this.backColor = backColor === 'null' ? null : backColor;
                    }
                  } else {
                    this.backColor = backColor;
                  }

                  this.modeValue = modeValue === 'null' ? null : modeValue;

                  if (!this.backColor && !this.modeValue) {
                    btn.addClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (this.modeValue === 'Transparent' || !this.backColor) {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (this.backColor) {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', '#' + this.backColor);
                  }
                },
                getBackColor: function getBackColor() {
                  return this.backColor;
                },
                getModeValue: function getModeValue() {
                  return this.modeValue;
                },
                onClick: function onClick(jo) {
                  jive.ui.colorpicker.show({
                    title: v.title,
                    inputId: v.id,
                    anchor: jo,
                    currentColor: $('input[name="' + v.id + '"]').val(),
                    showTransparent: v.showTransparent,
                    showReset: v.showReset
                  });
                }
              };
            }
          });
          tb.push('</div></div>');
        }

        tb.push('</' + cellElem + '>');
      },
      createTemplateElement: function createTemplateElement(e, parms, form, tb) {
        var label = e.label || '',
            colspan = e.colspan ? 'colspan="' + e.colspan + '"' : '',
            rowspan = e.rowspan ? 'rowspan="' + e.rowspan + '"' : '',
            elemCount = form.find("*[id^='" + e.id + "']").length,
            elemUid = e.id + (elemCount > 0 ? '_' + $.now() : ''),
            tdClass = e.tdClass ? ' ' + e.tdClass : '',
            textAlign = e.align ? 'text-align: ' + e.align + ';' : '',
            textWidth = e.width ? ' width: ' + e.width + 'px;' : '',
            wrapClass = e.wrapClass || '';

        if (e.type == 'label') {
          tb.push('<td class="jive_textLabel' + tdClass + '" ' + colspan + '>');
          e.nowrap ? tb.push(e.value) : tb.push('<div class="' + wrapClass + '" style="' + textAlign + textWidth + '">' + e.value + '</div>');
          tb.push('</td>');
        }

        if (e.type == 'text') {
          tb.push('<td class="' + tdClass + '" ' + colspan + ' ' + rowspan + '>');
          e.label && tb.push('<div class="' + wrapClass + '">' + e.label + ':</div>');
          tb.push('<div class="' + wrapClass + '"><input id="' + elemUid + '" type="text" name="' + e.id + '" value="' + e.value + '"/></div></td>');
          parms.inputs[elemUid] = {
            set: function set(val) {
              $('#' + elemUid).val(val);
            },
            get: function get() {
              return $('#' + elemUid).val();
            }
          };
        }

        if (e.type == 'list') {
          var size = e.size ? e.size : 1;
          var isTouch = 'ontouchstart' in document.documentElement ? 'Touch' : '';
          var showList = 'ontouchstart' in document.documentElement || size == 1 ? '' : 'showList';
          var wFreeText = e.freeText ? 'wFreeText' : '';
          var isRestricted = e.restriction != null;
          var select = ['<select id="' + elemUid + '" name="' + e.id + '" class="' + showList + ' ' + wFreeText + '" size="' + size + '">'];
          $.each(e.values, function (i, options) {
            select.push('<option value="' + options[0] + '">' + options[1] + '</option>');
          });

          if (e.groups) {
            $.each(e.groups, function (i, group) {
              select.push('<optgroup label="' + group.name + '">');
              $.each(group.values, function (i, options) {
                select.push('<option value="' + options[0] + '">' + options[1] + '</option>');
              });
              select.push('</optgroup>');
            });
          }

          select.push('</select>');
          tb.push('<td class="' + tdClass + '" ' + colspan + ' ' + rowspan + '>');
          e.label && tb.push('<div class="' + wrapClass + '">' + e.label + ':</div>');
          tb.push('<div class="' + wrapClass + '">');
          e.freeText && tb.push('<input id="' + elemUid + 'Text" type="text" class="' + (isRestricted ? 'jive_restrictedInput ' : '') + 'jive_listTextInput' + isTouch + '" name="' + e.id + 'Text" value=""' + (isRestricted ? ' data-restriction="' + e.restriction + '"' : '') + '/>');
          tb.push(select.join(''));
          tb.push('</div></td>');
          parms.inputs[elemUid] = {
            set: function set(val) {
              $('#' + elemUid).val(val);
              e.freeText && $('#' + elemUid + 'Text').val(val);
            },
            get: function get() {
              return e.freeText ? $('#' + elemUid + 'Text').val() : $('#' + elemUid).val();
            }
          };
        }

        if (e.type == 'button') {
          tb.push('<td class="' + tdClass + '">');
          tb.push('<div class="jive_inputbutton' + (e.btnClass ? ' ' + ' ' + e.btnClass : '') + '" bname="' + e.id + '">');
          e.bIcon && tb.push('<span class="jive_bIcon ' + e.bIcon + '"></span>');

          if (e.bLabel) {
            e.nowrap ? tb.push(e.bLabel) : tb.push('<span class="jive_bLabel">' + e.bLabel + '</span>');
          }

          tb.push('</div>');
          tb.push('</td>');
          parms.inputs[e.id] = {
            onClick: function onClick(jo) {
              jive.ui.forms[parms.name][e.fn](jo);
            }
          };
        }

        if (e.type == 'buttons') {
          tb.push('<td class="' + tdClass + '" ' + colspan + ' ' + rowspan + '>');
          label.length > 0 && tb.push('<div class="' + wrapClass + '">' + label + ':</div>');
          tb.push('<div class="' + wrapClass + '"><div class="buttonbar">');
          $.each(e.items, function (i, v) {
            var vidCount = form.find("*[bname^='" + v.id + "']").length,
                vid = v.id + (vidCount > 0 ? '_' + $.now() : '');
            tb.push('<div class="jive_inputbutton ' + (v.btnClass ? ' ' + v.btnClass : '') + (v.drop ? ' drop' : '') + '" bname="' + vid + '" value="' + v.value + '" type="' + v.type + '">');

            if (v.type === 'color' || v.type === 'backcolor') {
              tb.push('<div class="colorpick' + (v.styleClass ? ' ' + v.styleClass : ' normal') + '"></div>');
            }

            v.bIcon && tb.push('<span class="jive_bIcon ' + v.bIcon + '"></span>');
            v.bLabel && tb.push('<span class="jive_bLabel">' + v.bLabel + '</span>');
            tb.push('</div>');

            if (v.type == 'checkbox') {
              parms.inputs[vid] = {
                value: null,
                set: function set(val) {
                  var btn = $('div.jive_inputbutton[bname="' + vid + '"]');
                  this.value = val;

                  if (val === true) {
                    btn.removeClass('unchanged').addClass('selected');
                  } else if (val === false) {
                    btn.removeClass('unchanged').removeClass('selected');
                  } else if (val === null) {
                    if (v.isTripleState) btn.removeClass('selected').addClass('unchanged');else this.set(false);
                  }
                },
                toggle: function toggle() {
                  if (this.value === true) {
                    this.set(false);
                  } else if (this.value === false) {
                    if (v.isTripleState) this.set(null);else this.set(true);
                  } else if (v.isTripleState && this.value === null) this.set(true);
                },
                get: function get() {
                  return this.value;
                },
                onClick: function onClick() {
                  v.fn && jive.interactive[jive.selected.ie.config.type][v.fn]();
                }
              };
            }

            if (v.type == 'action') {
              parms.inputs[vid] = {
                onClick: function onClick(jo) {
                  //								jive.interactive[jive.selected.ie.config.type][v.fn]();
                  jive.ui.forms[parms.name][v.fn](jo);
                }
              };
            }

            if (v.type == 'color') {
              parms.inputs[vid] = {
                value: null,
                set: function set(val) {
                  var btn = $('div.jive_inputbutton[bname="' + vid + '"]');
                  this.value = val;

                  if (val === null) {
                    btn.addClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (val === 'null') {
                    this.set(null);
                  } else {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', val === 'transparent' ? val : '#' + val);
                  }
                },
                get: function get() {
                  return this.value;
                },
                onClick: function onClick(jo) {
                  jive.ui.colorpicker.show({
                    title: v.title,
                    inputId: vid,
                    anchor: jo,
                    currentColor: $('input[name="' + vid + '"]').val(),
                    showTransparent: v.showTransparent,
                    showReset: v.showReset
                  });
                }
              };
            }

            if (v.type == 'backcolor') {
              parms.inputs[vid] = {
                backColor: null,
                modeValue: null,
                set: function set(backColor, modeValue, isFromPicker) {
                  var btn = $('div.jive_inputbutton[bname="' + vid + '"]');

                  if (isFromPicker) {
                    if (backColor !== 'keep_existing') {
                      this.backColor = backColor === 'null' ? null : backColor;
                    }
                  } else {
                    this.backColor = backColor;
                  }

                  this.modeValue = modeValue === 'null' ? null : modeValue;

                  if (!this.backColor && !this.modeValue) {
                    btn.addClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (this.modeValue === 'Transparent' || !this.backColor) {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', 'transparent');
                  } else if (this.backColor) {
                    btn.removeClass('unchanged').find('div.colorpick').css('background-color', '#' + this.backColor);
                  }
                },
                getBackColor: function getBackColor() {
                  return this.backColor;
                },
                getModeValue: function getModeValue() {
                  return this.modeValue;
                },
                onClick: function onClick(jo) {
                  jive.ui.colorpicker.show({
                    title: v.title,
                    inputId: vid,
                    anchor: jo,
                    currentColor: $('input[name="' + vid + '"]').val(),
                    showTransparent: v.showTransparent,
                    showReset: v.showReset
                  });
                }
              };
            }
          });
          tb.push('</div></div></td>');
        }
      }
    },
    colorpicker: {
      jo: null,
      selected: null,
      title: '',
      inputId: null,
      setElement: function setElement() {
        var it = this;
        var jo;
        it.jo = $('#jive_colorpicker');
        it.jo.draggable({
          handle: 'div.dialogHeader'
        });
        it.jo.on(clickEventName, 'div.pick', function (evt) {
          it.selected = $(this).parent().addClass('selected');
          jive.selected.form.inputs[it.inputId].set(it.extractHexColor(it.selected.children().eq(0).attr('hexcolor')), it.selected.closest('tr').data('mode'), true);
          jive.ui.colorpicker.jo.hide();
          jive.ui.modal.hide();
          evt.preventDefault();
        });
      },
      show: function show(options) {
        this.title = options.title || 'Pick a color';
        this.inputId = options.inputId;
        !this.jo && this.setElement();
        this.jo.find('td.selected').removeClass('selected');

        if (options.currentColor) {
          this.jo.find('div.pick[hexcolor=' + options.currentColor + ']').parent().addClass('selected'); // FIXMEJIVE not working anymore
        }

        if (options.showTransparent) {
          this.jo.find('tr.transparent_pick').show();
        } else {
          this.jo.find('tr.transparent_pick').hide();
        }

        if (options.showReset) {
          this.jo.find('tr.reset_pick').show();
        } else {
          this.jo.find('tr.reset_pick').hide();
        }

        jive.ui.modal.show(this.jo);
        this.jo.find('h2').html(this.title);
        this.jo.show().position({
          of: options.anchor,
          at: 'left bottom',
          my: 'left top',
          offset: '0 0',
          collision: 'none'
        });
      },
      extractHexColor: function extractHexColor(rgbString) {
        if (rgbString && rgbString.toLowerCase().indexOf('rgb') !== -1) {
          var out = "",
              tokens = rgbString.split(','),
              i,
              number,
              conv;

          for (i = 0; i < tokens.length; i++) {
            number = parseInt(/\d+/.exec(tokens[i])[0], 10);
            conv = number.toString(16);
            out += conv.length === 1 ? '0' + conv : conv;
          }

          return out;
        }

        return rgbString;
      }
    },
    modal: {
      whf: null,
      visible: false,
      show: function show(whoHasFocus) {
        this.whf = whoHasFocus;

        if ($('#jive_modal').length == 0) {
          $('table.jrPage').parent().append('<div id="jive_modal" style="display:none;position:absolute;z-index:9999;top:0;bottom:0;left:0;right:0;"></div>');
          $('#jive_modal').on(clickEventName, function (evt) {
            jive.ui.modal.hide();
            evt.preventDefault();
          });
        }

        if (!this.visible) {
          jive.ui.dialog.toggleButtons();
          $('#jive_modal').show();
          this.visible = true;
        }
      },
      hide: function hide() {
        jive.ui.modal.whf.hide();
        jive.ui.dialog.toggleButtons();
        $('#jive_modal').hide();
        this.visible = false;
      }
    }
  },
  selected: {
    ie: null,
    // selected interactive element
    jo: null,
    // selected jquery object tied to interactive element
    form: null // selected form defined by interactive element

  },
  viewerReady: false,
  encodeHTML: function encodeHTML(decodedHTML) {
    return $("<div></div>").text(decodedHTML).html();
  },
  decodeHTML: function decodeHTML(encodedHTML) {
    return $("<div></div>").html(encodedHTML).text();
  },
  escapeFontName: function escapeFontName(fontName) {
    if (fontName) {
      return fontName.replace(/"/g, "");
    }

    return null;
  },
  hide: function hide(items, keepDialogOpen) {
    var it = this;

    if (!items) {
      if (keepDialogOpen) {
        it.active = it.ui.dialog.isVisible;
      } else {
        it.active = false;
        it.ui.dialog.isVisible && it.ui.dialog.hide();
      }

      it.ui.marker.jo && it.ui.marker.jo.appendTo('#jive_components').hide();
      it.ui.overlay.jo && it.ui.overlay.jo.appendTo('#jive_components').hide();

      if (it.ui.foobar.jo) {
        it.ui.foobar.jo.appendTo('#jive_components').hide(); // must reset the floating header, if any, when moving foobar as it causes the floating header to slide upwards

        it.scrollData && it.scrollHeader(it.isDashboard, true);
      }

      $('.pmenu').hide();
      it.ui.colorpicker.jo && it.ui.colorpicker.jo.hide();
    } else {
      $.each(items, function (i, v) {
        it.ui[v].jo && it.ui[v].jo.hide();
      });
    }
  },
  getHeaderTable: function getHeaderTable() {
    var tbl = $('table.floatableHeader');

    if (tbl.length == 0) {
      tbl = $("<table class='floatableHeader' style='display:none'/>").appendTo('div#reportContainer');
      tbl.on(clickEventName, '.jrcolHeader', function (evt) {
        // keep html links functional
        if (!$(evt.target).parent().is('a')) {
          var jo = $(this);
          var coluuid = jo.data('coluuid');
          var reportTableCell = tbl.parent().find('table.jrPage td.jrcolHeader[data-coluuid=' + coluuid + ']:first');
          reportTableCell.length && jive.selectInteractiveElement(reportTableCell);
          return false;
        }
      });
      var firstColHeader = $('td.jrcolHeader:first'),
          parentTable = firstColHeader.closest('table'),
          lastColHeader = $('td.jrcolHeader:last', parentTable),
          rows = [],
          clone,
          cloneWidth = [],
          row,
          lastRow,
          cloneTD,
          rowTD,
          rowTDs,
          i,
          j,
          k,
          ln,
          tblJrPage,
          parentTableRows;

      if (firstColHeader.length > 0) {
        firstColHeader.addClass('first_jrcolHeader');
        row = firstColHeader.closest('tr');
        lastRow = lastColHeader.closest('tr');
        tblJrPage = firstColHeader.closest('table');

        if (row === lastRow) {
          rows.push(row);
        } else {
          parentTableRows = parentTable.find('tr');
          i = parentTableRows.index(row);
          j = parentTableRows.index(lastRow);

          for (k = i; k <= j; k++) {
            rows.push(parentTableRows.get(k));
          }
        }

        $.each(rows, function (idx, row) {
          rowTDs = $(row).find('td');
          clone = $("<tr></tr>");
          cloneWidth[idx] = 0; // set width and height for each cloned TD

          for (i = 0, ln = rowTDs.length; i < ln; i++) {
            rowTD = $(rowTDs.get(i));
            cloneTD = rowTD.clone();
            cloneWidth[idx] = cloneWidth[idx] + rowTD.outerWidth();
            cloneTD.css("width", rowTD.css("width"));
            cloneTD.css("height", rowTD.css("height"));
            clone.append(cloneTD);
          }

          tbl.append(clone);
        });
        tbl.css({
          position: 'relative',
          width: Math.max.apply(Math, cloneWidth),
          'empty-cells': tblJrPage.css('empty-cells'),
          'border-collapse': tblJrPage.css('border-collapse'),
          'background-color': tblJrPage.css('background-color')
        });
        tbl.attr('cellpadding', tblJrPage.attr('cellpadding'));
        tbl.attr('cellspacing', tblJrPage.attr('cellspacing'));
        tbl.attr('border', tblJrPage.attr('border'));
      }
    }

    return tbl;
  },
  setToolbarPositionWhenFloating: function setToolbarPositionWhenFloating(isJiveActive, top) {
    if (isJiveActive) {
      var toolbarTop = top || this.getHeaderTable().offset().top;
      this.ui.foobar.jo.css({
        position: 'relative'
      });
      this.ui.foobar.jo.offset({
        top: toolbarTop,
        left: this.selected.jo.offset().left - $(window).scrollLeft()
      });
    }
  },
  applyScaleTransform: function applyScaleTransform($container, zoom, origin) {
    var scale = 'scale(' + zoom + ")",
        origin = origin || '50% 0',
        transform = {
      '-webkit-transform': scale,
      '-webkit-transform-origin': origin,
      '-moz-transform': scale,
      '-moz-transform-origin': origin,
      '-ms-transform': scale,
      '-ms-transform-origin': origin,
      '-o-transform': scale,
      '-o-transform-origin': origin,
      'transform': scale,
      'transform-origin': origin
    };
    $container.css(transform);
  },
  zoom: function zoom(o) {
    var it = this;
    it.isFloatingHeader && it.scrollHeader(it.isDashboard, true);
    it.active && it.hide(); // hide jive stuff when zooming to avoid repositioning of its elements
  },
  scrollHeader: function scrollHeader(isDashboard, forceScroll) {
    var it = this,
        $win = $(window),
        scrollContainer = $('div#reportViewFrame .body'),
        scrolledTop = false,
        scrolledLeft = false; // Determine scroll direction and value

    if (it.scrollData.scrollTop != null) {
      // check previous scrollTop
      if (scrollContainer.scrollTop() != it.scrollData.scrollTop) {
        it.scrollData.scrollTop = scrollContainer.scrollTop();
        scrolledTop = true;
      }
    } else if (scrollContainer.scrollTop() != 0) {
      it.scrollData.scrollTop = scrollContainer.scrollTop();
      scrolledTop = true;
    }

    if (it.scrollData.scrollLeft != null) {
      // check previous scrollLeft
      if (scrollContainer.scrollLeft() != it.scrollData.scrollLeft) {
        it.scrollData.scrollLeft = scrollContainer.scrollLeft();
        scrolledLeft = true;
      }
    } else if (scrollContainer.scrollLeft() != 0) {
      it.scrollData.scrollLeft = scrollContainer.scrollLeft();
      scrolledLeft = true;
    }

    if (!scrolledLeft && !scrolledTop && !forceScroll) {
      return;
    }

    var firstHeader = $('td.jrcolHeader:first');

    if (!firstHeader.length > 0) {
      return;
    }

    var floatingTbl = it.getHeaderTable(),
        tbl = firstHeader.closest('table'),
        containerTop = isDashboard ? $win.scrollTop() : $('div#reportViewFrame .body').offset().top,
        headerTop = firstHeader.closest('tr').offset().top,
        reportContainerTop = $('#reportContainer').offset().top,
        lastTableCel = $('td.first_jrcolHeader:first').closest('table').find('td.jrcel:last'),
        diff = lastTableCel.length ? lastTableCel.offset().top - floatingTbl.outerHeight() - containerTop : -1,
        // if last cell is not visible, hide the floating header
    scrollTop = it.cachedScroll || 0,
        zoom = jive.reportInstance.zoom,
        floatingTableTop;
    it.isIPad && !it.cachedHeaderTop && (it.cachedHeaderTop = headerTop);

    if (!isDashboard && it.isIPad) {
      scrollTop += it.cachedHeaderTop - headerTop;
    }

    floatingTableTop = isDashboard ? it.isIPad ? scrollTop : 0 : it.isIPad ? scrollTop : containerTop;

    if (!it.scrollData.bMoved && headerTop - containerTop < 0 && diff > 0) {
      floatingTbl.show();

      if (zoom) {
        it.applyScaleTransform(floatingTbl, zoom.level, zoom.overflow ? '0 0' : '50% 0');
      }

      floatingTbl.offset({
        top: floatingTableTop,
        left: tbl.offset().left
      });
      it.setToolbarPositionWhenFloating(it.active, floatingTableTop);
      it.scrollData.bMoved = it.isFloatingHeader = true;

      if (!isDashboard) {
        if (!it.scrollData.reportContainerPositionAtMove) {
          it.scrollData.reportContainerPositionAtMove = reportContainerTop;
        }
      }
    } else if (it.scrollData.bMoved && headerTop - containerTop < 0 && diff > 0) {
      floatingTbl.show();

      if (zoom) {
        it.applyScaleTransform(floatingTbl, zoom.level, zoom.overflow ? '0 0' : '50% 0');
      }

      floatingTbl.offset({
        top: floatingTableTop,
        left: tbl.offset().left
      });
      it.setToolbarPositionWhenFloating(it.active, floatingTableTop);
    } else if (it.scrollData.bMoved) {
      if (it.isFloatingHeader) {
        floatingTbl.hide();
        it.isFloatingHeader = false;
        it.cachedScroll = 0;
      }

      if (it.active && headerTop - containerTop - it.ui.foobar.jo.outerHeight() < 0 && diff > 0) {
        it.setToolbarPositionWhenFloating(true, containerTop);
      } else if (it.active) {
        it.setToolbarPositionWhenFloating(true, it.selected.jo.offset().top - it.ui.foobar.jo.outerHeight());
        it.scrollData.bMoved = false;
      } else {
        it.scrollData.bMoved = false;
      }
    }

    it.isIPad && (it.cachedHeaderTop = headerTop);
    it.isIPad && (it.cachedScroll = scrollTop);
  },
  setScrollableHeader: function setScrollableHeader(isDashboard) {
    var it = this;
    it.scrollData = {
      bMoved: false,
      reportContainerPositionAtMove: null
    };

    if (!isDashboard) {
      $('div#reportViewFrame .body').on('scroll', function () {
        it.scrollHeader(isDashboard);
      });
    }

    if (it.isIE) {
      // attach scroll to body for dashboards in IE
      $('body').on('scroll', function () {
        it.scrollHeader(isDashboard); // reposition jive visual elements

        it.active && !it.ui.dialog.isVisible && it.showVisualElements(jive.selected.dim);
      });
    }

    $(window).on('resize scroll', function () {
      it.scrollHeader(isDashboard); // reposition jive visual elements

      it.active && !it.ui.dialog.isVisible && it.showVisualElements(jive.selected.dim);
    });
    $('body').on('layout_update', function (event, options) {
      if (options != null && ('panel-maximize' === options.type || 'panel-minimize' === options.type)) {
        if (jive.interactive.column) {
          jive.interactive.column.init(it.reportInstance);
        }
      }
    });
  },
  init: function init(report) {
    var it = this;
    jive.reportInstance = report;

    if (!it.initialized) {
      it.isDashboard = $('body').is('.dashboardViewFrame');
      /*
      Scrolable table headers
       If there is a table that does not have floating header then floating headers for all tables
      should be disabled
       */

      var hasFloatingHeader = true;
      $.each(report.components.table, function (index, table) {
        if (!table.config.hasFloatingHeader) {
          hasFloatingHeader = false;
          return false; // break each
        }
      });

      if (hasFloatingHeader && (it.isDashboard || $('div#reportViewFrame').length > 0)) {
        it.setScrollableHeader(it.isDashboard);
      }
      /*
       Setup HTML
       */


      $('#jive_components').length == 0 && $('body').append('<div id="jive_components"></div>');
      $('#jive_components').empty();
      $('#jive_components').append(_.template(jiveTemplate, {
        i18n: i18n
      }));
      /*
       Event Handling
       */

      report.config.container.on(clickEventName, function () {
        if (!it.ui.dialog.isVisible) {
          it.hide();
          $('body').trigger('jive.inactive');
        }
      });
      var jmenuitem;
      $('div#jive_menus, div#jive_dropdown').on({
        'mouseup touchend': function mouseupTouchend(evt) {
          jmenuitem = $(this);
          var args = jmenuitem.data('args');
          jmenuitem.attr('fn') && jive.interactive[jive.selected.ie.config.type][jmenuitem.attr('fn')](args);

          if (evt.type == 'touchend') {
            var key = jmenuitem.attr('key');

            if (jive.ui.foobar.menus[jive.selected.ie.config.type][key]) {
              jive.ui.foobar.menus[jive.selected.ie.config.type][key].jo.show().position({
                of: jmenuitem,
                my: 'left top',
                at: 'right top'
              });
            } else {
              !jive.ui.dialog.isVisible && jive.hide();
            }
          }

          evt.preventDefault();
        },
        'mouseover': function mouseover(evt) {
          jmenuitem = $(this);
          jmenuitem.addClass('hover');

          if (jmenuitem.width() < jmenuitem.parent().width() - 24) {
            jmenuitem.width(jmenuitem.parent().width() - 24); // IE7 fix
          }

          jmenuitem.parent().prevAll().hide();
          var key = jmenuitem.attr('key');

          if (jive.ui.foobar.menus[jive.selected.ie.config.type][key]) {
            jive.ui.foobar.menus[jive.selected.ie.config.type][key].jo.show().position({
              of: jmenuitem,
              my: 'left top',
              at: 'right top'
            });
          }
        },
        'mouseout': function mouseout(evt) {
          jmenuitem = $(this);
          jmenuitem.removeClass('hover');
        }
      }, '.pmenuitem');
      $('div#jive_dropdown').on({
        'mouseup touchend': function mouseupTouchend(evt) {
          var args = $(this).data('args');
          $(this).attr('fn') && jive.interactive[jive.selected.ie.config.type][$(this).attr('fn')](args);
          evt.preventDefault();
        }
      }, '.pmenuitem');
      $('div#jive_dropdown').on('mouseleave', '.pmenu', function (evt) {
        $(this).hide();
      });
      it.initialized = true;
      $('body').trigger('jive.initialized', [it]);
    }
  },
  initInteractiveElement: function initInteractiveElement(o, jqReportContainer) {
    if (jive.elements[o.config.id]) {
      /*
       * Check if report has been reloaded, if so we need to setup event
       * listeners.
       */
      if (!$.hasData(jqReportContainer.find('table.jrPage')[0])) {
        jive.selectors = {};
      }
    }

    jive.elements[o.config.id] = o;
    /*
     * Check if event listener has for selector already set.
     */

    if (!jive.selectors[o.config.parentId + "-" + o.config.selector]) {
      jive.selectors[o.config.parentId + "-" + o.config.selector] = o.config.type;
      jqReportContainer.find('table.jrPage').on(clickEventName, o.config.selector, function (evt) {
        // keep html links functional
        if (!$(evt.target).parent().is('a')) {
          var jo = $(this);
          jive.selectInteractiveElement(jo);
          return false;
        }
      });
    }

    if (o.config.proxySelector && !jive.selectors[o.config.parentId + "-" + o.config.proxySelector]) {
      jive.selectors[o.config.parentId + "-" + o.config.proxySelector] = o.config.type;
      jqReportContainer.find('table.jrPage').on(clickEventName, o.config.proxySelector, function (evt) {
        // keep html links functional
        if (!$(evt.target).parent().is('a')) {
          var jo = jive.interactive[o.config.type].getInteractiveElementFromProxy($(this));
          jive.selectInteractiveElement(jo);
          return false;
        }
      });
    }
  },
  selectInteractiveElement: function selectInteractiveElement(jo) {
    if (jo && jo.is('.interactiveElement')) {
      jive.ui.dialog.isVisible && jive.ui.dialog.hide();
      jive.activeContainer = jo.closest('._jr_report_container_');
      var colData = jive.interactive.column.columnsData[jo.data('tableuuid')][jo.data('coluuid')];
      jive.selected = {
        ie: jive.elements[jo.data('coluuid')],
        jo: jive.interactive.column.getJoForCurrentSelection(jo),
        realWidth: colData.width,
        realHeight: colData.height
      };
      jive.selected.dim = jive.interactive[jive.selected.ie.config.type].getElementSize();
      this.showVisualElements(jive.selected.dim);
      jive.active = true;
      jive.started = true;
      jive.interactive[jive.selected.ie.config.type].onSelect();
    }
  },
  showVisualElements: function showVisualElements(dim) {
    // hide already visible menus, if any
    jive.ui.foobar.dropMenu && jive.ui.foobar.dropMenu.jo.hide();
    jive.ui.foobar.menus.column && jive.ui.foobar.menus.column.showColumns && jive.ui.foobar.menus.column.showColumns.jo.hide();
    jive.ui.overlay.show(dim);
    jive.ui.marker.show(dim);
    jive.ui.foobar.show(dim);
  },
  withDebounce: function withDebounce(fn, context, millis, now) {
    var timeout = null;
    return {
      apply: function apply() {
        var args = arguments;

        if (now) {
          fn.apply(context, args);
        } else {
          clearTimeout(timeout);
          timeout = setTimeout(function () {
            timeout = null;
            fn.apply(context, args);
          }, millis);
        }
      },
      isRunning: function isRunning() {
        return timeout != null;
      },
      cancelAndExecute: function cancelAndExecute() {
        if (timeout != null) {
          clearTimeout(timeout);
          fn.apply(context, arguments);
        }
      }
    };
  }
};
module.exports = jive;

});