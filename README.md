
# フロントエンド開発環境構築
* Node.jsのインストール

  目的：reactプロジェクト作成時にnpm(npx)が必要なため

  https://nodejs.org/ja/download/
  
  から自分のPCのOSにあったインストーラーを選択する。
  
  インストールし終わったら、コマンドプロンプトで下記コマンドで確認
  
  node
  
* reactプロジェクト作成
  
  自分のPCに任意のフォルダ作成し、cdコマンドで移動する
  
  下記コマンドでreactプロジェクト作成(※すこし時間がかかる)
   
  npx create-react-app front

* reactプロジェクト起動

  cd frontコマンドでfrontフォルダに移動する
  
  code .コマンドでVisual Studio Codeを立ち上げて、メニューバーの「ターミナル」で新規ターミナルを開く
  
  下記コマンドでfrontプロジェクトを起動する
  
  npm run start
 
  <img width="797" alt="image" src="https://user-images.githubusercontent.com/113239293/189515338-c5e40b85-a380-44a2-8df2-264e72b585c0.png">
 
  Chromeの下記画面がでればOK
  
  <img width="948" alt="image" src="https://user-images.githubusercontent.com/113239293/189515465-edae02c1-7097-4e61-904f-2e72c2b3a555.png">
  
* 補足

　Visual Studio Codeの下記整形ツールをおすすめ
 
  ES7+ React/Redux/React-Native snippets
  
  Automatically format code in Visual Studio Code when working with JavaScript and React with Prettier
  
  Search for “format on save” setting and check the checkbox.

