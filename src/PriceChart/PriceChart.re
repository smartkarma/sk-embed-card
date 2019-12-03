type hc;
[@bs.module] external highcharts: hc = "highcharts/highstock";
[@bs.module] external highchartsExport: (hc) => unit = "highcharts/modules/exporting";
[@bs.module] external highchartsData: (hc) => unit = "highcharts/modules/data";

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
};

[@bs.deriving abstract]
type hcOption = {
  [@bs.optional] chart: chartType,
  title: titleType,
  series: array(seriesType),
  [@bs.optional] xAxis: axisType,
  [@bs.optional] yAxis: axisType,
  [@bs.optional] others: unit,
};

let fetchPrice = (~ticker, ~startDate=?, ()) => () => {
  let _startDate = switch (startDate) {
  | None => Luxon.(
      local() -> minusObj(durationObj(~years=5, ())) -> toSQLDate
    )
  | Some(d) => d
  };

  let endpoint = "https://silat-staging.smartkarma.com/v1/chart/" ++ ticker ++ "?start-time=" ++ _startDate;
  let token = "Token token=\"7Uek8JCj49yPDXnZksaE\", email=\"lc@smartkarma.com\"";

  Js.Promise.(
    Fetch.fetchWithInit(
      endpoint,
      Fetch.RequestInit.make(
        ~headers=
          Fetch.HeadersInit.makeWithArray([|
            ("authorization", token),
            ("x-sk-authorization", token),
          |]),
        ()
      )
    )
    |> then_(Fetch.Response.json)
    |> then_(json => json |> Price.decodePrice |> resolve)
  );
};

[@bs.module "highcharts/highstock"] [@ba.val] external stockChart: (string, hcOption) => unit = "stockChart";

[@react.component]
let make = (~entity: Entity.t) => {
  let yahooTicker = entity.yahooTicker;
  let bbgTicker = Entity.bbgTicker(entity);
  let ticker = switch (yahooTicker, bbgTicker) {
  | ("", "") => ""
  | ("", _) => bbgTicker
  | (_, _) => yahooTicker
  };
  if (ticker == "") {
    React.string("Cannot find the ticker")
  } else {
    <>
      <div id="container" />
      <LoadData.Price fetch=fetchPrice(~ticker=ticker, ())>
        {
          (price: Price.t) => {
            let ohlc = price.date ->
              Belt.Array.mapWithIndex((i, date): Price.pricePoint => 
                {
                  date: Luxon.fromISO(date) -> Luxon.toMillis,
                  open_: price.open_[i],
                  high: price.high[i],
                  low: price.low[i],
                  close: price.close[i],
                }
              );
            let option = hcOption(
              ~title=titleType(~text=entity.shortName, ()),
              ~series=[|
                seriesType(~id="ohlc", ~type_="ohlc", ~data=ohlc, ())
              |],
              ()
            );
            stockChart("container", option)
            React.null
          }
        }
      </LoadData.Price>
    </>
  }
};