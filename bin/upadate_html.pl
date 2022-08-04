#!/usr/bin/env perl
# 手抜きスクリプト js cssをアップデート時にキャッシュさせない

open(R,"serial.txt");
$serial=<R>;
close(R);
$serial++;
open(W,">serial.txt");
print W $serial;
close(W);

open(R,"covid19-src.html");
foreach(<R>) {
	$html.=$_;
}
close(R);

$html=~s/\%serial\%/$serial/ge;

open(W,">covid19.html");
print W $html;
close(W);
