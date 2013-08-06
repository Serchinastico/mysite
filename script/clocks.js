/**
 * Main function.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function play() {
	drawClocks();
	Zepto(function($) {
		animateClocks();
	});
}

/**
 * Draws the clocks.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function drawClocks() {
	var canvas = $('#visualization');
		canvasHeight = canvas.height(),
		canvasWidth = canvas.width(),
		rows = canvas.data('rows'),
		columns = canvas.data('columns'),
		radius = 40,
		clockHands = createClockHands(radius, rows, columns);

	canvas.append(clockHands);
}

/**
 * Animates the clock hands.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function animateClocks() {
	var positions = getClockHandsPositions(),
		t = 0;

	setInterval(function() {
		$('.clock-hand').each(function (index, item) {
			var item = $(item);
			var row = item.data('row');
			var column = item.data('column');
			var isHoursHand = item.data('is-hours-hand');
			var position = positions[column][row];
			var newt = (isHoursHand) ? t : (t + 180);
			newt += 10 * column + 10 * row;
			item.attr('transform', 'rotate(' + newt + ' ' + position.left + ' ' + position.top + ')');
		});

		t += 6;
	}, 20);
}

/**
 * Returns the HTML representation of the clock hands.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @param {int} radius
 * @param {int} rows
 * @param {int} columns
 * @return {Object}
 */
function createClockHands(radius, rows, columns) {
	var clockRows = $('.clock-row'),
		clockHands = createSVGNode('svg', {
		version: '1.1',
		id: 'clock-hands'
	});

	for (var row = 0; row < rows; row++) {
		var clockRow = $(clockRows[row]);
		for (var column = 0; column < columns; column++) {
			var clockBackground = createClockBackground(radius),
				hoursHand = createClockHand(radius, row, column, true),
				minutesHand = createClockHand(radius, row, column, false);

			clockRow.append(clockBackground);
			clockHands.append(hoursHand);
			clockHands.append(minutesHand);
		}
	}
	return clockHands;
}

/**
 * Returns the HTML representation of the clock background.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @param {int} radius
 * @return {Object}
 */
function createClockBackground(radius) {
	return createNode('img', {
		src: 'img/clock.svg',
		width: radius,
		height: radius
	});
}

/**
 * Returns the HTML representation of a clock hand.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @param {int} radius
 * @param {int} row
 * @param {int} column
 * @param {bool} isHoursHand
 * @return {Object}
 */
function createClockHand(radius, row, column, isHoursHand) {
	var handLength = isHoursHand ? 0.8 : 0.9,
		x = radius * column,
		y = radius * row,
		center = radius / 2;

	return createSVGNode('path', {
		'class': 'clock-hand',
		'stroke': "black",
		'stroke-width': "2",
		'stroke-linecap': "round",
		'd': "M" + (x + center) + " " + (y + center) + " " + (x + radius * handLength) + " " + (y + center),
		'data-row': row,
		'data-column': column,
		'data-is-hours-hand': isHoursHand
	});
}

/**
 * Returns the absolute position of all the clock hands.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @return {Object[]} data
 */
function getClockHandsPositions() {
	var positions = [];
	$('.clock-hand').each(function (index, item) {
		var item = $(item);

		if (item.data('isHoursHand')) {
			return;
		}

		var column = item.data('column');
		if (!positions[column]) {
			positions.push([]);
		}
		var position = item.position();
		positions[column].push({
			top: position.top,
			left: position.left
		});
	});

	return positions;
}

/**
 * Creates a new Object node from an Object.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @param {string} name
 * @param {Object} data
 * @return {Object}
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
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @param {String} name
 * @param {Object} data
 * @return {Object}
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

play();