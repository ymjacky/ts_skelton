"use strict";

export function hello(message: string) {
  console.log("Hello " + message);
  return `Hello ${message}`;
}

if (require.main === module) {
  hello("world");
}