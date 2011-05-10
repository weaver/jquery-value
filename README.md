# jQuery Value #

A jQuery plugin that `.value()`, an extensible version of `.val()`.

## Value Methods ##

Add a value descriptor for any element using `.valueHook()`.

    $('#special').valueHook({
      get: function() { ... },
      set: function(data) { ... }
    });

When `.value()` is called, jQuery will dispatch to your descriptor to
get or set the element's value.

    // Get the special value
    console.log('special value:', $('#special').value());

    // Set the special value
    $('#special').value(['fancy', 'value', 'here']);

## jQuery Templates ##

This plugin works with [jQuery templates][1]. If a template is bound
and added to the DOM like this:

    $("#myTemplate").tmpl(myData).appendTo("#target");

The `.value()` method can get the data:

    var data = $("#target").children(':last-child').value();
    // data === myData

Or it can be used to set the data. This automatically uses the
template to update the DOM.

    $('#target').children(':last-child').value(newValue);

## Forms ##

A `.values()` method converts an entire form into an object. This is
handy for making JSON requests.

    var obj = $('#myForm').values();

It can also be used to set all the values of a form at once:

    $('#myForm').values({ name: 'value', ... });

## API ##

**:named**

Use this pseudo-selector to match elements with either a `name`
attribute or a `data-name` attribute.

**:named(name)**

This variant of the `:named` pseudo-selector will only match elements
with `name` or `data-name` attribute equal to "name".

**.name()**

Use this method to return the name of the first element in the matched
set. The name may be taken from the `name` attribute or `data-name`
attribute.

**.value()**

Get the value of the first element in the matched set.

**.value(data)**

Set the value of all elements in the matched set to be `data`.

**.valueHook({ ... })**

Bind the value descriptor to elements in the matched set. Whenever
`.value()` is called on these methods, it dispatches to the
descriptor's `.get()` and `.set(data)` methods.

**.values()**

Find all named elements in the current context, reducing them to an
object of values.

**.values(data)**

Set any named elements in the current context that have values given
in `data`.

[1]: http://api.jquery.com/category/plugins/templates/
