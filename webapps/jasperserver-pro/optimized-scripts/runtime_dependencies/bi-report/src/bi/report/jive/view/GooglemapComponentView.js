/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./BaseJiveComponentView"],function(o,n,e){var i=o("./BaseJiveComponentView");e.exports=i.extend({render:function(o){this.$reportEl=o,this.infowindow={},this._init()},_init:function(){var n=this,e=n.model.get("instanceData"),i=e.requestParams||"";"&"===i[0]&&(i=i.substr(1)),"undefined"==typeof google||"undefined"!=typeof google&&void 0===google.maps?o(["async!//maps.google.com/maps/api/js?"+i+"!callback"],function(){n._showMap(n.model.get("id"),e.latitude,e.longitude,e.zoom,e.mapType,e.markerList,e.pathsList)}):n._showMap(n.model.get("id"),e.latitude,e.longitude,e.zoom,e.mapType,e.markerList,e.pathsList)},_configureImage:function(o,n,e){var i,t,a,l,r,s;i=n[o+".width"]?parseInt(n[o+".width"]):null,t=n[o+".height"]?parseInt(n[o+".height"]):null,a=n[o+".origin.x"]?parseInt(n[o+".origin.x"]):0,l=n[o+".origin.y"]?parseInt(n[o+".origin.y"]):0,r=n[o+".anchor.x"]?parseInt(n[o+".anchor.x"]):0,s=n[o+".anchor.y"]?parseInt(n[o+".anchor.y"]):0,e[o]={url:n[o+".url"],size:i&&t?new google.maps.Size(i,t):null,origin:new google.maps.Point(a,l),anchor:new google.maps.Point(r,s)}},_createInfo:function(o){if(o["infowindow.content"]&&o["infowindow.content"].length>0){var n=google.maps,e={content:o["infowindow.content"]};return o["infowindow.pixelOffset"]&&(e.pixelOffset=o["infowindow.pixelOffset"]),o["infowindow.latitude"]&&o["infowindow.longitude"]&&(e.position=new n.LatLng(o["infowindow.latitude"],o["infowindow.longitude"])),o["infowindow.maxWidth"]&&(e.maxWidth=o["infowindow.maxWidth"]),new n.InfoWindow(e)}return null},_showMap:function(o,n,e,i,t,a,l){var r=this,s=google.maps,g={zoom:i,center:new s.LatLng(n,e),mapTypeId:s.MapTypeId[t],autocloseinfo:!0},d=r.$reportEl.find("#"+o),p=new s.Map(d[0],g);if(d.attr("js-stdnav","false"),a)for(var c,h=0;h<a.length;h++){var f=a[h],w=new s.LatLng(f.latitude,f.longitude),u={position:w,map:p};f["icon.url"]&&f["icon.url"].length>0?r._configureImage("icon",f,u):f.icon&&f.icon.length>0?u.icon=f.icon:f.color&&f.color.length>0?u.icon="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+(f.label&&f.label.length>0?f.label:"%E2%80%A2")+"%7C"+f.color:f.label&&f.label.length>0&&(u.icon="http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+f.label+"%7CFE7569"),f["shadow.url"]&&f["shadow.url"].length>0&&r._configureImage("shadow",f,u);for(c in f)c.indexOf(".")<0&&f.hasOwnProperty(c)&&!u.hasOwnProperty(c)&&(u[c]=f[c]);var m=new google.maps.Marker(u);m.info=r._createInfo(f),s.event.addListener(m,"click",function(){p.autocloseinfo&&r.infowindow&&r.infowindow.close&&r.infowindow.close(),this.info?(r.infowindow=this.info,this.info.open(p,this)):this.url&&this.url.length>0&&window.open(this.url,this.target)})}if(l)for(var v=0;v<l.length;v++){var _=l[v],y={},x=[],I=!1;for(var L in _)if("locations"===L&&_[L])for(var b=_[L],c=0;c<b.length;c++){var P=b[c];x.push(new google.maps.LatLng(P.latitude,P.longitude))}else"isPolygon"===L?I=r._getBooleanValue(_[L]):y[L]="visible"===L||"editable"===L||"clickable"===L||"draggable"===L||"geodesic"===L?r._getBooleanValue(_[L]):_[L];y.map=p,I?(y.paths=x,new google.maps.Polygon(y)):(y.path=x,new google.maps.Polyline(y))}},_getBooleanValue:function(o){return!0===o||"true"===o}})});