# 時間差レコード v0.4.0（プロトタイプ）

## ファイル
- index.html … 画面
- game.js … ゲーム本体
- bgm.mp3 … BGM
- firebase-config.js … Firebase の設定（ここだけ書きかえる）
- firestore.rules … Firestore のルール（Firebase コンソールに貼る）

## 1. Firebase（データの置き場）
1. https://console.firebase.google.com で「プロジェクトを追加」（Google アナリティクスはオフでOK）
2. 左メニュー「構築 → Firestore Database」→「データベースを作成」
   - ロケーション：asia-northeast1（東京）
   - 「本番環境モード」で作成
3. Firestore の「ルール」タブに firestore.rules の中身を貼って「公開」
4. 歯車 →「プロジェクトの設定」→ 下の「マイアプリ」で「</>（ウェブ）」を追加
   - Hosting はチェック不要
   - 表示される firebaseConfig の中身を firebase-config.js に貼る

※ Storage は使いません。無料の Spark プランのままで動きます（カード登録不要）。

## 2. GitHub Pages（公開）
1. GitHub で新しいリポジトリを作る（Public）
2. このフォルダの中身を全部アップロード（Add file → Upload files）
3. Settings → Pages → Branch を main / (root) にして Save
4. 1〜2分で https://ユーザー名.github.io/リポジトリ名/ が開けるようになる

## 3. 遊び方
- 録音する：呼び名を入れて「はじめる」→ 最初の電話を録音 → 好きな場所に隠す → 「さいごの でんわを かくす」で終了 → コードが出る
- レコードを聞く：コードを入れて「きく」
- 「マイクなしで テスト」で、保存と読みこみの確認ができる
