<? require 'header.php' ?>
	<div id="body">
		<? if (isset($_GET['d'])) {
			$demoNumber = (int) $_GET['d'];
			require sprintf('demo%1$02d.php', $demoNumber);
		} else { ?>
			<div id="demo-grid">
				<? for ($demoNumber = 1; $demoNumber < 3; $demoNumber++) { ?>
				<div class="demo-prev">
					<a id="demo-prev-<?= $demoNumber ?>" class="demo-prev-img" href="/demos?d=<?= $demoNumber ?>"></a>
				</div>
				<? } ?>
			</div>
		<? } ?> 
	</div>
<? require 'footer.php' ?>