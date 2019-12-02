'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

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

exports.decodePrice = decodePrice;
/* No side effect */
