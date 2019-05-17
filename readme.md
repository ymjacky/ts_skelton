
visualstudiocode で Typescriptの開発
## 環境導入

### [gibo](https://github.com/simonwhitaker/gibo)

.gitignore 生成ツール

**install**

mac
```
brew install gibo
```

使い方
```
gibo dump macos linux windows node > .gitignore
```


### vscode extension

```
[tslint]
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
[mocha sidebar] vscodeにtestウィンドウ用意
code --install-extension maty.vscode-mocha-sidebar

[EditorConfig] フォーマットをeditorを越えて統一させるツール
code --install-extension EditorConfig.EditorConfig
```

.editorconfig
```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_size = 2
indent_style = space
trim_trailing_whitespace = true

[Makefile]
indent_size = 4
indent_style = tab

[*.{md,markdown}]
insert_final_newline = false
trim_trailing_whitespace = false

[*.json]
insert_final_newline = false
```

### npm パッケージ

```
npm install -D typescript @types/node

npm i -D ts-node tslint
npm i -D espower-typescript power-assert @types/power-assert mocha @types/mocha
```

### mocha sidebar設定
vscode mocha-sidebar様に、次の設定を入れておく。

````
{
    "mocha.files.glob": "test/*.ts",
    "mocha.requires": ["ts-node/register"]
}
````


### ディレクトリ作成

プロジェクトトップに次のディレクトリを作る。

- src
- test

### tsconfig.json

tscのコンパイル設定

まずファイルを次のコマンドで生成し、その後編集する。

```
npx tsc --init
```
(npxはnode5.2.0でバンドルされた、ローカルパッケージ実行ツール)


次のような感じに。[参考](http://neos21.hatenablog.com/entry/2017/10/24/080000)

```
{
    "compilerOptions": {
        // 出力する ECMAScript のバージョンを指定する
        "target": "es5",
        //moduleの方式
        "module": "commonjs",
        // 出力先ディレクトリの指定
        "outDir": "./dist",
        "strict": true,
        "sourceMap": true,
        "esModuleInterop": true
    },
    "include": [
        "src/**/*.ts",
        "test/**/*.ts"
    ]
}
```


## プログラム実行


### src に hello.ts を作成

```ts
"use strict";

export function hello(message: string) {
  console.log("Hello " + message);
  return `Hello ${message}`;
}

if (require.main === module) {
  hello("world");
}
```



### mocha テスト

test ディレクトリに、hello.test.ts ファイルという名前でテストコードを作成する。  
(意図的にエラーになるように作っている))

```ts
import assert from "power-assert";
import { hello } from "../src/hello";

describe("shuld be hello()", () => {
  const message = "world！";
  it("hello world!", () => {
    assert(hello(message) === "Hello world");
  });
});
```



### デバッグ

launch.json を.vscode の中に用意し、デバッグウィンドウから実行すればよい。

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "ts-node[debug]",
      "program": "${workspaceFolder}/node_modules/ts-node/dist/bin.js",
      "args": ["${relativeFile}"],
      "console": "integratedTerminal"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "mocha[debug]",
      "program": "${workspaceFolder}/node_modules/mocha/bin/_mocha",
      "args": [
        "--no-timeouts",
        "--colors",
        "--require",
        "espower-typescript/guess",
        "${relativeFile}"
      ],
      "console": "integratedTerminal"
    }
  ]
}
```