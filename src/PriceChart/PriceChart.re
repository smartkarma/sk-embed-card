type hc;
[@bs.module] external highcharts: hc = "highcharts";
[@bs.module] external highchartsExport: (hc) => unit = "highcharts/modules/exporting";
highchartsExport(highcharts);

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
type dataPoint = {
  name: string,
  data: array(int),
  [@bs.optional] others: unit,
};

type seriesType = array(dataPoint);

[@bs.deriving abstract]
type hcOption = {
  chart: chartType,
  series: seriesType,
  title: titleType,
  xAxis: axisType,
  yAxis: axisType,
  [@bs.optional] others: unit,
}

let option = hcOption(
  ~chart=chartType(~type_="bar", ()),
  ~series=[|
    dataPoint(~name="Jane", ~data=[|1, 0 , 4|], ()),
    dataPoint(~name="Jone", ~data=[|5, 7, 3|], ()),
  |],
  ~title=titleType(~text="Fruit Consumption", ()),
  ~xAxis=axisType(~categories=[|"Apples", "Bananas", "Oranges"|], ()),
  ~yAxis=axisType(~title=titleType(~text="Fruit eaten", ()), ()),
  ()
);

// Js.log(option |> chartGet |> type_Get)

[@bs.module "highcharts"] [@ba.val] external chart: (string, hcOption) => unit = "chart";

[@react.component]
let make = () => {
  React.useEffect(() => {
    chart("container", option);
    None;
  });

  <div>
    <div id="container">
      {React.string("Main")}
    </div>
  </div>
};