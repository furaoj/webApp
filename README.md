
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
  
  Visual Studio Codeの整形ツールをおすすめ 
  
  ES7+ React/Redux/React-Native snippets
   
  Automatically format code in Visual Studio Code when working with JavaScript and React with Prettier
   
  Search for “format on save” setting and check the checkbox.

* 必要なライブラリ（npm installでインストール）
  
  API接続用：axios
 
  画面表示用：react-bootstrap
 
  画面遷移用：react-router-dom
  
  結合テスト用：playwright（インストールコマンド：npm init playwright@latest）
  
  
# バックエンド開発環境構築
* pythonのインストール
  
  https://www.python.jp/install/windows/install.html
  
  インストール後コマンドプロンプトにてpythonで確認
  
* 仮想環境作り
  
  フロントエンドのフォルダと同じ階層に下記コマンドで実行
  
  python -m venv back
  
* 仮想環境起動（ここからはVisual Studio Codeのターミナルで実施）

  backフォルダに移動して、下記コマンドで実行
  
  [開発フォルダの場所]\back\Scripts\activate
  
* 必要なライブラリインストール

  一括インストールの場合、サンプルのrequirements.txtを使用
  
  pip install requirements.txt
  
  個別インストールの場合、pip install [ライブラリ名]
  
* バックエンド起動

  uvicorn main:app --reload
  
  下記の状態であれば、OK
  
  <img width="507" alt="image" src="https://user-images.githubusercontent.com/113239293/192133453-b804a1e3-1cb9-479f-9990-5ce10060715f.png">

  
  
