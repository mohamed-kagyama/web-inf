/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","momentExtension","runtime_dependencies/js-sdk/src/jrs.configs","../../dashboardSettings","../../enum/dashboardWiringStandardIds","jquery"],function(e,n,t){function r(e,n,t){var r,o,s=i(e),a=e;return s.length&&(r=f.find(s,function(e){return'"'!==e.value[0]&&'"'!==e.value[e.value.length-1]}),o=r?n(r.value,t&&t.tolerateMissing):[""],a=f.reduce(o,function(e,n,t){return e.push(f.reduce(s,function(e,i){return i.optional&&t===o.length-1||e.push(r&&i.value===r.value?n:u(i.value)),e},[]).join("")),e},[]).join("")),a}function i(e){for(var n=!1,t=!1,r=!1,i=[],u=0,o=0;o<e.length;o++)"{"===e[o]&&(t=!0,u=o+1),"}"===e[o]&&(t=!1,u==o||i.push({value:v.trim(e.substring(u,o)),optional:r})),t&&(","!==e[o]&&"?"!==e[o]||n||(u==o||i.push({value:v.trim(e.substring(u,o)),optional:r}),r="?"===e[o],u=o+1),'"'===e[o]&&"\\"!==e[o-1]&&(n=!n));return i}function u(e){return e.substring(1,e.length-1)}function o(e,n,t){var r=e.substring(e.indexOf("{")+1,e.lastIndexOf("}"));return g().tz(c.userTimezone).format(r||"MMMM D, YYYY")}function s(e,n,t){var r=e.substring(e.indexOf("{")+1,e.lastIndexOf("}"));return g().tz(c.userTimezone).format(r||"h:mm a")}function a(e,n,t,r,i){var u=e,o=r.substring(0,i).lastIndexOf(n),s=r.indexOf(t,o);if(-1===o)u=[];else if((o+=n.length)<=i&&(i<=s||-1===s)){for(s=i;" "===r[o]&&o<s;o++);for(var a=o;a<s;a++){for(var l=[],d=0;d<u.length;d++)u[d][a-o]==r[a]&&l.push(u[d]);u=l}1===u.length&&u[0].length===s-o&&(u=[])}else u=[];return f.map(u,function(e){return{begin:o,end:i,substitution:e,label:e,action:e,newCursorPos:i+e.length}})}function l(e,n,t){var r,i=e.substring(0,n).lastIndexOf("$P{"),u=e.indexOf("}",i);if(-1===i)r=[];else if((i+="$P{".length)<=n&&(n<=u||-1===u)){if(u=n,r=t.wiring.reduce(function(e,n){if(n.component.isValueProducer()&&f.indexOf(f.values(m),n.get("name"))<0){var t=d(n);e.push(f.extend({producer:n.get("producer"),label:t,substitution:t},n.attributes))}return e},[]),r.length){for(;" "===e[i]&&i<u;i++);e=e.toLowerCase();for(var o=i;o<u;o++){for(var s=[],a=0;a<r.length;a++)r[a].substitution[o-i].toLowerCase()==e[o]&&s.push(r[a]);r=s}1===r.length&&r[0].length===u-i&&(r=[])}}else r=[];return f.map(r,function(e){return f.extend(e,{begin:i,end:n,action:e.producer,newCursorPos:n+e.name.length})})}function d(e){var n;if(e.component.getParent())n=e.component.get("name");else{var t=e.get("name"),r=f.findWhere(e.component.get("outputParameters"),{id:t});n=r?r.label:t}return n}var f=e("underscore"),g=e("momentExtension"),c=e("runtime_dependencies/js-sdk/src/jrs.configs"),h=e("../../dashboardSettings"),m=e("../../enum/dashboardWiringStandardIds"),v=e("jquery");t.exports={$P:{resolve:r,getSubstitutionOptions:l,hasDefaultResolution:!1},$Date:{resolve:o,getSubstitutionOptions:f.bind(a,void 0,h.DEFAULT_DATE_FORMATS,"$Date{","}"),hasDefaultResolution:!0},$Time:{resolve:s,getSubstitutionOptions:f.bind(a,void 0,h.DEFAULT_TIME_FORMATS,"$Time{","}"),hasDefaultResolution:!0}}});