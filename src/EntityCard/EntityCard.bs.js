'use strict';

var Css = require("bs-css/src/Css.js");
var React = require("react");
var Theme$ReasonReactExamples = require("../Styles/Theme.bs.js");
var Entity$ReasonReactExamples = require("../Model/Entity.bs.js");
var JsonApi$ReasonReactExamples = require("../Decode/JsonApi.bs.js");
var LoadData$ReasonReactExamples = require("../LoadData/LoadData.bs.js");
var PriceChart$ReasonReactExamples = require("../PriceChart/PriceChart.bs.js");

var container = Css.style(/* :: */[
      Css.fontSize(Css.px(Theme$ReasonReactExamples.fontSize18)),
      /* :: */[
        Css.backgroundColor(Css.white),
        /* :: */[
          Css.borderRadius(Css.px(5)),
          /* :: */[
            Css.boxShadow(Css.Shadow.box(undefined, Css.px(3), Css.px(5), undefined, undefined, Css.rgba(0, 0, 0, 0.3))),
            /* :: */[
              Css.fontFamily(Theme$ReasonReactExamples.sanSerif),
              /* [] */0
            ]
          ]
        ]
      ]
    ]);

var head = Css.style(/* :: */[
      Css.fontSize(Css.px(Theme$ReasonReactExamples.fontSize24)),
      /* :: */[
        Css.padding(Css.px(Theme$ReasonReactExamples.contentPadding)),
        /* :: */[
          Css.fontWeight(/* `num */[
                5496390,
                500
              ]),
          /* [] */0
        ]
      ]
    ]);

var body = Css.style(/* :: */[
      Css.padding(Css.px(Theme$ReasonReactExamples.contentPadding)),
      /* [] */0
    ]);

var Styles = {
  container: container,
  head: head,
  body: body
};

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = Theme$ReasonReactExamples.$$global;

function fetchEntity(id, param) {
  return JsonApi$ReasonReactExamples.query("entity", id, Entity$ReasonReactExamples.decodeRecord);
}

function EntityCard(Props) {
  var id = Props.id;
  return React.createElement("div", {
              className: container
            }, React.createElement(LoadData$ReasonReactExamples.Entity.make, {
                  fetch: (function (param) {
                      return JsonApi$ReasonReactExamples.query("entity", id, Entity$ReasonReactExamples.decodeRecord);
                    }),
                  children: (function (entity) {
                      return React.createElement(React.Fragment, undefined, React.createElement("h1", {
                                      className: head
                                    }, entity[/* shortName */1]), React.createElement("div", {
                                      className: body
                                    }, React.createElement(PriceChart$ReasonReactExamples.make, {
                                          entity: entity
                                        })));
                    })
                }));
}

var make = EntityCard;

exports.Styles = Styles;
exports.style = style;
exports.fetchEntity = fetchEntity;
exports.make = make;
/* container Not a pure module */
