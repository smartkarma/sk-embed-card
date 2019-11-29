type am4core;
type am4charts;

[@bs.module "@amcharts/amcharts4/core"] external am4core: am4core = "default";
[@bs.module "@amcharts/amcharts4/charts"] external am4charts: am4charts = "default";

let add = [%raw {|
  function() {
    console.log(am4core);
  }
|}];
Js.log(add()); /* 7 */

[@react.component]
let make = () => {
  <div>
    {React.string("Test")}
  </div>
};