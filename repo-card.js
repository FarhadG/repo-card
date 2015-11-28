(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["RepoCard"] = factory();
	else
		root["RepoCard"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ScriptTagData = __webpack_require__(3);

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
	  debugger;
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
	    'frameborder="0" scrolling="0" width="130px" height="20px"></iframe></li>'
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
	    el.style.zIndex = 999999;
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

	module.exports = new RepoCard();


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";var ScriptTagData=ScriptTagData||function(){function t(t){return console.warn("script tag with id [%s] could not be found",t),null}function r(r,n){for(var a=document.getElementsByTagName("script"),e=0,u=a.length;u>e;e++){var i=a[e],c=i.getAttribute("id");if(c===r)return a[e]}return n?t(r):null}function n(n,a){var e=r(n);if(!e)return a&&t(n),null;var u={},i=e.attributes;for(var c in i)if(i.hasOwnProperty(c)){var o=i[c];u[o.name.replace(/data-/g,"")]=o.value}return u}return{getScript:r,getData:n}}();

	/*** EXPORTS FROM exports-loader ***/
	module.exports = ScriptTagData

/***/ }
/******/ ])
});
;