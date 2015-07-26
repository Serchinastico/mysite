SOLUTIONS_COUNT = 10;
VERTEX_RADIUS = 3;
PATH_MIN_WIDTH = 1;
PATH_MAX_WIDTH = 4;
PATH_CURVE_RADIUS = 0.5;

function play() {
	var graph = new Graph(),
		heuristic = new Heuristic(graph);

	var canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");

	canvas.addEventListener('click', function(event) {
		var clickX = event.offsetX,
			clickY = event.offsetY,
			closestVertex = pickClosestVertex(graph, clickX, clickY);

		if (typeof(graph.getStart()) === 'undefined') {
			graph.setStart(closestVertex);
		} else {
			graph.setGoal(closestVertex);
			loop(graph, heuristic);
		}
	});

	canvas.addEventListener('mousemove', function(event) {
		var rect = canvas.getBoundingClientRect(),
			message = (event.clientX - rect.left) + ' ' + (event.clientY - rect.top);
		ctx.clearRect(810, 600, 200, 200);
		ctx.font = '18pt Inconsolata';
		ctx.fillStyle = '#000000';
		ctx.fillText(message, 810, 700);
	}, false);
}

function pickClosestVertex(graph, x, y) {
	var closestVertex = null,
		closestDistance = Infinity;

	graph.each(function(vertex) {
		var fromPosition = graph.getPosition(vertex),
			fromX = fromPosition.x,
			fromY = fromPosition.y,
			deltaX = x - fromX,
			deltaY = y - fromY,
			distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

		if (distance < closestDistance) {
			closestVertex = vertex;
			closestDistance = distance;
		}
	});

	return closestVertex;
}

function loop(graph, heuristic) {
	var solutions = new FixedLengthQueue(SOLUTIONS_COUNT),
		canvas = document.getElementById('visualization'),
		ctx = canvas.getContext("2d");

	setInterval(function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//drawGraph(graph, ctx);
		var path = astar(graph, heuristic);
		solutions.add({
			path: path,
			heat: 1.0
		});
		graph.update(path);
		drawSolutions(graph, solutions, ctx);
	}, 80);
}

function drawGraph(graph, ctx) {
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

			ctx.strokeStyle = '#00AAAA';
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(nx, ny);
			ctx.stroke();
		}
	});
	drawVertices(graph, ctx);
}

function drawSolutions(graph, solutions, ctx) {
	solutions.each(function(i, solution) {
		var path = solution.path,
			heat = solution.heat,
			heatAsChannel = Math.max(16, Math.floor(heat * 255)),
			rChannel = heatAsChannel.toString(16),
			gChannel = (0x10F - heatAsChannel).toString(16),
			bChannel = (0x10F - heatAsChannel).toString(16),
			color = '#' + rChannel + gChannel + bChannel,
			width = heat * (PATH_MAX_WIDTH - PATH_MIN_WIDTH) + PATH_MIN_WIDTH,
			pathFirstPosition = graph.getPosition(path[0]),
			pathSecondPosition = graph.getPosition(path[1]),
			firstToSecondVector = {
				x: pathSecondPosition.x - pathFirstPosition.x,
				y: pathSecondPosition.y - pathFirstPosition.y
			};

		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(pathFirstPosition.x, pathFirstPosition.y);
		ctx.lineTo(
			pathFirstPosition.x + firstToSecondVector.x * PATH_CURVE_RADIUS,
		 	pathFirstPosition.y + firstToSecondVector.y * PATH_CURVE_RADIUS
		 );
		ctx.stroke();

		for (var i = 1, vertexCount = path.length; i < vertexCount; i++) {
			var from = path[i - 1],
				to = path[i],
				next = path[i + 1] ? path[i + 1] : path[i],
				fromPosition = graph.getPosition(from),
				toPosition = graph.getPosition(to),
				nextPosition = graph.getPosition(next),
				fromToVector = {
					x: toPosition.x - fromPosition.x,
					y: toPosition.y - fromPosition.y
				},
				toNextVector = {
					x: nextPosition.x - toPosition.x,
					y: nextPosition.y - toPosition.y
				},
				start = {
					x: fromPosition.x + PATH_CURVE_RADIUS * fromToVector.x,
					y: fromPosition.y + PATH_CURVE_RADIUS * fromToVector.y
				},
				finish = {
					x: toPosition.x + PATH_CURVE_RADIUS * toNextVector.x,
					y: toPosition.y + PATH_CURVE_RADIUS * toNextVector.y
				};

			ctx.strokeStyle = color;
			ctx.lineWidth = width;
			ctx.beginPath();
			ctx.moveTo(start.x, start.y);
			ctx.quadraticCurveTo(toPosition.x, toPosition.y, finish.x, finish.y);
			ctx.stroke();
		}

		solution.heat = Math.max(0, solution.heat - (1 / SOLUTIONS_COUNT));
	});
}

