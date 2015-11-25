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
      tag.innerHTML = ".repo-card{box-sizing:border-box;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background-color:#FFF;line-height:1.5em;margin:0 auto;padding-bottom:60px;width:350px;border:1px solid #CCC;border-radius:5px;overflow:hidden;position:fixed}.repo-card__image-wrap{height:100px;width:100%;position:relative;-webkit-transition:height .3s ease-in;transition:height .3s ease-in}.repo-card__image-wrap:before{content:'';width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(51,51,51,.25);z-index:1}.repo-card__header{text-align:left;padding-left:140px;position:absolute;bottom:-28px;left:0;color:#FFF;z-index:20;-webkit-transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in}.repo-card__title{margin:0;color:#FFF;font-size:1.125em;font-weight:400;z-index:10;position:relative;padding-bottom:6px}.repo-card__subtitle{color:#999;font-size:.875em;padding-top:12px;-webkit-transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in}.repo-card__thumb-wrap{width:110px;height:110px;padding:3px;position:absolute;bottom:-55px;left:15px;border-radius:50%;z-index:10;-webkit-transition:-webkit-transform .3s linear;transition:transform .3s linear}.repo-card__thumb{width:104px;height:104px;display:block;border-radius:50%}.repo-card__content-wrap{padding-bottom:0;min-height:50px;position:relative}.repo-card__content-wrap::after{content:'';position:absolute;top:-10px;left:50%;z-index:20;width:0;height:0;border-style:solid;border-width:0 10px 10px;border-color:transparent transparent #FFF;-webkit-transform:translateY(10px);-ms-transform:translateY(10px);transform:translateY(10px);-webkit-transition:-webkit-transform .3s ease-in;transition:transform .3s ease-in;margin-left:-10px}.repo-card__content{padding:30px 20px 10px;text-align:left;font-size:.875em;color:#666;max-height:0;overflow:hidden;-webkit-transform:translateY(-10%);-ms-transform:translateY(-10%);transform:translateY(-10%);-webkit-transition:max-height .3s ease-in,opacity .3s ease-in;transition:max-height .3s ease-in,opacity .3s ease-in;opacity:0;visibility:hidden}.repo-card__social{position:absolute;bottom:0;left:0;list-style:none;margin:0;width:100%;display:table;border-top:1px solid #CCC;padding:10px 0 5px}.repo-card__social-item{display:table-cell;text-align:center}.repo-card__social-item a{opacity:0;font-size:0;text-decoration:none}.repo-card:hover .repo-card__image-wrap{height:150px}.repo-card:hover .repo-card__content-wrap:after{-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0)}.repo-card:hover .repo-card__content{max-height:200px;opacity:1;visibility:visible;-webkit-transform:translateY(0);-ms-transform:translateY(0);transform:translateY(0);-webkit-transition:max-height .3s ease-in,opacity .3s ease-in;transition:max-height .3s ease-in,opacity .3s ease-in}.repo-card:hover .repo-card__thumb-wrap{-webkit-transform:translateY(-70%);-ms-transform:translateY(-70%);transform:translateY(-70%)}.repo-card:hover .repo-card__header{-webkit-transform:translateY(-110%);-ms-transform:translateY(-110%);transform:translateY(-110%)}.repo-card:hover .repo-card__subtitle{color:#FFF;-webkit-transform:translateY(-10px);-ms-transform:translateY(-10px);transform:translateY(-10px)}";;
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


