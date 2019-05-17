import assert from "power-assert";
import { hello } from "../src/hello";

describe("shuld be hello()", () => {
  const message = "world！";
  it("hello world!", () => {
    assert(hello(message) === "Hello world");
  });
});