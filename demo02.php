<div id="visualization">
	<? for ($row = 0; $row < 17; $row++) { ?>
		<div id="clock-row-<?= sprintf('%1$0d', $row) ?>" class="clock-row"></div>
	<? } ?>
</div>
<div id="code" data-code-url="/script/clocks.js"></div>

<script src="script/demo.js"></script>
<script src="script/clocks.js"></script>
<script src="script/cm-javascript.js"></script>
<link rel="stylesheet" href="style/clocks.css">
<link rel="stylesheet" href="style/mycodemirror.css">