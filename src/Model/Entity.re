type t = {
  id: string,
  shortName: string,
  slug: string,
};

let decodeRecord = (parentJson, json) =>  
  Json.Decode.{
    id: parentJson |> field("id", string),
    shortName: json |> field("short-name", string),
    slug: json |> field("slug", string),
  }