'use strict';

var ScriptTagData = ScriptTagData || (function() {

    /**
     * Returns all of the data attributes from a given script ID
     *
     * @param scriptId
     * @returns {*}
     */

    function getScript(scriptId) {
      var scripts = document.getElementsByTagName('script');
      for (var i = 0, len = scripts.length; i < len; i++) {
        var script = scripts[i];
        var id = script.getAttribute('id');
        if (id === scriptId) return scripts[i];
      }
      return null;
    }

    /**
     * Returns the script tag based on the given script ID
     *
     * @param scriptId
     * @returns {{}}
     */

    function getData(scriptId) {
      var script = getScript(scriptId);
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