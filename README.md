# covid19 easy checker (ja)

日本国内向けに作られた jquery によるコロナ簡易診断ツールです

- 医療ひっ迫防止のため、コロナ陽性でも軽症相当であれば受診をおすすめしない
- 本当に受診が必要か？
- 救急搬送が必要か？
- 健康な30歳女性血液型O型（飲酒喫煙妊娠なし）と比較した、おおむねの重症化率を表示（データ不足により一部不完全、計算はただの掛け算なのでいいかげん）
- シンプルにHTML+CSS+JavaScript(jquery)で書かれているので、サーバーにそんなに負荷をかけない。画面はすべてjqueryで描画する。
- Wordpressにも対応 たぶんあなたのWordpressサイトにうまい具合にはめ込みできます。

の機能があります。

変更禁止部分以外はGPL3として自由に書き換えて使用できますが、以下の条件はお守りください

- このツールにてcookie、ローカルストレージに保管しない（サーバーが必要とするセッション等を除く）
- サーバーにアクセスログ以外のものを保管してはならない。
- フォームの内容をsubmitイベントやGETパラメータ等で送信してはならない（代わりに全jqueryで完結します）

詳しいことはソースに記載してありますので、コメントをご確認下さい。

# 簡単な無断転載の方法
- 一度だけ サーバー上のシェルで以下を実行します
- git clone https://github.com/nanakochi123456/covid19-checker.git
- .htaccess に DirectoryIndex covid19.html を記載します
- crontabでgit pull、cp をします。高頻度で更新しているので1～2時間毎が最適。
- 必ず HTML内に<section class="covid19"></section>、<footer></footer>が記載されている状態にしてください。

# Wordpressでの無断転載方法
- Wordpressのサイトヘッダー、サイトフッターが有効になります。
- Wordpressのルートのディレクトリで一度だけ以下を実行します
- git clone https://github.com/nanakochi123456/covid19-checker.git
- Wordpressのテーマディレクトリに wordpress/page-covid19-checker.php にある内容を転送します。
- 固定ページで「新型コロナウイルス受診ナビ」という名称のページを作成します。
- パーマリンクを「covid19」とします https://hogehoge/covid19 として公開されます。
- 記事は空欄のままとします。
- テンプレートで coivd19-checker を選択します。
- SEOプラグイン類が導入されている場合、サイトの説明を記載します。
- どの方法でも良いので、jquery を includeされた状態にします。
- Wordpressのルート/coivd19-checker のディレクトリで crontabでgit pull をします。高頻度で更新しているので1～2時間毎が最適。

# 以下につきましてはいい加減な実装となっています。

- 基礎疾患の症状別の重症化率は、どの年齢でも65歳以上、もしくは50歳以上に固定されている。
- なんか存在しうる悪条件がそろいすぎると重症率が80万倍とかそういう卑劣な結果もでてしまう。正しいと勝手に思った個別の重症率を引っ張ってきたのですが。

# 世界一いい加減な仕様書

- まずは受診しないことを前提
- そこから、受診、救急、それぞれに0点を与え、なにかあれば1点加算され、1点以上になったら、受診、もしくは、救急になり、救急は優先される
- 65歳以上、妊婦、BMI30以上は受診
- これは特にすすめらてないが10代未満もRSウイルスのこともあるので念のため受診にしてある
- 体温は37.5℃とは明言してない（低平熱対応）平熱+1℃で代替
- 極度な体温なら救急（41.0℃超え）
- 発熱して4日以上たったら受診
- 抗原検査キットの結果は、不明等だけ要受診にしてある（陽性、陰性の入力は実は関係ない）
- ↑理由としては抗原検査キットの使い方が難しいって声もあるためPCRさせたほうが手っ取り早い
- 現在の症状は「口が紫になってる」から下がすべて救急、それ以外は受診不要
- 基礎疾患は精神、知的、その他を除きすべて要受診
- 重症化率の増加は
- 妊婦、年齢、血液型、BMI30以上、喫煙、飲酒、基礎疾患の一部（一部は統計データがないため増加されない）
- 10歳未満と65歳～69歳の重症化率は推定
- 飲酒の重症化率は実データから推定したもの
- 重症化率はいいかげんな計算だが、重症化率にそれぞれの掛け数が設定してあり、すべて掛け算で算出する
- この基礎疾患には重症化率がデータ不足で設定されていない。手術後1か月以内、慢性の肝臓病、血液の病気、免疫の異常に伴う神経疾患や神経筋疾患、神経疾患や神経筋疾患が原因で身体の機能が衰えた状態、染色体異常、重症心身障害、睡眠時無呼吸症候群
- 基礎疾患による重症化率は手抜きで一律高齢者(65～、50代）の数値で計算してる
- 10代以下カロナール（ネットでも本物のカロナールはヒットしにくいので代替商品がメイン）、20代以上はロキソかイブ
- 40代以上 or 重症率20倍以上 酸素飽和度（50代以上だが落としてある）

# CSSやJavaScriptのキャッシュにつきまして

- HTMLではビルド番号で更新時キャッシュがきかないようにしてあります。
- Wordpressではタイムスタンプによりキャッシュがきかないようにしてあります。

# その他

- CSSにつきましては無制限に自由に書き換えて構いません
- ビルドにはWSL2（なくても動く）、make、perl、sassコンパイラ、yuicompressor、uglifyjsが必要です。環境にあわせて Makefileを書き換える必要があります。
- 同梱しているのは下記のとおりです
-- sanitize https://github.com/csstools/sanitize.css
-- JS Packer for perl https://www.elr.com.au
- 拡張子 sjs は js にリネームすればそのまま動きます。
- これと全く同じものが動いてるのは→ https://neet.co.jp/covid19/ Wordpressで動いています
- noteの記事にもしました。 https://note.com/nano773/n/n5cded6a197dd

# アフィリエイトにつきまして
- そのままにしていただければ作者が泣いて喜びます
- しかし、ほぼ同じ内容の検索結果になるのであれば、任意に書き換えて収益にして頂いて構いません。紹介するショッピングモールについては差異があっても構いません。

# ライセンス
- とりあえず GPL3 https://www.gnu.org/licenses/gpl-3.0.ja.html

# お問い合わせ

- https://blog.neet.co.jp/contact/ こちらよりお願いします。
- 利用承諾に関してのお問い合わせについては返答致しませんが、ご利用報告をしていただければ作者が号泣して喜びます。

by @nanakochi123456 なのたん (C)NEET co.,ltd.
