'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Fetch = require("bs-fetch/src/Fetch.js");
var Pluralize = require("pluralize");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeData(decodeRecord, json) {
  return /* record */[/* attributes */Json_decode.field("attributes", Curry._1(decodeRecord, json), json)];
}

function decodeJsonData(decodeRecord, json) {
  return /* record */[/* data */Json_decode.field("data", (function (param) {
                  return decodeData(decodeRecord, param);
                }), json)];
}

function query(modelName, id, decodeRecord) {
  var endpoint = "https://sk-web-build.smartkarma.com/api/v2/" + (Pluralize(modelName) + ("/" + id));
  return fetch(endpoint, Fetch.RequestInit.make(undefined, /* array */[
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
                          "Token token=\"7Uek8JCj49yPDXnZksaE\", email=\"lc@smartkarma.com\""
                        ]
                      ], undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)(/* () */0)).then((function (prim) {
                  return prim.json();
                })).then((function (json) {
                var jsonData = decodeJsonData(decodeRecord, json);
                return Promise.resolve(jsonData[/* data */0][/* attributes */0]);
              }));
}

exports.decodeData = decodeData;
exports.decodeJsonData = decodeJsonData;
exports.query = query;
/* pluralize Not a pure module */
