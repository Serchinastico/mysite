/**
 * The most basic system for namespacing in javascript I could think of.
 *
 * @author Sergio Gutiérrez Mota <sergio.gutierrez.mota@gmail.com>
 */
(function () {
	var defaultProjectName = 'My',
		projectName = null;

	window.createProject = function(name) {
		if (typeof name !== 'string') {
			name = defaultProjectName;
		}

		if (typeof window[name] === 'undefined') {
			window[name] = {};
		} else {
			console.log('Project already exists in the global namespace');
		}

		projectName = name;
		// Avoid calling this method more than once
		window.createProject = function() {
			// Nothing here...
		}
	}

	window.namespace = function(namespace, content) {
		// Default project name if noone provided
		if (projectName == null) {
			createProject();
		}

		var breadcrumbs = namespace.split('.'),
			breadcrumbsCount = breadcrumbs.length,
			currentNamespace = window[projectName];

		for (var i = 0; i < breadcrumbsCount; i++) {
			var partialNamespace = breadcrumbs[i];

			if (typeof currentNamespace[partialNamespace] === 'undefined') {
				currentNamespace[partialNamespace] = {};
			}

			currentNamespace = currentNamespace[partialNamespace];
		}
	}
})();