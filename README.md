
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
  
  API接続用：axios(0.21.0)※最新版はjestつかえないため
 
  画面表示用：react-bootstrap（react環境でbootstrapを使うためのライブラリ※bootstrapもインストール必要）
 
  画面遷移用：react-router-dom
  
  結合テスト用：playwright（インストールコマンド：npm init playwright@latest）※対話形式必要なためinitを使用
  
      インストール後、reactプロジェクトにあるpackage.jsonのscriptsセクションに下記を追記
    
      "test:e2e": "playwright test"
    
      結合テストの起動コマンド：npm run test:e2e
    
      補足：単体テストの起動コマンド：npm run test
  
  ビルド関連：
  
      ビルドコマンド：npm run build
  
      ビルド成果物確認用コマンド：serve -s build
  
  HTTPサーバ（apache）配置関連：
  
      apache起動コマンド：C:\Apache24\bin\httpd.exe
  
      ビルド成果物をapacheのソースフォルダにコピー：C:\Apache24\htdocs
      
      apache成果物確認：http://localhost/
  
  
# バックエンド開発環境構築
* pythonのインストール（最新の3.10を推奨）
  
  https://www.python.jp/install/windows/install.html
  
  インストール後コマンドプロンプトにてpythonで確認
  
  ※Microsoft Storeからもダウンロード可能
  
* 仮想環境作り
  
  フロントエンドのフォルダと同じ階層に下記コマンドで実行
  
  python -m venv back
  
* 仮想環境起動（ここからはVisual Studio Codeのターミナルで実施）

  backフォルダに移動して、下記コマンドで実行
  
  [開発フォルダの場所]\back\Scripts\activate
  
* 必要なライブラリインストール

  下記コマンドで一括インストール（サンプルのrequirements.txtを使用）
  
  pip install -r requirements.txt
  
  ※ちなみに、個別インストールの場合、pip install [ライブラリ名]
  
  requirements.txtの出力コマンド
  
  pip freeze > requirements.txt
  
* バックエンド起動

  uvicorn main:app --reload
  
  下記の状態であれば、OK
  
  <img width="507" alt="image" src="https://user-images.githubusercontent.com/113239293/192133453-b804a1e3-1cb9-479f-9990-5ce10060715f.png">
  
* 単体テスト

  python -m unittest discover -v
  
* DBインストール

  https://www.postgresql.org/download/
  
  ※GUI操作用のpgAdminも同梱されているのて、一緒にインストール
  
  データベース下記情報で作成
  
  dsn = "dbname=stock host=localhost user=postgres password=1234"
  
  データインポートコマンド
  
  python -c "import batch.importData as bat; bat.importData()"
 
* 株価予測画像出力のため

  下記ファイル
  
  \back\Lib\site-packages\sktime\utils\plotting.py
  
  の128行目に下記を追加
  
  fig.savefig("files/" + x_label + ".png")

  
  
