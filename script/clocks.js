var canvas = $('#visualization');
	canvasHeight = canvas.height(),
	canvasWidth = canvas.width(),
	rows = $('.clock-row');

for (var x = 0; x < 10; x++) {
	var clockRow = $(rows[x]);
	for (var y = 0; y < 18; y++) {
		var clock = createObjectNode({
			src: 'img/clock.svg',
			width: '50',
			height: '50'
		});
		clockRow.append(clock);
	}
}



/**
 * Creates a new Object node from an Object.
 *
 * @param {Object} data
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function createObjectNode(data) {
	var node = document.createElement('img');

	for (attribute in data) {
		if (data.hasOwnProperty(attribute)) {
			node.setAttribute(attribute, data[attribute]);
		}
	}
	node.setAttribute('class', 'clock');

	return node;
}