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
     * @param silent
     * @param scriptId
     * @returns {{}}
     */

    function getData(scriptId, silent) {
      var script = getScript(scriptId);
      if (!script) {
        silent || _warnMessage(scriptId);
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