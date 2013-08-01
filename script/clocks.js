function test() {
	var canvas = $('#visualization');
		canvasHeight = canvas.height(),
		canvasWidth = canvas.width(),
		rows = $('.clock-row'),
		columns = 20,
		clockRadius = 40;

	var clockHands = createSVGNode('svg', {
		version: '1.1',
		id: 'clock-hands'
	});
	for (var x = 0, rowsCount = rows.length; x < rowsCount; x++) {
		var clockRow = $(rows[x]);
		for (var y = 0; y < columns; y++) {
			var clock = createNode('img', {
				src: 'img/clock.svg',
				width: clockRadius,
				height: clockRadius
			});
			clockRow.append(clock);

			var clockHand1 = createSVGNode('path', {
				'class': 'clock-hand',
				'stroke': "black",
				'stroke-width': "2",
				'stroke-linecap': "round",
				'd': "M" + (clockRadius * y + clockRadius / 2) + " " + (clockRadius * x + clockRadius / 2) + " " + (clockRadius * y + clockRadius * 0.8) + " " + (clockRadius * x + clockRadius / 2),
				'data-x': x,
				'data-y': y,
				'data-i-hand': 1
			});
			var clockHand2 = createSVGNode('path', {
				'class': 'clock-hand',
				'stroke': "black",
				'stroke-width': "2",
				'stroke-linecap': "round",
				'd': "M" + (clockRadius * y + clockRadius / 2) + " " + (clockRadius * x + clockRadius / 2) + " " + (clockRadius * y + clockRadius * 0.9) + " " + (clockRadius * x + clockRadius / 2),
				'data-x': x,
				'data-y': y,
				'data-i-hand': 2
			});
			clockHands.append(clockHand1);
			clockHands.append(clockHand2);
		}
	}
	canvas.append(clockHands);

	Zepto(function($) {
		var positions = [];
		$('.clock-hand').each(function (index, item) {
			if ((index & 1) == 0) {
				return;
			}

			var item = $(item);
			var x = item.data('x');
			if (!positions[x]) {
				positions.push([]);
			}
			var position = item.position();
			positions[x].push({
				top: position.top,
				left: position.left
			});
		});

		var t = 0;
		setInterval(function() {
			$('.clock-hand').each(function (index, item) {
				var item = $(item);
				var x = item.data('x');
				var y = item.data('y');
				var iHand = item.data('i-hand');
				var position = positions[x][y];
				var newt = (iHand === 1) ? t : (t + 180);
				newt += 10 * x + 10 * y;
				item.attr('transform', 'rotate(' + newt + ' ' + position.left + ' ' + position.top + ')');
			});

			t += 6;
		}, 20);
	});
}

/**
 * Creates a new Object node from an Object.
 *
 * @param {Object} data
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function createNode(name, data) {
	var node = document.createElement(name);

	for (attribute in data) {
		if (data.hasOwnProperty(attribute)) {
			node.setAttribute(attribute, data[attribute]);
		}
	}
	node.setAttribute('class', 'clock');

	return node;
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

	return $(node);
}

test();