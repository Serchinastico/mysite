requirejs.config({
	baseUrl: 'script/demo04/'
});

requirejs(
	[
		'core/Namespace',
		'game/Game'
	],
	function(game) {

	}
);