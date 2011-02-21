(function($) {

  $(function() {
    $('form')
      .submit(onSubmit)
      .findNamed('to')
        .valMethod(commaList)
        .end()
      .formData({ to: ['alpha', 'bravo'], subject: 'a message for you' });
  });

  function onSubmit(ev) {
    var form = $(this);
    ev.preventDefault();
    $('#value').text(JSON.stringify(form.formData()));
  }

  function commaList(data) {
    if (arguments.length == 0) {
      return this.value.split(/\s*,\s*/g);
    }
    else
      this.value = data.join(', ');
  }

})(jQuery);