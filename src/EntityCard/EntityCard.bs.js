'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var RemoteData = require("remotedata-re/src/RemoteData.js");
var Entity$ReasonReactExamples = require("../Model/Entity.bs.js");
var JsonApi$ReasonReactExamples = require("../Decode/JsonApi.bs.js");
var PriceChart$ReasonReactExamples = require("../PriceChart/PriceChart.bs.js");

function fetchEntity(id, dispatch) {
  Curry._1(dispatch, /* Loading */0);
  JsonApi$ReasonReactExamples.query("entity", id, Entity$ReasonReactExamples.decodeRecord).then((function (entity) {
            Curry._1(dispatch, /* EntityLoaded */Block.__(0, [entity]));
            return Promise.resolve(/* () */0);
          })).catch((function (param) {
          Curry._1(dispatch, /* EntityError */Block.__(1, ["Error fetching the data"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var initialState = /* record */[/* entity : NotAsked */0];

function reducer(state, action) {
  if (typeof action === "number") {
    return /* record */[/* entity : Loading */Block.__(0, [undefined])];
  } else if (action.tag) {
    return /* record */[/* entity : Failure */Block.__(1, [action[0]])];
  } else {
    return /* record */[/* entity : Success */Block.__(2, [action[0]])];
  }
}

function EntityCard(Props) {
  var id = Props.id;
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = state[/* entity */0];
          if (typeof match === "number") {
            fetchEntity(id, dispatch);
          }
          return ;
        }));
  var match$1 = state[/* entity */0];
  var tmp;
  var exit = 0;
  if (typeof match$1 === "number") {
    tmp = null;
  } else {
    switch (match$1.tag | 0) {
      case /* Failure */1 :
          tmp = React.createElement("p", undefined, match$1[0]);
          break;
      case /* Loading */0 :
      case /* Success */2 :
          exit = 1;
          break;
      
    }
  }
  if (exit === 1) {
    var entity = match$1[0];
    var isLoading = RemoteData.isLoading(state[/* entity */0]);
    tmp = React.createElement(React.Fragment, undefined, isLoading ? React.createElement("p", {
                className: "mt-8 font-mono text-pink text-lg"
              }, "Loading...") : (
            entity !== undefined ? React.createElement("div", {
                    className: "bg-white shadow rounded flex overflow-scroll w-2/5 mb-8 mt-8"
                  }, React.createElement(PriceChart$ReasonReactExamples.make, {
                        entity: entity
                      })) : null
          ));
  }
  return React.createElement("div", {
              className: "h-screen w-full bg-pink-lightest flex flex-col justify-start items-center overflow-scroll"
            }, tmp);
}

var make = EntityCard;

exports.fetchEntity = fetchEntity;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
