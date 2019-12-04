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
              let ohlc = Belt.Array.(
                price.date 
                -> mapWithIndex((i, date): Price.pricePoint => 
                  {
                    date: Luxon.fromISO(date) -> Luxon.toMillis,
                    open_: price.open_[i],
                    high: price.high[i],
                    low: price.low[i],
                    close: price.close[i],
                  }
                )
                -> keepMap(p => 
                  switch ((p.open_, p.high, p.low, p.close)) {
                  | (0.0, _, _, _) 
                  | (_, 0.0, _, _)
                  | (_, _, 0.0, _)
                  | (_, _, _, 0.0) => None
                  | (_, _, _, _)  => Some(p)
                  }
                )
              );
            let option = HighCharts.(
              hcOption(
                ~series=[|
                  seriesType(~id="ohlc", ~type_="ohlc", ~data=ohlc, ~name=entity.shortName, ())
                |],
                ()
              )
            );
            HighCharts.stockChart("container", option)
            React.null
          }
        }
      </LoadData.Price>
    </>
  }
};