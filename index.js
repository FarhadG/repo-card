var RepoCardLib = RepoCardLib || (function() {

		/**
		 * RepoCard constructor
		 *
		 * @returns {*}
		 * @constructor
		 */

		function RepoCard() {
			if (!(this instanceof RepoCard)) {
				return new RepoCard();
			}
			this.params = _getRepoCardParams();
			this.configure();
		}

		// Super BETA
		RepoCard.version = '0.0.1';

		// gets all of the parameters from a given script
		function _getRepoCardParams(script) {
			var script = _getRepoCardScript()
			var params = {};
			var attributes = script.attributes;
			for (var label in attributes) {
				if (attributes.hasOwnProperty(label)) {
					var node = attributes[label];
					params[node.name.replace(/data-/g, '')] = node.value;
				}
			}
			return params;
		}

		// get the correct script based on the id
		function _getRepoCardScript() {
			var scripts = document.getElementsByTagName('script');
			for (var i = 0, len = scripts.length; i < len; i++) {
				var script = scripts[i];
				var id = script.getAttribute('id');
				if (id === 'repo-card-lib') return scripts[i];
			}
		}


		RepoCard.prototype.configure = function configure() {
			var actions = {
				name: function(name) {
					document.getElementsByClassName('repo-card__title')[0].innerText = name;
				},
				author: function(author) {
					document.getElementsByClassName('repo-card__author')[0].innerText = author;
				}
			};
			for (var param in this.params) {
				if (actions[param]) {
					actions[param](this.params[param]);
				}
			}
		};

		return new RepoCard();

}());


