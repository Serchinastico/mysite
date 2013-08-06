<?
	$rows = 10;
	$columns = 22;
?>
<div id="visualization" data-rows="<?= $rows ?>" data-columns="<?= $columns ?>">
	<? for ($row = 0; $row < $rows; $row++) { ?>
		<div id="clock-row-<?= sprintf('%1$0d', $row) ?>" class="clock-row"></div>
	<? } ?>
</div>
<div id="code" data-code-url="/script/clocks.js"></div>

<script src="script/demo.js"></script>
<script src="script/clocks.js"></script>
<script src="script/cm-javascript.js"></script>
<link rel="stylesheet" href="style/clocks.css">
<link rel="stylesheet" href="style/mycodemirror.css">