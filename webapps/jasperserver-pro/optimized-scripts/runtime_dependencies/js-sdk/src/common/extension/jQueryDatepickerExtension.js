/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","jquery-ui/ui/widgets/datepicker"],function(e,i,r){var t=e("jquery");e("jquery-ui/ui/widgets/datepicker");var a=t.datepicker.dpDiv.attr("id"),d="jr-"+a;t.datepicker._mainDivId=d,t.datepicker.dpDiv.attr("id",d),t.datepicker.dpDiv.removeClass();t.datepicker.dpDiv.addClass("jr-jDatepickerPopupContainer ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all jr");var p=t.datepicker._newInst;t.datepicker._newInst=function(){var e=p.apply(t.datepicker,arguments);return e.dpDiv.removeClass("jr"),e.dpDiv.addClass("jr"),e};var c=t.datepicker._gotoToday;t.datepicker._gotoToday=function(e){c.call(this,e),this._selectDate(e)},r.exports=t});