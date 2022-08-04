GZIP=7z a -tgzip -mx9 -si
#BROTLI=brotli -q 11 -f
BROTLI=brotli -q 11
PERL=perl
SASS=sass --cache-location /mnt/h/sass-cache --sourcemap=none
UGLIFYJS=uglifyjs --compress --mangle -- 
YUIJS=yui-compressor --type js
YUICSS=yui-compressor --type css
JSPACKER=${PERL} ./bin/jsPacker.pl -e62 -q -f -i
UTF16=${PERL} ./bin/utf16.pl
TEMP=/mnt/h/temp
DIST=./dist
copyright="/*!(C)NEET.co.ltd. nano*/"
charset='@charset "UTF-8";'

TARGET=\
	${DIST}/covid19.min.js \
	${DIST}/covid19.min.css \


all: $(TARGET)

clean: $(TARGET) $(plsrc)
	rm -f $(TARGET) $(plsrc) $(TEMP)/* $(DIST)/*




${DIST}/covid19.min.js: covid19.sjs
	cat covid19.sjs > ${DIST}/covid19.js
	${UTF16} ${DIST}/covid19.js ${TEMP}/covid19.min.js.tmp1
	${UGLIFYJS} ${TEMP}/covid19.min.js.tmp1 > ${TEMP}/covid19.min.js.tmp2
	${JSPACKER} ${TEMP}/covid19.min.js.tmp2 > ${TEMP}/covid19.min.js.tmp3
	echo ${copyright} > ${DIST}/covid19.min.js
	cat ${TEMP}/covid19.min.js.tmp3 >> ${DIST}/covid19.min.js

${DIST}/covid19.css: covid19.scss
	$(SASS) covid19.scss:${DIST}/covid19.css

${DIST}/covid19.min.css: ${DIST}/covid19.css
	${YUICSS} ${DIST}/covid19.css | sed -e "s/\@charset \"UTF-8\";//g"> ${TEMP}/covid19.min.css.tmp1
	echo ${charset} > ${DIST}/covid19.min.css
	echo ${copyright} >> ${DIST}/covid19.min.css
	cat ${TEMP}/covid19.min.css.tmp1 >> ${DIST}/covid19.min.css
