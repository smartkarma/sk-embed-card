[@bs.module] external pluralize: string => string = "pluralize";

type attributes('model) = 'model

type data('model) = {
  attributes: attributes('model),
};

type jsonData('model) = {
  data: data('model),
};

let decodeData = (decodeRecord, json) =>
  Json.Decode.{
    attributes: json |> field("attributes", decodeRecord(json)),
  }

let decodeJsonData = (decodeRecord, json) =>
  Json.Decode.{
    data: json |> field("data", decodeData(decodeRecord))
  } 

let query = (modelName: string, id: string, decodeRecord): Js.Promise.t(attributes('model)) => {
  let endpoint = "https://sk-web-build.smartkarma.com/api/v2/" ++ pluralize(modelName) ++ "/" ++ id;
  let token = "Token token=\"7Uek8JCj49yPDXnZksaE\", email=\"lc@smartkarma.com\"";
  
  Js.Promise.(
    Fetch.fetchWithInit(
      endpoint,
      Fetch.RequestInit.make(
        ~headers=
          Fetch.HeadersInit.makeWithArray([|
            ("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            ("API-TOKEN", "8yz1xx6eqxaR69hvtLLhDMuegVPn1g"),
            ("authorization", token),
          |]),
        ()
      )
    )
    |> then_(Fetch.Response.json)
    |> then_(json => {
      let item = json |> decodeJsonData(decodeRecord) |> 
        jsonData => jsonData.data.attributes;
      resolve(item);
    })
  )
};
