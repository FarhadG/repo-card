'use strict';

var ScriptTagData = ScriptTagData || (function() {

    /**
     * Private helper function to warn the user if the script wasn't found
     *
     * @param scriptId
     * @private
     */

    function _warnMessage(scriptId) {
      console.warn('script tag with id [%s] could not be found', scriptId);
      return null;
    }

    /**
     * Returns all of the data attributes from a given script ID
     *
     * @param scriptId
     * @param silent
     * @returns {*}
     */

    function getScript(scriptId, silent) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i];
        var id = script.getAttribute('id');
        if (id === scriptId) return scripts[i];
      }
      return silent ? null : _warnMessage(scriptId);
    }

    /**
     * Returns the script tag based on the given script ID
     *
     * @param scriptId
     * @param silent
     * @returns {*}
     */

    function getData(scriptId, silent) {
      var script = getScript(scriptId, silent);
      if (!script) {
        return null;
      }
      var data = {};
      var attributes = script.attributes;
      for (var label in attributes) {
        if (attributes.hasOwnProperty(label)) {
          var node = attributes[label];
          data[node.name.replace(/data-/g, '')] = node.value;
        }
      }
      return data;
    }

    /**
     * Returns functions 'getScript' and 'getData'
     */

    return {
      getScript: getScript,
      getData: getData
    };

  }());
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
      var params = ScriptTagData.getData('repo-card-lib', true);
      if (params && Object.keys(params).length > 2) {
        this.configure(params);
      }
    }

    // various themes

    RepoCard.themes = {
      doodle: {
        template: '<div id="repo-card">\n  <div id="repo-card__image-wrap">\n    <div id="repo-card__thumb-wrap">\n      <img id="repo-card__thumb" />\n    </div>\n    <header id="repo-card__header">\n      <h1 id="repo-card__title">\n        {{title}}\n      </h1>\n\n      <div id="repo-card__subtitle">\n        {{subtitle}}\n      </div>\n    </header>\n  </div>\n  <div id="repo-card__content-wrap">\n    <div id="repo-card__content">\n      {{info}}\n    </div>\n  </div>\n  <ul id="repo-card__social">\n    {{buttons}}\n  </ul>\n</div>',
        style: '#repo-card {\n  box-sizing: border-box;\n  font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n  background-color: #FFFFFF;\n  line-height: 1.5em;\n  margin: 0 auto;\n  padding-bottom: 60px;\n  width: 350px;\n  border: 1px solid #CCCCCC;\n  border-radius: 5px;\n  overflow: hidden;\n}\n\n#repo-card a {\n  color: #999;\n}\n\n#repo-card__image-wrap {\n  height: 100px;\n  width: 100%;\n  position: relative;\n  -webkit-transition: height .3s ease-in;\n  transition: height .3s ease-in;\n}\n\n#repo-card__image-wrap:before {\n  content: \'\';\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: rgba(51, 51, 51, .25);\n  z-index: 1;\n}\n\n#repo-card__header {\n  text-align: left;\n  padding-left: 140px;\n  position: absolute;\n  bottom: -28px;\n  left: 0;\n  color: #FFFFFF;\n  z-index: 20;\n  -webkit-transition: -webkit-transform .3s ease-in;\n  transition: transform .3s ease-in;\n}\n\n#repo-card__title {\n  margin: 0;\n  color: #FFFFFF;\n  font-size: 1.125em;\n  font-weight: 400;\n  z-index: 10;\n  position: relative;\n  padding-bottom: 6px;\n}\n\n#repo-card__subtitle {\n  color: #999999;\n  font-size: .875em;\n  padding-top: 12px;\n  -webkit-transition: -webkit-transform .3s ease-in;\n  transition: transform .3s ease-in;\n}\n\n#repo-card__thumb-wrap {\n  width: 110px;\n  height: 110px;\n  padding: 3px;\n  position: absolute;\n  bottom: -55px;\n  left: 15px;\n  border-radius: 50%;\n  z-index: 10;\n  -webkit-transition: -webkit-transform .3s linear;\n  transition: transform .3s linear;\n}\n\n#repo-card__thumb {\n  width: 104px;\n  height: 104px;\n  display: block;\n  border-radius: 50%;\n  background-size: cover !important;\n}\n\n#repo-card__content-wrap {\n  padding-bottom: 0;\n  min-height: 50px;\n  position: relative;\n}\n\n#repo-card__content-wrap::after {\n  content: \'\';\n  position: absolute;\n  top: -10px;\n  left: 50%;\n  z-index: 20;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 0 10px 10px;\n  border-color: transparent transparent #FFFFFF;\n  -webkit-transform: translateY(10px);\n  -ms-transform: translateY(10px);\n  transform: translateY(10px);\n  -webkit-transition: -webkit-transform .3s ease-in;\n  transition: transform .3s ease-in;\n  margin-left: -10px;\n}\n\n#repo-card__content {\n  padding: 25px 20px 5px 20px;\n  text-align: left;\n  font-size: .875em;\n  color: #666666;\n  max-height: 0;\n  overflow: hidden;\n  -webkit-transform: translateY(-10%);\n  -ms-transform: translateY(-10%);\n  transform: translateY(-10%);\n  -webkit-transition: max-height .3s ease-in, opacity .3s ease-in;\n  transition: max-height .3s ease-in, opacity .3s ease-in;\n  opacity: 0;\n  visibility: hidden;\n}\n\n#repo-card__social {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  list-style: none;\n  margin: 0;\n  width: 100%;\n  display: table;\n  border-top: 1px solid #CCCCCC;\n  padding: 10px 0px 5px 0px;\n}\n\n.repo-card__social-item {\n  display: table-cell;\n  text-align: center;\n}\n\n.repo-card__social-item a {\n  opacity: 0;\n  font-size: 0;\n  text-decoration: none;\n  position: relative;\n  left: 5px;\n}\n\n#repo-card:hover #repo-card__image-wrap {\n  height: 150px;\n}\n\n#repo-card:hover #repo-card__content-wrap:after {\n  -webkit-transform: translateY(0);\n  -ms-transform: translateY(0);\n  transform: translateY(0);\n}\n\n#repo-card:hover #repo-card__content {\n  max-height: 200px;\n  opacity: 1;\n  visibility: visible;\n  -webkit-transform: translateY(0);\n  -ms-transform: translateY(0);\n  transform: translateY(0);\n  -webkit-transition: max-height .3s ease-in, opacity .3s ease-in;\n  transition: max-height .3s ease-in, opacity .3s ease-in;\n}\n\n#repo-card:hover #repo-card__thumb-wrap {\n  -webkit-transform: translateY(-70%);\n  -ms-transform: translateY(-70%);\n  transform: translateY(-70%);\n}\n\n#repo-card:hover #repo-card__header {\n  -webkit-transform: translateY(-110%);\n  -ms-transform: translateY(-110%);\n  transform: translateY(-110%);\n}\n\n#repo-card:hover #repo-card__subtitle {\n  color: #FFFFFF;\n  -webkit-transform: translateY(-10px);\n  -ms-transform: translateY(-10px);\n  transform: translateY(-10px);\n}',
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
      var el = document.getElementById('repo-card-container').style;
      el.position = 'fixed';
      el.top = el.right = el.bottom = el.left = 'initial';
      for (var position in values) {
        el[position] = values[position] + 'px';
      }
    }

    // generates the github star button for a given user and repo

    function _generateGithubButton(username, repo, type) {
      return [
        '<li class="repo-card__social-item"><iframe src="https://ghbtns.com/github-btn.html?user=',
        username, '&repo=', repo, '&type=', type, '&count=true"',
        'frameborder="0" scrolling="0" width="90px" height="20px"></iframe></li>'
      ].join('');
    }

    // generates the github follow button for a given user

    function _generateFollowButton(username) {
      return [
        '<li class="repo-card__social-item"><iframe src="https://ghbtns.com/github-btn.html?user=',
        username, '&type=follow"',
        'frameborder="0" scrolling="0" width="140px" height="20px"></iframe></li>'
      ].join('');
    }

    // generates and adds the desired buttons into the dom

    function _generateSocialButtons(params) {
      var buttons = [];
      if (params.stars !== false) {
        buttons.push(_generateGithubButton(params.username, params.repo, 'star'));
      }
      if (params.fork !== false) {
        buttons.push(_generateGithubButton(params.username, params.repo, 'fork'));
      }
      if (params.follow !== false) {
        buttons.push(_generateFollowButton(params.username));
      }
      return buttons.join('');
    }

    // generates the styling within a <style> tag

    function _generateStylingTag(theme) {
      var tag = document.createElement('style');
      tag.innerHTML = RepoCard.themes[theme || 'doodle'].style;
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
     * Sets theme name from the given set of themes
     *
     * @param name
     * @returns {RepoCard}
     */

    RepoCard.prototype.setTheme = function setTheme(name) {
      var theme = RepoCard.themes[name];
      if (theme) {
        this.theme = theme;
      }
      else {
        this.theme = RepoCard.themes['doodle'];
        console.warn('"%s" is an invalid Repo Card theme. Reverting to default', name);
      }
      return this;
    };

    /**
     * Sets the styles of the repo card given the parameters.
     *
     * @returns {RepoCard}
     */

    RepoCard.prototype.setStyling = function setStyling(params) {
      var params = this.params = Object.assign(this.params, params);
      if (params.background) {
        _setBackground(this.theme.selectors.background, params.background);
      }
      if (params.thumb) {
        _setBackground(this.theme.selectors.thumb, params.thumb);
      }
      if (params.position) {
        _setPosition(params.position)
      }
      return this;
    };

    /**
     * Configures the data based on the params provided to the lib script
     *
     * @param params
     * @returns {RepoCard}
     */

    RepoCard.prototype.configure = function configure(params) {
      this.params = this.params ? Object.assign(this.params, params) : params;
      if (!this.theme || this.params.theme) {
        this.setTheme(this.params.theme);
      }
      if (this.repoCardTemplateInjected) {
        var repoCardContainer = document.getElementById('repo-card-container');
        repoCardContainer.innerHTML = _generateRepoCard(this.params, this.theme.template);
      }
      else {
        var el = document.createElement('div');
        el.id = 'repo-card-container';
        el.innerHTML = _generateRepoCard(this.params, this.theme.template);
        document.body.appendChild(el);
        document.getElementsByTagName('head')[0].appendChild(_generateStylingTag(this.params.theme));
        this.repoCardTemplateInjected = true;
      }
      if (this.params.background || this.params.thumb || this.params.position) {
        this.setStyling(this.params);
      }
      return this;
    };

    return new RepoCard();

  }());


