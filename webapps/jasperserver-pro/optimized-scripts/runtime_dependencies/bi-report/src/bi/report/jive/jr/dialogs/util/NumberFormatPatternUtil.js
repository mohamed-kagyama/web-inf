/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,r,n){function t(e){if(-1!=e.indexOf(".")){var r=d.decimalPart.exec(e)[1];return e.replace(r,r+"0")}var n=d.numberPart.exec(e)[1];return e.replace(n,n+".0")}function i(e){var r=e;if(-1!=r.indexOf(".")){var n=d.decimalPart.exec(r)[1];r=n.length>2?r.replace(n,n.substring(0,n.length-1)):r.replace(n,"")}return r}function a(e){var r=e.indexOf(d.numericChar.exec(e)),n=e.substring(0,r+1);return n+","+e.substring(n.length)}function u(e){return e.replace(",","")}function c(e){return e+" %"}function l(e){return e.substring(0,e.length-2)}var d={numberPart:/([\d|#]+(?!,))/,decimalPart:/(\.[\d|#]+)/,numericChar:/[\d|#]/},f={addRemoveDecimalPlace:function(e,r){var n=e.split(";")[0],a=e.split(";")[1];return r?(e=t(n),a&&(e=e+";"+t(a)),e):(e=i(n),a&&(e=e+";"+i(a)),e)},addRemoveThousandsSeparator:function(e,r){var n=e.indexOf(","),t=e.split(";")[0],i=e.split(";")[1];return r?-1==n&&(e=a(t),i&&(e=e+";"+a(i))):-1!=n&&(e=u(t),i&&(e=e+";"+u(i))),e},addRemovePercentage:function(e,r){var n=e.indexOf("%"),t=e.split(";")[0],i=e.split(";")[1];return r?-1==n&&(e=c(t),i&&(e=e+";"+c(i))):-1!=n&&(e=l(t),i&&(e=e+";"+l(i))),e},addRemovePercentageForNumber:function(e,r){var n=d.numberPart.exec(e)[1];return r?-1==e.indexOf("%")&&-1==n.indexOf("00")&&(e=e.replace(n,n+"00"),e+=" %"):-1!=e.indexOf("%")&&-1!=n.indexOf("00")&&(e=e.replace(n,n.substring(0,n.length-2)),e=e.substring(0,e.length-2)),e},addRemoveCurrencySymbol:function(e,r,n){var t=e.indexOf(n),i=e.split(";")[0],a=e.split(";")[1];return r?-1==t&&(e=n+" "+i,a&&(e=e+";"+n+" "+a)):-1!=t&&(e=i.substring(2),a&&(e=e+";"+a.substring(2))),e},jivePatternToSchemaPattern:function(e,r){var n;if("numeric"===r&&"[h]:mm:ss"===e)n=e;else if("numeric"===r){var t=e,i=new RegExp("0\\.(0+)"),a=!1,u=!1,c=0,l="-###0",d=null;t.indexOf(",")>-1&&(a=!0,t=t.replace(/,/g,"")),t.indexOf("%")>-1&&(u=!0,t=t.replace(/%/g,"")),t.indexOf("\xa4")>-1?(d="LOCALE_SPECIFIC",t=t.replace(/\u00A4/g,"")):t.indexOf("$")>-1?(d="USD",t=t.replace(/\u0024/g,"")):t.indexOf("\xa3")>-1?(d="GBP",t=t.replace(/\u00A3/g,"")):t.indexOf("\u20ac")>-1?(d="EUR",t=t.replace(/\u20AC/g,"")):t.indexOf("\xa5")>-1&&(d="YEN",t=t.replace(/\u00A5/g,"")),t=t.replace(/\s/g,"");var f=i.exec(t);f&&2==f.length&&(c=f[1].length,t=t.replace(new RegExp("\\."+Array(c+1).join("0"),"g"),""));var s=t.split(";");s&&2===s.length&&(l=s[1]),n={negativeFormat:l,currency:d,precision:c,grouping:a,percentage:u}}else n=e;return n}};n.exports=f});