<?php

/**
 * This class contains static utility methods for rendering stuff in HTML.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
class TemplateUtils {
	
	public static function renderWindowHeader() {
		return '<div class="wnd-hdr">' .
					'<div class="wnd-hdr-part lighter-green"></div>' .
					'<div class="wnd-hdr-part light-green"></div>' .
					'<div class="wnd-hdr-part mid-green"></div>' .
					'<div class="wnd-hdr-part dark-green"></div>' .
					'<div class="wnd-hdr-part darker-green"></div>' .
				'</div>';
	}

	public static function renderDemoPreview($name, $imageUrl) {
		return '<div class="demo-prev">' .
					'<a id="demo-prev-<?= $demoNumber ?>" class="demo-prev-img" href="' . $imageUrl . '"></a>' .
				'</div>';
	}
}