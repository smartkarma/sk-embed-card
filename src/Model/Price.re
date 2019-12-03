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

let decodeArrayFloat = (fieldName, json) =>
  Json.Decode.(
    json |> field(fieldName, array(withDefault(0.0, float)))
  )

let decodeArrayInt = (fieldName, json) =>
  Json.Decode.(
    json |> field(fieldName, array(withDefault(0, int)))
  )

let decodeArrayString = (fieldName, json) =>
  Json.Decode.(
    json |> field(fieldName, array(withDefault("", string)))
  );

let decodePrice = json => 
  Json.Decode.{
    open_: json |> decodeArrayFloat("open"),
    high: json |> decodeArrayFloat("high"),
    low: json |> decodeArrayFloat("low"),
    close: json |> decodeArrayFloat("close"),
    volume: json |> decodeArrayInt("volume"),
    date: json |> decodeArrayString("time_period"),
  };
