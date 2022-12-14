// アフィリエイト可能な薬、アイテム等
// できる限り、売り切れになりにくいようにするため、特定1アイテムではなく、商品リストページの検索ヒットページを掲載するのが望ましいです

// ここでは「新型コロナウイルスを治す薬」は紹介してはなりません。
// 上記の薬は医師処方のもとでのみ投薬できるものです。
// ここでは新型コロナウイルスの症状のうち、発熱を対処する薬のみ記載してあります。

var covid19items={

	// カロナール（アセトアミノフェン）
	// 全年代で使用できるものの、在庫が非常に少ないために未成年に限定する
	'calonal': 'https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2582%25AB%25E3%2583%25AD%25E3%2583%258A%25E3%2583%25BC%25E3%2583%25AB%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26ref%3Dnb_sb_noss%26tag%3Da8-affi-315334-22',

	// ロキソニンプレミアム（胃薬内臓のが良いはず）
	// もしくはロキソプロフェン
	'loxonin' : 'https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2583%25AD%25E3%2582%25AD%25E3%2582%25BD%25E3%2583%258B%25E3%2583%25B3%25E3%2583%2597%25E3%2583%25AC%25E3%2583%259F%25E3%2582%25A2%25E3%2583%25A0%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3DFKXS0U0DUYEB%26sprefix%3D%25E3%2583%25AD%25E3%2582%25AD%25E3%2582%25BD%25E3%2583%258B%25E3%2583%25B3%25E3%2583%2597%25E3%2583%25AC%25E3%2583%259F%25E3%2582%25A2%25E3%2583%25A0%252Caps%252C168%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22',

	// イブ（イブプロフェン）
	'eve' : 'https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2582%25A4%25E3%2583%2596%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3DTIBV5UW1M7I1%26sprefix%3D%25E3%2582%25A4%25E3%2583%2596%252Caps%252C207%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22',

	// パルスオキシメーター
	'pulse_oximeter' : 'https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2583%2591%25E3%2583%25AB%25E3%2582%25B9%25E3%2582%25AA%25E3%2582%25AD%25E3%2582%25B7%25E3%2583%25A1%25E3%2583%25BC%25E3%2582%25BF%25E3%2583%25BC%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3D30PSSI9Z0GHVV%26sprefix%3D%25E3%2583%2591%25E3%2583%25AB%25E3%2582%25B9%25E3%2582%25AA%25E3%2582%25AD%25E3%2582%25B7%25E3%2583%25A1%25E3%2583%25BC%25E3%2582%25BF%25E3%2583%25BC%252Caps%252C156%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22',

	// 抗原検査キット
	// （PCR検査キットについては kougen_check では紹介禁止）
	'kougen_check': 'https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E6%258A%2597%25E5%258E%259F%25E6%25A4%259C%25E6%259F%25BB%25E3%2582%25AD%25E3%2583%2583%25E3%2583%2588%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3D3RDEML1MQHG3I%26sprefix%3D%25E6%258A%2597%25E5%258E%259F%25E6%25A4%259C%25E6%259F%25BB%25E3%2582%25AD%25E3%2583%2583%25E3%2583%2588%252Caps%252C199%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22',

	// PCR検査（あくまで念のため用）
	// PCR検査キットはこちらに記載
	// 自分で検査完結するものは紹介禁止
	'pcr_check': 'https://px.a8.net/svt/ejp?a8mat=3N62HK+2P2KSI+2YGS+HV7V6',

};
