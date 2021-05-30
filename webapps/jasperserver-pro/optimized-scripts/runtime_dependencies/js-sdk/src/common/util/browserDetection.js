/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,i,n){var r=e("jquery");n.exports={isMozilla:function(){return"Netscape"===navigator.appName},isFirefox:function(){return-1!==navigator.userAgent.toLowerCase().indexOf("firefox")},isWebKitEngine:function(){return r.browser&&r.browser.webkit},isChrome:function(){return navigator.userAgent.toLowerCase().indexOf("chrome")},isIPad:function(){return"iPad"==navigator.platform},isIOS:function(){return navigator.userAgent.match(/(iPad|iPhone|iPod)/g)},isAndroid:function(){return navigator.userAgent.toLowerCase().indexOf("android")},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName||navigator.userAgent.indexOf("Trident/")>=0||this.isEdge()},isIE6:function(){return this.isIEVersion(6)},isIE7:function(){return this.isIEVersion(7)},isIE8:function(){return this.isIEVersion(8)},isIE9:function(){return this.isIEVersion(9)},isIE10:function(){return this.isIEVersion(10)},isIE11:function(){return this.isIEVersion(11)},isEdge:function(){return"Netscape"===navigator.appName&&navigator.userAgent.indexOf("Edge/")>=0},isIEVersion7Upwards:function(){return this.getIEVersion()>=7},isIEVersion:function(e){return this.getIEVersion()===e},getIEVersion:function(){var e=0;if(this.getIEVersion.version>=0)return this.getIEVersion.version;if(this.isIE())if("Netscape"===navigator.appName){var i=navigator.userAgent,n=new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");null!=n.exec(i)&&(e=parseFloat(RegExp.$1))}else{var r=navigator.appVersion.split("MSIE")[1];e=parseFloat(r)}return this.getIEVersion.version=e,e}}});