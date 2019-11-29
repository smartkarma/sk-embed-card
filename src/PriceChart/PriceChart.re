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



type priceData('a) = RemoteData.t('a, 'a, string);

type price =  {
  close: array(float),
};

let decodePrice = json => 
  Json.Decode.{
    close: json |> field("close", array(float))
  };

type action =
  | Loading
  | PriceLoaded(price)
  | PriceError(string);

let priceEndpoint = "https://silat-staging.smartkarma.com/v1/chart/D05.SI?start-time=2018-11-28";
let token = "Token token=\"eQeRBgUUJ3CVtuRAK99R\", email=\"echeng@glgroup.com\"";

let fetchPrice = (dispatch) => {
  dispatch(Loading);
  Js.Promise.(
    Fetch.fetchWithInit(
      priceEndpoint,
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
              Js.log(price);
             dispatch(PriceLoaded(price));
             resolve();
           }
         )
    }
       )
    |> catch((_) =>  {
        dispatch(PriceError("Error fetching the data")) 
        resolve()
    })
  );
  ()
};


type state = {
  price: priceData(option(price))
};

let initialState = {price: RemoteData.NotAsked};

let reducer = (state, action) =>
  switch (action) {
  | Loading =>
    {
      ...state,
      price: RemoteData.Loading(None),
    };
  | PriceLoaded(price) => {...state, price: RemoteData.Success(Some(price))}
  | PriceError(err) => {...state, price: RemoteData.Failure(err)}
  };

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    chart("container", option);
    switch (state.price) {
    | NotAsked => fetchPrice(dispatch)
    | _ => ()
    }
    None;
  });

  <div>
    <div id="container">
      {React.string("Main")}
    </div>
  </div>
};