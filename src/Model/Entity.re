type t = {
  id: string,
  shortName: string,
  slug: string,
  yahooTicker: string,
  security: string,
};

let decodeString = (fieldName, json) =>
  Json.Decode.(
    json |> field(fieldName, withDefault("", string))
  )

let decodeRecord = (parentJson, json) =>  
  Json.Decode.{
    id: parentJson |> decodeString("id"),
    shortName: json |> decodeString("short-name"),
    slug: json |> decodeString("slug"),
    yahooTicker: json |> decodeString("yahoo-ticker"),
    security: json |> decodeString("security"),
  }

let getShortSecurity = security => {
  let result = Js.String.(
   security 
    |> replaceByRe([%bs.re "/\\s+/g"], " ") 
    |> match([%bs.re "/([\\d-&_A-Z_/]+ [A-Z]{2}) EQUITY/i"])
  );
  switch (result) {
    | None => security
    | Some(match) => match[1]
  }
}

let getBbgTicker = shortSecurity => 
  shortSecurity |> Js.String.split(" ") |> Js.Array.joinWith(":")

let shortSecurity = entity => entity.security -> getShortSecurity;
let bbgTicker = entity => entity -> shortSecurity -> getBbgTicker;