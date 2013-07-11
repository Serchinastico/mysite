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
function drawWashingtonRlg(graph) {
	var canvas = $('#visualization');

	var source = $('<svg><ellipse id="source" cx="50" cy="50" rx="50" ry="20" fill="#555" /></svg>');
	canvas.append(source);
}