'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeArrayFloat(fieldName, json) {
  return Json_decode.field(fieldName, (function (param) {
                return Json_decode.array((function (param) {
                              return Json_decode.withDefault(0.0, Json_decode.$$float, param);
                            }), param);
              }), json);
}

function decodeArrayInt(fieldName, json) {
  return Json_decode.field(fieldName, (function (param) {
                return Json_decode.array((function (param) {
                              return Json_decode.withDefault(0, Json_decode.$$int, param);
                            }), param);
              }), json);
}

function decodeArrayString(fieldName, json) {
  return Json_decode.field(fieldName, (function (param) {
                return Json_decode.array((function (param) {
                              return Json_decode.withDefault("", Json_decode.string, param);
                            }), param);
              }), json);
}

function decodePrice(json) {
  return /* record */[
          /* open_ */decodeArrayFloat("open", json),
          /* high */decodeArrayFloat("high", json),
          /* low */decodeArrayFloat("low", json),
          /* close */decodeArrayFloat("close", json),
          /* volume */decodeArrayInt("volume", json),
          /* date */decodeArrayString("time_period", json)
        ];
}

exports.decodeArrayFloat = decodeArrayFloat;
exports.decodeArrayInt = decodeArrayInt;
exports.decodeArrayString = decodeArrayString;
exports.decodePrice = decodePrice;
/* No side effect */
