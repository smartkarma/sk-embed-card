'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeString(fieldName, json) {
  return Json_decode.field(fieldName, (function (param) {
                return Json_decode.withDefault("", Json_decode.string, param);
              }), json);
}

function decodeRecord(parentJson, json) {
  return /* record */[
          /* id */decodeString("id", parentJson),
          /* shortName */decodeString("short-name", json),
          /* slug */decodeString("slug", json),
          /* yahooTicker */decodeString("yahoo-ticker", json),
          /* security */decodeString("security", json)
        ];
}

function getShortSecurity(security) {
  var result = security.replace((/\s+/g), " ").match((/([\d-&_A-Z_/]+ [A-Z]{2}) EQUITY/i));
  if (result !== null) {
    return Caml_array.caml_array_get(result, 1);
  } else {
    return security;
  }
}

function getBbgTicker(shortSecurity) {
  return shortSecurity.split(" ").join(":");
}

function shortSecurity(entity) {
  return getShortSecurity(entity[/* security */4]);
}

function bbgTicker(entity) {
  return getBbgTicker(getShortSecurity(entity[/* security */4]));
}

exports.decodeString = decodeString;
exports.decodeRecord = decodeRecord;
exports.getShortSecurity = getShortSecurity;
exports.getBbgTicker = getBbgTicker;
exports.shortSecurity = shortSecurity;
exports.bbgTicker = bbgTicker;
/* No side effect */
