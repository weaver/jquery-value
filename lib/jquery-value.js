// jquery-generalized-value.js
//
// Make the jQuery `.val()` method more generalized. Add a
// `.formData()` method that converts a form to a value.

(function($) {
  var $val = $.fn.val;

  $.expr.filters.named = function(el) {
    return !!name(el);
  };

  $.fn.extend({
    name: function() {
      return name(this[0]);
    },

    findNamed: function(name) {
      return this.find('[name=' + name + '], [data-name=' + name + ']');
    },

    valMethod: function(fn) {
      return this.data('val', fn);
    },

    val: function(val) {
      if (!arguments.length)
        return value(this[0]);

      var inputs = [];

      this.each(function() {
        update(this, val, inputs);
      });

      if (inputs)
        $val.call($(inputs), val);

      return this;
    },

    formData: function(data) {
      var form = this;

      if (!arguments.length) {
        var result = {};
        form.find(':named').each(function(_, el) {
          var key = name(el);
          if (!(key in data))
            data[key] = value(el);
        });
        return result;
      }
      else {
        U.each(data, function(val, key) {
          form.findNamed(key).val(val);
        });
        return this;
      }
    }
  });

  function value(el) {
    if (!el) return undefined;

    var val = $.data(el, 'val');

    if ($.isFunction(val))
      return val.call(el);
    else if (val && $.isFunction(val.value))
      return val.value();
    else if ((val = $.data(el, 'tmplItem')))
      return val.data;
    else if (isInput(el))
      return $val.call($(el));
    else
      return val;
  }

  function update(el, val, _inputs) {
    var view = $.data(el, 'val');

    if ($.isFunction(view))
      view.call(el, val);
    else if (view && $.isFunction(view.update))
      view.update(val);
    else if ((view = $.data(el, 'tmplItem'))) {
      view.data = val;
      view.update();
    }
    else if (isInput(el))
      _inputs ? _inputs.push(el) : $val.call($(el), val);
    else
      $.data(el, 'val', val);
  }

  
  // ## Helpers ##

  function name(el) {
    return el && (el.getAttribute('name') || el.getAttribute('data-name'));
  }

  function isInput(el) {
    return el.value !== undefined || el.nodeName == 'select';
  }

})(jQuery);