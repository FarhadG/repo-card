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
      this.configure();
		}

		// Super BETA
    //RepoCard.version = '0.0.1';

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
      var params = ScriptTagData.getData('repo-card-lib');
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
			for (var param in params) {
				(watchers[param]) && (watchers[param](params[param]));
			}
		};

		return new RepoCard();

}());


