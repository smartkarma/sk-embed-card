let fetchEntity = (~id) => () => JsonApi.query("entity", id, Entity.decodeRecord);

[@react.component]
let make = (~id) => {
  <>
    <LoadData.Entity fetch=fetchEntity(~id=id)>
      {
        entity => <PriceChart entity=entity />
      }
    </LoadData.Entity> 
  </>;
};