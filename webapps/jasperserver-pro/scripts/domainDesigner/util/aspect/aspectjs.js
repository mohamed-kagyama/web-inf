define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ConfigBuilder = function ConfigBuilder(build) {
  this.config = {};
  this.buildCallback = build;
};

_.extend(ConfigBuilder.prototype, {
  before: function before(advice) {
    if (!this.config['before']) {
      this.config['before'] = [];
    }

    this.config['before'].push(advice);
    return this;
  },
  around: function around(advice) {
    if (!this.config['around']) {
      this.config['around'] = [];
    }

    this.config['around'].push(advice);
    return this;
  },
  afterReturning: function afterReturning(advice) {
    if (!this.config['afterReturning']) {
      this.config['afterReturning'] = [];
    }

    this.config['afterReturning'].push(advice);
    return this;
  },
  afterThrowing: function afterThrowing(advice) {
    if (!this.config['afterThrowing']) {
      this.config['afterThrowing'] = [];
    }

    this.config['afterThrowing'].push(advice);
    return this;
  },
  after: function after(advice) {
    if (!this.config['after']) {
      this.config['after'] = [];
    }

    this.config['after'].push(advice);
    return this;
  },
  build: function build() {
    return this.buildCallback(this.config);
  }
});

var Aspectjs = function Aspectjs() {};

