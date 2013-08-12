function play() {
	var graph = new Graph(),
		heuristic = new Heuristic();

	console.log(astar(graph, heuristic));
}

/**
graph
	getStart()
	getGoal()
	getNeighbors(node)
	distanceBetween(from, to) // "real" distance
	isEmpty()
heuristic
	estimate(from, to)
openSet
	insert
	exists

*/
function astar(graph, heuristic) {
	var start = graph.getStart(),
		goal = graph.getGoal(),
		closedSet = [],
		openSet = new SortedList(start), // sorted by f score (lower f => lower index)
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

			if (neighbor in closedSet && gScore >= gScores[neighbor]) {
				continue;
			}

			if (!openSet.exists(neighbor) || gScore < gScores[neighbor]) {
				cameFrom[neighbor] = current;
				gScores[neighbors] = gScore;
				fScores[neighbor] = gScore + heuristic.estimate(neighbor, goal);
				if (!openSet.exists(neighbor)) {
					openSet.insert(neighbor);
				}
			}
		}
	}
	return false;
}

function reconstructPath(cameFrom, node) {
	var path = node,
		current = cameFrom[node];

	while (typeof(current) !== 'undefined') {
		path = current + ' -> ' + path;
		current = cameFrom[current];
	}

	return path;
}

/**
<------------------- GRAPH ----------------->
*/
function Graph() {
	this.graph = [
		{
			neighbors: [1, 2]
		},
		{
			neighbors: [2]
		},
		{
			neighbors: [3]
		},
		{
			neighbors: [4]
		},
		{
			neighbors: []
		}
	];
}

Graph.prototype.getStart = function() {
	return 0;
}

Graph.prototype.getGoal = function() {
	return 4;
}

Graph.prototype.getNeighbors = function(node) {
	return this.graph[node].neighbors;
}

Graph.prototype.distanceBetween = function(from, to) {
	return 1;
}

/**
<------------------- HEURISTIC ----------------->
*/
function Heuristic() {

}

Heuristic.prototype.estimate = function(from, to) {
	return to - from;
}

/**
<------------------- SORTED LIST ----------------->
*/
function SortedList(element) {
	this.list = [];
	if (typeof(element) !== 'undefined') {
		this.list.push(element);
	}

	this.indexOf = function(element, start, end) {
		var start = start || 0,
			end = end || this.list.length - 1,
			pivot = parseInt(start + (end - start) / 2);

		// Base case
		if (end - start <= 1 || this.list[pivot] === element) {
			return pivot;
		}

		// Recursive call
		if (this.list[pivot] < element) {
			return this.indexOf(element, pivot, end);
		} else {
			return this.indexOf(element, start, pivot);
		}
	};
}

SortedList.prototype.insert = function(element) {
	this.list.splice(this.indexOf(element) + 1, 0, element);
}

SortedList.prototype.getNext = function() {
	return this.list.shift();
}

SortedList.prototype.exists = function(element) {
	var possibleIndex = this.indexOf(element);
	return this.list[possibleIndex] === element;
}

SortedList.prototype.isEmpty = function() {
	return this.list.length === 0;
}

play();