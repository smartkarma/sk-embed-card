'use strict';

var Fetch = require("bs-fetch/src/Fetch.js");
var Luxon = require("luxon");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Highstock = require("highcharts/highstock");
var Data = require("highcharts/modules/data");
var Price$ReasonReactExamples = require("../Model/Price.bs.js");
var Entity$ReasonReactExamples = require("../Model/Entity.bs.js");
var LoadData$ReasonReactExamples = require("../LoadData/LoadData.bs.js");
var Exporting = require("highcharts/modules/exporting");

Exporting(Highstock);

Data(Highstock);

function fetchPrice(ticker, startDate, param, param$1) {
  var _startDate = startDate !== undefined ? startDate : Luxon.DateTime.local().minus({
            years: 5
          }).toSQLDate();
  var endpoint = "https://silat-staging.smartkarma.com/v1/chart/" + (ticker + ("?start-time=" + _startDate));
  var token = "Token token=\"7Uek8JCj49yPDXnZksaE\", email=\"lc@smartkarma.com\"";
  return fetch(endpoint, Fetch.RequestInit.make(undefined, /* array */[
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
                return Promise.resolve(Price$ReasonReactExamples.decodePrice(json));
              }));
}

function PriceChart(Props) {
  var entity = Props.entity;
  var yahooTicker = entity[/* yahooTicker */3];
  var bbgTicker = Entity$ReasonReactExamples.bbgTicker(entity);
  var ticker = yahooTicker === "" ? (
      bbgTicker === "" ? "" : bbgTicker
    ) : yahooTicker;
  if (ticker === "") {
    return "Cannot find the ticker";
  } else {
    return React.createElement(React.Fragment, undefined, React.createElement("div", {
                    id: "container"
                  }), React.createElement(LoadData$ReasonReactExamples.Price.make, {
                    fetch: (function (param) {
                        return fetchPrice(ticker, undefined, /* () */0, param);
                      }),
                    children: (function (price) {
                        console.log(price);
                        var ohlc = Belt_Array.mapWithIndex(price[/* date */5], (function (i, date) {
                                return /* record */[
                                        /* date */Luxon.DateTime.fromISO(date).toMillis(),
                                        /* open_ */Caml_array.caml_array_get(price[/* open_ */0], i),
                                        /* high */Caml_array.caml_array_get(price[/* high */1], i),
                                        /* low */Caml_array.caml_array_get(price[/* low */2], i),
                                        /* close */Caml_array.caml_array_get(price[/* close */3], i)
                                      ];
                              }));
                        var option = {
                          title: {
                            text: entity[/* shortName */1]
                          },
                          series: /* array */[{
                              type: "ohlc",
                              id: "ohlc",
                              data: ohlc
                            }]
                        };
                        Highstock.stockChart("container", option);
                        return null;
                      })
                  }));
  }
}

var make = PriceChart;

exports.fetchPrice = fetchPrice;
exports.make = make;
/*  Not a pure module */
