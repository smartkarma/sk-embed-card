type webData('a) = RemoteData.t('a, 'a, string);

type entity = Entity.t;

type action =
  | Loading
  | EntityLoaded(entity)
  | EntityError(string);

type state = {
  entity: webData(option(entity))
};

let fetchEntity = (~id, ~dispatch) => {
  dispatch(Loading);

  Js.Promise.(
    JsonApi.query("entity", id, Entity.decodeRecord)
    |> then_(entity => {
      dispatch(EntityLoaded(entity))
      resolve()
    })
    |> catch((_) =>  {
      dispatch(EntityError("Error fetching the data")) ;
      resolve();
    })
  )
  |> ignore;
  
};

let initialState = {entity: RemoteData.NotAsked};

let reducer = (state, action) =>
  switch (action) {
  | Loading =>
    { ...state, entity: RemoteData.Loading(None) };
  | EntityLoaded(entity) => {...state, entity: RemoteData.Success(Some(entity))}
  | EntityError(err) => {...state, entity: RemoteData.Failure(err)}
  };

[@react.component]
let make = (~id) => {
  let (state, dispatch) = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    switch (state.entity) {
    | NotAsked => fetchEntity(~id=id, ~dispatch=dispatch)
    | _ => ()
    }
    None;
  });

  <div
    className="h-screen w-full bg-pink-lightest flex flex-col justify-start items-center overflow-scroll">
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
                <PriceChart entity=entity/>
              </div>
            }
          }
        }
       </>;
     }}
  </div>;
};