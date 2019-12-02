module type BaseDataType = {
  type t;
};

module MakeLoadData = (DataType: BaseDataType) => {
  type t = DataType.t;

  type remoteData('a) = RemoteData.t('a, 'a, string);

  type action =
    | Loading
    | DataLoaded(t)
    | DataError(string);

  type state = {
    data: remoteData(option(t))
  };

  let fetchData = (~fetch, ~dispatch) => {
    dispatch(Loading);

    Js.Promise.(
      fetch()
      |> then_(data => {
        dispatch(DataLoaded(data))
        resolve()
      })
      |> catch((_) =>  {
        dispatch(DataError("Error fetching the data")) ;
        resolve();
      })
    )
    |> ignore;
    
  };

  let initialState = {data: RemoteData.NotAsked};

  let reducer = (state, action) =>
    switch (action) {
    | Loading =>
      { data: RemoteData.Loading(None) };
    | DataLoaded(data) => { data: RemoteData.Success(Some(data))}
    | DataError(err) => { data: RemoteData.Failure(err)}
    };

  [@react.component]
  let make = (~fetch, ~children) => {
    let (state, dispatch) = React.useReducer(reducer, initialState);

    React.useEffect(() => {
      switch (state.data) {
      | NotAsked => fetchData(~fetch=fetch, ~dispatch=dispatch)
      | _ => ()
      }
      None;
    });

    <>
      {switch (state.data) {
       | NotAsked => React.null
       | Failure(e) => <> {React.string(e)} </>
       | Loading(data)
       | Success(data) =>
         let isLoading = RemoteData.isLoading(state.data);
         <>
          {
            if (isLoading) {
              <>
                {React.string("Loading...")}
              </>
            } else {
              switch (data) {
              | None => React.null
              | Some(data) => children(data)
              }
            }
          }
         </>;
       }}
    </>;
  };
};

module EntityDataType = {
  type t = Entity.t; 
};
module Entity = MakeLoadData(EntityDataType);

module PriceDataType = {
  type t = Price.t;
};
module Price = MakeLoadData(PriceDataType);

