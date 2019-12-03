open Jest;

describe("Entity", () =>
  Expect.(
    test("get short security", () => {
      let security = "AAPL US EQUITY";
      let shortSecurity = Entity.getShortSecurity(security);
      expect(shortSecurity) |> toEqual("AAPL US");
    })
  )
);