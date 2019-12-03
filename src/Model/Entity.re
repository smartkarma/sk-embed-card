type t = {
  id: string,
  shortName: string,
  slug: string,
  yahooTicker: string,
  security: string,
};

let decodeRecord = (parentJson, json) =>  
  Json.Decode.{
    id: parentJson |> field("id", string),
    shortName: json |> field("short-name", string),
    slug: json |> field("slug", string),
    yahooTicker: json |> field("yahoo-ticker", string),
    security: json |> field("security", string),
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