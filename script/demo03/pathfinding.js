function play() {
	var graph = new Graph(),
		heuristic = new Heuristic();

	setInterval(function() {
		drawGraph(graph);
		var solution = astar(graph, heuristic);
		graph.update(solution);
		drawSolution(graph, solution);
		console.log(solution);
	}, 100);

	/*var canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");
	canvas.addEventListener('mousemove', function(evt) {
		var rect = canvas.getBoundingClientRect(),
			message = (evt.clientX - rect.left) + ' ' + (evt.clientY - rect.top);
		ctx.clearRect(810, 600, 200, 200);
		ctx.font = '18pt Inconsolata';
		ctx.fillStyle = '#000000';
		ctx.fillText(message, 810, 700);
	}, false);*/
}

function drawGraph(graph) {
	var canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	graph.each(function(vertex) {
		var position = graph.getPosition(vertex),
			x = position.x,
			y = position.y,
			neighbors = graph.getNeighbors(vertex);

		// Draw the outgoing edges
		for (var i = 0, neighborCount = neighbors.length; i < neighborCount; i++) {
			var neighbor = neighbors[i],
				neighborPosition = graph.getPosition(neighbor),
				nx = neighborPosition.x,
				ny = neighborPosition.y;

			ctx.strokeStyle = '#AAAAAA';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(nx, ny);
			ctx.stroke();
		}
	});
	drawVertex(graph);
}

function drawSolution(graph, solution) {
	var canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");

	for (var i = 1, vertexCount = solution.length; i < vertexCount; i++) {
		var from = solution[i - 1],
			to = solution[i],
			fromPosition = graph.getPosition(from),
			toPosition = graph.getPosition(to);

		ctx.strokeStyle = graph.getEdgeColor(from, to);
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(fromPosition.x, fromPosition.y);
		ctx.lineTo(toPosition.x, toPosition.y);
		ctx.stroke();
	}

	drawVertex(graph);
}

function drawVertex(graph) {
	var canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");

	ctx.font = 'Bold 10pt Inconsolata';
	graph.each(function(vertex) {
		var position = graph.getPosition(vertex),
			x = position.x,
			y = position.y,
			neighbors = graph.getNeighbors(vertex),
			heat = graph.getHeat(vertex),
			color = Math.floor(heat).toString(16);

		// Draw the node
		ctx.fillStyle = '#' + color + '0000';
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();

		ctx.fillStyle = '#404040';
		ctx.fillText(vertex, x - 5, y - 5);
	});	
}

function astar(graph, heuristic) {
	var start = graph.getStart(),
		goal = graph.getGoal(),
		closedSet = [],
		openSet = new SortedList(start, heuristic.estimate(start, goal)), // sorted by f score
		cameFrom = [],
		gScores = [],
		fScores = [];

	gScores[start] = 0;
	fScores[start] = gScores[start] + heuristic.estimate(start, goal);

	while (!openSet.isEmpty()) {
		var current = openSet.getNext();
		if (current === goal) {
			return reconstructPath(cameFrom, goal);
		}

		closedSet[current] = true;
		var neighbors = graph.getNeighbors(current);
		for (var i = 0, neighborCount = neighbors.length; i < neighborCount; i++) {
			var neighbor = neighbors[i],
				gScore = gScores[current] + graph.distanceBetween(current, neighbor);

			if (closedSet[neighbor] && gScore >= gScores[neighbor]) {
				continue;
			}

			if (!openSet.exists(neighbor) || gScore < gScores[neighbor]) {
				cameFrom[neighbor] = current;
				gScores[neighbor] = gScore;
				fScores[neighbor] = gScore + heuristic.estimate(neighbor, goal);
				if (!openSet.exists(neighbor)) {
					openSet.insert(neighbor, fScores[neighbor]);
				}
			}
		}
	}
	return false;
}

function reconstructPath(cameFrom, node) {
	var path = [node],
		current = cameFrom[node];

	while (typeof(current) !== 'undefined') {
		path.unshift(current);
		current = cameFrom[current];
	}

	return path;
}

