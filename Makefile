GZIP=7z a -tgzip -mx9 -si
#BROTLI=brotli -q 11 -f
BROTLI=brotli -q 11
PERL=perl
SASS=sass --cache-location /mnt/h/sass-cache --sourcemap=none
CLOSURE=npx google-closure-compiler  --language_in ECMASCRIPT_2021
UGLIFYJS=uglifyjs --compress --mangle -- 
YUIJS=yui-compressor --type js
YUICSS=yui-compressor --type css
JSPACKER=${PERL} ./bin/jsPacker.pl -e62 -q -f -i
UTF16=${PERL} ./bin/utf16.pl
TEMP=/mnt/h/temp
DIST=./dist
HTMLMAKER=${PERL} bin/upadate_html.pl

copyright="/*!(C)NEET.co.ltd. nano*/"
charset='@charset "UTF-8";'

TARGET=\
	${DIST}/covid19.min.js \
	${DIST}/covid19.min.css \
	${DIST}/covid19-wordpress.min.css \
	covid19.html

all: $(TARGET)


covid19.html: covid19-src.html covid19.sjs covid19.scss covid19-html.scss covid19-wordpress.scss
	${HTMLMAKER}

#	${UTF16} ${DIST}/covid19.js ${TEMP}/covid19.min.js.tmp1

${DIST}/covid19.min.js: covid19.sjs medicalitems.sjs Makefile
	cat medicalitems.sjs covid19.sjs > ${DIST}/covid19.js
	cat ${DIST}/covid19.js > ${TEMP}/covid19.min.js.tmp1
	${CLOSURE} ${TEMP}/covid19.min.js.tmp1 > ${TEMP}/covid19.min.js.tmp2
	${JSPACKER} ${TEMP}/covid19.min.js.tmp2 > ${TEMP}/covid19.min.js.tmp3
	echo ${copyright} > ${DIST}/covid19.min.js
	cat ${TEMP}/covid19.min.js.tmp3 >> ${DIST}/covid19.min.js

${DIST}/covid19.css: covid19-html.scss covid19.scss Makefile
	$(SASS) covid19-html.scss:${DIST}/covid19.css

${DIST}/covid19-wordpress.css: covid19-wordpress.scss covid19.scss Makefile
	$(SASS) covid19-wordpress.scss:${DIST}/covid19-wordpress.css

${DIST}/covid19.min.css: ${DIST}/covid19.css Makefile
	${YUICSS} ${DIST}/covid19.css | sed -e "s/\@charset \"UTF-8\";//g"> ${TEMP}/covid19.min.css.tmp1
	echo ${charset} > ${DIST}/covid19.min.css
	echo ${copyright} >> ${DIST}/covid19.min.css
	cat ${TEMP}/covid19.min.css.tmp1 >> ${DIST}/covid19.min.css

${DIST}/covid19-wordpress.min.css: ${DIST}/covid19-wordpress.css Makefile
	${YUICSS} ${DIST}/covid19-wordpress.css | sed -e "s/\@charset \"UTF-8\";//g"> ${TEMP}/covid19-wordpress.min.css.tmp1
	echo ${charset} > ${DIST}/covid19-wordpress.min.css
	echo ${copyright} >> ${DIST}/covid19-wordpress.min.css
	cat ${TEMP}/covid19-wordpress.min.css.tmp1 >> ${DIST}/covid19-wordpress.min.css