function drawVertices(graph, ctx) {
	ctx.font = 'Bold 10pt Inconsolata';
	graph.each(function(vertex) {
		var position = graph.getPosition(vertex),
			x = position.x,
			y = position.y,
			neighbors = graph.getNeighbors(vertex),
			color = '#000000';

		// Draw the node
		ctx.fillStyle = '#' + color + '0000';
		ctx.beginPath();
		ctx.arc(x, y, VERTEX_RADIUS, 0, 2 * Math.PI);
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
		/*  0  */ [1], [2, 17], [3, 47, 59], [48, 59, 62], [5, 48, 54, 65, 67],
		/*  5  */ [6, 22, 66], [7, 22, 54], [8, 55], [9, 55], [10],
		/* 10  */ [11], [12, 52], [13, 53], [14], [15],
		/* 15  */ [16], [], [18, 23, 58], [19, 58, 61], [20, 21, 63, 69],
		/* 20  */ [21, 22, 63, 64], [5, 6, 22, 66], [], [24], [25, 30],
		/* 25  */ [26, 33], [27], [28], [29, 40, 78], [32, 34, 35, 73],
		/* 30  */ [31, 32], [32, 33], [69], [34], [35],
		/* 35  */ [70, 73, 77], [37, 43, 77], [38, 46, 51], [39], [16],
		/* 40  */ [49, 79], [42, 44, 83], [43, 82], [81], [45, 50],
		/* 45  */ [46], [50, 51], [], [], [],
		/* 50  */ [51], [], [53], [], [67],
		/* 55  */ [56], [], [58, 59], [], [],
		/* 60  */ [61, 62], [63], [65], [], [65],
		/* 65  */ [], [], [68], [], [],
		/* 70  */ [71, 72], [], [], [74], [],
		/* 75  */ [76, 77], [], [], [], [80, 83],
		/* 80  */ [], [], [], [84, 85], [],
		/* 85  */ [], [], [], [], [],
		/* 90  */ [], [], [], [], [],
		/* 95  */ [], [], [], [], [],
	];

	this.positions = [
		/*  0  */ {x: 796, y: 355}, {x: 760, y: 340}, {x: 750, y: 295}, {x: 700, y: 280}, {x: 610, y: 265}, 
		/*  5  */ {x: 580, y: 275}, {x: 550, y: 250}, {x: 490, y: 235}, {x: 470, y: 215}, {x: 460, y: 160}, 
		/* 10  */ {x: 460, y: 140}, {x: 370, y: 130}, {x: 250, y: 135}, {x: 250, y: 205}, {x: 250, y: 300}, 
		/* 15  */ {x: 270, y: 330}, {x: 320, y: 355}, {x: 735, y: 375}, {x: 685, y: 350}, {x: 645, y: 360}, 
		/* 20  */ {x: 620, y: 330}, {x: 575, y: 310}, {x: 535, y: 320}, {x: 765, y: 405}, {x: 750, y: 455}, 
		/* 25  */ {x: 735, y: 515}, {x: 720, y: 575}, {x: 685, y: 565}, {x: 645, y: 570}, {x: 640, y: 510}, 
		/* 30  */ {x: 710, y: 460}, {x: 675, y: 465}, {x: 645, y: 460}, {x: 675, y: 505}, {x: 660, y: 515}, 
		/* 35  */ {x: 565, y: 510}, {x: 475, y: 510}, {x: 275, y: 505}, {x: 275, y: 430}, {x: 260, y: 380}, 
		/* 40  */ {x: 640, y: 635}, {x: 425, y: 640}, {x: 425, y: 585}, {x: 470, y: 575}, {x: 250, y: 635}, 
		/* 45  */ {x: 245, y: 570}, {x: 255, y: 515}, {x: 770, y: 250}, {x: 665, y: 240}, {x: 665, y: 670}, 
		/* 50  */ {x: 225, y: 565}, {x: 220, y: 500}, {x: 345, y: 100}, {x: 265, y: 105}, {x: 575, y: 240},
		/* 55  */ {x: 450, y: 240}, {x: 420, y: 200}, {x: 718, y: 323}, {x: 710, y: 350}, {x: 722, y: 300},
		/* 60  */ {x: 678, y: 311}, {x: 673, y: 335}, {x: 681, y: 281}, {x: 644, y: 330}, {x: 635, y: 305},
		/* 65  */ {x: 640, y: 275}, {x: 598, y: 292}, {x: 603, y: 245}, {x: 610, y: 220}, {x: 640, y: 405},
		/* 70  */ {x: 565, y: 450}, {x: 525, y: 440}, {x: 610, y: 440}, {x: 624, y: 525}, {x: 605, y: 550},
		/* 75  */ {x: 548, y: 525}, {x: 560, y: 550}, {x: 527, y: 505}, {x: 605, y: 600}, {x: 545, y: 640},
		/* 80  */ {x: 555, y: 595}, {x: 520, y: 570}, {x: 380, y: 565}, {x: 515, y: 635}, {x: 525, y: 615},
		/* 85  */ {x: 505, y: 615},
	];

	this.heatMap = {};

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

Graph.prototype.setStart = function(start) {
	this.start = start;
}

Graph.prototype.setGoal = function(goal) {
	this.goal = goal;
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

Graph.prototype.distanceBetween = function(from, to) {
	var fromPosition = this.getPosition(from),
		toPosition = this.getPosition(to),
		fromX = fromPosition.x,
		fromY = fromPosition.y,
		toX = toPosition.x,
		toY = toPosition.y,
		deltaX = toX - fromX,
		deltaY = toY - fromY;

	var heat = this.heatMap[from + '_' + to] || 1;
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY) * heat;
}

Graph.prototype.each = function(callback) {
	for (var i = 0; i < this.vertexCount; i++) {
		callback(i);
	}
}

Graph.prototype.getPosition = function(vertex) {
	return this.positions[vertex];
}

Graph.prototype.update = function(solution) {
	// Adding some cold to the hotedges
	for (var heat in this.heatMap) {
		if (this.heatMap.hasOwnProperty(heat)) {
			this.heatMap[heat] = Math.max(1, this.heatMap[heat] * 0.6);
		}
	}

	for (var i = 1, vertexCount = solution.length; i < vertexCount; i++) {
		var from = solution[i],
			to = solution[i - 1],
			heatKey = to + '_' + from,
			prevHeat = this.heatMap[heatKey] || 1;
		this.heatMap[heatKey] = Math.min(prevHeat * 3, 255);
	}
}

/**
<------------------- HEURISTIC ----------------->
*/
function Heuristic(graph) {
	this.graph = graph;
}

Heuristic.prototype.estimate = function(from, to) {
	return this.graph.distanceBetween(from, to);
}

/**
<------------------- SORTED LIST ----------------->
*/
function SortedList(element, weight) {
	this.list = [];
	this.weights = [];
	if (typeof(element) !== 'undefined') {
		this.list.push(element);
		this.weights.push(weight);
	}

	this.indexOf = function(weight, start, end) {
		var start = start || 0,
			end = end || this.list.length - 1,
			pivot = parseInt(start + (end - start) / 2);

		// Base cases
		if (start > end) {
			// Empty list
			return pivot;
		} else if (start === end) {
			// Unitary list
			return (weight <= this.weights[pivot]) ? pivot : pivot + 1;
		} else if (start === end - 1) {
			// 2 elements list
			return (weight <= this.weights[pivot]) ? pivot : this.indexOf(weight, pivot + 1, end);
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
	this.list.splice(position, 0, element);
	this.weights.splice(position, 0, weight);
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

function FixedLengthQueue(maxElements) {
	this.maxElements = maxElements;
	this.queue = [];
}

FixedLengthQueue.prototype.add = function(element) {
	var length = this.queue.push(element);
	if (length > this.maxElements) {
		this.queue.shift();
	}
}

FixedLengthQueue.prototype.each = function(callback) {
	for (var i = 0, elementCount = this.queue.length; i < elementCount; i++) {
		callback(i, this.queue[i]);
	}
}

play();