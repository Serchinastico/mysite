var TOP_LEFT_CORNER = '180090',
	TOP_RIGHT_CORNER = '180270',
	BOTTOM_LEFT_CORNER = '000090',
	BOTTOM_RIGHT_CORNER = '000270',
	VERTICAL_LINE = '000180',
	HORIZONTAL_LINE = '090270';

representations = {
	'0': 
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, VERTICAL_LINE, HORIZONTAL_LINE, VERTICAL_LINE, VERTICAL_LINE],
			[VERTICAL_LINE, VERTICAL_LINE, HORIZONTAL_LINE, VERTICAL_LINE, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'1': 
		[
			[null, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, null],
			[null, BOTTOM_LEFT_CORNER, TOP_RIGHT_CORNER, VERTICAL_LINE, null],
			[null, null, VERTICAL_LINE, VERTICAL_LINE, null],
			[null, null, VERTICAL_LINE, VERTICAL_LINE, null],
			[null, null, VERTICAL_LINE, VERTICAL_LINE, null],
			[null, null, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER, null],
		],
	'2':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'3':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'4':
		[
			[TOP_LEFT_CORNER, TOP_RIGHT_CORNER, null, TOP_LEFT_CORNER, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, VERTICAL_LINE, null, VERTICAL_LINE, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[null, null, null, VERTICAL_LINE, VERTICAL_LINE],
			[null, null, null, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER]
		],
	'5':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'6':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'7': 
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[null, null, null, VERTICAL_LINE, VERTICAL_LINE],
			[null, null, null, VERTICAL_LINE, VERTICAL_LINE],
			[null, null, null, VERTICAL_LINE, VERTICAL_LINE],
			[null, null, null, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER],
		],
	'8':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER]
		],
	'9':
		[
			[TOP_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER],
			[VERTICAL_LINE, TOP_LEFT_CORNER, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[VERTICAL_LINE, BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, BOTTOM_RIGHT_CORNER, VERTICAL_LINE],
			[BOTTOM_LEFT_CORNER, HORIZONTAL_LINE, HORIZONTAL_LINE, TOP_RIGHT_CORNER, VERTICAL_LINE],
			[null, null, null, VERTICAL_LINE, VERTICAL_LINE],
			[null, null, null, BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER]
		],
	':':
		[
			[null, null],
			[TOP_LEFT_CORNER, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER],
			[TOP_LEFT_CORNER, TOP_RIGHT_CORNER],
			[BOTTOM_LEFT_CORNER, BOTTOM_RIGHT_CORNER],
			[null, null],
		]
};

var transitionSpeed = 5;

/**
 * Main function.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function play() {
	Zepto(function($) {
		drawClocks();
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
		radius = canvas.data('radius'),
		clockHands = createClockHands(radius, rows, columns);

	canvas.append(clockHands);
}

/**
 * Animates the clock hands.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 */
