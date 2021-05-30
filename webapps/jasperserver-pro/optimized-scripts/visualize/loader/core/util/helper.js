/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(n,r,e){e.exports={serverSettings:function(n){var r=n.match(/<script[^>]*>([^<]*)<\/script>/)[1];return new Function(r+"return __jrsConfigs__;")()},loaderConfig:function(n){return new Function("requirejs","return "+n)({config:function(n){return n}})}}});