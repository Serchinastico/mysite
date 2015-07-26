function AmstradConsole(consoleElement) {
	this._consoleElement = consoleElement;
	this._isProcessing = false;
	this._queue = [];
	this._showCaret = false;
}

AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS = 4;

AmstradConsole.prototype.print = function(text, sleepTimeBetweenLetters) {
	var sleepTimeBetweenLetters = sleepTimeBetweenLetters || AmstradConsole._SLEEP_TIME_BETWEEN_LETTER_PRINTS;

	for (var i = 0; i < text.length; i++) {
		this._queue.push(new ConsoleCommand(ConsoleCommand.PRINT_TYPE, text[i]));
		this._queue.push(new ConsoleCommand(ConsoleCommand.SLEEP_TYPE, sleepTimeBetweenLetters));
	}
	this._queue.pop();

	this._flush();
};

AmstradConsole.prototype.sleep = function(time) {
	this._queue.push(new ConsoleCommand(ConsoleCommand.SLEEP_TYPE, time));

	this._flush();
};

AmstradConsole.prototype.setShowCaret = function(showCaret) {
	var commandType = showCaret ? ConsoleCommand.SHOW_CARET_TYPE : ConsoleCommand.HIDE_CARET_TYPE;
	this._queue.push(new ConsoleCommand(commandType, null));
};

AmstradConsole.prototype.clear = function() {
	this._queue.push(new ConsoleCommand(ConsoleCommand.CLEAR_TYPE, null));
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
	var commandType = command.getType();

	if (commandType === ConsoleCommand.PRINT_TYPE) {
		var inputText = command.getData();

		if (this._showCaret) {
			inputText += '█';
		}

		this._removeCaret();
		this._consoleElement.textContent += inputText;
		this._processNextCommand();
	} else if (commandType === ConsoleCommand.SLEEP_TYPE) {
		setTimeout(this._processNextCommand.bind(this), command.getData());
	} else if (commandType === ConsoleCommand.SHOW_CARET_TYPE) {
		this._consoleElement.textContent += '█';
		this._showCaret = true;
		this._processNextCommand();
	} else if (commandType === ConsoleCommand.HIDE_CARET_TYPE) {
		this._removeCaret();
		this._showCaret = false;
		this._processNextCommand();
	} else if (commandType === ConsoleCommand.CLEAR_TYPE) {
		this._consoleElement.textContent = '';
		this._processNextCommand();
	}
};

AmstradConsole.prototype._removeCaret = function() {
	if (this._consoleElement.textContent.slice(-1) === '█') {
		this._consoleElement.textContent = this._consoleElement.textContent.slice(0, -1);
	}
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