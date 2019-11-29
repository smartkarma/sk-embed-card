'use strict';

var React = require("react");
var Highcharts = require("highcharts");
var Exporting = require("highcharts/modules/exporting");

Exporting(Highcharts);

var option = {
  chart: {
    type: "bar"
  },
  series: /* array */[
    {
      name: "Jane",
      data: /* array */[
        1,
        0,
        4
      ]
    },
    {
      name: "Jone",
      data: /* array */[
        5,
        7,
        3
      ]
    }
  ],
  title: {
    text: "Fruit Consumption"
  },
  xAxis: {
    categories: /* array */[
      "Apples",
      "Bananas",
      "Oranges"
    ]
  },
  yAxis: {
    title: {
      text: "Fruit eaten"
    }
  }
};

function PriceChart(Props) {
  React.useEffect((function () {
          Highcharts.chart("container", option);
          return ;
        }));
  return React.createElement("div", undefined, React.createElement("div", {
                  id: "container"
                }, "Main"));
}

var make = PriceChart;

exports.option = option;
exports.make = make;
/*  Not a pure module */
