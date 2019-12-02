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

type pricePoint =  {
  date: int,
  open_: float,
  high: float,
  low: float,
  close: float,
};

[@bs.deriving abstract]
type seriesType = {
  [@bs.as "type"] type_: string,
  [@bs.optional] id: string,
  [@bs.optional] data: array(pricePoint),
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

[@bs.module "highcharts/highstock"] [@ba.val] external stockChart: (string, hcOption) => unit = "stockChart";

type priceData('a) = RemoteData.t('a, 'a, string);

type price =  {
  open_: array(float),
  high: array(float),
  low: array(float),
  close: array(float),
  volume: array(int),
  date: array(string),
};

let decodePrice = json => 
  Json.Decode.{
    open_: json |> field("open", array(float)),
    high: json |> field("high", array(float)),
    low: json |> field("low", array(float)),
    close: json |> field("close", array(float)),
    volume: json |> field("volume", array(int)),
    date: json |> field("time_period", array(string)),
  };

type action =
  | Loading
  | PriceLoaded(price)
  | PriceError(string);

let fetchPrice = (~ticker, ~dispatch, ~startDate=?, ()) => {
  dispatch(Loading);

  let _startDate = switch (startDate) {
  | None => Luxon.(
      local() -> minusObj(durationObj(~years=1, ())) -> toSQLDate
    )
  | Some(d) => d
  };

  let endpoint = "https://silat-staging.smartkarma.com/v1/chart/" ++ ticker ++ "?start-time=" ++ _startDate;
  let token = "Token token=\"eQeRBgUUJ3CVtuRAK99R\", email=\"echeng@glgroup.com\"";

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
    |> then_(json => {
        json |> decodePrice |> (
          (price) => {
             dispatch(PriceLoaded(price));
             resolve();
           }
         )
        })
    |> catch((_) =>  {
        dispatch(PriceError("Error fetching the data")) 
        resolve()
    })
  ) 
  |> ignore;
};


type state = {
  price: priceData(option(price)),
  mutable isChartRendered: ref(bool),
};

let initialState = {
  price: RemoteData.NotAsked,
  isChartRendered: ref(false),
};

let reducer = (state, action) =>
  switch (action) {
  | Loading => { ...state, price: RemoteData.Loading(None) };
  | PriceLoaded(price) => {...state, price: RemoteData.Success(Some(price))}
  | PriceError(err) => {...state, price: RemoteData.Failure(err)}
  };

[@react.component]
let make = (~entity) => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    switch (state.price) {
    | NotAsked => fetchPrice(~ticker="D05.SI", ~dispatch=dispatch, ())
    | Success(somePrice) =>
      switch(somePrice) {
      | Some(price) => {
          if (!state.isChartRendered^) {
            state.isChartRendered := true;
            let ohlc = price.date ->
              Belt.Array.mapWithIndex((i, date) => 
                {
                  date: Luxon.fromISO(date) -> Luxon.toMillis,
                  open_: price.open_[i],
                  high: price.high[i],
                  low: price.low[i],
                  close: price.close[i],
                }
              );
            let option = hcOption(
              ~title=titleType(~text="Fruit Consumption", ()),
              ~series=[|
                seriesType(~id="ohlc", ~type_="ohlc", ~data=ohlc, ())
              |],
              ()
            );
            stockChart("container", option)
          }
        }
      | None => ()
      }
    | _ => ()
    }
    None;
  });

  <div>
    <div id="container">
      {React.string("Loading...")}
    </div>
  </div>
};