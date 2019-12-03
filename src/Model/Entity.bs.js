'use strict';

var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeRecord(parentJson, json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.string, parentJson),
          /* shortName */Json_decode.field("short-name", Json_decode.string, json),
          /* slug */Json_decode.field("slug", Json_decode.string, json),
          /* yahooTicker */Json_decode.field("yahoo-ticker", Json_decode.string, json),
          /* security */Json_decode.field("security", Json_decode.string, json)
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

exports.decodeRecord = decodeRecord;
exports.getShortSecurity = getShortSecurity;
exports.getBbgTicker = getBbgTicker;
exports.shortSecurity = shortSecurity;
exports.bbgTicker = bbgTicker;
/* No side effect */
