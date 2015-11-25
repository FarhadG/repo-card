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
      var params = ScriptTagData.getData('repo-card-lib');
      if (params && Object.keys(params).length > 2) {
        this.configure(params);
      }
    }

    // generates the template for the repo card

    function _generateRepoCard(params) {
      return [
        '<div class="repo-card__image-wrap">',
        '<div class="repo-card__thumb-wrap">',
        '<img class="repo-card__thumb" />',
        '</div>',
        '<header class="repo-card__header">',
        '<h1 class="repo-card__title">',
        params.title,
        '</h1>',
        '<div class="repo-card__subtitle">',
        params.subtitle,
        '</div>',
        '</header>',
        '</div>',
        '<div class="repo-card__content-wrap">',
        '<div class="repo-card__content">',
        params.info,
        '</div>',
        '</div>',
        '<ul class="repo-card__social">',
        _generateSocialButtons(params),
        '</ul>',
      ].join('');
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
      for (var position in values) {
        el[position] = values[position] + 'px';
      }
    }

    // generates the styling within a <style> tag

    function _generateStyling() {
      var tag = document.createElement('style');
      tag.innerHTML = '@@import style.css';
      return tag;
    }

    // generates the github star button for a given user and repo

    function _generateStarButton(username, repo) {
      return [
        '<li class="repo-card__social-item">',
        '<a class="github-button"',
        'href="https://github.com/' + username + '/' + repo + '"',
        'data-icon="octicon-star"',
        'data-count-href="/' + username + '/' + repo + '/stargazers"',
        'data-count-api="/repos/' + username + '/' + repo + '#stargazers_count"',
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
        'href="https://github.com/' + username + '/' + repo + '/fork"',
        'data-icon="octicon-repo-forked"',
        'data-count-href="/' + username + '/' + repo + '/network"',
        'data-count-api="/repos/' + username + '/' + repo + '#forks_count"',
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
        'href="https://github.com/' + username + '"',
        'data-count-href="/' + username + '/followers"',
        'data-count-api="/users/' + username + '#followers"',
        'data-count-aria-label="# followers on GitHub"',
        'aria-label="Follow on GitHub">Follow @' + username + '</a>',
        '</li>'
      ].join('');
    }

    // creates the script for the github buttons

    function _generateGithubButtonsScript() {
      var script = document.createElement('script');
      script.src = 'https://buttons.github.io/buttons.js';
      script.id = 'github-bjs';
      script.attributes.async = '';
      script.attributes.defer = '';
      return script;
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
      return buttons.join('');
    }

    /**
     * Configures the data based on the params provided to the lib script
     *
     * @param params
     * @returns {RepoCard}
     */

    RepoCard.prototype.configure = function configure(params) {
      if (this.repoCardTemplateInjected) {
        var repoCardContainer = document.getElementsByClassName('repo-card')[0];
        repoCardContainer.innerHTML = _generateRepoCard(params);
      }
      else {
        var el = document.createElement('div');
        el.className = 'repo-card';
        el.innerHTML = _generateRepoCard(params);
        document.body.appendChild(el);
        document.getElementsByTagName('head')[0].appendChild(_generateStyling());
        document.body.appendChild(_generateGithubButtonsScript());
        this.repoCardTemplateInjected = true;
      }
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
      return this;
    };

    return new RepoCard();

  }());


