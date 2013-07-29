Zepto(function($) {
	// Create the code box
	var codeNode = $('#code')[0];
	if (codeNode) {
		$.get($(codeNode).data('code-url'), {
			processData: false
		}, function(data) {
			var code = CodeMirror(codeNode, {
				value: data,
				mode: "javascript",
				indentWithTabs: true,
				indentUnit: 4,
				lineNumbers: true
			});
		});
	}
});