'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var React = require("react");
var RemoteData = require("remotedata-re/src/RemoteData.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeAttributes(parentJson, json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.string, parentJson),
          /* shortName */Json_decode.field("short-name", Json_decode.string, json),
          /* slug */Json_decode.field("slug", Json_decode.string, json)
        ];
}

function decodeData(json) {
  return /* record */[/* attributes */Json_decode.field("attributes", (function (param) {
                  return decodeAttributes(json, param);
                }), json)];
}

function decodeJsonData(json) {
  return /* record */[/* data */Json_decode.field("data", decodeData, json)];
}

function decodeRecord(json) {
  var jsonData = decodeJsonData(json);
  return jsonData[/* data */0][/* attributes */0];
}

var apiEndpoint = "https://sk-web-staging.smartkarma.com/api/v2/entities/dbs-group-holdings-ltd";

function fetchEntity(dispatch) {
  Curry._1(dispatch, /* Loading */0);
  fetch(apiEndpoint, Fetch.RequestInit.make(undefined, /* array */[
                    /* tuple */[
                      "Content-Type",
                      "application/x-www-form-urlencoded; charset=UTF-8"
                    ],
                    /* tuple */[
                      "API-TOKEN",
                      "8yz1xx6eqxaR69hvtLLhDMuegVPn1g"
                    ],
                    /* tuple */[
                      "authorization",
                      "Token token='7Uek8JCj49yPDXnZksaE', email='lc@smartkarma.com'"
                    ]
                  ], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
              return prim.json();
            })).then((function (json) {
            var entity = decodeRecord(json);
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
    var match = state[/* entity */0];
    var existingData;
    existingData = typeof match === "number" || match.tag !== /* Success */2 ? undefined : match[0];
    return /* record */[/* entity : Loading */Block.__(0, [existingData])];
  } else if (action.tag) {
    return /* record */[/* entity : Failure */Block.__(1, [action[0]])];
  } else {
    return /* record */[/* entity : Success */Block.__(2, [action[0]])];
  }
}

function EntityCard(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = state[/* entity */0];
          if (typeof match === "number") {
            fetchEntity(dispatch);
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
                  }, entity[/* shortName */1]) : null
          ));
  }
  return React.createElement("div", {
              className: "h-screen w-full bg-pink-lightest flex flex-col justify-start items-center overflow-scroll"
            }, tmp);
}

var make = EntityCard;

exports.decodeAttributes = decodeAttributes;
exports.decodeData = decodeData;
exports.decodeJsonData = decodeJsonData;
exports.decodeRecord = decodeRecord;
exports.apiEndpoint = apiEndpoint;
exports.fetchEntity = fetchEntity;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
