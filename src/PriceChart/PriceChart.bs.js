'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var Luxon = require("luxon");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Highstock = require("highcharts/highstock");
var Data = require("highcharts/modules/data");
var Exporting = require("highcharts/modules/exporting");

Exporting(Highstock);

Data(Highstock);

function decodePrice(json) {
  return /* record */[
          /* open_ */Json_decode.field("open", (function (param) {
                  return Json_decode.array(Json_decode.$$float, param);
                }), json),
          /* high */Json_decode.field("high", (function (param) {
                  return Json_decode.array(Json_decode.$$float, param);
                }), json),
          /* low */Json_decode.field("low", (function (param) {
                  return Json_decode.array(Json_decode.$$float, param);
                }), json),
          /* close */Json_decode.field("close", (function (param) {
                  return Json_decode.array(Json_decode.$$float, param);
                }), json),
          /* volume */Json_decode.field("volume", (function (param) {
                  return Json_decode.array(Json_decode.$$int, param);
                }), json),
          /* date */Json_decode.field("time_period", (function (param) {
                  return Json_decode.array(Json_decode.string, param);
                }), json)
        ];
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
            Curry._1(dispatch, /* PriceLoaded */Block.__(0, [price]));
            return Promise.resolve(/* () */0);
          })).catch((function (param) {
          Curry._1(dispatch, /* PriceError */Block.__(1, ["Error fetching the data"]));
          return Promise.resolve(/* () */0);
        }));
  return /* () */0;
}

var initialState = /* record */[
  /* price : NotAsked */0,
  /* isChartRendered : record */[/* contents */false]
];

function reducer(state, action) {
  if (typeof action === "number") {
    return /* record */[
            /* price : Loading */Block.__(0, [undefined]),
            /* isChartRendered */state[/* isChartRendered */1]
          ];
  } else if (action.tag) {
    return /* record */[
            /* price : Failure */Block.__(1, [action[0]]),
            /* isChartRendered */state[/* isChartRendered */1]
          ];
  } else {
    return /* record */[
            /* price : Success */Block.__(2, [action[0]]),
            /* isChartRendered */state[/* isChartRendered */1]
          ];
  }
}

function PriceChart(Props) {
  var match = React.useReducer(reducer, initialState);
  var dispatch = match[1];
  var state = match[0];
  React.useEffect((function () {
          var match = state[/* price */0];
          if (typeof match === "number") {
            fetchPrice(dispatch);
          } else {
            switch (match.tag | 0) {
              case /* Loading */0 :
              case /* Failure */1 :
                  break;
              case /* Success */2 :
                  var somePrice = match[0];
                  if (somePrice !== undefined && !state[/* isChartRendered */1][0]) {
                    var price = somePrice;
                    state[/* isChartRendered */1][0] = true;
                    var ohlc = Belt_Array.mapWithIndex(price[/* date */5], (function (i, date) {
                            return /* record */[
                                    /* date */Luxon.DateTime.fromISO(date).toMillis(),
                                    /* open_ */Caml_array.caml_array_get(price[/* open_ */0], i),
                                    /* high */Caml_array.caml_array_get(price[/* high */1], i),
                                    /* low */Caml_array.caml_array_get(price[/* low */2], i),
                                    /* close */Caml_array.caml_array_get(price[/* close */3], i)
                                  ];
                          }));
                    console.log(ohlc);
                    var option = {
                      title: {
                        text: "Fruit Consumption"
                      },
                      series: /* array */[{
                          type: "ohlc",
                          id: "ohlc",
                          data: ohlc
                        }]
                    };
                    Highstock.stockChart("container", option);
                  }
                  break;
              
            }
          }
          return ;
        }));
  return React.createElement("div", undefined, React.createElement("div", {
                  id: "container"
                }, "Main"));
}

var make = PriceChart;

exports.decodePrice = decodePrice;
exports.priceEndpoint = priceEndpoint;
exports.token = token;
exports.fetchPrice = fetchPrice;
exports.initialState = initialState;
exports.reducer = reducer;
exports.make = make;
/*  Not a pure module */
