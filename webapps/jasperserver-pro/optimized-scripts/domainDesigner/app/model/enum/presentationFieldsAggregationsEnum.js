/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/schema/enum/genericTypesEnum","bundle!DomainDesignerBundle"],function(e,n,a){var i=e("../../../model/schema/enum/genericTypesEnum"),t=e("bundle!DomainDesignerBundle"),g={},r={None:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.None"],value:"None"},CountDistinct:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.CountDistinct"],value:"CountDistinct"},CountAll:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.CountAll"],value:"CountAll"},Mode:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Mode"],value:"Mode"},Sum:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Sum"],value:"Sum"},Average:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Average"],value:"Average"},Max:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Max"],value:"Max"},Min:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Min"],value:"Min"},StdDevP:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.StdDevP"],value:"StdDevP"},StdDevS:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.StdDevS"],value:"StdDevS"},Median:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Median"],value:"Median"},Range:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.Range"],value:"Range"},RangeMinutes:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeMinutes"],value:"RangeMinutes"},RangeHours:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeHours"],value:"RangeHours"},RangeDays:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeDays"],value:"RangeDays"},RangeWeeks:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeWeeks"],value:"RangeWeeks"},RangeMonths:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeMonths"],value:"RangeMonths"},RangeQuarters:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeQuarters"],value:"RangeQuarters"},RangeSemis:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeSemis"],value:"RangeSemis"},RangeYears:{label:t["domain.designer.presentationDesigner.presentationField.aggregation.RangeYears"],value:"RangeYears"}};g[i.INTEGER]={defaults:r.Sum,available:[r.None,r.Sum,r.Average,r.Max,r.Min,r.StdDevP,r.StdDevS,r.Mode,r.Median,r.Range,r.CountAll,r.CountDistinct]},g[i.DECIMAL]={defaults:r.Sum,available:[r.None,r.Sum,r.Average,r.Max,r.Min,r.StdDevP,r.StdDevS,r.Mode,r.Median,r.Range,r.CountAll,r.CountDistinct]};var s={defaults:r.CountAll,available:[r.None,r.Max,r.Min,r.Mode,r.Median,r.RangeMinutes,r.RangeHours,r.RangeDays,r.RangeWeeks,r.RangeMonths,r.RangeQuarters,r.RangeSemis,r.RangeYears,r.CountAll,r.CountDistinct]};g[i.DATE]=s,g[i.TIMESTAMP]=s,g[i.TIME]=s;var o=[r.None,r.CountDistinct,r.CountAll,r.Mode];g[i.STRING]={defaults:r.CountAll,available:o},g[i.BOOLEAN]={defaults:r.CountAll,available:o},a.exports=g});