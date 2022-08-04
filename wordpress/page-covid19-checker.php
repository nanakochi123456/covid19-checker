<?php
/**
 * Template Name: covid19-checker
 */

wp_enqueue_style('covid19',
	"/covid19-checker/dist/covid19.min.css",
    array(),
    date_i18n( 'YmdHis', filemtime( dirname(__FILE__). '../../../covid19-checker/dist/coivd19.min.css' ) )
);

wp_enqueue_script('covid19',
	"/covid19-checker/dist/covid19.min.js",
    array(),
    date_i18n( 'YmdHis', filemtime( dirname(__FILE__). '../../../covid19-checker/dist/coivd19.min.js' ) )
);

get_header();

 ?>
<section class="covid19"></div>
<?php get_footer(); ?>
