type t =  {
  open_: array(float),
  high: array(float),
  low: array(float),
  close: array(float),
  volume: array(int),
  date: array(string),
};

type pricePoint =  {
  date: int,
  open_: float,
  high: float,
  low: float,
  close: float,
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
