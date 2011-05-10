// jquery-generalized-value.js
// v0.2.0
//
// Add `.value()`, an extensible version of `.val()`. Add a
// `.formData()` method that converts a form to a value.
//
// Copyright (c) 2011, Ben Weaver <ben@orangesoda.net>.
// https://github.com/weaver/jquery-value/blob/master/LICENSE

(function($) {

  $.expr.filters.named = function(el, i, m) {
    var filterArg = m[3];
    return filterArg ? (name(el) === filterArg) : !!name(el);
  };

  $.fn.extend({
    name: function() {
      return name(this[0]);
    },

    valueHook: function(hook) {
      return this.data('valueHook', hook);
    },

    value: function(val) {
      if (!arguments.length)
        return value(this[0]);

      var inputs = [];

      this.each(function() {
        setValue(this, val, inputs);
      });

      if (inputs.length > 0)
        $(inputs).val(val);

      return this;
    },

    values: function(data) {
      var root = this;

      if (!arguments.length) {
        var val, result = {};
        root.find(':named').each(function(_, el) {
          if ((val = getValue(el)) !== undefined)
            result[name(el)] = val;
        });
        return result;
      }
      else {
        $.each(data, function(key, val) {
          root.find(':named(' + key + ')').value(val);
        });
        return this;
      }
   }
  });

  
  // ## Helpers ##

  function isInput(el) {
    return el.value !== undefined || el.nodeName == 'select';
  }

  function name(el) {
    return el && (el.getAttribute('name') || el.getAttribute('data-name'));
  }

  function getValue(el) {
    if (!el) return undefined;

    var obj;

    if ((obj = $.data(el, 'valueHook')) && $.isFunction(obj.get))
      return obj.get.call(el);
    else if (isInput(el))
      return $(el).val();
    else if ((obj = $.data(el, 'tmplItem')))
      return obj.data;

    return undefined;
  }

  function setValue(el, val, _inputs) {
    var obj;

    if ((obj = $.data(el, 'valueHook')) && $.isFunction(obj.set))
      obj.set.call(el, val);
    else if (isInput(el))
      _inputs ? _inputs.push(el) : $(el).val(val);
    else if ((obj = $.data(el, 'tmplItem'))) {
      obj.data = val;
      obj.update();
    }
  }

})(jQuery);