function animateClocks() {
	var clockHandsData = getClockHandsData(),
		rowsCount = clockHandsData[0].length,
		t = 0;

	setInterval(function() {
		var time = new Date(),
			hours = time.getHours(),
			minutes = time.getMinutes(),
			timeText = (hours < 10 ? '0' + hours : hours) +
						':' +
						(minutes < 10 ? '0' + minutes : minutes);

		$('.clock-hand').each(function (index, item) {
			var item = $(item);
			var row = item.data('row');
			var column = item.data('column');
			var isHoursHand = item.data('is-hours-hand');
			var data = clockHandsData[column][row];
			var angle = (isHoursHand) ? t : (1.5 * t + 180);
			angle = (angle + (10 * column + 10 * row)) % 360;
			if (angle < 10) {
				angle = '00' + angle;
			} else if (angle >= 10 && angle < 100) {
				angle = '0' + angle;
			}

			// Special clock
			if (row > 0 && row < rowsCount - 1) {
				var iDigit,
					deltaColumn;

				if (column > 0 && column <= 5) {
					iDigit = 0;
					deltaColumn = 1;
				} else if (column > 5 && column <= 10) {
					iDigit = 1;
					deltaColumn = 6;
				} else if (column > 10 && column <= 12) {
					iDigit = 2; // ':'
					deltaColumn = 11;
				} else if (column > 12 && column <= 17) {
					iDigit = 3;
					deltaColumn = 13;
				} else {
					iDigit = 4;
					deltaColumn = 18;
				}

				var character = timeText[iDigit],
					representation = representations[character];

				if (representation) {
					var possibleAngle = representation[row - 1][column - deltaColumn];
					if (possibleAngle) {
						if (isHoursHand) {
							data.to = possibleAngle.substr(0, 3) + data.to.substr(3);
						} else {
							data.to = data.to.substr(0, 3) + possibleAngle.substr(3);
						}
						angle = isHoursHand ? possibleAngle.substr(0, 3) : possibleAngle.substr(3);
					} else {
						if (isHoursHand) {
							data.current = angle + '' + data.current.substr(3);
						} else {
							data.current = data.current.substr(0, 3) + '' + angle;
						}
					}
				}

				if (isHoursHand) {
					if (parseInt(data.current.substr(0, 3)) >= parseInt(data.to.substr(0, 3)) - transitionSpeed &&
						parseInt(data.current.substr(0, 3)) <= parseInt(data.to.substr(0, 3)) + transitionSpeed) {
						data.current = data.to.substr(0, 3) + data.current.substr(3);
					} else {
						var nextAngle = (parseInt(data.current.substr(0, 3)) + transitionSpeed) % 360;
						if (nextAngle < 10) {
							nextAngle = '00' + nextAngle;
						} else if (nextAngle >= 10 && nextAngle < 100) {
							nextAngle = '0' + nextAngle;
						}
						data.current = nextAngle + data.current.substr(3);
					}
				} else {
					if (parseInt(data.current.substr(3)) >= parseInt(data.to.substr(3)) - transitionSpeed && 
						parseInt(data.current.substr(3)) <= parseInt(data.to.substr(3)) + transitionSpeed) {
						data.current = data.current.substr(0, 3) + data.to.substr(3);
					} else {
						var nextAngle = (parseInt(data.current.substr(3)) + transitionSpeed) % 360;
						if (nextAngle < 10) {
							nextAngle = '00' + nextAngle;
						} else if (nextAngle >= 10 && nextAngle < 100) {
							nextAngle = '0' + nextAngle;
						}
						data.current = data.current.substr(0, 3) + nextAngle;
					}
				}
				angle = isHoursHand ? data.current.substr(0, 3) : data.current.substr(3);
			}
			item.attr('transform', 'rotate(' + angle + ' ' + data.left + ' ' + (data.top - 1) + ')');
		});

		t += 4;
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
		width: radius * 2,
		height: radius * 2
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
	var handLength = isHoursHand ? 0.7 : 0.9,
		x = 2 * radius * column,
		y = 2 * radius * row;

	return createSVGNode('path', {
		'class': 'clock-hand',
		'stroke': "black",
		'stroke-width': "2",
		'stroke-linecap': "round",
		'd': "M" + (x + radius) + " " + (y + radius) + " " + (x + radius) + " " + (y + (1 - handLength) * radius),
		'data-row': row,
		'data-column': column,
		'data-is-hours-hand': isHoursHand
	});
}

/**
 * Returns all the data for all the clock hands.
 *
 * @author Sergio Gutiérrez <sergio.gutierrez.mota@gmail.com>
 * @return {Object[]} data
 */
function getClockHandsData() {
	var data = [];
	$('.clock-hand').each(function (index, item) {
		var item = $(item);

		if (item.data('isHoursHand')) {
			return;
		}

		var column = item.data('column');
		if (!data[column]) {
			data.push([]);
		}
		//var position = item.position();
		var clockHandD = item.attr('d');
		var matches = clockHandD.match(/^M(\d+)\s(\d+)/);
		data[column].push({
			left: parseInt(matches[1]),
			top: parseInt(matches[2]),
			from: '000000',
			to: '000000',
			current: '000000'
		});
	});

	return data;
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