define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var i18n = require("bundle!AdHocBundle");

var crosstabHeaderTemplate = require("text!../template/crosstabHeaderTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var crosstabCornerTemplateFn = _.template(crosstabHeaderTemplate); // Converter from query to aux model


function getAuxModel(model) {
  var data = model.dataSet.query.groupByJSON(),
      res = [],
      crosstabComponent = model.component.getCrosstabComponent(),
      columnsComponent = crosstabComponent.getColumnsComponent(),
      rowsComponent = crosstabComponent.getRowsComponent(),
      measuresComponent = crosstabComponent.getMeasuresComponent();
  res.push(readQueryDimension(data.columns, [0], columnsComponent, measuresComponent));
  res.push(readQueryDimension(data.rows, [1], rowsComponent, measuresComponent));
  applyExpandStrategy(res, model);
  return res;
}

function readQueryDimension(dim, expId, items, measureItems) {
  var res = [],
      level,
      component,
      item,
      id;

  for (var i = 0; i < dim.items.length; i++) {
    level = dim.items[i].level;
    item = {
      isExpandable: isExpandable(dim.items, i)
    };

    if (level) {
      id = level.id || level.field; //Workaround for measures which are converted from fields. http://jira.jaspersoft.com/browse/JRS-13875
      //Workaround for measures which are converted from fields. http://jira.jaspersoft.com/browse/JRS-13875

      component = items.findWhere({
        reference: id
      }) || measureItems.findWhere({
        reference: id
      });
      item.name = id;
      item.label = component.label();
      item.fieldRef = level.field;
    } else {
      item.label = i18n['adhoc.node.measures.node'];
      item.isMeasure = true;
    }

    if (item.isExpandable) {
      item.expId = item.collapseId = expId.concat([i]);
      item.isExpanded = isExpanded(dim.expansions, level);
    }

    res.push(item);
  }

  return res;
}

function isExpandable(levels, index) {
  return levels[index + 1] && !(levels[index].level && levels[index + 1].aggregations);
}

function isExpanded(expansions, level) {
  if (expansions) {
    for (var i = 0, l = expansions.length; i < l; i++) {
      if (expansions[i].level && (!level && _.isUndefined(expansions[i].level.fieldRef) || level && expansions[i].level.fieldRef === level.id)) {
        return expansions[i].level.expanded;
      }
    }
  }

  return false;
}

function applyExpandStrategy(aux, model) {
  var removedSummary = {
    includeAll: false
  },
      columns = model.component.getColumnsComponent().where(removedSummary),
      rows = model.component.getRowsComponent().where(removedSummary),
      notExpandable = _.reduce([].concat(columns).concat(rows), function (memo, level) {
    memo[level.get('dimension')] = true;
    return memo;
  }, {}); // move left/down
  // move left/down


  for (var i = 0; i < aux.length; i++) {
    for (var j = aux[i].length - 1; j > 0; j--) {
      aux[i][j].isExpandable = notExpandable[aux[i][j].name] ? false : aux[i][j - 1].isExpandable;
      aux[i][j].isExpanded = aux[i][j - 1].isExpanded;
      aux[i][j].expId = aux[i][j - 1].expId;
      aux[i][j].collapseId = aux[i][j - 1].collapseId;
    }

    if (aux[i].length) {
      aux[i][0].isExpandable = false;
      aux[i][0].expId = undefined;
      aux[i][0].collapseId = undefined;
    }
  } // move expId for levels, with removed summary
  // move expId for levels, with removed summary


  for (var i = 0; i < aux.length; i++) {
    for (var j = 0; j < aux[i].length; j++) {
      if (aux[i][j].isExpandable) {
        var k = j + 1,
            length = aux[i][aux[i].length - 1].isMeasure ? aux[i].length - 1 : aux[i].length;

        while (k < length && (aux[i][k].isMeasure || notExpandable[aux[i][k].name])) {
          k++;
        }

        if (aux[i][k - 1].expId) {
          aux[i][j].expId = aux[i][k - 1].expId;
          aux[i][j].isExpanded = aux[i][k - 1].isExpanded;
        }
      }
    }
  }
} // Converter from aux model to template data
// Converter from aux model to template data


function prepareDataForRendering(aux, model) {
  var rows = aux[0],
      cols = aux[1],
      res = _.reduce(rows, function (memo, row) {
    memo.push([createTemplateDataObject(model, row, cols.length)]);
    return memo;
  }, []);

  res.push(_.reduce(cols, function (memo, col) {
    memo.push(createTemplateDataObject(model, col));
    return memo;
  }, []));
  return res;
}

function createTemplateDataObject(model, item, colspan) {
  var res = {
    label: item.label,
    isExpanded: item.isExpandable && item.isExpanded,
    isCollapsed: item.isExpandable && !item.isExpanded,
    isMeasure: item.isMeasure
  };
  item.isExpandable && (res.expId = item.expId.join('-'));
  item.isExpandable && (res.colId = item.collapseId.join('-'));
  colspan && (res.colspan = colspan);
  return res;
} // View code


var CrosstabCornerView = Backbone.View.extend({
  events: {
    'click .jr-isExpanded': 'onExpandClick',
    'click .jr-isCollapsed': 'onCollapseClick'
  },
  render: function render() {
    this.auxModel = getAuxModel(this.model);
    this.$('table').html(crosstabCornerTemplateFn({
      data: prepareDataForRendering(this.auxModel, this.model)
    }));
    return this;
  },
  onCollapseClick: function onCollapseClick(event) {
    this._expand(event.target.getAttribute('data-expansion-id').split('-'), true);
  },
  onExpandClick: function onExpandClick(event) {
    this._expand(event.target.getAttribute('data-expansion-id').split('-'), false);
  },
  _expand: function _expand(id, expanded) {
    var res = this.auxModel,
        expansion = {
      level: {}
    };

    for (var i = 0; i < id.length; i++) {
      res = res[id[i]];
    }

    expansion.level.expanded = expanded;
    expansion.level.fieldRef = res.name;
    expansion.level.aggregation = !res.fieldRef;
    this.trigger(+id[0] ? 'expansion:row' : 'expansion:column', expansion);
    this.trigger('expansion', expansion);
  }
});
module.exports = CrosstabCornerView;

});