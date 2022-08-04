<?php
/**
 * Template Name: covid19-checker
 * Author: Yozakura Nano (C)NEET co.,ltd.
 * Author URI: https://neet.co.jp/covid19
 * Description: 新型コロナウイルス受診ナビ
 */

wp_enqueue_style('covid19',
	"/covid19-checker/dist/covid19-wordpress.min.css",
    array(),
    date_i18n( 'YmdHis', filemtime( dirname(__FILE__). '../../../covid19-checker/dist/covid19-wordpress.min.css' ) )
);

wp_enqueue_script('covid19',
	"/covid19-checker/dist/covid19.min.js",
    array(),
    date_i18n( 'YmdHis', filemtime( dirname(__FILE__). '../../../covid19-checker/dist/coivd19.min.js' ) )
);

get_header();

 ?>
<section class="covid19"></section>
<?php get_footer(); ?>
