type webData('a) = RemoteData.t('a, 'a, string);

type entity = {
  id: string,
  shortName: string,
  slug: string,
};

type attributes('a) = 'a

type data = {
  attributes: attributes(entity),
};

type jsonData = {
  data,
};

let decodeAttributes = (parentJson, json) =>  
  Json.Decode.{
    id: parentJson |> field("id", string),
    shortName: json |> field("short-name", string),
    slug: json |> field("slug", string),
  }

let decodeData = json =>
  Json.Decode.{
    attributes: json |> field("attributes", decodeAttributes(json)),
  }

let decodeJsonData = json =>
  Json.Decode.{
    data: json |> field("data", decodeData)
  } 

let decodeRecord = json => 
  json |> decodeJsonData |> (
    jsonData => jsonData.data.attributes
  )

let apiEndpoint = "https://sk-web-staging.smartkarma.com/api/v2/entities/dbs-group-holdings-ltd";

type action =
  | Loading
  | EntityLoaded(entity)
  | EntityError(string);

type state = {
  entity: webData(option(entity))
};

let fetchEntity = (dispatch) => {
  dispatch(Loading);
  Js.Promise.(
    Fetch.fetchWithInit(
      apiEndpoint,
      Fetch.RequestInit.make(
        ~headers=
          Fetch.HeadersInit.makeWithArray([|
            ("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
            ("API-TOKEN", "8yz1xx6eqxaR69hvtLLhDMuegVPn1g"),
            ("authorization", "Token token='7Uek8JCj49yPDXnZksaE', email='lc@smartkarma.com'"),
          |]),
        ()
      )
    )
    |> then_(Fetch.Response.json)
    |> then_(json => {
        json |> decodeRecord |> (
          (entity) => {
             dispatch(EntityLoaded(entity));
             resolve();
           }
         )
    }
       )
    |> catch((_) =>  {
        dispatch(EntityError("Error fetching the data")) 
        resolve()
    })
  );
  ()
};

let initialState = {entity: RemoteData.NotAsked};

let reducer = (state, action) =>
  switch (action) {
  | Loading =>
    let existingData =
      switch (state.entity) {
      | NotAsked
      | Loading(_)
      | Failure(_) => None
      | Success(s) => s
      };
    {
      ...state,
      entity: RemoteData.Loading(existingData),
    };
  | EntityLoaded(entity) => {...state, entity: RemoteData.Success(Some(entity))}
  | EntityError(err) => {...state, entity: RemoteData.Failure(err)}
  };

[@react.component]
let make = () => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    switch (state.entity) {
    | NotAsked => fetchEntity(dispatch)
    | _ => ()
    }
    None;
  });

  <div
    className="h-screen w-full bg-pink-lightest flex flex-col justify-start items-center overflow-scroll">
    <PriceChart />
    {switch (state.entity) {
     | NotAsked => React.null
     | Failure(e) => <p> {React.string(e)} </p>
     | Loading(entity)
     | Success(entity) =>
       let isLoading = RemoteData.isLoading(state.entity);
       <>
        {
          switch (isLoading) {
          | true => 
            <p className="mt-8 font-mono text-pink text-lg">
              {React.string("Loading...")}
            </p>;
          | false =>
            switch (entity) {
            | None => React.null
            | Some(entity) => 
              <div className="bg-white shadow rounded flex overflow-scroll w-2/5 mb-8 mt-8">
                {React.string(entity.shortName)}
              </div>
            }
          }
        }
       </>;
     }}
  </div>;
};