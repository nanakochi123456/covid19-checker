#!/usr/bin/perl
# release file perl script for pyukiwiki
# $Id$

use utf8;
use Encode;
#use Encode qw( from_to );

$in=$ARGV[0];
$out=$ARGV[1];

$buf="";
open(R,"<:utf8",$in)||die "$in not found\n";
#binmode(R,":utf8");
open(W, ">$out")||die "$out can't write\n";
foreach(<R>) {
	for($i=0; $i<length($_); $i++) {
		$c=substr($_, $i, 1);
		if(utf8::is_utf8($c) && (ord($c) > 0x7f)) {
			utf8::encode($c);
			Encode::from_to($c, "utf8", "utf16");
			$c=~s/(.)/unpack('H2',$1)/eg;
			$c=~s/(feff)/\\u/g;

			$buf.=$c;

			$c=substr($_, $i+1, 1);

		} else {
			$buf.=$c;
		}
	}
#	print W "\n";
}
$buf=~s/\\u([0-9A-Fa-f][0-9A-Fa-f])(\n)/"\\u$1" . unpack("H2",$2)/ge;

#print W $buf;
# ついでに、[let ][const ]の置換

$buf=~s/let[\s\t]/var /g;
$buf=~s/const[\s\t]/var /g;

print W $buf;

close(W);
close(R);
