import assert from "power-assert";
import { HelloCb } from "../src/helloCallback";
import { MyCallback } from "../src/helloCallback";

describe("shuld be hello()", () => {
  it("hello world", () => {
      let num = 1;
      const cb:MyCallback = (xx:string)=>{num = 2;return xx;};
      const obj = new HelloCb(cb);
      assert(obj.exe("Hello") === "Hello world");
      assert(num === 2);
  });
  it("callback world", () => {
    // MyCallback インターフェースを使わなくても、シグネチャーが揃っていればOK
    const obj = new HelloCb((xx)=>{return xx});
    assert(obj.exe("Callback") === "Callback world");
  });
});