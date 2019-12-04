type hc;
[@bs.module] external highcharts: hc = "highcharts/highstock";
[@bs.module] external highchartsExport: hc => unit = "highcharts/modules/exporting";
[@bs.module] external highchartsData: hc => unit = "highcharts/modules/data";

highchartsExport(highcharts);
highchartsData(highcharts);

[@bs.deriving abstract]
type chartType = {
  [@bs.as "type"] type_: string,
  [@bs.optional] others: unit,
};

[@bs.deriving abstract]
type titleType = {
  text: string,
  [@bs.optional] others: unit,
};

[@bs.deriving abstract]
type axisType = {
  [@bs.optional] categories: array(string),
  [@bs.optional] title: titleType,
  [@bs.optional] others: unit,
};

[@bs.deriving abstract]
type seriesType = {
  [@bs.as "type"] type_: string,
  [@bs.optional] id: string,
  [@bs.optional] data: array(Price.pricePoint),
  [@bs.optional] name: string,
};

[@bs.deriving abstract]
type hcOption = {
  [@bs.optional] chart: chartType,
  [@bs.optional] title: titleType,
  [@bs.optional] series: array(seriesType),
  [@bs.optional] xAxis: axisType,
  [@bs.optional] yAxis: axisType,
  [@bs.optional] others: unit,
};

[@bs.module "highcharts/highstock"] [@ba.val] external stockChart: (string, hcOption) => unit = "stockChart";
