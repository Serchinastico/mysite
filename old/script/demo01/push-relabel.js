/**
 * Creates a new Washingtong-RLG graph
 * Extracted from Network Flows and Matching: First Dimacs Implementation Challenge.
 *
 * @param {int} rows
 * @param {int} columns
 * @param {int} [maxCapacity]
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function createWashingtonRlg(rows, columns, maxCapacity) {
	var maxCapacity = maxCapacity || 10000;

	var vertices = [];
	var edges = [];
	var iEdge = 0; // Helpful index to avoid counting the number of elements of edges

	var sourceIndex = 0;
	var sinkIndex = 1 + rows * columns;

	// Source connecting to all the vertices of the first column
	vertices.push({
		edges: []
	});
	for (var row = 0; row < rows; row++) {
		vertices[sourceIndex].edges.push(iEdge++);
		edges.push({
			target: 1 + row,
			capacity: Math.floor(Math.random() * maxCapacity + 1)
		})
	}

	// Usual case: each vertex points to 3 (random vertices) of the next column
	var lastColumn = columns - 1;
	for (var column = 0; column < lastColumn; column++) {
		for (var row = 0; row < rows; row++) {
			var minVertexIndex = 1 + (column + 1) * rows;
			var maxVertexIndex = (column + 2) * rows;
			vertices.push({
				edges: [iEdge++, iEdge++, iEdge++]
			});
			for (var i = 0; i < 3; i++) {
				edges.push({
					target: Math.floor(Math.random() * maxVertexIndex + minVertexIndex),
					capacity: Math.floor(Math.random() * maxCapacity + 1)
				});
			}
		}
	}

	// The last column has a different processing: each vertex connects with the sink
	for (var row = 0; row < rows; row++) {
		vertices.push({
			edges: [iEdge++]
		});
		edges.push({
			target: sinkIndex,
			capacity: Math.floor(Math.random() * maxCapacity + 1)
		});
	}

	// Add the sink vertex
	vertices.push({
		edges: []
	});

	return {
		vertices: vertices,
		edges: edges,
		rows: rows,
		columns: columns
	};
}

/**
 * Renders a new Washingtong-RLG graph
 *
 * @param {Object} graph
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function drawWashingtonRlg(graph, canvas) {
	var canvasHeight = canvas.height(),
		canvasWidth = canvas.width(),
		margin = {
			left: 20,
			right: 20,
			top: 20,
			bottom: 20
		},
		nodeRadiusX = 10,
		nodeRadiusY = 4;

	var source = createSVGNode('ellipse', {
		id: 'source',
		cx: nodeRadiusX + margin.left,
		cy: canvasHeight / 2,
		rx: nodeRadiusX,
		ry: nodeRadiusY,
		fill: '#444'
	});
	canvas.append(source);

	var sink = createSVGNode('ellipse', {
		id: 'sink',
		cx: canvasWidth - nodeRadiusX - margin.right,
		cy: canvasHeight / 2, 
		rx: nodeRadiusX,
		ry: nodeRadiusY,
		fill: '#444'
	});
	canvas.append(sink);

	// Distance between columns
	var xDistance = (canvasWidth - margin.left - margin.right) / (graph.columns + 1);
	// Distance between rows
	var yDistance = (canvasHeight - margin.top - margin.bottom) / graph.rows;

	for (var column = 0; column < graph.columns; column++) {
		for (var row = 0; row < graph.rows; row++) {
			var index = 1 + row + (column * graph.rows);
			var vertex = graph.vertices[index];

			// Draw the outgoing edges
			var fromX = Math.floor(margin.left + (column + 1) * xDistance),
				fromY = Math.floor(margin.top + (row + 0.5) * yDistance),
				edges = vertex.edges;
			for (var i = 0, length = edges.length; i < length; i++) {
				var edgeIndex = edges[i],
					target = graph.edges[edgeIndex].target,
					columnTarget = Math.floor(1 + (target - 1) / graph.rows),
					rowTarget = (target - 1) % graph.rows,
					edge = document.createElementNS("http://www.w3.org/2000/svg", 'path'),
					toX = Math.floor(margin.left + columnTarget * xDistance),
					toY = Math.floor(margin.top + (rowTarget + 0.5) * yDistance);
				edge.setAttributeNS(null, 'd', 'M ' + fromX + ' ' + fromY + ' Q ' + fromX + ' ' + toY + ' ' + toX + ' ' + toY);
				edge.setAttributeNS(null, 'stroke', '#DDD');
				edge.setAttributeNS(null, 'fill', 'transparent');
				canvas.append(edge);
			}
		}
	}

	for (var column = 0; column < graph.columns; column++) {
		for (var row = 0; row < graph.rows; row++) {
			var index = 1 + row + (column * graph.rows);
			// Draw the vertex
			var node = createSVGNode('ellipse', {
				cx: margin.left + (column + 1) * xDistance,
				cy: margin.top + (row + 0.5) * yDistance, 
				rx: nodeRadiusX,
				ry: nodeRadiusY,
				fill: '#444'
			});
			canvas.append(node);
		}
	}
}

/**
 * Creates a new SVG node from an Object.
 *
 * @param {String} name
 * @param {Object} data
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function createSVGNode(name, data) {
	xmlns = "http://www.w3.org/2000/svg";
	var node = document.createElementNS(xmlns, name);

	for (attribute in data) {
		if (data.hasOwnProperty(attribute)) {
			node.setAttributeNS(null, attribute, data[attribute]);
		}
	}

	return node;
}

function test() {
	var graph = createWashingtonRlg(10, 10);
	var canvas = $('#visualization');
	drawWashingtonRlg(graph, canvas);
}