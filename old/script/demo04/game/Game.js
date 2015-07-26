namespace('Game');

My.Game = new Class({
	initialize: function() {
		this.fps = 30;
		this.skipTicks = 1000 / this.fps;
		this.lastGameTick = (new Date()).getTime();
		this.canvas = document.getElementById('visualization');
		this.ctx = this.canvas.getContext("2d");
		this.delta = 0;

		this.canvas = {
			width: 960,
			height: 760
		};

		this.terrainPointsDistance = 50;
		this.terrainPoints = [this.createTerrainPoint()];
		this.camera = {
			velocity: {
				x: -10,
				y: 0
			}
		};
	}
});