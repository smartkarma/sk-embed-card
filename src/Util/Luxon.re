type dt;
[@bs.module "luxon"] [@bs.scope "DateTime"] external local: unit => dt = "local";
[@bs.module "luxon"] [@bs.scope "DateTime"] external fromISO: string => dt = "fromISO";

[@bs.send] external toMillis: dt => int = "toMillis";
[@bs.send] external toSQLDate: dt => string = "toSQLDate";

[@bs.deriving abstract]
type durationObj = {
  [@bs.optional] weeks: int,
  [@bs.optional] months: int,
  [@bs.optional] years: int,
};

[@bs.send] external minusObj: (dt, durationObj) => dt = "minus";
