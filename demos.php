<? require 'header.php' ?>
	<div id="main-column">
		<? if (isset($_GET['d'])) {
			$demoNumber = (int) $_GET['d'];
			require sprintf('demo%1$02d.php', $demoNumber);
		} else { ?>
			<div class="wnd">
				<?= TemplateUtils::renderWindowHeader(); ?>
				<div class="wnd-content">
					<?
					$demoNames = array(
						'PUSH-RELABEL',
						'CLOCKS',
						'PATHFINDING',
						'RUN DOS RUN'
					);
					for ($demoNumber = 0; $demoNumber < 4; $demoNumber++) { ?>
						<div class="demo-prev">
							<div class="demo-prev-title">
								<div class="demo-prev-title-part darkest-blue"></div>
								<div class="demo-prev-title-part darker-blue"></div>
								<div class="demo-prev-title-text"><?= $demoNames[$demoNumber] ?></div>
							</div>
							<a id="demo-prev-<?= $demoNumber + 1 ?>" class="demo-prev-img" href="/demos?d=<?= $demoNumber + 1 ?>"></a>
						</div>
					<? } ?>
				</div>
			</div>
		<? } ?> 
	</div>
<? require 'footer.php' ?>