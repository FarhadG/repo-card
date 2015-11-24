var RepoCard = RepoCard || (function() {

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
			var params =  ScriptTagData.getData('repo-card-lib');
			if (params && Object.keys(params).length > 2) {
				this.configure(params);
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
			document.getElementsByClassName(selector)[0].innerText = data;
		}

		function _setStyle(selector, property, value) {
			var el = document.getElementsByClassName(selector)[0];
			el.style[property] = value;
			if (property === 'background') {
				el.style.backgroundSize = 'cover';
			}
		}

		function _setPosition(values) {
			var el = document.getElementsByClassName('repo-card')[0].style;
			for(var position in values) {
				el[position] = values[position]+'px';
			}
		}

		/**
		 * Configures the data based on the params provided to the lib script
		 */

		RepoCard.prototype.configure = function configure(params) {
			var watchers = {
        background: _setStyle.bind(null, 'repo-card__image-wrap', 'background'),
				thumb: _setStyle.bind(null, 'repo-card__thumb', 'background'),
				subtitle: _setContent.bind(null, 'repo-card__subtitle'),
				info: _setContent.bind(null, 'repo-card__content'),
				title: _setContent.bind(null, 'repo-card__title'),
				position: _setPosition
			};
			for (var param in params) {
				(watchers[param]) && (watchers[param](params[param]));
			}
		};

		return new RepoCard();

}());


