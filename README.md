# jQuery Value #

A jQuery plugin that generalizes the `.val()` method.

## Value Methods ##

Add a value method for any element using `.valMethod()`.

    $('#special').valMethod(function(data) {
      if (arguments.length == 0) {
        // Return value of `this`.
      }
      else {
        // Set value of `this`.
      }
    });

When `.val()` is called, jQuery will dispatch to your method to get or
set the element's value.

    // Get the special value
    console.log('special value:', $('#special').val());

    // Set the special value
    $('#special').val(['fancy', 'value', 'here']);

## jQuery Templates ##

This plugin works with [jQuery templates][1]. If a template is bound
and added to the DOM like this:

    $("#myTemplate").tmpl(myData).appendTo("#target");

The `.val()` method can get the data:

    var data = $("#target").children(':last-child').val();
    // data is equal to myData

Or it can be used to set the data. This automatically uses the
template to update the DOM.

    $('#target').children(':last-child').val(newValue);

## Forms ##

A `.formData()` method converts an entire form into an object. This is
handy for making JSON requests.

    var obj = $('#myForm').formData();

It can also be used to set all the values of a form at once:

    $('#myForm').formData({ name: 'value', ... });

## API ##

**:named**

Use this pseudo-selector to match elements with either a `name`
attribute or a `data-name` attribute.

**.name()**

Use this pseudo-selector to return the name of the first element in
the matched set. The name may be taken from the `name` attribute or
`data-name` attribute.

**.findNamed(name)**

Find elements named `name` within the current set of matched elements.

**.val()**

Get the value of the first element in the matched set.

**.val(data)**

Set the value of all elements in the matched set to be `data`.

**.valMethod(fn)**

Bind the value method `fn` to elements in the matched set. Whenever
`.val()` is called on these methods, it dispatches to `fn`.

**.formData()**

Get all the values of a form as an object.

**.formData(data)**

Set all the values of a form using an object.

[1]: http://api.jquery.com/category/plugins/templates/
