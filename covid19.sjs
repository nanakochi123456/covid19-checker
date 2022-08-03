/* covid19 easy checker (ja) by nano (C)NEET.co.,ltd */
/* Release 220803-r3 */
/* Kanjicode = UTF-8 */
/* 1TAB=4Space */

$(function() {
	"use strict";
	var HTML='.covid19',
		CHECK='covid19check';

	// フォームの表示
	load_covid19form();


	// 簡易診断
	$('#covid19calc').on('click', function() {
		var sex=readform('sex'),
			year=readform('year'),
			broad=readform('broad'),
			height=$('#height').val(),
			weight=$('#weight').val(),
			taion=$('#taion').val(),
			heinetu=$('#heinetu').val(),
			tabako=readform('tabako'),
			sake=readform('sake'),
			kougen=readform('kougen'),
			hatunetu=readform('hatunetu');

		var	bmi=calcbmi(parseInt(height), parseInt(weight)),
			taiondiff=calctaion(parseInt(taion), parseInt(heinetu));

		// マトリクスの読み込み
		var syoujou=readcheck("syoujou"),
			kiso=readcheck("kiso");

		// 受診必要性
		var jusin=0
			+ parseInt(sex[0])
			+ parseInt(year[0])
			+ parseInt(broad[0])
			+ parseInt(bmi[0])
			+ parseInt(taiondiff[0])
			+ parseInt(tabako[0])
			+ parseInt(sake[0])
			+ parseInt(hatunetu[0]) * (parseInt(taion) - parseInt(heinetu) < 0.3 ? 0 : 1)
			+ syoujou[0]
			+ kiso[0];

		// 救急必要性
		var kyukyu=0
			+ parseInt(sex[1])
			+ parseInt(year[1])
			+ parseInt(broad[1])
			+ parseInt(bmi[1])
			+ parseInt(taiondiff[1])
			+ parseInt(tabako[1])
			+ parseInt(sake[1])
			+ parseInt(hatunetu[1]) * (parseInt(taion) - parseInt(heinetu) < 0.3 ? 0 : 1)
			+ syoujou[1]
			+ kiso[1];

		// 重症化率、致死率
		var jusyo=1
			* sex[2]
			* year[2]
			* broad[2]
			* bmi[2]
			* taiondiff[2]
			* tabako[2]
			* sake[2]
			* hatunetu[2]
			* syoujou[2]
			* kiso[2];

		// CSSリセット
		$('.err').css('display','none');
		// フォームエラーチェック
		var err=0,
			result="";

		if(height == "" || Number.isNaN(height) || parseInt(height) < 30 || parseInt(height) > 300) {
			$('#height div:nth-child(2) .err').css('display','block');
			err++;
			result+="身長が正しく入力されていません<br>";
		}

		if(weight == "" || Number.isNaN(weight) || parseInt(weight) < 2 || parseInt(weight) > 300) {
			$('#weight div:nth-child(2) .err').css('display','block');
			err++;
			result+="体重が正しく入力されていません<br>";
		}

		if(taion == "" || Number.isNaN(taion) || parseInt(taion) < 30 || parseInt(taion) > 50) {
			$('#taion div:nth-child(2) .err').css('display','block');
			err++;
			result+="現在の体温が正しく入力されていません<br>";
		}

		if(heinetu == "" || Number.isNaN(heinetu) || parseInt(heinetu) < 30 || parseInt(heinetu) > 50) {
			$('#heinetu div:nth-child(2) .err').css('display','block');
			err++;
			result+="平熱が正しく入力されていません<br>";
		}

		if(!err) {

			jusyo=parseInt(jusyo * 100) / 100;

			// 救急搬送が最優先判定
			if(kyukyu > 0) {
				result += 'あなたは緊急の状態です。ただちに <a href="tel:119">119</a>に電話の上治療してもらうことをお薦めします。<br>';
				result += 'なお、ただいま病院はひっ迫していますのですぐに受け入れ先の病院がすぐに決まるとは限りません。<br>';
				result += '<br>';

			// 抗原検査キットの値が不明
			} else if(kougen[0] == 1) {
				result += "あなたは受診の必要はあります。<br>";
				result += "もう一度抗原検査キットを試してみて、もしだめなら…<br>もしくは抗原検査キットの使用方法がわからなければ、医療機関に検査を依頼しましょう。<br>";
				result += '<br>';
				result += "「かかりつけ医」か「近くの医療機関」に電話連絡した上で、抗原検査キットの使い方がわからない旨も連絡し、検査してもらうことをお薦めします。<br>連絡なしに直接医療機関にかかることはお避け下さい。<br>";
				result += "無症状かつ濃厚接触の疑いがある場合は、自治体や街の無料PCR検査を活用しましょう。<br>";
				result += '<br>';

				/* 大阪府対応 */
				if(kyukyu == 0 && year[3] <= 40 && sex[3] < 3) {
					result += '大阪府居住の方は<a href="https://www.pref.osaka.lg.jp/kansenshoshien/jitaku_ryouyou/index.html">若年軽症者オンライン診療スキーム</a>をご利用下さい。<br>';
					result += '<br>';
				}
			} else 	if(jusin + kyukyu == 0) {
				result += "あなたは受診の必要はありません。<br>";
				result += "検査や薬の為に受診することは避けましょう。<br>";
				result += '<br>';
				result += "オミクロン株では順調に経過すれば風邪とは大きな違いはありません。このページを毎日チェックして簡易問診をしてみましょう。<br>";
				result += '<br>';
				result += "感染拡大に伴い宿泊療養のホテルは満床近いケースがあります。可能な限りご自宅で家庭内感染をしないよう工夫をしながら療養するようにしましょう。<br>";
				result += '<br>';

				/* 大阪府対応 */
				if(kyukyu == 0 && year[3] <= 40 && sex[3] < 3) {
					result += '大阪府居住の方は<a href="https://www.pref.osaka.lg.jp/kansenshoshien/jitaku_ryouyou/index.html">若年軽症者オンライン診療スキーム</a>をご利用下さい。<br>';
					result += '<br>';
				}
			} else if(jusin > 0 && kyukyu == 0) {
				result += "あなたは受診の必要はあります。<br>早急に「かかりつけ医」か「近くの医療機関」に電話連絡した上で、診断してもらうことをお薦めします。<br>連絡なしに直接医療機関にかかることはお避け下さい。<br>";
				result += '<br>';
			}
			result += '参考までに、あなたの重症化リスクは健康な成人30代女性（血液型O型、飲酒喫煙なし、妊娠なし）のおよそ' + jusyo + '倍です。<br>';
			result += '<br>';

			if(year[3] < 20) {
				// 未成年の場合カロナール
				result += '発熱を抑える為に<a href="https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2582%25AB%25E3%2583%25AD%25E3%2583%258A%25E3%2583%25BC%25E3%2583%25AB%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26ref%3Dnb_sb_noss%26tag%3Da8-affi-315334-22" rel="nofollow">カロナール</a>（アセトアミノフェン）を準備するとよいでしょう。<br>';
			} else {
				// そうでない場合ロキソニンプレミアム、イブ
				result += '発熱を抑える為に<a href="https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2583%25AD%25E3%2582%25AD%25E3%2582%25BD%25E3%2583%258B%25E3%2583%25B3%25E3%2583%2597%25E3%2583%25AC%25E3%2583%259F%25E3%2582%25A2%25E3%2583%25A0%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3DFKXS0U0DUYEB%26sprefix%3D%25E3%2583%25AD%25E3%2582%25AD%25E3%2582%25BD%25E3%2583%258B%25E3%2583%25B3%25E3%2583%2597%25E3%2583%25AC%25E3%2583%259F%25E3%2582%25A2%25E3%2583%25A0%252Caps%252C168%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22" rel="nofollow">ロキソニン</a>（ロキソプロフェン）、<a href="https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2582%25A4%25E3%2583%2596%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3DTIBV5UW1M7I1%26sprefix%3D%25E3%2582%25A4%25E3%2583%2596%252Caps%252C207%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22" rel="nofollow">イブ</a>（イブプロフェン）を準備するとよいでしょう。<br>';
			}

			// 40歳以上パルスオキシメーター＆多分jusyo>20
			if(year[3] >= 40 || jusyo > 20) {
				result += '重症化リスクも高くなる可能性もありますので、酸素飽和度を計測する<a href="https://px.a8.net/svt/ejp?a8mat=1U3OQS+5R7ZF6+249K+BWGDT&a8ejpredirect=https%3A%2F%2Fwww.amazon.co.jp%2Fs%3Fk%3D%25E3%2583%2591%25E3%2583%25AB%25E3%2582%25B9%25E3%2582%25AA%25E3%2582%25AD%25E3%2582%25B7%25E3%2583%25A1%25E3%2583%25BC%25E3%2582%25BF%25E3%2583%25BC%26__mk_ja_JP%3D%25E3%2582%25AB%25E3%2582%25BF%25E3%2582%25AB%25E3%2583%258A%26crid%3D30PSSI9Z0GHVV%26sprefix%3D%25E3%2583%2591%25E3%2583%25AB%25E3%2582%25B9%25E3%2582%25AA%25E3%2582%25AD%25E3%2582%25B7%25E3%2583%25A1%25E3%2583%25BC%25E3%2582%25BF%25E3%2583%25BC%252Caps%252C156%26ref%3Dnb_sb_noss_1%26tag%3Da8-affi-315334-22" rel="nofollow">パルスオキシメーター</a>も準備しましょう。<br>';
			}

			// 20代以下重症化リスク BA.5で増えているらしいので
			if(year[3] <= 20) {
				result += '20代以下の方の重症化リスク、死亡リスクが増えています。普段から熱中症並びにコロナを意識した行動を行うようにしましょう。<br>';
			}
			result += '<br>';
			result += 'これ以外に不安なことがありましたら、かかりつけ医、もしくはかかりつけ薬局に電話で連絡されるか、<a href="https://byoinnavi.drsquare.jp/">医療なび医療相談サービス</a>（株式会社eヘルスケア）、<a href="https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/covid19-kikokusyasessyokusya.html">新型コロナウイルスに関する相談・医療の情報や受診・相談センターの連絡先</a>（厚生労働省）までご相談下さい。<br>';
			result += '<br>';
			result += 'それでは、お大事にどうぞ。';
		}
		$('.result').html(result);

	});

	function calctaion(taion, heinetu) {
		// 41℃を超えたら救急
		if(taion > 41) {
			return parse("1-1-1");
		}

		// いわゆる40℃ 平熱より+3.5℃なら受診
		if(taion >= heinetu + 3.5) {
			return parse("1-0-1");
		}

		// 受診不要
		return parse("0-0-1");
	}

	function calcbmi(height, weight) {
		var bmi=weight / ((height / 100) * (height / 100)),
			ret;

		// BMI30以上を要受診
		// 肥満の重症化率は7.69%/5.69%=1.35倍
		// https://www.asahi.com/articles/ASP8T67DGP8TULBJ00B.html

		if(bmi + 0 >= 30) {
			return parse("1-0-1.35");
		} else {
			return parse("0-0-1");
		}
	}

	function parse(str) {
		return str.split('-');
	}

	function readform(name) {
		var form = $('#' + name).val();
		var	formdata=form.split('-');

		// 救急必要性の調整
		if(formdata[1] + 0 < 1) {
			formdata[1] = 0;
		}

		// 重症化率の調整
		if(formdata[2] + 0 <= 0) {
			formdata[2] = 1;
		}
		return formdata;
	}

	// マトリクスの読み込み
	function readcheck(name) {
		var checked = $('#' + name + ':checked'),
			arrs = [0,0,1,0],
			tmp = [];

		checked.each(function(){
			tmp=$(this).val().split('-');
			arrs[0] += tmp[0];
			arrs[1] += tmp[1];
			arrs[2] *= tmp[2];
			arrs[3] += tmp[3];
		});
		return arrs;
	}

	// input type=numberを生成
	function insnumber(html, name, text, lasttext) {
		var _html="";
		_html+='<div class="' + name + '">';
		_html+='<div>';
		_html+=text;
		_html+='</div>';
		_html+='<div>';
		_html+='<input type="number" id="' + name + '" step="0.1">';
		_html+=lasttext;
		_html+='<span class="err">正しく値が入力されていません</div>'
		_html+='</div>';
		_html+='</div>';
		$(html).append(_html);
	}

	// input type=checkboxを生成
	function insmatrix(html, name, text, ...args) {
		var _html="";

		_html+='<div class="' + name + '">';
		_html+='<div>';
		_html+=text;
		_html+='</div>';
		_html+='<div>';
		args.forEach( function(item, index) {
			var array=item.split('=');
			_html+='<label><input id="' + name + '" type="checkbox" value="' + array[0] + '">' + array[1] + '</label><br>';
		});

		_html+='</div>';
		_html+='</div>';
		$(html).append(_html);
	}

	// select&optionを作成
	function inslist(html, name, text, ...args) {
		var _html="";

		_html+='<div class="' + name + '">';
		_html+='<div>';
		_html+=text;
		_html+='</div>';
		_html+='<div>';
		_html+='<select id="' + name + '">';
		args.forEach( function(item, index) {
			var array=item.split('=');
			_html+='<option value="' + array[0] + '">' + array[1] + '</option>';
		});

		_html+='</select>';
		_html+='</div>';
		_html+='</div>';
		$(html).append(_html);
	}

	// フォームHTMLを描く
	function load_covid19form() {
		var _html="";

		$(HTML).html('');
		$(HTML).append('<h1><span>新型コロナウイルス受診ナビ</span></h1>');
		$(HTML).append('<p>受診が必要か、緊急搬送が必要か簡単な問診でお答えします。</p>');
		$(HTML).append('<p>感染者が1日20万人と超え医療ひっ迫している状態です。ご協力をお願いします。</p>');


		$(HTML).append('<form id="' + CHECK + '">');

		// 数値パラメータ一覧
		// 1番目 受診必要性
		// 2番目 救急必要性
		// 3番目 重症化の率
		// 4番目 パラメータ番号

		// 男性の死亡率
		// https://news.yahoo.co.jp/byline/kutsunasatoshi/20210516-00236991
		// 妊婦の重症化率
		// https://minerva-clinic.or.jp/covid-19/pregnancy/icu/
		inslist(HTML, "sex", "性別"
			, "0-0-1.4-1=男性"
			, "0-0-1-2=女性（妊婦ではない）"
			, "1-0-1.62-3=女性（妊婦）"
		);

		// （念のため）10歳未満と65歳以上を要受診とする
		// 重症化率ソース
		// https://www.nhk.or.jp/shutoken/newsup/20220113e.html
		inslist(HTML, "year", "年齢"
			, "1-0-0.5-0=10歳未満" // 10歳未満は推定
			, "0-0-0.2-10=10代"
			, "0-0-0.3-20=20代"
			, "0-0-1-30=30代"
			, "0-0-4-40=40代"
			, "0-0-10-50=50代"
			, "0-0-25-60=60～64歳"
			, "1-0-36-65=65～69歳"	// この年齢は推定
			, "1-0-47-70=70代"
			, "1-0-71-80=80代"
			, "1-0-78-90=90代以上"
		);

		// 重症化率は血液型でも異なる、不明の場合AB型とする
		inslist(HTML, "broad", "血液型"
			, "0-0-1-1=O型"
			, "0-0-1.2-2=A型"
			, "0-0-1.2-3=B型"
			, "0-0-1.6-4=AB型"
			, "0-0-1.6-0=不明"
		);

		// BMI30以上を要受診
		// 肥満の重症化率は7.69%/5.69%=1.35倍
		// https://www.asahi.com/articles/ASP8T67DGP8TULBJ00B.html
		insnumber(HTML,"height", "身長", "cm");
		insnumber(HTML,"weight", "体重", "kg");

		// いわゆる37.5℃以上、平熱と計算して1℃以上
		insnumber(HTML,"taion", "現在の体温", "℃");
		insnumber(HTML,"heinetu", "平熱", "℃");

		// 喫煙
		// https://medicalnote.jp/contents/200519-001-FQ
		inslist(HTML,"tabako", "喫煙はされますか？"
			, "0-0-1-0=しない"
			, "0-0-1.66-1=する"
		);

		// 飲酒、推定値
		// https://style.nikkei.com/article/DGXMZO63064060W0A820C2000000
		inslist(HTML,"sake", "飲酒はされますか？"
			, "0-0-1-0=しない"
			, "0-0-1.2-1=ハイボール、低アルコールチューハイを少し"
			, "0-0-1.75-1=ハイボール、低アルコールチューハイをたくさん"
			, "0-0-1.5-1=ビール、ワイン、高アルコールチューハイを少し"
			, "0-0-2.1-1=ビール、ワイン、高アルコールチューハイをたくさん"
			, "0-0-1.7-1=日本酒を少し"
			, "0-0-2.4-1=日本酒をたくさん"
			, "0-0-2.2-1=焼酎等強いお酒を少し"
			, "0-0-4.4-1=焼酎等強いお酒をたくさん"
		);

		// 発熱が4日経過以上で要受診
		inslist(HTML,"hatunetu","発熱が感じられてから何日経過しましたか？"
			,"0-0-1-0=初日"
			,"0-0-1-1=1日経過"
			,"0-0-1-2=2日経過"
			,"0-0-1-3=3日経過"
			,"1-0-1-4=4日経過"
			,"1-0-1-5=5日経過"
			,"1-0-1-6=6日経過"
			,"1-0-1-7=7日以上経過"
		);

		// 抗原検査キットの結果 1であればPCR検査を薦める
		inslist(HTML, "kougen", "抗原検査キットの結果"
			, "0-0-0-1=陽性"
			, "0-0-0-2=陰性"
			, "1-0-0-3=検査値不明"
			, "1-0-0-4=検査の仕方がわからない"
			, "1-0-0-5=未検査"
		);

		// 現在の症状が1が存在すれば救急搬送
		insmatrix(HTML,"syoujou", "現在の症状"
			// <基本的受診不要>

			, "0-0-1-1=倦怠感（だるい）"
			, "0-0-1-2=咳"
			, "0-0-1-3=平熱より1℃以上高い発熱（目安37.5℃以上）"
			, "0-0-1-4=頭痛"
			, "0-0-1-5=筋肉痛"
			, "0-0-1-6=鼻水"
			, "0-0-1-7=のどの痛み"
			, "0-0-1-8=味が感じられない"	// オミクロン株じゃあまりないけど置いておく
			, "0-0-1-9=臭い、香りが感じられない"	// オミクロン株じゃあまりないけど置いておく
			// </基本的受診不要 ここまで>

			// <要救急>
			, "1-1-1-10=唇が紫になっている"
			, "1-1-1-11=息が荒くなった"
			, "1-1-1-12=急に息苦しくなった"
			, "1-1-1-13=少し動くと息苦しい"
			, "1-1-1-14=胸に痛みがある"
			, "1-1-1-15=横になれない"
			, "1-1-1-16=座らないと息ができない"
			, "1-1-1-17=肩で息をしている"
			, "1-1-1-18=突然ゼーゼーしてきた"
			, "1-1-1-19=脈が飛ぶ、脈のリズムが乱れてる"
			, "1-1-1-20=いつもよりぼんやりしている"
			, "1-1-1-21=様子がおかしい"
			, "1-1-1-22=もうろうとしている"
			// </要救急 ここまで>
		);

		// 基礎疾患が1が存在すれば要受診
		// 致死率で記載されているが重症化率に仮変更してある
		// 倍率 基礎疾患あり÷基礎疾患なし＝
		// https://www.asahi.com/articles/ASP8T67DGP8TULBJ00B.html
		// 高齢のデータを最優先採用
		// https://www3.nhk.or.jp/news/html/20210828/k10013228881000.html
		insmatrix(HTML, "kiso", "基礎疾患等<br>ひとつもあてはまらない場合はチェックをしないで下さい",
			"1-0-1-1=手術後1か月以内",			// 不明
			"1-0-2.16-2=悪性腫瘍（がん）",	// 11.7%/5.40%
			"1-0-2.38-3=慢性の呼吸器の病気",	// 下記の肺疾患と同等にしている
			"1-0-1.29-4=慢性の心臓病（高血圧を含む）",//高血圧で7.03%/5.42%
			"1-0-3.39-5=慢性の腎臓病",	// 17.97%/5.30%
			"1-0-2.38-6=慢性の肺疾患", 	// 慢性閉塞性肺疾患では13.42%/5.63%
			"1-0-1.03-7=脂質異常症",	// 5.99%/5.78%
			"1-0-1-8=慢性の肝臓病（脂肪肝や慢性肝炎を除く）",	// 不明
			"1-0-4-9=糖尿病",	// 1.16%/0.29%
			"1-0-1-10=血液の病気（鉄欠乏性貧血を除く）",		// 不明
			"1-0-2.16-11=免疫の機能が低下する病気（治療中の悪性腫瘍を含む）",//免疫抑制で14.39%/6.64%
			"1-0-2.16-12=病気の治療で、ステロイドなど免疫の機能を低下させる治療を受けている", //上記と同にしてある
			"1-0-1-13=免疫の異常に伴う神経疾患や神経筋疾患",	// 不明
			"1-0-1-14=神経疾患や神経筋疾患が原因で身体の機能が衰えた状態（呼吸障害など）",	// 不明
			"1-0-1-15=染色体異常", // 不明
			"1-0-1-16=重症心身障害（重度の肢体不自由と重度の知的障害が重複した状態）",	// 不明
			"1-0-1-17=睡眠時無呼吸症候群",	// 不明
			"0-0-1-18=精神障害",	// 意味ないが入れておく
			"0-0-1-19=知的障害",	// 意味ないが入れておく
			"0-0-1-20=その他"
		);

		_html+='<div>';
		_html+='</div>';
		_html+='<div>';
		_html+='<button id="covid19calc">簡易診断結果を見てみる</button>';
		_html+='</div>';
		_html+='</form>';
		_html+='<div class="result"></div>';

		// <以下変更禁止>

		_html+='<hr>';
		_html+='<h3>注意事項</h3>';
		_html+='<p>この簡易診断サイトは統計データに基づき作成されたもので、医師並びに医療従事者が監修を行っていません。</p>';
		_html+='<p>統計データの入手元につきましてはソースコードに記載されています。</p>';
		_html+='<p>この結果につきましては診断を行った行為とはならず、あくまで利用者の参考情報として提供しています。</p>';
		_html+='<p>すべての統計データが網羅されていないため、重症化率に限り正しく計算されないことがあります。</p>';
		_html+='<p>当フォームに入力された内容はサーバー並びにcookie等に保管されません。</p>';
		_html+='<p>&copy;<a href="https://neet.co.jp/">NEET Co.,Ltd.</a> All Right Reserved.</p>';
		_html+='<p>This is open source. <a href="https://github.com/nanakochi123456/covid19-checker">github source</a></p>';

		$(HTML).append(_html);
		// </以下変更禁止> ここまで

	}
});
