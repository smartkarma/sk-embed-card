module Styles = {
  open Css;

  let container = style([
    fontSize(px(Theme.fontSize18)),
    backgroundColor(white),
    borderRadius(px(5)),
    boxShadow(Shadow.box(~y=px(1), ~blur=px(2), Theme.inactiveGrayShade)),
    fontFamily(Theme.sanSerif),
    margin(px(Theme.contentPadding)),
  ]);

  let head = style([
    fontSize(px(Theme.fontSize24)),
    padding(px(Theme.contentPadding)),
    fontWeight(`num(500)),
  ]);

  let body = style([
    padding(px(Theme.contentPadding)),
  ]);
};

[@bs.val] external document: Js.t({..}) = "document";
let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= Theme.global;


let fetchEntity = (~id) => () => JsonApi.query("entity", id, Entity.decodeRecord);

[@react.component]
let make = (~id) => {
  <div className=Styles.container>
    <LoadData.Entity fetch=fetchEntity(~id=id)>
      {
        (entity: Entity.t) => {
          <>
            <h1 className=Styles.head>
              {React.string(entity.shortName)}
            </h1> 
            <div className=Styles.body>
              <PriceChart entity=entity />
            </div>
          </>
        }
      }
    </LoadData.Entity> 
  </div>;
};