/**
<------------------- GRAPH ----------------->
*/
function Graph() {
	this.neighbors = [
		[1], [2, 17], [3, 47], [4, 48], [5, 48],
		[6, 22], [7, 22], [8], [9], [10],
		[11], [12, 52], [13, 53], [14], [15],
		[16], [], [18, 23], [19], [20, 21, 32],
		[21, 22], [5, 6, 22], [], [24], [25, 30],
		[26, 33], [27], [28], [29, 40], [32, 34, 35],
		[31, 32], [32, 33], [], [34], [35],
		[36], [37, 43], [38, 46, 51], [39], [16],
		[41, 49], [42, 44], [43], [], [45, 50],
		[46], [50, 51], [], [], [],
		[51], [], [53], []
	];

	this.positions = [
		{x: 796, y: 355}, {x: 760, y: 340}, {x: 750, y: 295}, {x: 700, y: 280}, {x: 610, y: 265}, 
		{x: 580, y: 275}, {x: 550, y: 250}, {x: 490, y: 235}, {x: 470, y: 215}, {x: 460, y: 160}, 
		{x: 460, y: 140}, {x: 370, y: 130}, {x: 250, y: 135}, {x: 250, y: 205}, {x: 250, y: 300}, 
		{x: 270, y: 330}, {x: 320, y: 355}, {x: 735, y: 375}, {x: 685, y: 350}, {x: 645, y: 360}, 
		{x: 620, y: 330}, {x: 575, y: 310}, {x: 535, y: 320}, {x: 765, y: 405}, {x: 750, y: 455}, 
		{x: 735, y: 515}, {x: 720, y: 575}, {x: 685, y: 565}, {x: 645, y: 570}, {x: 640, y: 510}, 
		{x: 710, y: 460}, {x: 675, y: 465}, {x: 645, y: 460}, {x: 675, y: 505}, {x: 660, y: 515}, 
		{x: 565, y: 510}, {x: 475, y: 510}, {x: 275, y: 505}, {x: 275, y: 430}, {x: 260, y: 380}, 
		{x: 640, y: 635}, {x: 425, y: 640}, {x: 425, y: 585}, {x: 470, y: 575}, {x: 250, y: 635}, 
		{x: 245, y: 570}, {x: 255, y: 515}, {x: 770, y: 250}, {x: 665, y: 240}, {x: 665, y: 670}, 
		{x: 225, y: 565}, {x: 220, y: 500}, {x: 345, y: 100}, {x: 265, y: 105}
	];

	this.heatMap = [
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1, 1,
		1, 1, 1, 1
	];

	this.edgeColors = [
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}, {},
		{}, {}, {}, {}
	];

	this.start = 0;
	this.goal = 16;
	this.vertexCount = this.positions.length;

	// Automatic non directed graph
	for (var vertex = 0; vertex < this.vertexCount; vertex++) {
		var neighbors = this.getNeighbors(vertex);
		for (var i = 0, neighborCount = neighbors.length; i < neighborCount; i++) {
			var neighbor = neighbors[i],
				neighborNeighbors = this.getNeighbors(neighbor);
			if (neighborNeighbors.indexOf(vertex) === -1) {
				this.neighbors[neighbor].push(vertex);
			}
		}
	}
}

Graph.prototype.getStart = function() {
	return this.start;
}

Graph.prototype.getGoal = function() {
	return this.goal;
}

Graph.prototype.getNeighbors = function(vertex) {
	return this.neighbors[vertex];
}

Graph.prototype.getHeat = function(vertex) {
	return this.heatMap[vertex];
}

Graph.prototype.distanceBetween = function(from, to) {
	var fromPosition = this.getPosition(from),
		toPosition = this.getPosition(to),
		fromX = fromPosition.x,
		fromY = fromPosition.y,
		toX = toPosition.x,
		toY = toPosition.y,
		deltaX = toX - fromX,
		deltaY = toY - fromY;

	return Math.sqrt(deltaX * deltaX + deltaY * deltaY) * this.heatMap[to];
}

Graph.prototype.each = function(callback) {
	for (var i = 0; i < this.vertexCount; i++) {
		callback(i);
	}
}

Graph.prototype.getPosition = function(vertex) {
	return this.positions[vertex];
}

Graph.prototype.getEdgeColor = function(from, to) {
	return this.edgeColors[from][to];
}

Graph.prototype.update = function(solution) {
	this.each(function(vertex) {
		this.heatMap[vertex] = Math.max(0, this.heatMap[vertex] * 0.95);

		var neighbors = this.getNeighbors(vertex);
		for (var i = 0, neighborCount = neighbors.length; i < neighborCount; i++) {
			var neighbor = neighbors[i];
			if (!this.edgeColors[vertex][neighbor]) {
				this.edgeColors[vertex][neighbor] = '#AAAAAA';
			}
			var color = parseInt(this.edgeColors[vertex][neighbor][1], 16);
			color = Math.min(10, color + 1);
			color = color.toString(16);
			this.edgeColors[vertex][neighbor] = '#' + color + color + 'AA' + color + color;
		}
	}.bind(this));

	for (var i = 1, vertexCount = solution.length; i < vertexCount; i++) {
		var from = solution[i],
			to = solution[i - 1];
		this.heatMap[from] = Math.min(this.heatMap[from] * 1.15, 255);
		this.edgeColors[from][to] = '#00AA00';
		this.edgeColors[to][from] = '#00AA00';
	}
}

/**
<------------------- HEURISTIC ----------------->
*/
function Heuristic() {

}

Heuristic.prototype.estimate = function(from, to) {
	return 1;
}

/**
<------------------- SORTED LIST ----------------->
*/
function SortedList(element, weight) {
	this.list = [];
	this.weights = [];
	if (typeof(element) !== 'undefined') {
		this.list.push(element);
	}

	this.indexOf = function(weight, start, end) {
		var start = start || 0,
			end = end || this.list.length - 1,
			pivot = parseInt(start + (end - start) / 2);

		// Base case
		if (end - start <= 1 || this.weights[pivot] === weight) {
			return pivot;
		}

		// Recursive call
		if (this.weights[pivot] < weight) {
			return this.indexOf(weight, pivot, end);
		} else {
			return this.indexOf(weight, start, pivot);
		}
	};
}

SortedList.prototype.insert = function(element, weight) {
	var position = this.indexOf(weight);
	this.list.splice(position + 1, 0, element);
	this.weights.splice(position + 1, 0, weight);
}

SortedList.prototype.getNext = function() {
	this.weights.shift();
	return this.list.shift();
}

SortedList.prototype.exists = function(element) {
	for (var i = 0, elementCount = this.list.length; i < elementCount; i++) {
		if (this.list[i] === element) {
			return true;
		}
	}
	return false;
}

SortedList.prototype.isEmpty = function() {
	return this.list.length === 0;
}

play();