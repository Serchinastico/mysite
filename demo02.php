<?
	$rows = 8;
	$columns = 24;
	$radius = 19;
?>
<div id="visualization" data-rows="<?= $rows ?>" data-columns="<?= $columns ?>" data-radius="<?= $radius ?>">
	<? for ($row = 0; $row < $rows; $row++) { ?>
		<div id="clock-row-<?= sprintf('%1$0d', $row) ?>" class="clock-row"></div>
	<? } ?>
</div>
<div id="code" data-code-url="/script/demo02/clocks.js"></div>

<script src="//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.js"></script>
<script src="script/core/demo.js"></script>
<script src="script/demo02/clocks.js"></script>
<script src="script/external/cm-javascript.js"></script>
<link rel="stylesheet" href="style/demo02/clocks.css">
<link rel="stylesheet" href="style/mycodemirror.css">