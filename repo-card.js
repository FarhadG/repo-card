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

		/**
		 * Helper function for setting the content of the given dom element
		 *
		 * @param selector
		 * @param data
		 * @returns {*}
		 * @private
		 */

		function _setContent(selector, data) {
			return document.getElementsByClassName(selector)[0].innerText = data;
		}

		function _setStyle(selector, property, value) {
			var el = document.getElementsByClassName(selector)[0];
			el.style[property] = value;
			if (property === 'background') {
				el.style.backgroundSize = 'cover';
			}
			return;
		}

		/**
		 * Configures the data based on the params provided to the lib script
		 */

		RepoCard.prototype.configure = function configure() {
			var watchers = {
				name: function(name) {
					return _setContent('repo-card__title', name);
				},
				author: function(author) {
					return _setContent('repo-card__author', author);
				},
				info: function(info) {
					return _setContent('repo-card__content', info);
				},
				thumb: function(value) {
					return _setStyle('repo-card__thumb', 'background', value);
				}
			};
			for (var param in this.params) {
				(watchers[param]) && (watchers[param](this.params[param]));
			}
		};

		return new RepoCard();

}());


