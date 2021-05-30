define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  _isDelimiter: function _isDelimiter(escapeCharacterQuantity) {
    return escapeCharacterQuantity % 2;
  },
  split: function split(string, escapeCharacter, delimiter, unescapeOutput) {
    delimiter = _.isArray(delimiter) ? delimiter : [delimiter];
    unescapeOutput = _.isUndefined(unescapeOutput) ? true : unescapeOutput;
    var self = this,
        lastDelimiterIndex = 0,
        escapeCharacterQuantity = 0,
        result = [],
        length = string.length;

    _.each(string, function (character, index) {
      if (character === escapeCharacter) {
        escapeCharacterQuantity += 1;
      } else if (_.indexOf(delimiter, character) !== -1) {
        if (escapeCharacterQuantity === 0 || !this._isDelimiter(escapeCharacterQuantity)) {
          escapeCharacterQuantity = 0;
          result.push(string.slice(lastDelimiterIndex, index));
          lastDelimiterIndex = index + 1;
        } else {
          escapeCharacterQuantity = 0;
        }
      } else {
        escapeCharacterQuantity = 0;
      }

      if (index + 1 === length) {
        result.push(string.slice(lastDelimiterIndex, length));
      }
    }, this);

    return _.map(result, function (value) {
      return unescapeOutput ? self.unescape(value, escapeCharacter) : value;
    });
  },
  unescape: function unescape(string, escapeCharacter) {
    var lastSeqIndex = 0,
        escapeSequence = '',
        length = string.length,
        resultString = '';

    _.each(string, function (character, index) {
      if (character === escapeCharacter) {
        escapeSequence += escapeCharacter;
      } else {
        if (escapeSequence.length) {
          resultString += this._getReplacedSubString(string, escapeSequence, escapeCharacter, index, lastSeqIndex);
          lastSeqIndex = index;
        }

        escapeSequence = '';
      }

      if (index + 1 === length) {
        if (escapeSequence.length) {
          resultString += this._getReplacedSubString(string, escapeSequence, escapeCharacter, index + 1, lastSeqIndex);
        } else {
          resultString += string.slice(lastSeqIndex, length);
        }
      }
    }, this);

    return resultString;
  },
  _getReplacedSubString: function _getReplacedSubString(string, escapeSequence, escapeCharacter, i, lastIndex) {
    var replaceSequence = this._getReplaceSequence(escapeSequence, escapeCharacter);

    return string.slice(lastIndex, i).replace(escapeSequence, replaceSequence);
  },
  _getReplaceSequence: function _getReplaceSequence(escapeSequence, escapeCharacter) {
    var replaceSequence;

    if (escapeSequence.length % 2) {
      replaceSequence = new Array((escapeSequence.length - 1) / 2 + 1).join(escapeCharacter);
    } else {
      var arraySize = escapeSequence.length / 2;
      arraySize = arraySize === 1 ? 2 : arraySize;
      replaceSequence = new Array(arraySize).join(escapeCharacter);
    }

    return replaceSequence;
  },
  join: function join(path, escapeCharacter, separator) {
    return _.map(path, function (pathFragment) {
      return this.escape(pathFragment, escapeCharacter, [escapeCharacter, separator]);
    }, this).join(separator);
  },
  escape: function escape(string, escapeCharacter, characters) {
    var regexp = this._getEscapeRegexp(characters);

    return string === null ? '' : string.replace(regexp, function (match) {
      return escapeCharacter + match;
    });
  },
  _getEscapeRegexp: function _getEscapeRegexp(characters) {
    characters = characters.toString().replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').split('\\,');
    return new RegExp(characters.join('|'), 'g');
  }
};

});