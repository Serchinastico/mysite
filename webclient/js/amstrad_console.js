function AmstradConsole(consoleElement) {
	this._consoleElement = consoleElement;
	this._isProcessing = false;
	this._queue = [];
	this._showCaret = false;
}

AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS = 4;
AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS_VARIATION = 0;
AmstradConsole._CARET = '█';

AmstradConsole.prototype.print = function(text, options) {
	var sleepTimeBetweenLetters = AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS;
	var sleepTimeBetweenLettersVariation = AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS_VARIATION;

	if (options) {
		sleepTimeBetweenLetters = options.sleepTimeBetweenLetters || AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS;
		sleepTimeBetweenLettersVariation = options.sleepTimeBetweenLettersVariation || AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS_VARIATION;
	}

	for (var i = 0; i < text.length; i++) {
		var sleepTimeVariation = sleepTimeBetweenLetters + sleepTimeBetweenLettersVariation * Math.random();

		this._queue.push(new AmstradConsole.PrintCommand(this, text[i]));
		this._queue.push(new AmstradConsole.SleepCommand(this, sleepTimeVariation));
	}
	this._queue.pop();

	this._flush();
};

AmstradConsole.prototype.sleep = function(time) {
	this._queue.push(new AmstradConsole.SleepCommand(this, time));

	this._flush();
};

AmstradConsole.prototype.setShowCaret = function(showCaret) {
	if (showCaret) {
		this._queue.push(new AmstradConsole.ShowCaretCommand(this));
	} else {
		this._queue.push(new AmstradConsole.HideCaretCommand(this));
	}
};

AmstradConsole.prototype.clear = function() {
	this._queue.push(new AmstradConsole.ClearCommand(this));
};

AmstradConsole.prototype._flush = function() {
	if (!this._isProcessing) {
		this._isProcessing = true;
		this._processNextCommand();
	}
};

AmstradConsole.prototype._processNextCommand = function() {
	if (this._queue.length === 0) {
		this._isProcessing = false;
		return;
	}

	var command = this._queue.shift();
	command.execute();

	// if (commandType === ConsoleCommand.PRINT_TYPE) {
	// 	var inputText = command.getData();

	// 	if (this._showCaret) {
	// 		inputText += AmstradConsole._CARET;
	// 	}

	// 	this._removeCaret();
	// 	this._consoleElement.textContent += inputText;
	// 	this._processNextCommand();
	// } else if (commandType === ConsoleCommand.SLEEP_TYPE) {
	// 	setTimeout(this._processNextCommand.bind(this), command.getData());
	// } else if (commandType === ConsoleCommand.SHOW_CARET_TYPE) {
	// 	this._consoleElement.textContent += AmstradConsole._CARET;
	// 	this._showCaret = true;
	// 	this._processNextCommand();
	// } else if (commandType === ConsoleCommand.HIDE_CARET_TYPE) {
	// 	this._removeCaret();
	// 	this._showCaret = false;
	// 	this._processNextCommand();
	// } else if (commandType === ConsoleCommand.CLEAR_TYPE) {
	// 	this._consoleElement.textContent = '';
	// 	this._processNextCommand();
	// }
};

AmstradConsole.prototype._removeCaret = function() {
	if (this._consoleElement.textContent.slice(-1) === AmstradConsole._CARET) {
		this._consoleElement.textContent = this._consoleElement.textContent.slice(0, -1);
	}
};

AmstradConsole.PrintCommand = function(console, text) {
	this._console = console;
	this._text = text;
};

AmstradConsole.PrintCommand.prototype.execute = function() {
	var inputText = this._text;

	if (this._console._showCaret) {
		inputText += AmstradConsole._CARET;
	}

	this._console._removeCaret();
	this._console._consoleElement.textContent += inputText;
	this._console._processNextCommand();
};

AmstradConsole.SleepCommand = function(console, timeMs) {
	this._console = console;
	this._timeMs = timeMs;
};

AmstradConsole.SleepCommand.prototype.execute = function() {
	setTimeout(this._console._processNextCommand.bind(this._console), this._timeMs);
};

AmstradConsole.ShowCaretCommand = function(console) {
	this._console = console;
};

AmstradConsole.ShowCaretCommand.prototype.execute = function() {
	this._console._consoleElement.textContent += AmstradConsole._CARET;
	this._console._showCaret = true;
	this._console._processNextCommand();
};

AmstradConsole.HideCaretCommand = function(console) {
	this._console = console;
};

AmstradConsole.HideCaretCommand.prototype.execute = function() {
	this._console._removeCaret();
	this._console._showCaret = false;
	this._console._processNextCommand();
};

AmstradConsole.ClearCommand = function(console) {
	this._console = console;
};

AmstradConsole.ClearCommand.prototype.execute = function() {
	this._console._consoleElement.textContent = '';
	this._console._processNextCommand();
};

function ConsoleCommand(type, data) {
	this._type = type;
	this._data = data;
}

ConsoleCommand.PRINT_TYPE = 'print';
ConsoleCommand.SLEEP_TYPE = 'sleep';
ConsoleCommand.SHOW_CARET_TYPE = 'show_caret';
ConsoleCommand.HIDE_CARET_TYPE = 'hide_caret';
ConsoleCommand.CLEAR_TYPE = 'clear';

ConsoleCommand.prototype.getType = function() {
	return this._type;
};

ConsoleCommand.prototype.getData = function() {
	return this._data;
};