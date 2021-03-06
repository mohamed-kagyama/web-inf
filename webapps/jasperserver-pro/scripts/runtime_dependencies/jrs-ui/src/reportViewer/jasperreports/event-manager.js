define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

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
var log = logger.register("component-registrar");

var Event = function Event(name) {
  if (!this instanceof Event) {
    return new Event(name);
  }

  this.status = 'default';
  this.name = name;
  this.subscribers = [];
};

Event.prototype = {
  getName: function getName() {
    return this.name;
  },
  getStatus: function getStatus() {
    return this.status;
  },
  hasFinished: function hasFinished() {
    return this.status === 'finished';
  },
  subscribe: function subscribe(subscriber) {
    if (!this.hasFinished()) {
      this.subscribers.push(subscriber);
    } else {
      if (subscriber.keep) {
        this.subscribers.push(subscriber);
      }

      this.processSubscriber(subscriber);
    }
  },
  trigger: function trigger(data) {
    var i,
        ln = this.subscribers.length;

    for (i = 0; i < ln; i++) {
      i = i - this.processSubscriber(this.subscribers[i], data);
    }

    this.status = 'finished';
    return this;
  },
  reset: function reset() {
    this.status = 'default';
  },
  processSubscriber: function processSubscriber(subscriber, data) {
    var i,
        ln = this.subscribers.length,
        args = subscriber.args || [];
    args.push(data);
    subscriber.callback.apply(subscriber.ctx, args);

    if (!subscriber.keep) {
      for (i = 0; i < ln; i++) {
        if (this.subscribers[i] === subscriber) {
          this.subscribers.splice(i, 1);
          return 1;
        }
      }
    }

    return 0;
  }
};

var EventManager = function EventManager(debug) {
  this._events = {};
  this.debug = debug;
};

EventManager.prototype = {
  /**
   * options = {name: string, callback: function, thisContext: object, keep: boolean}
   */
  subscribeToEvent: function subscribeToEvent(o) {
    var it = this,
        evtNames = this._getEventNames(o.name);

    $.each(evtNames, function (i, evtName) {
      it.registerEvent(evtName).subscribe({
        callback: o.callback,
        ctx: o.thisContext,
        keep: o.keep
      });
    });
  },
  registerEvent: function registerEvent(evtName) {
    if (!this._events[evtName]) {
      this._events[evtName] = new Event(evtName);
    }

    return this._events[evtName];
  },
  triggerEvent: function triggerEvent(evtName, evtData) {
    if (this._events[evtName]) {
      this.debug && log.debug("triggering event: " + evtName);

      this._events[evtName].trigger(evtData);
    }
  },
  // internal functions
  _getEventNames: function _getEventNames(evtNames) {
    var result = [],
        tokens,
        i,
        ln;

    if (evtNames && typeof evtNames === 'string') {
      tokens = evtNames.split(',');

      for (i = 0, ln = tokens.length; i < ln; i++) {
        result.push(tokens[i].replace(/^\s+|\s+$/g, ''));
      }
    }

    return result;
  }
};
module.exports = EventManager;

});