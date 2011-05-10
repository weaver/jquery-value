(function($) {

  $(function() {
    $('form')
      .submit(onSubmit)
      .find(':named(to)')
        .valueHook({ get: getCSV, set: setCSV })
        .end()
      .values({ to: ['alpha', 'bravo'], subject: 'a message for you' });
  });

  function onSubmit(ev) {
    var form = $(this);
    ev.preventDefault();
    $('#value').text(JSON.stringify(form.values()));
  }

  function getCSV() {
    return this.value.split(/\s*,\s*/g);
  }

  function setCSV(data) {
    this.value = data.join(', ');
  }
})(jQuery);