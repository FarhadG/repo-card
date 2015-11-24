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

    // Helper for setting a dom element's content

		function _setContent(selector, data) {
			document.getElementsByClassName(selector)[0].innerText = data;
		}

    // Helper for setting a dom element's style

		function _setStyle(selector, property, value) {
			var el = document.getElementsByClassName(selector)[0];
			el.style[property] = value;
			if (property === 'background') {
				el.style.backgroundSize = 'cover';
			}
		}

    // Helper for setting the repo card's position

		function _setPosition(values) {
			var el = document.getElementsByClassName('repo-card')[0].style;
			for(var position in values) {
				el[position] = values[position]+'px';
			}
		}

    // generates the github star button for a given user and repo

    function _generateStarButton(username, repo) {
      return [
        '<li class="repo-card__social-item">',
          '<a class="github-button"',
            'href="https://github.com/'+username+'/'+repo+'"',
            'data-icon="octicon-star"',
            'data-count-href="/'+username+'/'+repo+'/stargazers"',
            'data-count-api="/repos/'+username+'/'+repo+'#stargazers_count"',
            'data-count-aria-label="# stargazers on GitHub"',
            'aria-label="Star on GitHub">Star</a>',
        '</li>'
      ].join('');
    }

    // generates the github fork button for a given repo

    function _generateForkButton(username, repo) {
      return [
        '<li class="repo-card__social-item">',
          '<a class="github-button"',
            'href="https://github.com/'+username+'/'+repo+'/fork"',
            'data-icon="octicon-repo-forked"',
            'data-count-href="/'+username+'/'+repo+'/network"',
            'data-count-api="/repos/'+username+'/'+repo+'#forks_count"',
            'data-count-aria-label="# forks on GitHub"',
            'aria-label="Fork on GitHub">Fork</a>',
        '</li>'
      ].join('');
    }

    // generates the github follow button for a given user

    function _generateFollowButton(username) {
      return [
        '<li class="repo-card__social-item">',
          '<a class="github-button"',
            'href="https://github.com/'+username+'"',
            'data-count-href="/'+username+'/followers"',
            'data-count-api="/users/'+username+'#followers"',
            'data-count-aria-label="# followers on GitHub"',
            'aria-label="Follow on GitHub">Follow @'+username+'</a>',
        '</li>'
      ].join('');
    }

    // generates and adds the desired buttons into the dom

    function _generateSocialButtons(params) {
      var buttons = [];
      if (params.stars !== false) {
        buttons.push(_generateStarButton(params.username, params.repo));
      }
      if (params.fork !== false) {
        buttons.push(_generateForkButton(params.username, params.repo));
      }
      if (params.follow !== false) {
        buttons.push(_generateFollowButton(params.username));
      }
      document.getElementsByClassName('repo-card__social')[0].innerHTML = buttons.join('');
    }


    /**
     * Configures the data based on the params provided to the lib script
     *
     * @param params
     * @returns {RepoCard}
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
      _generateSocialButtons(params);
      return this;
		};

		return new RepoCard();

}());


