'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var React = require("react");
var Highcharts = require("highcharts");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Exporting = require("highcharts/modules/exporting");

Exporting(Highcharts);

var option = {
  chart: {
    type: "bar"
  },
  series: /* array */[
    {
      name: "Jane",
      data: /* array */[
        1,
        0,
        4
      ]
    },
    {
      name: "Jone",
      data: /* array */[
        5,
        7,
        3
      ]
    }
  ],
  title: {
    text: "Fruit Consumption"
  },
  xAxis: {
    categories: /* array */[
      "Apples",
      "Bananas",
      "Oranges"
    ]
  },
  yAxis: {
    title: {
      text: "Fruit eaten"
    }
  }
};

function decodePrice(json) {
  return /* record */[/* close */Json_decode.field("close", (function (param) {
                  return Json_decode.array(Json_decode.$$float, param);
                }), json)];
}

var priceEndpoint = "https://silat-staging.smartkarma.com/v1/chart/D05.SI?start-time=2018-11-28";

var token = "Token token=\"eQeRBgUUJ3CVtuRAK99R\", email=\"echeng@glgroup.com\"";

function fetchPrice(dispatch) {
  Curry._1(dispatch, /* Loading */0);
  fetch(priceEndpoint, Fetch.RequestInit.make(undefined, /* array */[
                    /* tuple */[
                      "authorization",
                      token
                    ],
                    /* tuple */[
                      "x-sk-authorization",
                      token
                    ]
                  ], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
              return prim.json();
            })).then((function (json) {
            var price = decodePrice(json);
            console.log(price);
            Curry._1(dispatch, /* PriceLoaded */Block.__(0, [price]));
            return Promise.resolve(/* () */0);
          })).catch((function (param) {
          Curry._1(dispatch, /* PriceError */Block.__(1, ["Error fetching the data"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var initialState = /* record */[/* price : NotAsked */0];

function reducer(state, action) {
  if (typeof action === "number") {
    return /* record */[/* price : Loading */Block.__(0, [undefined])];
  } else if (action.tag) {
    return /* record */[/* price : Failure */Block.__(1, [action[0]])];
  } else {
    return /* record */[/* price : Success */Block.__(2, [action[0]])];
  }
}

function PriceChart(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          Highcharts.chart("container", option);
          var match = state[/* price */0];
          if (typeof match === "number") {
            fetchPrice(dispatch);
          }
          return ;
        }));
  return React.createElement("div", undefined, React.createElement("div", {
                  id: "container"
                }, "Main"));
}

var make = PriceChart;

exports.option = option;
exports.decodePrice = decodePrice;
exports.priceEndpoint = priceEndpoint;
exports.token = token;
exports.fetchPrice = fetchPrice;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/*  Not a pure module */