_.extend(Aspectjs.prototype, {
  //API
  wrap: function wrap(obj, aspectConfig, context) {
    if (_typeof(obj) === 'object') {
      return this._wrapObject(obj, aspectConfig);
    } else if (typeof obj === 'function') {
      return this._wrapFunction(obj, aspectConfig, context);
    } else {
      return obj;
    }
  },
  //Private functions
  _wrapFunction: function _wrapFunction(func, aspectConfig, context) {
    var self = this;

    if (aspectConfig) {
      return _.bind(this._performAction, this, {
        config: aspectConfig,
        context: context,
        func: func
      });
    } else {
      return new ConfigBuilder(function (config) {
        return self._wrapFunction(func, config, context);
      });
    }
  },
  _wrapObject: function _wrapObject(obj, aspectConfig) {
    var self = this;

    var wrappedObj = this._getWrappedObject(obj, aspectConfig); //let's retrieve all methods we have to wrap
    //let's retrieve all methods we have to wrap


    var methodsToWrap = this._getAllMethodsToWrap(obj, aspectConfig);

    _.each(methodsToWrap, function (method) {
      var methodAspectConfig = self._getAspectConfigForMethod(method, aspectConfig);

      wrappedObj[method] = self._wrapFunction(obj[method], methodAspectConfig, wrappedObj);
    });

    return wrappedObj;
  },
  _getWrappedObject: function _getWrappedObject(obj, aspectConfig) {
    var starConfig = aspectConfig['*'] || {};

    if (starConfig.modifyOriginal) {
      // Suitable for the cases when there are binded event listeners in the constructor,
      // so this context is already bound before aspect has been applied
      return obj;
    } else {
      // Suitable for most cases
      // Does not modify original object but it's possible that it will not work
      // if this context was already bound before aspect was applied (in constructor for example)
      var AspectjsWrapper = function AspectjsWrapper() {};

      AspectjsWrapper.prototype = obj; //We just inherited from the object which we are going to wrap
      //so we do not have to change it directly
      //We just inherited from the object which we are going to wrap
      //so we do not have to change it directly

      return new AspectjsWrapper();
    }
  },
  //let's we have the following config:
  //{"*": {before: [a, b]}, "method1": {before: [c, d]}}
  //
  //the result config for method1 should be:
  //{before: [c, d, a, b]}
  _getAspectConfigForMethod: function _getAspectConfigForMethod(method, aspectConfig) {
    var starConfig = aspectConfig['*'] || {},
        methodConfig = aspectConfig[method] || {},
        keys = _.uniq(_.keys(starConfig).concat(_.keys(methodConfig))),
        config = {};

    _.each(keys, function (key) {
      config[key] = _.uniq(methodConfig[key] || []).concat(starConfig[key] || []);
    }); //save method name in config
    //save method name in config


    config['name'] = method;
    return config;
  },
  _getAllMethodsToWrap: function _getAllMethodsToWrap(obj, aspectConfig) {
    var methods = []; // all own methods
    // all own methods

    var starConfig = aspectConfig['*'],
        isAnyAspectsInStarConfig = false;

    if (starConfig) {
      isAnyAspectsInStarConfig = this._isAnyAspectsInConfig(starConfig);
    }

    if (isAnyAspectsInStarConfig) {
      var allMethods = this._getAllMethodsFromObject(obj, starConfig.wrapInPrototype !== false);

      methods = methods.concat(this._filterOutMethodsToExclude(allMethods, starConfig.exclude || []));
    } //just collect all own object method names
    //just collect all own object method names


    methods = methods.concat(_.chain(aspectConfig).keys().filter(function (methodName) {
      return methodName !== '*' && typeof obj[methodName] === 'function';
    }).value());
    return methods;
  },
  _isAnyAspectsInConfig: function _isAnyAspectsInConfig(config) {
    return config['before'] || config['after'] || config['around'] || config['afterReturning'] || config['afterThrowing'];
  },
  _getAllMethodsFromObject: function _getAllMethodsFromObject(obj, wrapInPrototype) {
    var key,
        methods = [];

    if (!obj) {
      return methods;
    }

    if (wrapInPrototype) {
      //Ok, we have to find methods not only in current instance
      //but also in it's interface
      //return all methods from all prototypes.
      for (key in obj) {
        if (typeof obj[key] === 'function') {
          methods.push(key);
        }
      }

      return methods;
    } else {
      //return only own methods
      return _.chain(obj).keys().filter(function (key) {
        return typeof obj[key] === 'function';
      }).value();
    }
  },
  _filterOutMethodsToExclude: function _filterOutMethodsToExclude(allMethods, methodsToExclude) {
    var methodsToExcludeAsMap = methodsToExclude.reduce(function (memo, method) {
      memo[method] = true;
      return memo;
    }, {});
    return allMethods.filter(function (method) {
      return !methodsToExcludeAsMap[method];
    });
  },
  _performAction: function _performAction() {
    var options = arguments[0],
        config = options.config,
        args = Array.prototype.slice.call(arguments, 1),
        result,
        parentStack = new Error().stack,
        ex;

    if (this._performBeforeAspects(config.before, config.name, args)) {
      try {
        if (config.around) {
          result = this._performAroundAspects(config.around, options.func, args, options.context, config.name);
        } else {
          result = options.func.apply(options.context, args);
        }

        result = this._performAfterReturningAspects(config.afterReturning, result, args, config.name);
      } catch (e) {
        ex = this._performAfterThrowingAspects(config.afterThrowing, e, parentStack, args, config.name);

        if (typeof ex === 'undefined') {
          ex = e;
        }

        if (ex) {
          throw ex;
        }
      } finally {
        this._performAfterAspects(config.after, result, ex, args, config.name);
      }
    }

    return result;
  },
  //Executes before aspects one by one until find one which
  //returns false, in this case whole method will return false
  //otherwise whole method will returns true
  _performBeforeAspects: function _performBeforeAspects(advices, name, args) {
    if (!advices) {
      return true;
    }

    return !_.find(advices, function (advice) {
      if (typeof advice === 'function') {
        var result = advice(args, name);
        return !(result || typeof result === 'undefined');
      }
    });
  },
  _performAroundAspects: function _performAroundAspects(advices, func, args, context, name) {
    var invocation = context ? _.bind(func, context) : func;

    _.each(advices, function (advice) {
      invocation = _.bind(advice, null, name, invocation);
    });

    return invocation.apply(null, args);
  },
  _performAfterReturningAspects: function _performAfterReturningAspects(advices, result, args, name) {
    _.each(advices, function (advice) {
      result = advice(result, args, name);
    });

    return result;
  },
  _performAfterThrowingAspects: function _performAfterThrowingAspects(advices, ex, parentStack, args, name) {
    _.each(advices, function (advice) {
      ex = advice(ex, parentStack, args, name);
    });

    return ex;
  },
  _performAfterAspects: function _performAfterAspects(advices, result, ex, args, name) {
    _.each(advices, function (advice) {
      advice(result, ex, args, name);
    });
  }
});

var aspectjs = new Aspectjs();
module.exports = _.bind(aspectjs.wrap, aspectjs);

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});