// Polyfill for requestAnimationFrame
(function() {
  var requestAnimationFrame = window.requestAnimationFrame ||
							  window.mozRequestAnimationFrame ||
							  window.webkitRequestAnimationFrame ||
							  window.msRequestAnimationFrame ||
							  function(callback) {
							  	window.setTimeout(callback, 1000 / 60);
							  };
  window.requestAnimationFrame = requestAnimationFrame;
})();

Game = function() {
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
};

Game.prototype.run = function() {
	this.delta = (new Date().getTime() - this.lastGameTick) / 1000;
	this.fps = 1 / this.delta;

	this.update();
	this.draw();

	this.lastGameTick = new Date().getTime();
	window.requestAnimationFrame(this.run.bind(this));
}

Game.prototype.update = function() {
	var newTerrainPoints = [];

	this.terrainPoints.each(function(terrainPoint) {
		terrainPoint.position.x += this.camera.velocity.x;
		terrainPoint.position.y += this.camera.velocity.y;

		if (terrainPoint.position.x >= - this.terrainPointsDistance) {
			newTerrainPoints.push(terrainPoint);
		}
	}, this);

	var lastTerrainPoint = newTerrainPoints[newTerrainPoints.length - 1];
	if (lastTerrainPoint.position.x < this.canvas.width + this.terrainPointsDistance) {
		newTerrainPoints.push(this.createTerrainPoint());
	}

	this.terrainPoints = newTerrainPoints;
}

Game.prototype.draw = function() {
	this.ctx.fillStyle = '#101010';
	this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

	this.ctx.fillStyle = '#AAAAAA';
	this.terrainPoints.each(function(terrainPoint) {
		this.ctx.fillRect(
			terrainPoint.position.x,
		 	terrainPoint.position.y,
		 	10,
		 	10);
	}, this);
}

Game.prototype.createTerrainPoint = function() {
	return {
		position: {
			x: this.canvas.width + 200,
			y: 400 + Math.floor(Math.random() * 200)
		}
	};
}

var game = new Game();
window.requestAnimationFrame(game.run.bind(game))