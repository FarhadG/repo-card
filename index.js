var RepoCard = RepoCard || (function() {

		// gets all of the parameters from a given script
		function getRepoCardParams(script) {
			var params = {};
			var attributes = script.attributes;
			for (var label in attributes) {
				if (attributes.hasOwnProperty(label)) {
					var node = attributes[label];
					params[node.name] =  node.value;
				}
			}
			return params;
		}

		// get the correct script based on the id
		function getRepoCardScript() {
			var scripts = document.getElementsByTagName('script');
			for (var i = 0, len = scripts.length; i < len; i++) {
				var script = scripts[i];
				var id = script.getAttribute('id');
				if (id === 'repo-card-lib') return scripts[i];
			}
		}

		// what kicks things off
		function init() {
			var script = getRepoCardScript();
			var params = getRepoCardParams(script);
			console.log(params)
		}

		// let the magic begin
		init();

		return {
			name: 'Repo Card',
			version: '0.0.1'
		};

	}());


