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

    // various themes

    RepoCard.themes = {
      doodle: {
        template: '@@import doodle/index.html',
        style: '@@import doodle/style.css',
        selectors: {
          background: 'repo-card__image-wrap',
          thumb: 'repo-card__thumb'
        }
      }
    };


    // Helper for setting a dom element's content

    function _setContent(selector, data) {
      document.getElementById(selector).innerText = data;
    }

    // Helper for setting a dom element's style

    function _setBackground(selector, value) {
      var el = document.getElementById(selector);
      el.style.background = value;
    }

    // Helper for setting the repo card's position

    function _setPosition(values) {
      var el = document.getElementById('repo-card').style;
      for (var position in values) {
        el[position] = values[position] + 'px';
      }
    }

    // generates the github star button for a given user and repo

    function _generateStarButton(username, repo) {
      return [
        '<li id="repo-card__social-item">',
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
        '<li id="repo-card__social-item">',
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
        '<li id="repo-card__social-item">',
        '<a class="github-button"',
        'href="https://github.com/' + username + '"',
        'data-count-href="/' + username + '/followers"',
        'data-count-api="/users/' + username + '#followers"',
        'data-count-aria-label="# followers on GitHub"',
        'aria-label="Follow on GitHub">Follow @' + username + '</a>',
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
      return buttons.join('');
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

    // generates the styling within a <style> tag

    function _generateStylingTag(params) {
      var tag = document.createElement('style');
      tag.innerHTML = RepoCard.themes[params.theme || 'doodle'].style;
      return tag;
    }

    // generates the template for the repo card

    function _generateRepoCard(params, template) {
      var result = [];
      template.split('{{').forEach(function(word) {
        if (/subtitle}}/.test(word)) {
          result.push(params.subtitle);
          result.push(word.split('subtitle}}')[1]);
        }
        else if (/title}}/.test(word)) {
          result.push(params.title);
          result.push(word.split('title}}')[1]);
        }
        else if (/info}}/.test(word)) {
          result.push(params.info);
          result.push(word.split('info}}')[1]);
        }
        else if (/buttons}}/.test(word)) {
          result.push(_generateSocialButtons(params));
          result.push(word.split('buttons}}')[1]);
        }
        else {
          result.push(word);
        }
      });
      return result.join('');
    }

    /**
     * Configures the data based on the params provided to the lib script
     *
     * @param params
     * @returns {RepoCard}
     */

    RepoCard.prototype.configure = function configure(params) {
      this.theme = RepoCard.themes[params.theme || 'doodle'];
      if (this.repoCardTemplateInjected) {
        var repoCardContainer = document.getElementById('repo-card');
        repoCardContainer.innerHTML = _generateRepoCard(params, this.theme.template);
      }
      else {
        var el = document.createElement('div');
        el.id = 'repo-card';
        el.innerHTML = _generateRepoCard(params, this.theme.template);
        document.body.appendChild(el);
        document.getElementsByTagName('head')[0].appendChild(_generateStylingTag(params));
        document.body.appendChild(_generateGithubButtonsScript());
        this.repoCardTemplateInjected = true;
      }
      if (params.background) {
        _setBackground(this.theme.selectors.background, params.background);
      }
      if (params.thumb) {
        _setBackground(this.theme.selectors.thumb, params.thumb);
      }
      return this;
    };

    return new RepoCard();

  }());


