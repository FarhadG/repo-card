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
      var repoCardTemplate = '@@import index.html';
      var result = [];
      repoCardTemplate.split('{{').forEach(function(word){
        if (/title}}/.test(word)) {
          result.push(params.title);
          result.push(word.split('title}}')[1]);
        }
        else if (/subtitle}}/.test(word)) {
          result.push(params.subtitle);
          result.push(word.split('subtitle}}')[1]);
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
      tag.innerHTML = '.repo-card {\n  box-sizing       : border-box;\n  font-family      : \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  background-color : #FFFFFF;\n  line-height      : 1.5em;\n  margin           : 0 auto;\n  padding-bottom   : 60px;\n  width            : 350px;\n  border           : 1px solid #CCCCCC;\n  border-radius    : 5px;\n  overflow         : hidden;\n  position         : fixed\n}\n\n.repo-card__image-wrap {\n  height             : 100px;\n  width              : 100%;\n  position           : relative;\n  -webkit-transition : height .3s ease-in;\n  transition         : height .3s ease-in\n}\n\n.repo-card__image-wrap:before {\n  content          : \'\';\n  width            : 100%;\n  height           : 100%;\n  position         : absolute;\n  top              : 0;\n  left             : 0;\n  background-color : rgba(51, 51, 51, .25);\n  z-index          : 1\n}\n\n.repo-card__header {\n  text-align         : left;\n  padding-left       : 140px;\n  position           : absolute;\n  bottom             : -28px;\n  left               : 0;\n  color              : #FFFFFF;\n  z-index            : 20;\n  -webkit-transition : -webkit-transform .3s ease-in;\n  transition         : transform .3s ease-in\n}\n\n.repo-card__title {\n  margin         : 0;\n  color          : #FFFFFF;\n  font-size      : 1.125em;\n  font-weight    : 400;\n  z-index        : 10;\n  position       : relative;\n  padding-bottom : 6px\n}\n\n.repo-card__subtitle {\n  color              : #999999;\n  font-size          : .875em;\n  padding-top        : 12px;\n  -webkit-transition : -webkit-transform .3s ease-in;\n  transition         : transform .3s ease-in\n}\n\n.repo-card__thumb-wrap {\n  width              : 110px;\n  height             : 110px;\n  padding            : 3px;\n  position           : absolute;\n  bottom             : -55px;\n  left               : 15px;\n  border-radius      : 50%;\n  z-index            : 10;\n  -webkit-transition : -webkit-transform .3s linear;\n  transition         : transform .3s linear\n}\n\n.repo-card__thumb {\n  width         : 104px;\n  height        : 104px;\n  display       : block;\n  border-radius : 50%\n}\n\n.repo-card__content-wrap {\n  padding-bottom : 0;\n  min-height     : 50px;\n  position       : relative\n}\n\n.repo-card__content-wrap::after {\n  content            : \'\';\n  position           : absolute;\n  top                : -10px;\n  left               : 50%;\n  z-index            : 20;\n  width              : 0;\n  height             : 0;\n  border-style       : solid;\n  border-width       : 0 10px 10px;\n  border-color       : transparent transparent #FFFFFF;\n  -webkit-transform  : translateY(10px);\n  -ms-transform      : translateY(10px);\n  transform          : translateY(10px);\n  -webkit-transition : -webkit-transform .3s ease-in;\n  transition         : transform .3s ease-in;\n  margin-left        : -10px\n}\n\n.repo-card__content {\n  padding            : 30px 20px 10px;\n  text-align         : left;\n  font-size          : .875em;\n  color              : #666666;\n  max-height         : 0;\n  overflow           : hidden;\n  -webkit-transform  : translateY(-10%);\n  -ms-transform      : translateY(-10%);\n  transform          : translateY(-10%);\n  -webkit-transition : max-height .3s ease-in, opacity .3s ease-in;\n  transition         : max-height .3s ease-in, opacity .3s ease-in;\n  opacity            : 0;\n  visibility         : hidden\n}\n\n.repo-card__social {\n  position   : absolute;\n  bottom     : 0;\n  left       : 0;\n  list-style : none;\n  margin     : 0;\n  width      : 100%;\n  display    : table;\n  border-top : 1px solid #CCCCCC;\n  padding    : 10px 0 5px\n}\n\n.repo-card__social-item {\n  display    : table-cell;\n  text-align : center\n}\n\n.repo-card__social-item a {\n  opacity         : 0;\n  font-size       : 0;\n  text-decoration : none\n}\n\n.repo-card:hover .repo-card__image-wrap {\n  height : 150px\n}\n\n.repo-card:hover .repo-card__content-wrap:after {\n  -webkit-transform : translateY(0);\n  -ms-transform     : translateY(0);\n  transform         : translateY(0)\n}\n\n.repo-card:hover .repo-card__content {\n  max-height         : 200px;\n  opacity            : 1;\n  visibility         : visible;\n  -webkit-transform  : translateY(0);\n  -ms-transform      : translateY(0);\n  transform          : translateY(0);\n  -webkit-transition : max-height .3s ease-in, opacity .3s ease-in;\n  transition         : max-height .3s ease-in, opacity .3s ease-in\n}\n\n.repo-card:hover .repo-card__thumb-wrap {\n  -webkit-transform : translateY(-70%);\n  -ms-transform     : translateY(-70%);\n  transform         : translateY(-70%)\n}\n\n.repo-card:hover .repo-card__header {\n  -webkit-transform : translateY(-110%);\n  -ms-transform     : translateY(-110%);\n  transform         : translateY(-110%)\n}\n\n.repo-card:hover .repo-card__subtitle {\n  color             : #FFFFFF;\n  -webkit-transform : translateY(-10px);\n  -ms-transform     : translateY(-10px);\n  transform         : translateY(-10px)\n}';
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


