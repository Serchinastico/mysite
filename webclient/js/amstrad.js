function resize() {
	// TODO
}

window.onload = function() {
	resize();

	var consoleElement = document.getElementById('console');
	var amstradConsole = new AmstradConsole(consoleElement);

	amstradConsole.print(' Amstrad 128K Microcomputer  (v3)\n\n ©1985 Amstrad Consumer Electronics plc\n           and Locomotive Software Ltd.\n\n BASIC 1.1\n');
	amstradConsole.sleep(500);
	amstradConsole.print('READY\n');
	amstradConsole.setShowCaret(true);
	amstradConsole.sleep(1000);
	amstradConsole.print('run"cv', 150);
	amstradConsole.setShowCaret(false);
	amstradConsole.sleep(1500);
	amstradConsole.clear();
};