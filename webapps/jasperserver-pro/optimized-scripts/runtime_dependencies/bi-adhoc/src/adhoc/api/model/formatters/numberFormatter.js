/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./formatsMappingUtil","runtime_dependencies/js-sdk/src/jrs.configs"],function(e,n,r){function t(e,n,r,t,s,f,o){var u,a="-"===e[0];return a&&(e=e.substring(1)),u=i(e,t||0,s||0,o,r),f&&(u=f+u),a&&(u=n?"("+u+")":"-"+u),u}function i(e,n,r,t,i){var s,f=e.split("."),o=f[0],u=f[1]||"",a=f[1]?+("0."+u):0,d=u.length;if(d=Math.max(d,n),d=Math.min(d,r)){if(u.length>d)0==+(u=a.toFixed(d).substring(2))&&Math.round(a)&&(o=(+o+1).toString());else if(u.length<d)for(var O=u.length;O<d;O++)u+="0"}else o.length<17&&Math.round(a)&&(o=(+o+1).toString());if(i){s=[];for(var O=o.length-3;O>=0;O-=3)s.push(o.substr(O,3));3+O>0&&s.push(o.substr(0,3+O)),o=s.reverse().join(i)}return d?o+(t||".")+u:o}function s(e){var n={THOUSAND:","};return 0===e.indexOf("es")||0===e.indexOf("de")||0===e.indexOf("it")||0===e.indexOf("pt_BR")?(n.DECIMAL=",",n.THOUSAND="."):0===e.indexOf("fr")&&(n.DECIMAL=",",n.THOUSAND=" "),n}var f=e("./formatsMappingUtil"),o=e("runtime_dependencies/js-sdk/src/jrs.configs"),u={format:function(e,n,r){var i=s(o.userLocale);return f.isNullOrEmpty(e)?"":f.isOtherNode(e)?e:"#,##0.00"===n?t(e,!1,i.THOUSAND,2,2,!1,i.DECIMAL):"0"===n?t(e,!1,"",0,0):"$#,##0.00;($#,##0.00)"===n?t(e,!0,i.THOUSAND,2,2,"$",i.DECIMAL):"$#,##0;($#,##0)"===n?t(e,!0,i.THOUSAND,0,0,"$"):"$#,##0.000#############"===n?t(e,!1,i.THOUSAND,3,16,"$",i.DECIMAL):"$#,##0,00;($#,##0,00)"===n?t(e,!0,i.THOUSAND,2,2,"$",i.DECIMAL):"#,##0"===n?t(e,!1,i.THOUSAND,0,0):"$#,##0;($#,##0)"===n?t(e,!0,i.THOUSAND,0,0,"$"):"#,##0;(#,##0)"===n?t(e,!0,i.THOUSAND,0,0):e}};r.exports=u});