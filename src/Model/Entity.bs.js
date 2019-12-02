'use strict';

var Json_decode = require("@glennsl/bs-json/src/Json_decode.bs.js");

function decodeRecord(parentJson, json) {
  return /* record */[
          /* id */Json_decode.field("id", Json_decode.string, parentJson),
          /* shortName */Json_decode.field("short-name", Json_decode.string, json),
          /* slug */Json_decode.field("slug", Json_decode.string, json)
        ];
}

exports.decodeRecord = decodeRecord;
/* No side effect */
